import { MethodReturn } from '../types/Methods.types';
import {
  VivaMerchantCredentials,
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

type AuthCredentials = VivaOAuthCredentials | VivaMerchantCredentials;

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

  protected async requestAccessToken(
    credentials: AuthCredentials
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
                'apikey' in credentials
                  ? credentials.merchantId + ':' + credentials.apikey
                  : credentials.clientId + ':' + credentials.clientSecret
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
      console.error('Viva Auth Error', e);
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

  protected getMerchantBasicAuthorization(): string {
    return 'Basic ' + this.getVivaBasicToken();
  }

  protected getOAuthBasicAuthorization(): string {
    return (
      'Basic ' +
      Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
    );
  }

  /**
   * Return the VivaWallet API Auth2.0 code from credentials (needed for API Bearer calls)
   * or `null` on request failed
   *
   * @param basic If `true`, merchantId and apikey will be used instead of clientId and clientSecret
   */
  async getVivaToken(basic = false): MethodReturn<string | null, 'tokenerror'> {
    const credentials = basic ? this.merchantCredentials : this.oauthCredentials;

    if (!credentials) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    return this.requestAccessToken(credentials);
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
      if (this.errorLogs) console.error('VivaAuth.getCloudTerminalAccessToken', e);
      return {
        success: false,
        message: 'Failed to get Cloud Terminal token',
        code: 'tokenerror',
        data: null,
      };
    }
  }

  getVivaBasicToken(): string {
    if (!this.merchantCredentials) throw new Error('Merchant credentials not provided');
    return Buffer.from(
      this.merchantCredentials.merchantId + ':' + this.merchantCredentials.apikey
    ).toString('base64');
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
          Authorization: this.getMerchantBasicAuthorization(),
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
}

class VivaAuth extends VivaAuthBase {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.init();
  }

  /** Credentials verification, `throw` error if credentials is not gived ***(required for API calls)*** */
  private init(): void {
    console.log('Init viva');
    if (!this.hasOAuthCredentials() || !this.hasMerchantCredentials())
      throw new Error('Credentials not provided');
  }
}

// ------------------------------------------------------------

class VivaAuthISV extends VivaAuthBase {
  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.init();
  }

  /** Credentials verification, `throw` error if credentials is not gived ***(required for API calls)*** */
  private init(): void {
    console.log('Init viva');
    if (!this.hasOAuthCredentials())
      throw new Error('Credentials not provided');
  }
}

export { VivaAuth, VivaAuthISV };
