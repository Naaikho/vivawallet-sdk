import { MethodReturn } from '../../types/Methods.types';
import {
  VivaPosActionDetailsReturn,
  VivaPosActionReturn,
  VivaPosCapturePreAuthRequestOptions,
  VivaPosCreateActionOptions,
  VivaPosFastRefundOptions,
  VivaPosGetActionDetailsOptions,
  VivaPosInitiateSaleRequestOptions,
  VivaPosRebateOptions,
  VivaPosRefundTransactionOptions,
  VivaPosUnreferencedRefundOptions,
} from '../../types/VivaPos.types';
import { VivawalletAPIInit } from '../../types/Vivawallet.types';
import { useAxios } from '../../utils/axiosInstance.ts';
import VivaPosBase from './VivaPosBase.class';

export default class VivaPosTransactions extends VivaPosBase {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  private async postTransaction(
    endpoint: string,
    options: object,
    logName: string,
    successMessage: string,
    errorMessage: string
  ): MethodReturn<null, 'tokenerror'> {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      await useAxios.post<null>(endpoint, options, {
        headers: {
          Authorization: authorization.data,
        },
      });

      return {
        success: true,
        message: successMessage,
        data: null,
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

  /** Create Action */
  async createAction(
    options: VivaPosCreateActionOptions
  ): MethodReturn<VivaPosActionReturn | null, 'nodatas' | 'tokenerror'> {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      const response = await useAxios.post<VivaPosActionReturn>(
        this.endpoints.cloudTerminal.action.create.url,
        options,
        {
          headers: {
            Authorization: authorization.data,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPosTransactions.createAction', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no action data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Action created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPosTransactions.createAction', e);
      return {
        success: false,
        message: 'Failed to create action',
        code: 'error',
        data: null,
      };
    }
  }

  /** Get Action Details */
  async getActionDetails(
    options: VivaPosGetActionDetailsOptions
  ): MethodReturn<VivaPosActionDetailsReturn | null, 'nodatas' | 'tokenerror'> {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      const response = await useAxios.get<VivaPosActionDetailsReturn>(
        this.endpoints.cloudTerminal.action.get.url.replace(
          '{actionId}',
          encodeURIComponent(options.actionId)
        ),
        {
          headers: {
            Authorization: authorization.data,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPosTransactions.getActionDetails', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no action details',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Action details retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaPosTransactions.getActionDetails', e);
      return {
        success: false,
        message: 'Failed to get action details',
        code: 'error',
        data: null,
      };
    }
  }

  /** Initiate a Sales Request */
  async initiateSaleRequest(
    options: VivaPosInitiateSaleRequestOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.sale.url,
      options,
      'VivaPosTransactions.initiateSaleRequest',
      'Sale request initiated successfully',
      'Failed to initiate sale request'
    );
  }

  /** Capture Pre-auth Request */
  async capturePreAuthRequest(
    options: VivaPosCapturePreAuthRequestOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.capturePreauth.url,
      options,
      'VivaPosTransactions.capturePreAuthRequest',
      'Pre-auth capture request sent successfully',
      'Failed to capture pre-auth request'
    );
  }

  /** Refund a Transaction */
  async refundTransaction(
    options: VivaPosRefundTransactionOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.refund.url,
      options,
      'VivaPosTransactions.refundTransaction',
      'Refund request sent successfully',
      'Failed to refund transaction'
    );
  }

  /** Unreferenced Refund */
  async unreferencedRefund(
    options: VivaPosUnreferencedRefundOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.unreferencedRefund.url,
      options,
      'VivaPosTransactions.unreferencedRefund',
      'Unreferenced refund request sent successfully',
      'Failed to send unreferenced refund'
    );
  }

  /** Fast Refund */
  async fastRefund(
    options: VivaPosFastRefundOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.fastRefund.url,
      options,
      'VivaPosTransactions.fastRefund',
      'Fast refund request sent successfully',
      'Failed to send fast refund'
    );
  }

  /** Rebate */
  async rebate(
    options: VivaPosRebateOptions
  ): MethodReturn<null, 'tokenerror'> {
    return this.postTransaction(
      this.endpoints.cloudTerminal.transaction.rebate.url,
      options,
      'VivaPosTransactions.rebate',
      'Rebate request sent successfully',
      'Failed to send rebate'
    );
  }
}
