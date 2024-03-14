import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { VivaMarketOrdersOptions } from '../types/marketplace.types/VivaMarketOrders.types';
import {
  CreateAccountDatas,
  CreateAccountResponse,
} from '../types/marketplace.types/VivaSellers.types';
import {
  VivaTransfersDatas,
  VivaTransfersResponse,
} from '../types/marketplace.types/VivaTransfers.types';
import { requests } from '../utils/functions';
import Vivawallet from './Vivawallet.class';

export class Marketplace extends Vivawallet {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Create new Seller Account */
  async createAccount(
    datas: CreateAccountDatas
  ): Promise<CreateAccountResponse | null> {
    if (!this.vivaTotken) throw new Error('Init not called');

    try {
      const r = await requests<CreateAccountDatas, CreateAccountResponse>(
        this.endpoints.payment.create.url,
        this.endpoints.payment.create.method,
        {
          Authorization: 'Bearer ' + this.vivaTotken,
        },
        datas
      );
      if (r.data) return r.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  /** Make new VivaWallet Marketplace order, return `orderCode` */
  async createMarketplaceOrder(
    orderData: VivaMarketOrdersOptions
  ): Promise<number | null> {
    if (!this.vivaTotken) throw new Error('Init not called');

    try {
      const r = await requests(
        this.endpoints.payment.create.url,
        this.endpoints.payment.create.method,
        {
          Authorization: 'Bearer ' + this.vivaTotken,
        },
        orderData
      );
      if (r.data && r.data.orderCode) return r.data.orderCode;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  /** Send funds from marketplace to seller account/brank */
  async sendFunds(
    datas: VivaTransfersDatas
  ): Promise<VivaTransfersResponse | null> {
    if (!this.vivaTotken) throw new Error('Init not called');

    try {
      const r = await requests<VivaTransfersDatas, VivaTransfersResponse>(
        this.endpoints.marketplace.transfers.send.url,
        this.endpoints.marketplace.transfers.send.method,
        {
          Authorization: 'Bearer ' + this.vivaTotken,
        },
        datas
      );
      if (r.data) return r.data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  // async cancelMarketTransaction(): Promise<void> {}
}
