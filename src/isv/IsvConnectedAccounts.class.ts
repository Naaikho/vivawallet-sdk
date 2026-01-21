import { ISVCreateAccountOptions, ISVCreateAccountReturn, ISVGetAccountDatasOptions, ISVGetAccountDatasReturn } from "../types/isv.types/ISVConnectedAccounts.types";
import { MethodReturn } from "../types/Methods.types";
import { VivawalletISVInit } from "../types/Vivawallet.types";
import { useAxios } from "../utils/axiosInstance.ts";
import { VivaAuthISV } from "../vivabases/VivaAuth.class";

export default class IsvConnectedAccounts extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  async getAccountDatas(options: ISVGetAccountDatasOptions): MethodReturn<ISVGetAccountDatasReturn | null> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.get<ISVGetAccountDatasReturn>(
        this.endpoints.isv.connectedAccounts.get.url.replace('{accountId}', options.accountId),
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
        console.error('VivaWallet returned no account data', r.data);
        return {
          success: false,
          message: 'VivaWallet returned no account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Account datas fetched successfully',
        data: r.data,
      };
    } catch (e) {
      console.error('IsvConnectedAccounts.getAccountDatas', e);
      return {
        success: false,
        message: 'Failed to get account datas',
        code: 'error',
        data: null,
      };
    }
  }

  async create(options: ISVCreateAccountOptions): MethodReturn<ISVCreateAccountReturn | null> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.post<ISVCreateAccountReturn>(
        this.endpoints.isv.connectedAccounts.create.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
        console.error('VivaWallet returned no create account data', r.data);
        return {
          success: false,
          message: 'VivaWallet returned no create account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Account created successfully',
        data: r.data,
      };
    } catch (e) {
      console.log('IsvConnectedAccounts.create', e);
      return {
        success: false,
        message: 'Failed to create account',
        code: 'error',
        data: null,
      };
    }
  }
}