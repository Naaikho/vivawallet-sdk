import { MethodReturn } from '../types/Methods.types';
import {
  VivaBalanceTransferOptions,
  VivaBalanceTransferReturn,
  VivaLegacyWalletReturn,
  VivaMerchantWalletReturn,
} from '../types/VivaWallets.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaWallets extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /**
   * Retrieve Wallet (OLD)
   *
   * This method targets the official OLD endpoint. Use `retrieveMerchantWallets()` for Merchant Wallets when possible.
   */
  async retrieveWallet(): MethodReturn<
    VivaLegacyWalletReturn | VivaLegacyWalletReturn[] | null,
    'nodatas'
  > {
    try {
      const response = await useAxios.get<
        VivaLegacyWalletReturn | VivaLegacyWalletReturn[]
      >(this.endpoints.wallets.legacyGet.url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWallets.retrieveWallet', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no wallet data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Wallet retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWallets.retrieveWallet', e);
      return {
        success: false,
        message: 'Failed to retrieve wallet',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve all wallets set up under your Viva profile */
  async retrieveMerchantWallets(): MethodReturn<
    VivaMerchantWalletReturn[] | VivaMerchantWalletReturn | null,
    'nodatas'
  > {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.get<
        VivaMerchantWalletReturn[] | VivaMerchantWalletReturn
      >(this.endpoints.wallets.merchantGet.url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWallets.retrieveMerchantWallets', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no merchant wallets data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Merchant wallets retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaWallets.retrieveMerchantWallets', e);
      return {
        success: false,
        message: 'Failed to retrieve merchant wallets',
        code: 'error',
        data: null,
      };
    }
  }

  /** Balance Transfer */
  async balanceTransfer(
    walletId: string | number,
    targetWalletId: string | number,
    options: VivaBalanceTransferOptions
  ): MethodReturn<VivaBalanceTransferReturn | null, 'nodatas'> {
    try {
      const url = this.endpoints.wallets.balanceTransfer.url
        .replace('{walletId}', encodeURIComponent(String(walletId)))
        .replace(
          '{targetWalletId}',
          encodeURIComponent(String(targetWalletId))
        );

      const response = await useAxios.post<VivaBalanceTransferReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaWallets.balanceTransfer', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no balance transfer data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Balance transfer created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaWallets.balanceTransfer', e);
      return {
        success: false,
        message: 'Failed to create balance transfer',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaWallets;
