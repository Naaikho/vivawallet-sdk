import {
  MPTransfersDatas,
  MPTransfersResponse,
} from '../types/marketplace.types/MPTransfers.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class MarketPlaceTransfers extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Send funds from marketplace to seller account/brank */
  async sendFunds(
    datas: MPTransfersDatas
  ): MethodReturn<MPTransfersResponse | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.post<MPTransfersResponse>(
        this.endpoints.marketplace.transfers.send.url,
        datas,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
        if (this.errorLogs) console.error('Vivawallet returned no sent funds data', r.data);
        return {
          success: false,
          message: 'Vivawallet returned no sent funds data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Funds sent successfully',
        data: r.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('MarketPlaceTransfers.sendFunds', e);
      return {
        success: false,
        message: 'Failed to send funds to seller account/brand',
        code: 'error',
        data: null,
      };
    }
  }
}

export default MarketPlaceTransfers;
