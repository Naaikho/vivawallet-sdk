import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaSkull from './VivaSkull.class';
import VivaEndpoints from './VivaEndpoints.class';
import { requests } from '../utils/functions';

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
  }

  /** Credentials verification, `throw` error if credentials is not gived ***(required for API calls)*** */
  async init(): Promise<void> {
    if (
      !this.apikey ||
      !this.merchantId ||
      !this.smartClientId ||
      !this.smartClientSecret
    )
      throw new Error('Credentials not provided');

    this.vivaTotken = await this.getVivaToken();
    this.webhookCode = await this.getVivaWebhookCode();

    if (!this.vivaTotken || !this.webhookCode)
      throw new Error('Credentials failed');
  }

  /** Return the VivaWallet API Auth2.0 code from Credentials (needed for API Bearer calls) or `null` on request failed */
  async getVivaToken(): Promise<string | null> {
    if (!this.smartClientId || !this.smartClientSecret)
      throw new Error('Init not called');

    try {
      const r = await requests(
        this.endpoints.auth.url,
        'POST',
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              this.smartClientId + ':' + this.smartClientSecret
            ).toString('base64'),
        },
        {
          grant_type: 'client_credentials',
        }
      );
      if (r.data && r.data.access_token) return r.data.access_token;
    } catch (e) {
      console.log('Viva token', e);
    }
    return null;
  }

  getVivaBasicToken(): string {
    return Buffer.from(this.merchantId + ':' + this.apikey).toString('base64');
  }

  /** Return the code needed for Viva webhooks returns or `null` on request failed */
  async getVivaWebhookCode(): Promise<string | null> {
    if (!this.merchantId || !this.apikey) throw new Error('Init not called');
    try {
      const r = await requests(this.endpoints.webhookAuth.url, 'GET', {
        Authorization: 'Basic ' + this.getVivaBasicToken(),
      });
      if (r.data && r.data.Key) return r.data.Key;
    } catch (e) {
      console.log('Webhook code', e);
    }
    return null;
  }
}

export default VivaAuth;
