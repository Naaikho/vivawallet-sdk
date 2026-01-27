import { ISVPaymentsOptions } from '../types/isv.types/ISVPayments.types';
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
      const vivaToken = (await this.getVivaToken()).data;

      const response = await useAxios.post<VivaPaymentOrderReturn>(
        this.endpoints.isv.payments.create.url + '?merchantId=' + merchantId,
        orderData,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs) console.error('VivaWallet returned no create order data', response.data);
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

  // cant be implemented without allow isv auth class to define MerchantID and API Key

  // /** Allows you to **cancel** an open isv payment order. */
  // async cancelOrder(
  //   options: ISVCancelOrderOptions
  // ): MethodReturn<ISVCancelOrderReturn> {
  //   try {
  //     const vivaToken = (await this.getVivaToken()).data;

  //     const response = await useAxios.delete<ISVCancelOrderReturn>(
  //       this.endpoints.isv.payments.cancel.url.replace('{orderCode}', options.orderCode.toString()),
  //       {
  //         headers: {
  //           Authorization: 'Basic ' + vivaToken,
  //         },
  //       }
  //     );

  //     return {
  //       success: true,
  //       message: 'Order cancelled successfully',
  //       data: response.data,
  //     };
  //   } catch (e) {
  //     if (this.errorLogs) console.error('IsvPayments.cancelOrder', e);
  //     return {
  //       success: false,
  //       message: 'Failed to cancel order',
  //       code: 'error',
  //       data: null,
  //     };
  //   }
  // }
}
