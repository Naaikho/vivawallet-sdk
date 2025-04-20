import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaSkull from './VivaSkull.class';
import { useAxios } from '../utils/axiosInstance.ts';
import { MethodReturn } from '../types/Methods.types';
import { GetVivaTokenReturn } from '../types/VivawalletAuth.types';

class VivaAuth extends VivaSkull {
  /**
   * This code is used for Viva Wallet webhook verification (validation and events) and should be return in the `json` response with the following format:
   * ```json
   * {
   *    "key": "<webhookCode>"
   * }
   * ```
   */
  webhookCode: string | null = null;

  vivaTotken: string | null = null;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.init();
  }

  /** Credentials verification, `throw` error if credentials is not gived ***(required for API calls)*** */
  private async init(): Promise<void> {
    if (
      !this.apikey ||
      !this.merchantId ||
      !this.clientId ||
      !this.clientSecret
    )
      throw new Error('Credentials not provided');

    this.vivaTotken = (await this.getVivaToken()).data || null;
    this.webhookCode = (await this.getVivaWebhookCode()).data || null;

    if (!this.vivaTotken || !this.webhookCode)
      throw new Error('Credentials failed');
  }

  /**
   * Return the VivaWallet API Auth2.0 code from Credentials (needed for API Bearer calls)
   * or `null` on request failed
   *
   * @param general If `true`, apikey and merchantId will be used instead of clientId and clientSecret
   */
  async getVivaToken(basic = false): MethodReturn<string | null, 'tokenerror'> {
    if (!this.clientId || !this.clientSecret) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

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
                basic
                  ? this.merchantId + ':' + this.apikey
                  : this.clientId + ':' + this.clientSecret
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

  getVivaBasicToken(): string {
    return Buffer.from(this.merchantId + ':' + this.apikey).toString('base64');
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
          Authorization: 'Basic ' + this.getVivaBasicToken(),
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

export default VivaAuth;
