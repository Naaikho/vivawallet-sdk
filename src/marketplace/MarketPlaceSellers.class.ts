import {
  MPConnectedAccountAddress,
  MPConnectedAccountPayouts,
  MPConnectedAccountReturn,
  MPCreateAccountDatas,
  MPCreateAccountResponse,
  MPUpdateConnectedAccountOptions,
  MPUpdateConnectedAccountReturn,
} from '../types/marketplace.types/MPSellers.types';
import { MethodReturn } from '../types/Methods.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class MarketPlaceSellers extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  private normalizeConnectedAccountAddress(
    address?: MPConnectedAccountAddress
  ): MPConnectedAccountAddress | undefined {
    if (!address) return undefined;

    const { postalCode, postCode, ...rest } = address;
    const normalizedAddress: MPConnectedAccountAddress = {
      ...rest,
    };

    const normalizedPostCode = postCode ?? postalCode;
    if (normalizedPostCode) normalizedAddress.postCode = normalizedPostCode;

    return normalizedAddress;
  }

  private normalizeConnectedAccountPayouts<T extends MPConnectedAccountPayouts>(
    payouts?: T
  ): T | undefined {
    if (!payouts) return undefined;

    const { dayofWeek, dayOfWeek, ...rest } = payouts;
    const normalizedPayouts: MPConnectedAccountPayouts = {
      ...rest,
    };

    const normalizedDayOfWeek = dayOfWeek ?? dayofWeek;
    if (normalizedDayOfWeek !== undefined) {
      normalizedPayouts.dayOfWeek = normalizedDayOfWeek;
    }

    return normalizedPayouts as T;
  }

  private normalizeCreateAccountDatas(
    datas: MPCreateAccountDatas
  ): MPCreateAccountDatas {
    return {
      ...datas,
      address: this.normalizeConnectedAccountAddress(datas.address),
      payouts: this.normalizeConnectedAccountPayouts(datas.payouts),
    };
  }

  private normalizeUpdateConnectedAccountOptions(
    options: MPUpdateConnectedAccountOptions
  ): MPUpdateConnectedAccountOptions {
    return {
      ...options,
      payouts: this.normalizeConnectedAccountPayouts(options.payouts),
    };
  }

  /** Create new Seller Account */
  async createAccount(
    datas: MPCreateAccountDatas
  ): MethodReturn<MPCreateAccountResponse | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const normalizedDatas = this.normalizeCreateAccountDatas(datas);

      const r = await useAxios.post<MPCreateAccountResponse>(
        this.endpoints.marketplace.accounts.create.url,
        normalizedDatas,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!r.data) {
        if (this.errorLogs)
          console.error('Vivawallet returned no created account data', r.data);
        return {
          success: false,
          message: 'Vivawallet returned no created account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Account created successfully',
        data: r.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('MarketPlaceSellers.createAccount', e);
      return {
        success: false,
        message: 'Failed to create account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve information about a connected account */
  async retrieveConnectedAccount(
    accountId: string
  ): MethodReturn<MPConnectedAccountReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.marketplace.accounts.get.url.replace(
        '{accountId}',
        encodeURIComponent(accountId)
      );

      const response = await useAxios.get<MPConnectedAccountReturn>(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'Vivawallet returned no connected account data',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no connected account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Connected account retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('MarketPlaceSellers.retrieveConnectedAccount', e);
      return {
        success: false,
        message: 'Failed to retrieve connected account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Update connected account attributes */
  async updateConnectedAccount(
    accountId: string,
    options: MPUpdateConnectedAccountOptions
  ): MethodReturn<MPUpdateConnectedAccountReturn, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.endpoints.marketplace.accounts.update.url.replace(
        '{accountId}',
        encodeURIComponent(accountId)
      );
      const normalizedOptions =
        this.normalizeUpdateConnectedAccountOptions(options);

      await useAxios.patch<MPUpdateConnectedAccountReturn>(
        url,
        normalizedOptions,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      return {
        success: true,
        message: 'Connected account updated successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('MarketPlaceSellers.updateConnectedAccount', e);
      return {
        success: false,
        message: 'Failed to update connected account',
        code: 'error',
        data: null,
      };
    }
  }
}

export default MarketPlaceSellers;
