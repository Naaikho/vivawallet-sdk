import {
  ISVDevicesOptions,
  ISVDevicesReturn,
} from '../../types/isv.types/IsvPos.types/IsvPosDevices.types';
import { MethodReturn } from '../../types/Methods.types';
import { VivawalletISVInit } from '../../types/Vivawallet.types';
import { useAxios } from '../../utils/axiosInstance.ts';
import { VivaAuthISV } from '../../vivabases/VivaAuth.class';

export default class IsvPosDevices extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  /** Search POS Devices */
  async searchDevices(
    options: ISVDevicesOptions
  ): MethodReturn<ISVDevicesReturn[] | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const r = await useAxios.post<ISVDevicesReturn[]>(
        this.endpoints.isv.pos.devices.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!r.data) {
        if (this.errorLogs)
          console.error('VivaWallet returned no devices data', r.data);
        return {
          success: false,
          message: 'VivaWallet returned no devices data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Devices fetched successfully',
        data: r.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPosDevices.searchDevices', e);
      return {
        success: false,
        message: 'Failed to search devices',
        code: 'error',
        data: null,
      };
    }
  }

  // ------------------------------ Deprecated Methods ------------------------------

  /** @deprecated Use `searchDevices()` instead. */
  async getDevices(
    options: ISVDevicesOptions
  ): MethodReturn<ISVDevicesReturn[] | null, 'nodatas'> {
    return this.searchDevices(options);
  }
}
