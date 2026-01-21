import { MethodReturn } from '../types/Methods.types';
import {
  VivaPaymentOrderOptions,
  VivaPaymentOrderReturn,
} from '../types/VivaOrder.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaPayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** -------------------- PAYMENT -------------------- */

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    orderData: VivaPaymentOrderOptions
  ): MethodReturn<VivaPaymentOrderReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

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
        if (this.errorLogs) console.error('Vivawallet returned no created order data', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no created order data',
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
      if (this.errorLogs) console.error('VivaPayments.createOrder', e);
      return {
        success: false,
        message: 'Failed to create VivaWallet order',
        code: 'error',
        data: null,
      };
    }
  }

  /** Allow cancel operation on non-validate orders, return `true` if the order canceled successfully */
  async cancelOrder(
    orderCode: string
  ): MethodReturn<void, 'alreadycanceled' | 'nodatas'> {
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
        if (this.errorLogs) console.error('Vivawallet returned no canceled order data', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no canceled order data',
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
      if (this.errorLogs) console.error('VivaPayments.cancelOrder', e);

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
