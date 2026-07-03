import {
  MPCancelTransactionReturn,
  MPTransactionCancelOptions,
} from '../types/marketplace.types/MPTransactions.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDatas } from '../utils/functions.helpers';
import { VivaAuth } from '../vivabases/VivaAuth.class';
import VivaTransactions from '../vivawallet/VivaTransactions.class';

class MarketPlaceTransactions extends VivaAuth {
  getTransactionById: VivaTransactions['getTransactionById'];
  createTransaction: VivaTransactions['createTransaction'];
  makeTransaction: VivaTransactions['makeTransaction'];

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    const transactions = new VivaTransactions(datas);
    this.getTransactionById = transactions.getTransactionById;
    this.createTransaction = transactions.createTransaction;
    this.makeTransaction = transactions.makeTransaction;
  }

  /** Allow cancel transaction (refund) */
  async cancelTransaction(
    transactionId: string,
    refundOptions: MPTransactionCancelOptions
  ): MethodReturn<MPCancelTransactionReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDatas(refundOptions);

      const response = await useAxios.delete<MPCancelTransactionReturn>(
        this.endpoints.marketplace.transaction.cancel.url.replace(
          '{transactionId}',
          transactionId
        ) +
          '?' +
          queries,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'Vivawallet returned no canceled transaction data',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no canceled transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Transaction canceled successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('MarketPlaceTransactions.cancelTransaction', e);
      return {
        success: false,
        message: 'Failed to cancel transaction',
        code: 'error',
        data: null,
      };
    }
  }
}

export default MarketPlaceTransactions;
