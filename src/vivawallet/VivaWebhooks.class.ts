import { MethodReturn } from '../types/Methods.types';
import {
  VivaWebhookDeleteSubscriptionReturn,
  VivaWebhookSubscriptionDatas,
  VivaWebhookSubscriptionOptions,
  VivaWebhookSubscriptionReturn,
} from '../types/VivaWebhooks.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaWebhooks extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Register to webhooks by adding a new subscription */
  async addSubscription(
    options: VivaWebhookSubscriptionOptions
  ): MethodReturn<VivaWebhookSubscriptionReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaWebhookSubscriptionReturn>(
        this.endpoints.webhooks.subscriptions.add.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWebhooks.addSubscription', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no webhook subscription data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Webhook subscription added successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWebhooks.addSubscription', e);
      return {
        success: false,
        message: 'Failed to add webhook subscription',
        code: 'error',
        data: null,
      };
    }
  }

  /** Update webhooks subscription */
  async updateSubscription(
    subscriptionId: string,
    options: VivaWebhookSubscriptionOptions
  ): MethodReturn<VivaWebhookSubscriptionReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.webhooks.subscriptions.update.url.replace(
        '{subscriptionId}',
        encodeURIComponent(subscriptionId)
      );

      const response = await useAxios.put<VivaWebhookSubscriptionReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWebhooks.updateSubscription', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no webhook subscription data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Webhook subscription updated successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWebhooks.updateSubscription', e);
      return {
        success: false,
        message: 'Failed to update webhook subscription',
        code: 'error',
        data: null,
      };
    }
  }

  /** Delete webhooks subscription */
  async deleteSubscription(
    subscriptionId: string
  ): MethodReturn<VivaWebhookDeleteSubscriptionReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.webhooks.subscriptions.delete.url.replace(
        '{subscriptionId}',
        encodeURIComponent(subscriptionId)
      );

      const response =
        await useAxios.delete<VivaWebhookDeleteSubscriptionReturn>(url, {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWebhooks.deleteSubscription', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no webhook subscription deletion data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Webhook subscription deleted successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWebhooks.deleteSubscription', e);
      return {
        success: false,
        message: 'Failed to delete webhook subscription',
        code: 'error',
        data: null,
      };
    }
  }

  /** List webhooks subscriptions */
  async listSubscriptions(): MethodReturn<
    VivaWebhookSubscriptionDatas[] | VivaWebhookSubscriptionDatas | null,
    'nodatas'
  > {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.get<
        VivaWebhookSubscriptionDatas[] | VivaWebhookSubscriptionDatas
      >(this.endpoints.webhooks.subscriptions.list.url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWebhooks.listSubscriptions', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no webhook subscriptions data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Webhook subscriptions listed successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWebhooks.listSubscriptions', e);
      return {
        success: false,
        message: 'Failed to list webhook subscriptions',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaWebhooks;
