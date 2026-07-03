import {
  ISVCancelTransactionOptions,
  ISVCapturePreAuthPaymentOptions,
  ISVCheckoutTransactionReturn,
  ISVCreateRecurringTransactionOptions,
  ISVDataServicesPaginationQuery,
  ISVDataServicesTransactionsSearchOptions,
  ISVDataServicesTransactionsSearchReturn,
  ISVIncrementalPreauthOptions,
  ISVLegacyTransactionsReturn,
  ISVMotoCardChargeOptions,
  ISVMotoCardChargeReturn,
  ISVPayOutOldOptions,
  ISVResellerSourceTransactionReturn,
  ISVRetrieveLegacyTransactionOptions,
  ISVRetrieveTransactionByIdOptions,
  ISVRetrieveTransactionsByClearanceDateOptions,
  ISVRetrieveTransactionsByDateOptions,
  ISVRetrieveTransactionsByOrderCodeOptions,
  ISVRetrieveTransactionsByResellerSourceCodeOptions,
  ISVRetrieveTransactionsBySourceCodeOptions,
  ISVTransactionActionReturn,
  ISVTransactionIdReturn,
} from '../types/isv.types/ISVTransactions.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletISVInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { withQuery } from '../utils/functions.helpers';
import { VivaAuthISV } from '../vivabases/VivaAuth.class';

type ISVInitError = {
  success: false;
  message: string;
  code: 'initerror';
  data: null;
};

type ISVResellerAuthorization =
  | {
      success: true;
      authorization: string;
    }
  | ISVInitError;

export default class IsvTransactions extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  private getResellerAuthorization(
    targetMerchantId: string
  ): ISVResellerAuthorization {
    if (!this.hasResellerCredentials()) {
      return {
        success: false,
        message: 'ISV Basic Auth credentials not provided',
        code: 'initerror',
        data: null,
      };
    }

    if (!targetMerchantId) {
      return {
        success: false,
        message: 'Target merchant ID not provided',
        code: 'initerror',
        data: null,
      };
    }

    return {
      success: true,
      authorization: this.getVivaResellerBasicAuth(targetMerchantId),
    };
  }

  private validateTargetMerchantId(
    targetMerchantId: string
  ): ISVInitError | null {
    if (!targetMerchantId) {
      return {
        success: false,
        message: 'Target merchant ID not provided',
        code: 'initerror',
        data: null,
      };
    }

    return null;
  }

  private async getLegacyTransactions(
    url: string,
    targetMerchantId: string,
    logName: string,
    successMessage: string,
    errorMessage: string
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(targetMerchantId);
    if (!auth.success) return auth;

    try {
      const response = await useAxios.get<ISVLegacyTransactionsReturn>(url, {
        headers: {
          Authorization: auth.authorization,
        },
      });

      if (!response.data) {
        if (this.errorLogs) console.error(logName, response.data);
        return {
          success: false,
          message: 'VivaWallet returned no legacy transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: successMessage,
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error(logName, e);
      return {
        success: false,
        message: errorMessage,
        code: 'error',
        data: null,
      };
    }
  }

  /** Enables you to obtain detailed information about a past payment from its transaction ID. */
  async retrieveTransactionById(
    options: ISVRetrieveTransactionByIdOptions
  ): MethodReturn<ISVCheckoutTransactionReturn | null, 'nodatas'> {
    const targetMerchantError = this.validateTargetMerchantId(
      options.targetMerchantId
    );
    if (targetMerchantError) return targetMerchantError;

    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const transactionUrl = this.endpoints.isv.transactions.get.url.replace(
        '{transactionId}',
        encodeURIComponent(options.transactionId)
      );
      const url = withQuery(transactionUrl, {
        merchantId: options.targetMerchantId,
      });

      const response = await useAxios.get<ISVCheckoutTransactionReturn>(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'IsvTransactions.retrieveTransactionById',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no transaction data',
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
        console.error('IsvTransactions.retrieveTransactionById', e);
      return {
        success: false,
        message: 'Failed to retrieve transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Enables you to obtain detailed information about a past payment from its transaction ID. */
  async retrieveLegacyTransaction(
    options: ISVRetrieveLegacyTransactionOptions
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const url = this.endpoints.isv.transactions.legacyGet.url.replace(
      '{transactionId}',
      encodeURIComponent(options.transactionId)
    );

    return this.getLegacyTransactions(
      url,
      options.targetMerchantId,
      'IsvTransactions.retrieveLegacyTransaction',
      'Legacy transaction retrieved successfully',
      'Failed to retrieve legacy transaction'
    );
  }

  /** Enables you to obtain detailed information about past payments by date. */
  async retrieveTransactionsByDate(
    options: ISVRetrieveTransactionsByDateOptions
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const url = withQuery(this.endpoints.isv.transactions.legacyList.url, {
      date: options.date,
    });

    return this.getLegacyTransactions(
      url,
      options.targetMerchantId,
      'IsvTransactions.retrieveTransactionsByDate',
      'Transactions retrieved successfully',
      'Failed to retrieve transactions by date'
    );
  }

  /** Enables you to obtain detailed information about past payments by clearance date. */
  async retrieveTransactionsByClearanceDate(
    options: ISVRetrieveTransactionsByClearanceDateOptions
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const url = withQuery(this.endpoints.isv.transactions.legacyList.url, {
      clearancedate: options.clearanceDate,
    });

    return this.getLegacyTransactions(
      url,
      options.targetMerchantId,
      'IsvTransactions.retrieveTransactionsByClearanceDate',
      'Transactions retrieved successfully',
      'Failed to retrieve transactions by clearance date'
    );
  }

  /** Enables you to obtain detailed information about past payments by order code. */
  async retrieveTransactionsByOrderCode(
    options: ISVRetrieveTransactionsByOrderCodeOptions
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const url = withQuery(this.endpoints.isv.transactions.legacyList.url, {
      ordercode: options.orderCode,
    });

    return this.getLegacyTransactions(
      url,
      options.targetMerchantId,
      'IsvTransactions.retrieveTransactionsByOrderCode',
      'Transactions retrieved successfully',
      'Failed to retrieve transactions by order code'
    );
  }

  /** Enables you to obtain detailed information about past payments by source code and date. */
  async retrieveTransactionsBySourceCode(
    options: ISVRetrieveTransactionsBySourceCodeOptions
  ): MethodReturn<ISVLegacyTransactionsReturn | null, 'nodatas'> {
    const url = withQuery(this.endpoints.isv.transactions.legacyList.url, {
      sourcecode: options.sourceCode,
      date: options.date,
    });

    return this.getLegacyTransactions(
      url,
      options.targetMerchantId,
      'IsvTransactions.retrieveTransactionsBySourceCode',
      'Transactions retrieved successfully',
      'Failed to retrieve transactions by source code'
    );
  }

  /** Enables you to obtain detailed information about a past payment by reseller source code. */
  async retrieveTransactionsByResellerSourceCode(
    options: ISVRetrieveTransactionsByResellerSourceCodeOptions
  ): MethodReturn<ISVResellerSourceTransactionReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const url = withQuery(
        this.endpoints.isv.transactions.resellerPosList.url,
        {
          ResellerSourceCode: options.resellerSourceCode,
          date: options.date,
        }
      );

      const response = await useAxios.get<ISVResellerSourceTransactionReturn>(
        url,
        {
          headers: {
            Authorization: auth.authorization,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'IsvTransactions.retrieveTransactionsByResellerSourceCode',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no reseller source transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Reseller source transactions retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error(
          'IsvTransactions.retrieveTransactionsByResellerSourceCode',
          e
        );
      return {
        success: false,
        message: 'Failed to retrieve transactions by reseller source code',
        code: 'error',
        data: null,
      };
    }
  }

  /** Transactions from Data Service. */
  async searchTransactions(
    options: ISVDataServicesTransactionsSearchOptions,
    query: ISVDataServicesPaginationQuery = {}
  ): MethodReturn<ISVDataServicesTransactionsSearchReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = withQuery(
        this.endpoints.isv.transactions.dataServicesSearch.url,
        query
      );

      const response =
        await useAxios.post<ISVDataServicesTransactionsSearchReturn>(
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
          console.error('IsvTransactions.searchTransactions', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no data service transactions data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Data service transactions retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('IsvTransactions.searchTransactions', e);
      return {
        success: false,
        message: 'Failed to retrieve data service transactions',
        code: 'error',
        data: null,
      };
    }
  }

  /** Cancel / Reverse a payment or Refund / Void a successful payment. */
  async cancelTransaction(
    options: ISVCancelTransactionOptions
  ): MethodReturn<ISVTransactionActionReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const transactionUrl = this.endpoints.isv.transactions.cancel.url.replace(
        '{transactionId}',
        encodeURIComponent(options.transactionId)
      );
      const url = withQuery(transactionUrl, {
        amount: options.amount,
        sourceCode: options.sourceCode,
        currencyCode: options.currencyCode,
      });

      const response = await useAxios.delete<ISVTransactionActionReturn>(url, {
        headers: {
          Authorization: auth.authorization,
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('IsvTransactions.cancelTransaction', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no canceled transaction data',
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
      if (this.errorLogs) console.error('IsvTransactions.cancelTransaction', e);
      return {
        success: false,
        message: 'Failed to cancel transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /**
   * Pays directly an amount to a card.
   *
   * @deprecated Pay Out is now deprecated in Viva's official documentation.
   */
  async payOutOld(
    options: ISVPayOutOldOptions
  ): MethodReturn<ISVTransactionActionReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const transactionUrl =
        this.endpoints.isv.transactions.payOutOld.url.replace(
          '{transactionId}',
          encodeURIComponent(options.transactionId)
        );
      const url = withQuery(transactionUrl, {
        amount: options.amount,
        serviceId: options.serviceId ?? 14,
        sourceCode: options.sourceCode,
        merchantTrns: options.merchantTrns,
        customerTrns: options.customerTrns,
      });

      const response = await useAxios.delete<ISVTransactionActionReturn>(url, {
        headers: {
          Authorization: auth.authorization,
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('IsvTransactions.payOutOld', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no Pay Out data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Pay Out created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvTransactions.payOutOld', e);
      return {
        success: false,
        message: 'Failed to create Pay Out',
        code: 'error',
        data: null,
      };
    }
  }

  /** Create transaction. */
  async createRecurringTransaction(
    options: ISVCreateRecurringTransactionOptions
  ): MethodReturn<ISVTransactionActionReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const { targetMerchantId, transactionId, ...transactionData } = options;
      const url = this.endpoints.isv.transactions.createRecurring.url.replace(
        '{transactionId}',
        encodeURIComponent(transactionId)
      );

      const response = await useAxios.post<ISVTransactionActionReturn>(
        url,
        transactionData,
        {
          headers: {
            Authorization: auth.authorization,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'IsvTransactions.createRecurringTransaction',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no recurring transaction data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Recurring transaction created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('IsvTransactions.createRecurringTransaction', e);
      return {
        success: false,
        message: 'Failed to create recurring transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Increase the amount of an existing pre-authorized transaction. */
  async increasePreauth(
    options: ISVIncrementalPreauthOptions
  ): MethodReturn<ISVTransactionIdReturn | null, 'nodatas'> {
    const targetMerchantError = this.validateTargetMerchantId(
      options.targetMerchantId
    );
    if (targetMerchantError) return targetMerchantError;

    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const { targetMerchantId, transactionId, ...preauthData } = options;
      const transactionUrl =
        this.endpoints.isv.transactions.increasePreauth.url.replace(
          '{transactionId}',
          encodeURIComponent(transactionId)
        );
      const url = withQuery(transactionUrl, {
        merchantId: targetMerchantId,
      });

      const response = await useAxios.post<ISVTransactionIdReturn>(
        url,
        preauthData,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('IsvTransactions.increasePreauth', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no incremental preauth data',
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
      if (this.errorLogs) console.error('IsvTransactions.increasePreauth', e);
      return {
        success: false,
        message: 'Failed to create incremental preauth',
        code: 'error',
        data: null,
      };
    }
  }

  /** Make a new payment by committing an already pre authorized payment transaction. */
  async capturePreAuthPayment(
    options: ISVCapturePreAuthPaymentOptions
  ): MethodReturn<ISVTransactionActionReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const { targetMerchantId, transactionId, ...preauthData } = options;
      const url = this.endpoints.isv.transactions.capturePreauth.url.replace(
        '{transactionId}',
        encodeURIComponent(transactionId)
      );

      const response = await useAxios.post<ISVTransactionActionReturn>(
        url,
        preauthData,
        {
          headers: {
            Authorization: auth.authorization,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('IsvTransactions.capturePreAuthPayment', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no captured pre auth payment data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Pre auth payment captured successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('IsvTransactions.capturePreAuthPayment', e);
      return {
        success: false,
        message: 'Failed to capture pre auth payment',
        code: 'error',
        data: null,
      };
    }
  }

  /** Make a new payment by committing an already pre authorized payment transaction. */
  async capturePreauthPayment(
    options: ISVCapturePreAuthPaymentOptions
  ): MethodReturn<ISVTransactionActionReturn | null, 'nodatas'> {
    return this.capturePreAuthPayment(options);
  }

  /** Make MOTO card charge. */
  async makeMotoCardCharge(
    options: ISVMotoCardChargeOptions
  ): MethodReturn<ISVMotoCardChargeReturn | null, 'nodatas'> {
    const auth = this.getResellerAuthorization(options.targetMerchantId);
    if (!auth.success) return auth;

    try {
      const { targetMerchantId, ...motoData } = options;

      const response = await useAxios.post<ISVMotoCardChargeReturn>(
        this.endpoints.isv.transactions.motoCharge.url,
        motoData,
        {
          headers: {
            Authorization: auth.authorization,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('IsvTransactions.makeMotoCardCharge', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no MOTO card charge data',
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
        console.error('IsvTransactions.makeMotoCardCharge', e);
      return {
        success: false,
        message: 'Failed to create MOTO card charge',
        code: 'error',
        data: null,
      };
    }
  }
}
