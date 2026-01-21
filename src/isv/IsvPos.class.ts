import {
  ISVDevicesOptions,
  ISVDevicesReturn,
  ISVInitSaleRequest,
} from '../types/isv.types/ISVPos.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletISVInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuthISV } from '../vivabases/VivaAuth.class';

export default class IsvPos extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  /** Get ISV merchant devices, return `ISVDevicesReturn` */
  async getDevices(
    options: ISVDevicesOptions
  ): MethodReturn<ISVDevicesReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      const r = await useAxios.post<ISVDevicesReturn>(
        this.endpoints.isv.devices.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      if (!r.data) {
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
      console.error('IsvPos.getDevices', e);
      return {
        success: false,
        message: 'Failed to get devices',
        code: 'error',
        data: null,
      };
    }
  }

  /** Init POS Card reader sale request for the merchant, return `ISVInitPosReturn` */
  async initSale(
    options: ISVInitSaleRequest
  ): MethodReturn<undefined, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      await useAxios.post<null>(
        this.endpoints.isv.transaction.create.url,
        options,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Sale initialized successfully',
        data: null,
      };
    } catch (e) {
      console.error('IsvPos.initSale', e);
      return {
        success: false,
        message: 'Failed to init sale',
        code: 'error',
        data: null,
      };
    }
  }
}
