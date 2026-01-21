import {
  MPOrdersOptions,
  MPOrdersReturn,
} from '../types/marketplace.types/MPMarketOrders.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';
import VivaPayments from '../vivawallet/VivaPayments.class';

class MarketPlacePayments extends VivaAuth {
  cancelOrder: VivaPayments['cancelOrder'];

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.cancelOrder = new VivaPayments(datas).cancelOrder;
  }

  /** Make new VivaWallet Marketplace order, return `orderCode` */
  async createOrder(
    orderData: MPOrdersOptions
  ): MethodReturn<MPOrdersReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.post<MPOrdersReturn>(
        this.endpoints.marketplace.payment.create.url,
        orderData,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data || !r.data.orderCode) {
        if (this.errorLogs) console.error('Vivawallet returned no created order data', r.data);
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
        data: r.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('MarketPlacePayments.createOrder', e);
      return {
        success: false,
        message: 'Failed to create order',
        code: 'error',
        data: null,
      };
    }
  }
}

export default MarketPlacePayments;
