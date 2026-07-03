import { VivaFeesOptions, VivaFeesReturn } from '../types/VivaFees.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaFees extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Use this API Call to get your fee amount. */
  async retrieveFees(
    options: VivaFeesOptions
  ): MethodReturn<VivaFeesReturn | null, 'nodatas'> {
    try {
      const response = await useAxios.get<VivaFeesReturn>(
        this.endpoints.fees.get.url,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
          params: options,
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaFees.retrieveFees', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no fees data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Fees retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaFees.retrieveFees', e);
      return {
        success: false,
        message: 'Failed to retrieve fees',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaFees;
