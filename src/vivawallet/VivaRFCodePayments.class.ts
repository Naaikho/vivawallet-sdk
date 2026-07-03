import { MethodReturn } from '../types/Methods.types';
import {
  VivaGenerateRfCodesOptions,
  VivaGenerateRfCodesReturn,
} from '../types/VivaRFCodePayments.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaRFCodePayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Generare RF Codes */
  async generateRfCodes(
    options: VivaGenerateRfCodesOptions
  ): MethodReturn<VivaGenerateRfCodesReturn | null, 'nodatas'> {
    try {
      const response = await useAxios.post<VivaGenerateRfCodesReturn>(
        this.endpoints.rfCodePayments.generate.url,
        options,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200 && !response.data) {
        if (this.errorLogs)
          console.error('VivaRFCodePayments.generateRfCodes', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no RF Code payment session data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'RF Codes generated successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaRFCodePayments.generateRfCodes', e);
      return {
        success: false,
        message: 'Failed to generate RF Codes',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaRFCodePayments;
