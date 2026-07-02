import { MethodReturn } from '../types/Methods.types';
import {
  VivaOAuthCredentials,
  VivawalletAPIInit,
  VivawalletISVInit,
} from '../types/Vivawallet.types';
import {
  GetVivaTokenReturn,
  VivaCloudTerminalAccessTokenOptions,
  VivaCloudTerminalAccessTokenReturn,
} from '../types/VivawalletAuth.types';
import { useAxios } from '../utils/axiosInstance.ts';
import VivaSkull from './VivaSkull.class';

class VivaAuthBase extends VivaSkull {
  constructor(datas: VivawalletAPIInit | VivawalletISVInit) {
    super(datas);
  }

  protected hasOAuthCredentials(): boolean {
    return Boolean(this.clientId && this.clientSecret);
  }

  protected hasMerchantCredentials(): boolean {
    return Boolean(this.merchantCredentials);
  }

  protected hasResellerCredentials(): boolean {
    return Boolean(
      this.resellerCredentials?.resellerId &&
        this.resellerCredentials.resellerApiKey
    );
  }

  /** Ensure OAuth client credentials are available before OAuth-based calls. */
  protected assertOAuthCredentials(): void {
    if (!this.hasOAuthCredentials())
      throw new Error('Credentials not provided');
  }

  /** Ensure merchant API credentials are available before Basic merchant calls. */
  protected assertMerchantCredentials(): void {
    if (!this.hasMerchantCredentials())
      throw new Error('Credentials not provided');
  }

  protected async requestAccessToken(
    credentials: VivaOAuthCredentials
  ): MethodReturn<string | null, 'tokenerror'> {
    try {
      const res = await useAxios.post<GetVivaTokenReturn>(
        this.endpoints.auth.url,
        {
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(
                credentials.clientId + ':' + credentials.clientSecret
              ).toString('base64'),
          },
        }
      );

      if (!res.data || !res.data.access_token)
        return {
          success: false,
          message: 'Failed to get Viva token',
          code: 'tokenerror',
          data: null,
        };

      return {
        success: true,
        message: 'Viva token fetched',
        data: res.data.access_token,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaAuth.requestAccessToken', e);
      return {
        success: false,
        message: 'Failed to get Viva token',
        code: 'tokenerror',
        data: null,
      };
    }
  }

  protected getBearerAuthorization(token: string | null): string {
    return 'Bearer ' + token;
  }

  protected getOAuthBasicAuthorization(): string {
    return (
      'Basic ' +
      Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
    );
  }

  /**
   * Return the VivaWallet API OAuth 2.0 access token from client credentials
   * or `null` on request failed.
   */
  async getVivaAccessToken(): MethodReturn<string | null, 'tokenerror'> {
    if (!this.hasOAuthCredentials()) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    return this.requestAccessToken(this.oauthCredentials);
  }

  /** Return the VivaWallet Merchant ID/API Key Basic Auth authorization value. */
  getVivaBasicAuth(): string {
    if (!this.merchantCredentials)
      throw new Error('Merchant credentials not provided');

    return (
      'Basic ' +
      Buffer.from(
        this.merchantCredentials.merchantId +
          ':' +
          this.merchantCredentials.apikey
      ).toString('base64')
    );
  }

  /** Return the VivaWallet Reseller ID/Merchant ID/Reseller API Key Basic Auth authorization value. */
  getVivaResellerBasicAuth(targetMerchantId: string): string {
    if (!this.resellerCredentials)
      throw new Error('Reseller credentials not provided');
    if (!targetMerchantId) throw new Error('Target merchant ID not provided');

    return (
      'Basic ' +
      Buffer.from(
        this.resellerCredentials.resellerId +
          ':' +
          targetMerchantId +
          ':' +
          this.resellerCredentials.resellerApiKey
      ).toString('base64')
    );
  }

  /**
   * Generate an access token to be used in calls to our EFT POS API.
   *
   * This method does not cache the token. It returns Viva's full token response so the caller can reuse it until `expires_in`.
   */
  async getCloudTerminalAccessToken(
    options: VivaCloudTerminalAccessTokenOptions = {
      grant_type: 'client_credentials',
    }
  ): MethodReturn<VivaCloudTerminalAccessTokenReturn | null, 'tokenerror'> {
    if (!this.hasOAuthCredentials()) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const body = new URLSearchParams({
        grant_type: options.grant_type,
      });

      const res = await useAxios.post<VivaCloudTerminalAccessTokenReturn>(
        this.endpoints.cloudTerminal.auth.token.url,
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: this.getOAuthBasicAuthorization(),
          },
        }
      );

      if (!res.data || !res.data.access_token) {
        return {
          success: false,
          message: 'Failed to get Cloud Terminal token',
          code: 'tokenerror',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Cloud Terminal token fetched',
        data: res.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaAuth.getCloudTerminalAccessToken', e);
      return {
        success: false,
        message: 'Failed to get Cloud Terminal token',
        code: 'tokenerror',
        data: null,
      };
    }
  }

  /** Return the code needed for Viva webhooks returns or `null` on request failed */
  async getVivaWebhookCode(): MethodReturn<string | null, 'webhookerror'> {
    if (!this.merchantId || !this.apikey) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const r = await useAxios.get(this.endpoints.webhookAuth.url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!r.data || !r.data.Key) {
        return {
          success: false,
          message: 'Failed to get Viva webhook code',
          code: 'webhookerror',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Viva webhook code fetched',
        data: r.data.Key,
      };
    } catch (e) {
      console.error('Viva Webhook Code Error', e);
      return {
        success: false,
        message: 'Failed to get Viva webhook code',
        code: 'webhookerror',
        data: null,
      };
    }
  }

  // ---------------------  DEPRECATED METHODS ---------------------

  /**
   * @deprecated Use `getVivaAccessToken()` instead. Merchant ID/API Key credentials
   * are used directly with Basic Auth endpoints and do not request an access token.
   */
  async getVivaToken(basic = false): MethodReturn<string | null, 'tokenerror'> {
    if (basic) {
      return {
        success: false,
        message:
          'Merchant Basic credentials cannot request a Viva access token',
        code: 'tokenerror',
        data: null,
      };
    }

    return this.getVivaAccessToken();
  }

  /**
   * @deprecated Use `getVivaBasicAuth()` instead. This returns only the
   * Base64-encoded Merchant ID/API Key value without the `Basic ` prefix.
   */
  getVivaBasicToken(): string {
    return this.getVivaBasicAuth().replace('Basic ', '');
  }
}

class VivaAuth extends VivaAuthBase {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.assertOAuthCredentials();
    this.assertMerchantCredentials();
  }
}

// ------------------------------------------------------------

class VivaAuthISV extends VivaAuthBase {
  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.assertOAuthCredentials();
  }
}

export { VivaAuth, VivaAuthISV };
