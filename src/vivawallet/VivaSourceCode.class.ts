import { MethodReturn } from '../types/Methods.types';
import { SourceCodeDatas } from '../types/VivaSource.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaSourceCode extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ SOURCE CODE ------------------ */

  /** Set the Viva Wallet payment source (needed for Transaction integrations), return `true` if setup is OK, `false` if the payment already exist or on error */
  async setVivawalletSource(
    data: SourceCodeDatas
  ): MethodReturn<void, 'sourcecodeexist'> {
    try {
      const sourceCode = data.sourceCode || this.sourceCode;

      if (!sourceCode) {
        if (this.errorLogs) console.error('Source code is required');
        return {
          success: false,
          message: 'Source code is required in datas or at initialization',
          code: 'sourcecodeerror',
          data: null,
        };
      }

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
        data: null,
      };
    } catch (e: any) {
      if (this.errorLogs) console.error('VivaSourceCode.setVivawalletSource', e);

      // if the source already exist
      if (e.status === 409) {
        if (this.errorLogs) console.error('Source code already exist');
        return {
          success: false,
          message: 'Source code already exists',
          code: 'sourcecodeexist',
          data: null,
        };
      }

      return {
        success: false,
        message: 'Failed to set source code',
        code: 'error',
        data: null,
      };
    }
  }

  /** ------------------------------------------------- */
}

export default VivaSourceCode;
