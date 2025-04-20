import { VivaPaymentOrderOptions } from '../types/VivaOrder.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaAuth from '../vivabases/VivaAuth.class';

class VivaPayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** -------------------- PAYMENT -------------------- */

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    orderData: VivaPaymentOrderOptions
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

  /** Allow cancel operation on non-validate orders, return `true` if the order canceled succefuly */
  async cancelOrder(orderCode: string | null): Promise<boolean> {
    if (!this.merchantId || !this.apikey) throw new Error('Init not called');
    if (!orderCode) return false;
    try {
      const cancelUrl = this.endpoints.payment.cancel.url.replace(
        '{orderCode}',
        orderCode
      );
      const r = await requests(
        cancelUrl,
        this.endpoints.payment.cancel.method,
        {
          Authorization: 'Bearer ' + this.getVivaBasicToken(),
        }
      );
      // console.log("R", r);
      if (r.data && (r.data.Success || r.data.ErrorCode === 404)) return true;
    } catch (e: any) {
      console.log(e);
      if (e.status === 404) return true;
    }
    return false;
  }

  /** ------------------------------------------------- */
}

export default VivaPayments;
