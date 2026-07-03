import { MethodReturn } from '../types/Methods.types';
import { SourceCodeDatas } from '../types/VivaSource.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaSourceCode extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Add a new payment source. */
  async createSource(
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
          Authorization: this.getVivaBasicAuth(),
        },
        data,
      });

      return {
        success: true,
        message: 'Source code set',
        data: null,
      };
    } catch (e: any) {
      if (this.errorLogs) console.error('VivaSourceCode.createSource', e);

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
        message: 'Failed to create source code',
        code: 'error',
        data: null,
      };
    }
  }

  /**
   * Set the Viva Wallet payment source.
   *
   * @deprecated Use `createSource()` instead.
   */
  async setVivawalletSource(
    data: SourceCodeDatas
  ): MethodReturn<void, 'sourcecodeexist'> {
    return this.createSource(data);
  }
}

export default VivaSourceCode;
