import { ISVCreateActionOptions, ISVCreateActionReturn, ISVGetActionDatasOptions, ISVGetActionDatasReturn, ISVInitSaleOptions, ISVRefundTransactionOptions } from "../../types/isv.types/IsvPos.types/IsvPosTransactions.types";
import { MethodReturn } from "../../types/Methods.types";
import { VivawalletISVInit } from "../../types/Vivawallet.types";
import { useAxios } from "../../utils/axiosInstance.ts";
import { VivaAuthISV } from "../../vivabases/VivaAuth.class";

export default class IsvPosTransactions extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  /** Init POS Card reader sale request for the merchant, return `ISVInitPosReturn` */
  async initSale(
    options: ISVInitSaleOptions
  ): MethodReturn<undefined, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      await useAxios.post<null>(
        this.endpoints.isv.pos.transaction.create.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Sale initialized successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPos.initSale', e);
      return {
        success: false,
        message: 'Failed to init sale',
        code: 'error',
        data: null,
      };
    }
  }

  async refundTransaction(options: ISVRefundTransactionOptions): MethodReturn<null> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      await useAxios.post<null>(
        this.endpoints.isv.pos.transaction.refund.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Transaction refunded successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPos.refundTransaction', e);
      return {
        success: false,
        message: 'Failed to refund transaction',
        code: 'error',
        data: null,
      };
    }
  }

  /** Get details of a previously created action */
  async getActionDatas(
    options: ISVGetActionDatasOptions
  ): MethodReturn<ISVGetActionDatasReturn> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const response = await useAxios.get<ISVGetActionDatasReturn>(
        this.endpoints.isv.pos.action.get.url.replace('{actionId}', options.actionId),
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Action details retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPos.getActionDatas', e);
      return {
        success: false,
        message: 'Failed to get action details',
        code: 'error',
        data: null,
      };
    }
  }

  /** Create an action to be executed on a terminal */
  async createAction(
    options: ISVCreateActionOptions
  ): MethodReturn<ISVCreateActionReturn> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const response = await useAxios.post<ISVCreateActionReturn>(
        this.endpoints.isv.pos.action.create.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Action created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPos.createAction', e);
      return {
        success: false,
        message: 'Failed to create action',
        code: 'error',
        data: null,
      };
    }
  }
}