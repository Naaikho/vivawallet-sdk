import { MethodReturn } from '../types/Methods.types';
import { SourceCodeDatas } from '../types/VivaSource.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import VivaAuth from '../vivabases/VivaAuth.class';

class VivaSourceCode extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ SOURCE CODE ------------------ */

  /** Set the Viva Wallet payment source (needed for Transaction integrations), return `true` if setup is OK, `false` if the payment already exist or on error */
  async setVivawalletSource(
    data: SourceCodeDatas
  ): MethodReturn<void, 'sourcecodeexist'> {
    if (!this.merchantId || !this.apikey) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
      };
    }

    if (!this.sourceCode && !data.sourceCode) {
      return {
        success: false,
        message: 'Source code is required',
        code: 'sourcecodeerror',
      };
    }

    if (!data.sourceCode && this.sourceCode) data.sourceCode = this.sourceCode;

    try {
      await useAxios.request({
        url: this.endpoints.source.url,
        method: this.endpoints.source.method,
        headers: {
          Authorization: 'Basic ' + this.getVivaBasicToken(),
        },
        data,
      });

      return {
        success: true,
        message: 'Source code set',
      };
    } catch (e: any) {
      console.error('Viva Source Code Error', e);

      // if the source already exist
      if (e.status === 409) {
        return {
          success: false,
          message: 'Source code already exist',
          code: 'sourcecodeexist',
        };
      }

      return {
        success: false,
        message: 'Source code set error',
        code: 'error',
      };
    }
  }

  /** ------------------------------------------------- */
}

export default VivaSourceCode;
