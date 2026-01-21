import { MethodReturn } from '../types/Methods.types';
import {
  VivaTransaction,
  VivaTransactionCancelOptions,
  VivaTransactionDatas,
  VivaTransactionReturn,
} from '../types/VivaTransactions.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDatas } from '../utils/functions';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaTransactions extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ TRANSACTION ------------------ */

  /** Return the transaction if exist, or `null` if error/not exist */
  async getTransactionById(
    transactionId: string
  ): MethodReturn<VivaTransaction | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const response = await useAxios.get<VivaTransaction>(
        this.endpoints.transaction.get.url.replace(
          '{transactionId}',
          transactionId
        ),
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs) console.error('Vivawallet returned no transaction data', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Transaction retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.getTransactionById', e);
      return {
        success: false,
        message: 'Failed to get transaction by ID',
        code: 'error',
        data: null,
      };
    }
  }

  /** Make transaction by transactionId */
  async makeTransaction(
    options: VivaTransactionDatas
  ): MethodReturn<VivaTransactionReturn | null, 'invaliddatas' | 'nodatas'> {
    try {
      const transactionUrl = this.endpoints.transaction.create.url.replace(
        '{transactionId}',
        options.id
      );

      const response = await useAxios.post<VivaTransactionReturn>(
        transactionUrl,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + this.getVivaBasicToken(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs) console.error('Vivawallet returned no created transaction data', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no created transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Transaction created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.makeTransaction', e);
      return {
        success: false,
        message: 'Failed to create transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Allow cancel transaction (refund) */
  async cancelTransaction(
    transactionId: string,
    refundOptions: VivaTransactionCancelOptions
  ): MethodReturn<VivaTransactionReturn | null, 'nodatas'> {
    try {
      const vivaToken = this.getVivaBasicToken();
      const queries = querifyDatas(refundOptions);

      const response = await useAxios.delete<VivaTransactionReturn>(
        this.endpoints.transaction.cancel.url.replace(
          '{transactionId}',
          transactionId
        ) +
        '?' +
        queries,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs) console.error('Vivawallet returned no canceled transaction data', response.data);
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
      if (this.errorLogs) console.error('VivaTransactions.cancelTransaction', e);
      return {
        success: false,
        message: 'Failed to cancel transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** ------------------------------------------------- */
}

export default VivaTransactions;
