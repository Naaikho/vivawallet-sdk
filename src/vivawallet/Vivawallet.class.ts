import {
  VivaSmartCheckoutOptions,
  VivawalletAPIInit,
} from '../types/Vivawallet.types';
import VivaAuth from '../vivabases/VivaAuth.class';
import VivaSkull from '../vivabases/VivaSkull.class';
import { SourceCodeDatas } from '../types/VivaSource.types';
import { requests } from '../utils/functions';
import {
  VivaTransaction,
  VivaTransactionRefundOptions,
} from '../types/VivaTransactions.types';
import { VivaPaymentOrderOptions } from '../types/VivaOrder.types';
import VivaEndpoints from '../vivabases/VivaEndpoints.class';

class Vivawallet extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ SOURCE CODE ------------------ */

  /** Set the Viva Wallet payment source (needed for Transaction integrations), return `true` if setup is OK, `false` if the payment already exist or on error */
  async setVivawalletSource(data: SourceCodeDatas): Promise<boolean> {
    if (!this.merchantId || !this.apikey) throw new Error('Init not called');
    if (!this.sourceCode && !data.sourceCode)
      throw new Error('Source code is required');
    if (!data.sourceCode && this.sourceCode) data.sourceCode = this.sourceCode;
    try {
      await requests(
        this.endpoints.source.url,
        this.endpoints.source.method,
        {
          Authorization: 'Basic ' + this.getVivaBasicToken(),
        },
        data
      );
      return true;
    } catch (e: any) {
      // if the source already exist
      if (e.status === 409) return true;
    }
    return false;
  }

  /** ------------------------------------------------- */

  /** ------------------ TRANSACTION ------------------ */

  /** Return the transaction if exist, or `null` if error/not exist */
  async getTransactionById(
    transactionId: string
  ): Promise<VivaTransaction | null> {
    if (!this.vivaTotken) throw new Error('Init not called');
    try {
      const r = await requests(
        this.endpoints.transaction.get.url.replace(
          '{transactionId}',
          transactionId
        ),
        this.endpoints.transaction.get.method,
        {
          Authorization: 'Bearer ' + this.vivaTotken,
        }
      );
      if (r.data) return r.data as VivaTransaction;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  /** Allow refund transaction, return `true` if the transaction be refund succefuly */
  async refundTransaction(
    transactionId: string,
    refundOptions: VivaTransactionRefundOptions
  ): Promise<boolean> {
    if (!this.vivaTotken) throw new Error('Init not called');

    const queries = Object.keys(refundOptions)
      .map((key) => {
        const k: keyof typeof refundOptions = key as keyof typeof refundOptions;
        return (
          key +
          '=' +
          encodeURIComponent(refundOptions[k] as string | number | boolean)
        );
      })
      .join('&');

    try {
      const r = await requests(
        this.endpoints.transaction.cancel.url.replace(
          '{transactionId}',
          transactionId
        ) +
          '?' +
          queries,
        this.endpoints.transaction.cancel.method,
        {
          Authorization: 'Bearer ' + this.vivaTotken,
        }
      );
      if (r.data && r.data.Success) return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  /** ------------------------------------------------- */

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

/** Return the smart checkout url with the `orderCode` */
export function getSmartCheckout(options: VivaSmartCheckoutOptions): string {
  const endpoints = options.dev
    ? VivaEndpoints.demoEndpoints
    : VivaEndpoints.prodEndpoints;
  let res = endpoints.checkout.url.replace('{orderCode}', options.orderCode);
  if (options.color) res += '&color=' + options.color;
  if (options.paymentMethod) res += '&paymentMethod=' + options.paymentMethod;
  return res;
}

export default Vivawallet;
