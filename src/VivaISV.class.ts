import IsvConnectedAccounts from './isv/IsvConnectedAccounts.class';
import IsvPayments from './isv/IsvPayments.class';
import IsvPos from './isv/IsvPos.class';
import IsvWebhook from './isv/IsvWebhook.class';
import { MethodReturn } from './types/Methods.types';
import { VivawalletISVInit } from './types/Vivawallet.types';
import { VivaAuthISV } from './vivabases/VivaAuth.class';

export class VivaISV extends VivaAuthISV {
  connectedAccounts: IsvConnectedAccounts;
  payments: IsvPayments;
  pos: IsvPos;
  webhook: IsvWebhook;
  webhooks: IsvWebhook;

  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.connectedAccounts = new IsvConnectedAccounts(datas);
    this.payments = new IsvPayments(datas);
    this.pos = new IsvPos(datas);
    this.webhook = new IsvWebhook(datas);
    this.webhooks = this.webhook;
  }

  /* ------------------------- DEPRECATED METHODS ------------------------- */

  /**
   * Return the code needed for Viva webhooks returns or `null` on request failed.
   *
   * @deprecated Use `webhook.retrieveWebhookKey()` instead.
   */
  async getVivaWebhookCode(): MethodReturn<string | null, 'webhookerror'> {
    const webhookKey = await this.webhook.retrieveWebhookKey();

    if (!webhookKey.success) {
      return {
        success: false,
        message: webhookKey.message,
        code: 'webhookerror',
        data: null,
      };
    }

    if (!webhookKey.data?.key) {
      return {
        success: false,
        message: 'Failed to retrieve webhook key',
        code: 'webhookerror',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Webhook key retrieved successfully',
      data: webhookKey.data.key,
    };
  }
}
