import { MethodReturn } from '../types/Methods.types';
import {
  VivaCreateObligationOptions,
  VivaCreateObligationReturn,
} from '../types/VivaObligations.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaObligations extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /**
   * Obligation (OLD)
   *
   * @deprecated This method targets the official OLD endpoint.
   */
  async createObligation(
    options: VivaCreateObligationOptions
  ): MethodReturn<VivaCreateObligationReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaCreateObligationReturn>(
        this.endpoints.obligations.create.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaObligations.createObligation', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no obligation data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Obligation created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaObligations.createObligation', e);
      return {
        success: false,
        message: 'Failed to create obligation',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaObligations;
