import { MethodReturn } from '../types/Methods.types';
import {
  VivaAccountTransactionReturn,
  VivaAccountTransactionsSearchOptions,
  VivaDataServicesPaginationQuery,
  VivaDataServicesTransactionsSearchOptions,
  VivaDataServicesTransactionsSearchReturn,
  VivaMt940DataReturn,
  VivaRetrieveMt940DataOptions,
  VivaSaleTransactionsExportOptions,
  VivaSaleTransactionsExportReturn,
  VivaSaleTransactionsWebhookDatas,
} from '../types/VivaDataServices.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDefinedDatas } from '../utils/functions';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaDataServices extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Transactions from Data Service */
  async searchTransactions(
    options: VivaDataServicesTransactionsSearchOptions,
    query: VivaDataServicesPaginationQuery = {}
  ): MethodReturn<VivaDataServicesTransactionsSearchReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(query);
      const url =
        this.endpoints.dataServices.transactions.search.url +
        (queries ? '?' + queries : '');

      const response =
        await useAxios.post<VivaDataServicesTransactionsSearchReturn>(
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
          console.error('VivaDataServices.searchTransactions', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no data service transactions data',
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
        console.error('VivaDataServices.searchTransactions', e);
      return {
        success: false,
        message: 'Failed to retrieve data service transactions',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve MT940 Data */
  async retrieveMt940Data(
    options: VivaRetrieveMt940DataOptions
  ): MethodReturn<VivaMt940DataReturn | string | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(options);

      const response = await useAxios.get<VivaMt940DataReturn | string>(
        this.endpoints.dataServices.mt940.url + '?' + queries,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data && response.status !== 204) {
        if (this.errorLogs)
          console.error('VivaDataServices.retrieveMt940Data', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no MT940 data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'MT940 data retrieved successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaDataServices.retrieveMt940Data', e);
      return {
        success: false,
        message: 'Failed to retrieve MT940 data',
        code: 'error',
        data: null,
      };
    }
  }

  /** Sale transactions */
  async requestSaleTransactionsExport(
    options: VivaSaleTransactionsExportOptions
  ): MethodReturn<VivaSaleTransactionsExportReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaSaleTransactionsExportReturn>(
        this.endpoints.dataServices.saleTransactions.export.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaDataServices.requestSaleTransactionsExport',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no sale transactions export data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Sale transactions export requested successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaDataServices.requestSaleTransactionsExport', e);
      return {
        success: false,
        message: 'Failed to request sale transactions export',
        code: 'error',
        data: null,
      };
    }
  }

  /** Account Transactions */
  async searchAccountTransactions(
    options: VivaAccountTransactionsSearchOptions,
    query: VivaDataServicesPaginationQuery = {}
  ): MethodReturn<
    VivaAccountTransactionReturn[] | VivaAccountTransactionReturn | null,
    'nodatas'
  > {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(query);
      const url =
        this.endpoints.dataServices.accountTransactions.search.url +
        (queries ? '?' + queries : '');

      const response = await useAxios.post<
        VivaAccountTransactionReturn[] | VivaAccountTransactionReturn
      >(url, options, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data && response.status !== 204) {
        if (this.errorLogs)
          console.error(
            'VivaDataServices.searchAccountTransactions',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no account transactions data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Account transactions retrieved successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaDataServices.searchAccountTransactions', e);
      return {
        success: false,
        message: 'Failed to retrieve account transactions',
        code: 'error',
        data: null,
      };
    }
  }

  /** WebHook SaleTransactions */
  async parseSaleTransactionsWebhook(
    payload: unknown
  ): MethodReturn<VivaSaleTransactionsWebhookDatas | null, 'nodatas'> {
    if (!payload || typeof payload !== 'object') {
      return {
        success: false,
        message: 'Vivawallet returned no sale transactions webhook data',
        code: 'nodatas',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Sale transactions webhook parsed successfully',
      data: payload as VivaSaleTransactionsWebhookDatas,
    };
  }
}

export default VivaDataServices;
