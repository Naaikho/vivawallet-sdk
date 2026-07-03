import { ISVCreateSourceOptions } from '../types/isv.types/ISVSource.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletISVInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuthISV } from '../vivabases/VivaAuth.class';

export default class IsvSourceCode extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  /** Add a new payment source to your merchant's Viva account. */
  async createSource(
    data: ISVCreateSourceOptions
  ): MethodReturn<void, 'sourcecodeexist'> {
    if (!this.hasResellerCredentials()) {
      return {
        success: false,
        message: 'ISV Basic Auth credentials not provided',
        code: 'initerror',
        data: null,
      };
    }

    if (!data.targetMerchantId) {
      return {
        success: false,
        message: 'Target merchant ID not provided',
        code: 'initerror',
        data: null,
      };
    }

    try {
      const { targetMerchantId, ...sourceData } = data;

      await useAxios.request({
        url: this.endpoints.isv.source.create.url,
        method: this.endpoints.isv.source.create.method,
        headers: {
          Authorization: this.getVivaResellerBasicAuth(targetMerchantId),
          'Content-Type': 'application/json',
        },
        data: sourceData,
      });

      return {
        success: true,
        message: 'Source code created successfully',
        data: null,
      };
    } catch (e: any) {
      if (this.errorLogs) console.error('IsvSourceCode.createSource', e);

      if (e.status === 409 || e.response?.status === 409) {
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

}
