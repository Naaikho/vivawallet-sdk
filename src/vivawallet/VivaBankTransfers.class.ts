import { MethodReturn } from '../types/Methods.types';
import {
  VivaBankAccountReturn,
  VivaBankAccountsQuery,
  VivaBankTransferOptionsQuery,
  VivaBankTransferOptionsReturn,
  VivaCreateBankTransferFeeOptions,
  VivaCreateBankTransferFeeReturn,
  VivaExecuteBankTransferOptions,
  VivaExecuteBankTransferReturn,
  VivaLinkBankAccountOptions,
  VivaLinkBankAccountReturn,
  VivaUpdateBankAccountOptions,
  VivaUpdateBankAccountReturn,
} from '../types/VivaBankTransfers.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDefinedDatas } from '../utils/functions';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaBankTransfers extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  private replaceBankAccountId(url: string, bankAccountId: string): string {
    return url.replace('{bankAccountId}', encodeURIComponent(bankAccountId));
  }

  /** Use this API Call to link a bank account */
  async linkBankAccount(
    options: VivaLinkBankAccountOptions
  ): MethodReturn<VivaLinkBankAccountReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaLinkBankAccountReturn>(
        this.endpoints.bankTransfers.bankAccounts.link.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaBankTransfers.linkBankAccount', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no linked bank account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank account linked successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaBankTransfers.linkBankAccount', e);
      return {
        success: false,
        message: 'Failed to link bank account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this API Call to retrieve all the details for the linked bank accounts which are set up under your Viva profile */
  async retrieveBankAccounts(
    query: VivaBankAccountsQuery = {}
  ): MethodReturn<
    VivaBankAccountReturn[] | VivaBankAccountReturn | null,
    'nodatas'
  > {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(query);
      const url =
        this.endpoints.bankTransfers.bankAccounts.list.url +
        (queries ? '?' + queries : '');

      const response = await useAxios.get<
        VivaBankAccountReturn[] | VivaBankAccountReturn
      >(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaBankTransfers.retrieveBankAccounts',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no bank accounts data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank accounts retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.retrieveBankAccounts', e);
      return {
        success: false,
        message: 'Failed to retrieve bank accounts',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this API Call to retrieve all the details for a specific linked bank account set up under your Viva profile */
  async retrieveBankAccountById(
    bankAccountId: string
  ): MethodReturn<VivaBankAccountReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.replaceBankAccountId(
        this.endpoints.bankTransfers.bankAccounts.get.url,
        bankAccountId
      );

      const response = await useAxios.get<VivaBankAccountReturn>(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaBankTransfers.retrieveBankAccountById',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no bank account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank account retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.retrieveBankAccountById', e);
      return {
        success: false,
        message: 'Failed to retrieve bank account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Update bank account */
  async updateBankAccount(
    bankAccountId: string,
    options: VivaUpdateBankAccountOptions
  ): MethodReturn<VivaUpdateBankAccountReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.replaceBankAccountId(
        this.endpoints.bankTransfers.bankAccounts.update.url,
        bankAccountId
      );

      const response = await useAxios.patch<VivaUpdateBankAccountReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaBankTransfers.updateBankAccount', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no updated bank account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank account updated successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.updateBankAccount', e);
      return {
        success: false,
        message: 'Failed to update bank account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve the cost options available, i.e. shared or ours */
  async retrieveBankTransferOptions(
    bankAccountId: string,
    query: VivaBankTransferOptionsQuery
  ): MethodReturn<VivaBankTransferOptionsReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(query);
      const url =
        this.replaceBankAccountId(
          this.endpoints.bankTransfers.bankAccounts.instructionTypes.url,
          bankAccountId
        ) + (queries ? '?' + queries : '');

      const response = await useAxios.get<VivaBankTransferOptionsReturn>(url, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaBankTransfers.retrieveBankTransferOptions',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no bank transfer options data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank transfer options retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.retrieveBankTransferOptions', e);
      return {
        success: false,
        message: 'Failed to retrieve bank transfer options',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this API Call to specify the transfer options and/or be informed of the fee associated with the bank transfer */
  async createBankTransferFeeCommand(
    bankAccountId: string,
    options: VivaCreateBankTransferFeeOptions
  ): MethodReturn<VivaCreateBankTransferFeeReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.replaceBankAccountId(
        this.endpoints.bankTransfers.bankAccounts.fees.url,
        bankAccountId
      );

      const response = await useAxios.post<VivaCreateBankTransferFeeReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaBankTransfers.createBankTransferFeeCommand',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no bank transfer fee command data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank transfer fee command created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.createBankTransferFeeCommand', e);
      return {
        success: false,
        message: 'Failed to create bank transfer fee command',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this API Call to execute a bank transfer */
  async executeBankTransfer(
    bankAccountId: string,
    options: VivaExecuteBankTransferOptions
  ): MethodReturn<VivaExecuteBankTransferReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const url = this.replaceBankAccountId(
        this.endpoints.bankTransfers.bankAccounts.send.url,
        bankAccountId
      );

      const response = await useAxios.post<VivaExecuteBankTransferReturn>(
        url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaBankTransfers.executeBankTransfer', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no executed bank transfer data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bank transfer executed successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaBankTransfers.executeBankTransfer', e);
      return {
        success: false,
        message: 'Failed to execute bank transfer',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaBankTransfers;
