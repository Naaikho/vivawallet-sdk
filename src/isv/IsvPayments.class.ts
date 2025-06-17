import { ISVPaymentsOptions } from '../types/isv.types/ISVPayments.types';
import {
  ISVDevicesOptions,
  ISVDevicesReturn,
  ISVInitSaleRequest,
} from '../types/isv.types/ISVPos.types';
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
        this.endpoints.isv.payments.create + '?merchantId=' + merchantId,
        orderData,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!response.data) {
        console.error('Viva Order Error', response.data);
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
}
