import {
  VivaPaymentOrderOptions,
  VivaPaymentOrderReturn,
} from '../types/VivaOrder.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { VivaAuth } from '../vivabases/VivaAuth.class';
import { useAxios } from '../utils/axiosInstance.ts';
import { MethodReturn } from '../types/Methods.types';

class VivaPayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** -------------------- PAYMENT -------------------- */

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    orderData: VivaPaymentOrderOptions
  ): MethodReturn<VivaPaymentOrderReturn | null, 'nodatas'> {
    const vivaToken = (await this.getVivaToken()).data;
    if (!vivaToken) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const response = await useAxios.post<VivaPaymentOrderReturn>(
        this.endpoints.payment.create.url,
        orderData,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!response.data) {
        return {
          success: false,
          message: 'Failed to create order',
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
      console.error('Viva Order Error', e);
      return {
        success: false,
        message: 'Failed to create order',
        code: 'error',
        data: null,
      };
    }
  }

  /** Allow cancel operation on non-validate orders, return `true` if the order canceled successfully */
  async cancelOrder(
    orderCode: string | null
  ): MethodReturn<void, 'alreadycanceled' | 'invalidordercode' | 'nodatas'> {
    if (!this.merchantId || !this.apikey) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    if (!orderCode) {
      return {
        success: false,
        message: 'Order code is required',
        code: 'invalidordercode',
        data: null,
      };
    }

    try {
      const cancelUrl = this.endpoints.payment.cancel.url.replace(
        '{orderCode}',
        orderCode
      );

      const response = await useAxios.delete(cancelUrl, {
        headers: {
          Authorization: 'Bearer ' + this.getVivaBasicToken(),
        },
      });

      if (!response.data) {
        return {
          success: false,
          message: 'Failed to cancel order',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order canceled successfully',
        data: null,
      };
    } catch (e: any) {
      console.error('Viva Cancel Order Error', e);

      if (e.response?.status === 404) {
        return {
          success: false,
          message: 'Order already canceled or not found',
          code: 'alreadycanceled',
          data: null,
        };
      }

      return {
        success: false,
        message: 'Failed to cancel order',
        code: 'error',
        data: null,
      };
    }
  }

  /** ------------------------------------------------- */
}

export default VivaPayments;
