import {
  VivaTransaction,
  VivaTransactionDatas,
  VivaTransactionCancelOptions,
  VivaTransactionReturn,
} from '../types/VivaTransactions.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaAuth from '../vivabases/VivaAuth.class';
import { useAxios } from '../utils/axiosInstance.ts';
import { MethodReturn } from '../types/Methods.types';

class VivaTransactions extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ TRANSACTION ------------------ */

  /** Return the transaction if exist, or `null` if error/not exist */
  async getTransactionById(
    transactionId: string
  ): MethodReturn<VivaTransaction | null, 'nodatas'> {
    if (!this.vivaTotken) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const response = await useAxios.get<VivaTransaction>(
        this.endpoints.transaction.get.url.replace(
          '{transactionId}',
          transactionId
        ),
        {
          headers: {
            Authorization: 'Bearer ' + this.vivaTotken,
          },
        }
      );

      if (!response.data) {
        return {
          success: false,
          message: 'Transaction not found',
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
      console.error('Viva Transaction Error', e);
      return {
        success: false,
        message: 'Failed to get transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Make transaction by transactionId */
  async makeTransaction(
    options: VivaTransactionDatas
  ): MethodReturn<VivaTransactionReturn | null, 'invaliddatas' | 'nodatas'> {
    if (!this.merchantId || !this.apikey) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

    if (!options.amount || !options.id) {
      return {
        success: false,
        message: 'Amount and ID are required',
        code: 'invaliddatas',
        data: null,
      };
    }

    try {
      const transactionUrl = this.endpoints.transaction.create.url.replace(
        '{transaction_id}',
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
        return {
          success: false,
          message: 'Transaction creation failed',
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
      console.error('Viva Transaction Error', e);
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
    if (!this.vivaTotken) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
        data: null,
      };
    }

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
      const response = await useAxios.post<VivaTransactionReturn>(
        this.endpoints.transaction.cancel.url.replace(
          '{transactionId}',
          transactionId
        ) +
          '?' +
          queries,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + this.vivaTotken,
          },
        }
      );

      if (!response.data) {
        return {
          success: false,
          message: 'Transaction refund failed',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Transaction refunded successfully',
        data: response.data,
      };
    } catch (e) {
      console.error('Viva Refund Error', e);
      return {
        success: false,
        message: 'Failed to refund transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** ------------------------------------------------- */
}

export default VivaTransactions;
