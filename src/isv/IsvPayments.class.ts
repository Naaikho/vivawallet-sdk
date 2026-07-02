import {
  ISVCancelOrderOptions,
  ISVCancelOrderReturn,
  ISVGetOrderOptions,
  ISVGetOrderReturn,
  ISVPaymentsOptions,
} from '../types/isv.types/ISVPayments.types';
import { MethodReturn } from '../types/Methods.types';
import { VivaPaymentOrderReturn } from '../types/VivaOrder.types';
import { VivawalletISVInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuthISV } from '../vivabases/VivaAuth.class';

export default class IsvPayments extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    merchantId: string,
    orderData: ISVPaymentsOptions
  ): MethodReturn<VivaPaymentOrderReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaPaymentOrderReturn>(
        this.endpoints.isv.payments.create.url + '?merchantId=' + merchantId,
        orderData,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaWallet returned no create order data',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no create order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order created successfully',
        data: {
          orderCode: response.data.orderCode,
        },
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPayments.createOrder', e);
      return {
        success: false,
        message: 'Failed to create order',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve order. */
  async getOrder(
    options: ISVGetOrderOptions
  ): MethodReturn<ISVGetOrderReturn | null, 'nodatas'> {
    if (!this.hasResellerCredentials()) {
      return {
        success: false,
        message: 'ISV Basic Auth credentials not provided',
        code: 'initerror',
        data: null,
      };
    }

    if (!options.targetMerchantId) {
      return {
        success: false,
        message: 'Target merchant ID not provided',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const response = await useAxios.get<ISVGetOrderReturn>(
        this.endpoints.isv.payments.get.url.replace(
          '{orderCode}',
          encodeURIComponent(options.orderCode.toString())
        ),
        {
          headers: {
            Authorization: this.getVivaResellerBasicAuth(
              options.targetMerchantId
            ),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWallet returned no order data', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order retrieved successfully',
        data: response.data,
      };
    } catch (e: any) {
      if (this.errorLogs) console.error('IsvPayments.getOrder', e);

      if (e.response?.status === 404) {
        return {
          success: false,
          message: 'Order not found',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: false,
        message: 'Failed to retrieve order',
        code: 'error',
        data: null,
      };
    }
  }

  /** Allows you to cancel an open payment order. */
  async cancelOrder(
    options: ISVCancelOrderOptions
  ): MethodReturn<ISVCancelOrderReturn | null, 'nodatas'> {
    if (!this.hasResellerCredentials()) {
      return {
        success: false,
        message: 'ISV Basic Auth credentials not provided',
        code: 'initerror',
        data: null,
      };
    }

    if (!options.targetMerchantId) {
      return {
        success: false,
        message: 'Target merchant ID not provided',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const response = await useAxios.delete<ISVCancelOrderReturn>(
        this.endpoints.isv.payments.cancel.url.replace(
          '{orderCode}',
          encodeURIComponent(options.orderCode.toString())
        ),
        {
          headers: {
            Authorization: this.getVivaResellerBasicAuth(
              options.targetMerchantId
            ),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaWallet returned no canceled order data',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no canceled order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order canceled successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPayments.cancelOrder', e);
      return {
        success: false,
        message: 'Failed to cancel order',
        code: 'error',
        data: null,
      };
    }
  }
}
