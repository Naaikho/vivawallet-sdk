import { MPCreateAccountResponse } from '../types/marketplace.types/MPSellers.types';
import { MPCreateAccountDatas } from '../types/marketplace.types/MPSellers.types';
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

      if (this.logs) {
        console.log(
          'createAccount',
          this.endpoints.marketplace.accounts,
          'Bearer ' + vivaToken
        );
      }

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
        return {
          success: false,
          message: 'Failed to create account',
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
      console.log('MarketPlaceSellers createAccount error', e);
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
