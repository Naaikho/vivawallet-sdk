import { MethodReturn } from '../types/Methods.types';
import {
  VivaGetOrderReturn,
  VivaLegacyPaymentOrderOptions,
  VivaLegacyPaymentOrderReturn,
  VivaPaymentOrderOptions,
  VivaPaymentOrderReturn,
  VivaUpdateOrderOptions,
  VivaUpdateOrderReturn,
} from '../types/VivaOrder.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaPayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    orderData: VivaPaymentOrderOptions
  ): MethodReturn<VivaPaymentOrderReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaPaymentOrderReturn>(
        this.endpoints.payment.create.url,
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
            'Vivawallet returned no created order data',
            response.data
          );
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

  /** Retrieve the details of the requested order */
  async getOrder(
    orderCode: string | number
  ): MethodReturn<VivaGetOrderReturn | null, 'nodatas'> {
    try {
      const orderUrl = this.endpoints.payment.get.url.replace(
        '{orderCode}',
        encodeURIComponent(String(orderCode))
      );

      const response = await useAxios.get<VivaGetOrderReturn>(orderUrl, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPayments.getOrder', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPayments.getOrder', e);
      return {
        success: false,
        message: 'Failed to retrieve order',
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
        encodeURIComponent(orderCode)
      );

      const response = await useAxios.delete(cancelUrl, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'Vivawallet returned no canceled order data',
            response.data
          );
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

  /** Enables you to update certain information relating to a standing payment order */
  async updateOrder(
    orderCode: string | number,
    options: VivaUpdateOrderOptions
  ): MethodReturn<VivaUpdateOrderReturn | null, 'nodatas'> {
    try {
      const updateUrl = this.endpoints.payment.update.url.replace(
        '{orderCode}',
        encodeURIComponent(String(orderCode))
      );

      const response = await useAxios.patch<VivaUpdateOrderReturn>(
        updateUrl,
        options,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data && response.status !== 200) {
        if (this.errorLogs)
          console.error('VivaPayments.updateOrder', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no updated order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Order updated successfully',
        data: response.data || {},
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPayments.updateOrder', e);
      return {
        success: false,
        message: 'Failed to update order',
        code: 'error',
        data: null,
      };
    }
  }

  /* ---------------------- LEGACY ---------------------- */

  /** Create a legacy payment order. */
  async createLegacyOrder(
    orderData: VivaLegacyPaymentOrderOptions
  ): MethodReturn<VivaLegacyPaymentOrderReturn | null, 'nodatas'> {
    try {
      const response = await useAxios.post<VivaLegacyPaymentOrderReturn>(
        this.endpoints.payment.legacyCreate.url,
        orderData,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPayments.createLegacyOrder', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no legacy created order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy order created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPayments.createLegacyOrder', e);
      return {
        success: false,
        message: 'Failed to create legacy VivaWallet order',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaPayments;
