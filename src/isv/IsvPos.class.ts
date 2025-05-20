import {
  ISVDevicesOptions,
  ISVDevicesReturn,
  ISVInitSaleRequest,
} from '../types/isv.types/ISVPos.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import VivaAuth from '../vivabases/VivaAuth.class';

export default class IsvPos extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Get ISV merchant devices, return `ISVDevicesReturn` */
  async getDevices(
    options: ISVDevicesOptions
  ): MethodReturn<ISVDevicesReturn | null, 'nodatas'> {
    const vivaToken = (await this.getVivaToken()).data;
    if (!vivaToken) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
      };
    }

    try {
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
        return {
          success: false,
          message: 'Failed to get devices',
          code: 'nodatas',
        };
      }

      return {
        success: true,
        message: 'Devices fetched successfully',
        data: r.data,
      };
    } catch (e) {
      console.log('MarketPlacePayments.createOrder', e);
      return {
        success: false,
        message: 'Failed to get devices',
        code: 'error',
      };
    }
  }

  /** Init POS Card reader sale request for the merchant, return `ISVInitPosReturn` */
  async initSale(
    options: ISVInitSaleRequest
  ): MethodReturn<undefined, 'nodatas'> {
    const vivaToken = (await this.getVivaToken()).data;
    if (!vivaToken) {
      return {
        success: false,
        message: 'Init not called',
        code: 'initerror',
      };
    }

    try {
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
      };
    } catch (e) {
      console.log('IsvPos.initSale', e);
      return {
        success: false,
        message: 'Failed to init sale',
        code: 'error',
      };
    }
  }
}
