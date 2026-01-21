import { ISVCreateWebhookOptions, ISVGetWebhookKeyReturn } from "../types/isv.types/ISVWebhook.types";
import { MethodReturn } from "../types/Methods.types";
import { VivawalletISVInit } from "../types/Vivawallet.types";
import { useAxios } from "../utils/axiosInstance.ts";
import { VivaAuthISV } from "../vivabases/VivaAuth.class";


export default class IsvWebhook extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

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