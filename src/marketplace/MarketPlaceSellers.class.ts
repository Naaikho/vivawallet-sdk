import { MPCreateAccountDatas, MPCreateAccountResponse } from '../types/marketplace.types/MPSellers.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class MarketPlaceSellers extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Create new Seller Account */
  async createAccount(
    datas: MPCreateAccountDatas
  ): MethodReturn<MPCreateAccountResponse | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.post<MPCreateAccountResponse>(
        this.endpoints.marketplace.accounts.create.url,
        datas,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
        if (this.errorLogs) console.error('Vivawallet returned no created account data', r.data);
        return {
          success: false,
          message: 'Vivawallet returned no created account data',
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
      if (this.errorLogs) console.error('MarketPlaceSellers.createAccount', e);
      return {
        success: false,
        message: 'Failed to create account',
        code: 'error',
        data: null,
      };
    }
  }
}

export default MarketPlaceSellers;
