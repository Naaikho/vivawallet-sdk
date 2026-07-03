import { MethodReturn } from '../types/Methods.types';
import {
  VivaCancelPartialAuthorizationOptions,
  VivaCancelRebateFastRefundOptions,
  VivaCreateCardTokenOptions,
  VivaCreateCardTokenReturn,
  VivaFastRefundOptions,
  VivaIncrementalPreauthOptions,
  VivaLegacyTransactionsQuery,
  VivaLegacyTransactionsReturn,
  VivaMotoChargeOptions,
  VivaOctPayoutOptions,
  VivaRebateOptions,
  VivaTransaction,
  VivaTransactionCancelOptions,
  VivaTransactionDatas,
  VivaTransactionIdReturn,
  VivaTransactionReturn,
} from '../types/VivaTransactions.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDefinedDatas } from '../utils/functions';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaTransactions extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Return the transaction if exist, or `null` if error/not exist */
  async getTransactionById(
    transactionId: string
  ): MethodReturn<VivaTransaction | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.get<VivaTransaction>(
        this.endpoints.transaction.get.url.replace(
          '{transactionId}',
          transactionId
        ),
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'Vivawallet returned no transaction data',
            response.data
          );
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
      if (this.errorLogs)
        console.error('VivaTransactions.getTransactionById', e);
      return {
        success: false,
        message: 'Failed to get transaction by ID',
        code: 'error',
        data: null,
      };
    }
  }

  /** Obtain the card token associated with the card used for the specific transaction */
  async createCardToken(
    options: VivaCreateCardTokenOptions
  ): MethodReturn<VivaCreateCardTokenReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaCreateCardTokenReturn>(
        this.endpoints.transaction.cardToken.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.createCardToken', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no card token data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Card token created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.createCardToken', e);
      return {
        success: false,
        message: 'Failed to create card token',
        code: 'error',
        data: null,
      };
    }
  }

  /** Increase the amount of an existing pre-authorized transaction */
  async increasePreauth(
    transactionId: string,
    options: VivaIncrementalPreauthOptions
  ): MethodReturn<VivaTransactionIdReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.transaction.increasePreauth.url.replace(
        '{transactionId}',
        encodeURIComponent(transactionId)
      );

      const response = await useAxios.post<VivaTransactionIdReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.increasePreauth', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no incremental preauth data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Incremental preauth created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.increasePreauth', e);
      return {
        success: false,
        message: 'Failed to create incremental preauth',
        code: 'error',
        data: null,
      };
    }
  }

  /** Create transaction by transactionId */
  async createTransaction(
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
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'Vivawallet returned no created transaction data',
            response.data
          );
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
      if (this.errorLogs)
        console.error('VivaTransactions.createTransaction', e);
      return {
        success: false,
        message: 'Failed to create transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Make a MOTO card charge */
  async makeMotoCardCharge(
    options: VivaMotoChargeOptions
  ): MethodReturn<VivaTransactionReturn | null, 'nodatas'> {
    try {
      const response = await useAxios.post<VivaTransactionReturn>(
        this.endpoints.transaction.motoCharge.url,
        options,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.makeMotoCardCharge', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no MOTO card charge data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'MOTO card charge created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaTransactions.makeMotoCardCharge', e);
      return {
        success: false,
        message: 'Failed to create MOTO card charge',
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
      const queries = querifyDefinedDatas(refundOptions);

      const response = await useAxios.delete<VivaTransactionReturn>(
        this.endpoints.transaction.cancel.url.replace(
          '{transactionId}',
          transactionId
        ) +
          '?' +
          queries,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
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
        console.error('VivaTransactions.cancelTransaction', e);
      return {
        success: false,
        message: 'Failed to cancel transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Cancel a Partial Authorization transaction */
  async cancelPartialAuthorization(
    transactionId: string,
    options: VivaCancelPartialAuthorizationOptions
  ): MethodReturn<null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(options);
      const url =
        this.endpoints.transaction.cancelPartialAuthorization.url.replace(
          '{transactionId}',
          encodeURIComponent(transactionId)
        ) + (queries ? '?' + queries : '');

      const response = await useAxios.delete(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (response.status !== 200 && !response.data) {
        if (this.errorLogs)
          console.error(
            'VivaTransactions.cancelPartialAuthorization',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no partial authorization cancel data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Partial authorization canceled successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaTransactions.cancelPartialAuthorization', e);
      return {
        success: false,
        message: 'Failed to cancel partial authorization',
        code: 'error',
        data: null,
      };
    }
  }

  /** OCT & Pay Out */
  async octAndPayout(
    transactionId: string,
    options: VivaOctPayoutOptions
  ): MethodReturn<VivaTransactionReturn | null, 'nodatas'> {
    try {
      const queries = querifyDefinedDatas(options);
      const url =
        this.endpoints.transaction.octPayout.url.replace(
          '{transactionId}',
          encodeURIComponent(transactionId)
        ) + (queries ? '?' + queries : '');

      const response = await useAxios.delete<VivaTransactionReturn>(url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.octAndPayout', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no OCT / Pay Out data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'OCT / Pay Out created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.octAndPayout', e);
      return {
        success: false,
        message: 'Failed to create OCT / Pay Out',
        code: 'error',
        data: null,
      };
    }
  }

  /** Perform rebates tied to an initial transactionId */
  async rebate(
    transactionId: string,
    options: VivaRebateOptions
  ): MethodReturn<VivaTransactionIdReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.transaction.rebate.url.replace(
        '{transactionId}',
        encodeURIComponent(transactionId)
      );

      const response = await useAxios.post<VivaTransactionIdReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.rebate', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no rebate data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Rebate created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.rebate', e);
      return {
        success: false,
        message: 'Failed to create rebate',
        code: 'error',
        data: null,
      };
    }
  }

  /** Perform fast refunds tied to an initial transactionId */
  async fastRefund(
    transactionId: string,
    options: VivaFastRefundOptions
  ): MethodReturn<VivaTransactionIdReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.transaction.fastRefund.url.replace(
        '{transactionId}',
        encodeURIComponent(transactionId)
      );

      const response = await useAxios.post<VivaTransactionIdReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaTransactions.fastRefund', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no fast refund data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Fast refund created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaTransactions.fastRefund', e);
      return {
        success: false,
        message: 'Failed to create fast refund',
        code: 'error',
        data: null,
      };
    }
  }

  /** Cancel a Rebate or Fast Refund transaction */
  async cancelRebateOrFastRefund(
    transactionId: string,
    options: VivaCancelRebateFastRefundOptions
  ): MethodReturn<null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(options);
      const url =
        this.endpoints.transaction.cancelRebateFastRefund.url.replace(
          '{transactionId}',
          encodeURIComponent(transactionId)
        ) + (queries ? '?' + queries : '');

      const response = await useAxios.delete(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (response.status !== 200 && !response.data) {
        if (this.errorLogs)
          console.error(
            'VivaTransactions.cancelRebateOrFastRefund',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no rebate / fast refund cancel data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Rebate / Fast Refund canceled successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaTransactions.cancelRebateOrFastRefund', e);
      return {
        success: false,
        message: 'Failed to cancel rebate / fast refund',
        code: 'error',
        data: null,
      };
    }
  }

  /* ---------------------- LEGACY ---------------------- */

  /** Enables you to obtain detailed information about a past payment from its transaction ID */
  async getLegacyTransactions(
    transactionId?: string,
    query: VivaLegacyTransactionsQuery = {}
  ): MethodReturn<VivaLegacyTransactionsReturn | null, 'nodatas'> {
    try {
      const queries = querifyDefinedDatas(query);
      const transactionUrl =
        this.endpoints.transaction.legacyGet.url.replace(
          '{transactionId}',
          transactionId ? encodeURIComponent(transactionId) : ''
        ) + (queries ? '?' + queries : '');

      const response = await useAxios.get<VivaLegacyTransactionsReturn>(
        transactionUrl,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaTransactions.getLegacyTransactions',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy transactions retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaTransactions.getLegacyTransactions', e);
      return {
        success: false,
        message: 'Failed to retrieve legacy transactions',
        code: 'error',
        data: null,
      };
    }
  }

  /* ---------------------- DEPRECATED ---------------------- */

  /** @deprecated Use `createTransaction()` instead. */
  async makeTransaction(
    options: VivaTransactionDatas
  ): MethodReturn<VivaTransactionReturn | null, 'invaliddatas' | 'nodatas'> {
    return this.createTransaction(options);
  }
}

export default VivaTransactions;
