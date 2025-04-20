import {
  VivaTransaction,
  VivaTransactionDatas,
  VivaTransactionRefundOptions,
  VivaTransactionReturn,
} from '../types/VivaTransactions.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaAuth from '../vivabases/VivaAuth.class';

class VivaTransactions extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

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

  /** Make transaction by transactionId */
  async makeTransaction(
    options: VivaTransactionDatas
  ): Promise<VivaTransactionReturn | null> {
    if (!this.merchantId || !this.apikey) throw new Error('Init not called');
    if (!options.amount || !options.id) return null;
    try {
      const transactionUrl = this.endpoints.transaction.create.url.replace(
        '{transaction_id}',
        options.id
      );
      const r = await requests<VivaTransactionDatas, VivaTransactionReturn>(
        transactionUrl,
        this.endpoints.transaction.create.method,
        {
          Authorization: 'Bearer ' + this.getVivaBasicToken(),
        },
        options
      );
      // console.log("R", r);
      if (r.data && r.data.Success && r.data.StatusId === 'F') return r.data;
    } catch (e: any) {
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
}

export default VivaTransactions;
