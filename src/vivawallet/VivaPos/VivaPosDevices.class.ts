import { MethodReturn } from '../../types/Methods.types';
import {
  VivaPosSearchDevicesOptions,
  VivaPosSearchDevicesReturn,
} from '../../types/VivaPos.types';
import { VivawalletAPIInit } from '../../types/Vivawallet.types';
import { useAxios } from '../../utils/axiosInstance.ts';
import VivaPosBase from './VivaPosBase.class';

export default class VivaPosDevices extends VivaPosBase {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Search POS Devices */
  async searchDevices(
    options: VivaPosSearchDevicesOptions = {}
  ): MethodReturn<
    VivaPosSearchDevicesReturn[] | null,
    'nodatas' | 'tokenerror'
  > {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      const response = await useAxios.post<VivaPosSearchDevicesReturn[]>(
        this.endpoints.cloudTerminal.devices.search.url,
        options,
        {
          headers: {
            Authorization: authorization.data,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPosDevices.searchDevices', response.data);
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
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPosDevices.searchDevices', e);
      return {
        success: false,
        message: 'Failed to search devices',
        code: 'error',
        data: null,
      };
    }
  }
}
