import { ISVCreateWebhookOptions, ISVGetWebhookKeyReturn } from "../types/isv.types/ISVWebhook.types";
import { MethodReturn } from "../types/Methods.types";
import { VivawalletISVInit } from "../types/Vivawallet.types";
import { useAxios } from "../utils/axiosInstance.ts";
import { VivaAuthISV } from "../vivabases/VivaAuth.class";


export default class IsvWebhook extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }
  /**
   * Generate a webhook verification key to be used in the response of your webhook endpoints for verification purposes.
   */
  async getWebhookKey(): MethodReturn<ISVGetWebhookKeyReturn | null> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.get<ISVGetWebhookKeyReturn>(
        this.endpoints.isv.webhook.getKey.url,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
        console.error('VivaWallet returned no webhook key data', r.data);
        return {
          success: false,
          message: 'VivaWallet returned no webhook key data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Webhook key fetched successfully',
        data: r.data,
      };
    } catch (e) {
      console.error('IsvWebhook.getWebhookKey', e);
      return {
        success: false,
        message: 'Failed to get webhook key',
        code: 'error',
        data: null,
      };
    }
  }

  /**
   * Provide your webhook endpoint URL to set up webhooks for your [desired events](https://developer.viva.com/webhooks-for-payments/#webhook-events):
   * 
   * - **1802** - Transaction POS Ecr Session Created
   * - **1803** - Transaction POS Ecr Session Failed
   * - **1796** - Transaction Payment Created
   * - **1797** - Transaction Reversal Created
   * - **1798** - Transaction Failed
   * - **1799** - Transaction Price Calculated
   * - **8193** - Account Connected
   * - **8194** - Account Verification Status Changed
   */
  async create(options: ISVCreateWebhookOptions): MethodReturn<null> {
    const vivaToken = (await this.getVivaToken()).data;

    try {
      await useAxios.post<null>(
        this.endpoints.isv.webhook.create.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Webhook created successfully',
        data: null,
      };
    } catch (e) {
      console.error('IsvWebhook.create', e);
      return {
        success: false,
        message: 'Failed to create webhook',
        code: 'error',
        data: null,
      };
    }
  }
}