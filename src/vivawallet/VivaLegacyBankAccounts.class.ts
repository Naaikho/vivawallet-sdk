import { MethodReturn } from '../types/Methods.types';
import {
  VivaLegacyBankAccountReturn,
  VivaLegacyLinkBankAccountOptions,
  VivaLegacyOutgoingBankTransferOptions,
  VivaLegacyOutgoingBankTransferReturn,
} from '../types/VivaLegacyBankAccounts.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaLegacyBankAccounts extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Link bank account (OLD) */
  async linkBankAccount(
    options: VivaLegacyLinkBankAccountOptions
  ): MethodReturn<VivaLegacyBankAccountReturn | null, 'nodatas'> {
    try {
      const response = await useAxios.post<VivaLegacyBankAccountReturn>(
        this.endpoints.legacyBankAccounts.link.url,
        options,
        {
          headers: {
            Authorization: this.getVivaBasicAuth(),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaLegacyBankAccounts.linkBankAccount',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy bank account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy bank account linked successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaLegacyBankAccounts.linkBankAccount', e);
      return {
        success: false,
        message: 'Failed to link legacy bank account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve bank accounts (OLD) */
  async retrieveBankAccounts(): MethodReturn<
    VivaLegacyBankAccountReturn[] | VivaLegacyBankAccountReturn | null,
    'nodatas'
  > {
    try {
      const response = await useAxios.get<
        VivaLegacyBankAccountReturn[] | VivaLegacyBankAccountReturn
      >(this.endpoints.legacyBankAccounts.list.url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaLegacyBankAccounts.retrieveBankAccounts',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy bank accounts data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy bank accounts retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaLegacyBankAccounts.retrieveBankAccounts', e);
      return {
        success: false,
        message: 'Failed to retrieve legacy bank accounts',
        code: 'error',
        data: null,
      };
    }
  }

  /** Outgoing bank transfer (OLD) */
  async outgoingBankTransfer(
    walletId: string | number,
    bankAccountId: string,
    options: VivaLegacyOutgoingBankTransferOptions
  ): MethodReturn<VivaLegacyOutgoingBankTransferReturn | null, 'nodatas'> {
    try {
      const url = this.endpoints.legacyBankAccounts.outgoingBankTransfer.url
        .replace('{walletId}', encodeURIComponent(String(walletId)))
        .replace('{bankAccountId}', encodeURIComponent(bankAccountId));

      const response =
        await useAxios.post<VivaLegacyOutgoingBankTransferReturn>(
          url,
          options,
          {
            headers: {
              Authorization: this.getVivaBasicAuth(),
            },
          }
        );

      if (!response.data && response.status !== 200) {
        if (this.errorLogs)
          console.error(
            'VivaLegacyBankAccounts.outgoingBankTransfer',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy outgoing bank transfer data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy outgoing bank transfer created successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaLegacyBankAccounts.outgoingBankTransfer', e);
      return {
        success: false,
        message: 'Failed to create legacy outgoing bank transfer',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve bank account by Id (OLD) */
  async retrieveBankAccountById(
    bankAccountId: string
  ): MethodReturn<VivaLegacyBankAccountReturn | null, 'nodatas'> {
    try {
      const url = this.endpoints.legacyBankAccounts.get.url.replace(
        '{bankAccountId}',
        encodeURIComponent(bankAccountId)
      );

      const response = await useAxios.get<VivaLegacyBankAccountReturn>(url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaLegacyBankAccounts.retrieveBankAccountById',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy bank account data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy bank account retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaLegacyBankAccounts.retrieveBankAccountById', e);
      return {
        success: false,
        message: 'Failed to retrieve legacy bank account',
        code: 'error',
        data: null,
      };
    }
  }

  /** Unlink bank account (OLD) */
  async unlinkBankAccount(
    bankAccountId: string
  ): MethodReturn<null, 'nodatas'> {
    try {
      const url = this.endpoints.legacyBankAccounts.unlink.url.replace(
        '{bankAccountId}',
        encodeURIComponent(bankAccountId)
      );

      const response = await useAxios.delete(url, {
        headers: {
          Authorization: this.getVivaBasicAuth(),
        },
      });

      if (response.status !== 200 && !response.data) {
        if (this.errorLogs)
          console.error(
            'VivaLegacyBankAccounts.unlinkBankAccount',
            response.data
          );
        return {
          success: false,
          message: 'Vivawallet returned no legacy bank account unlink data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Legacy bank account unlinked successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaLegacyBankAccounts.unlinkBankAccount', e);
      return {
        success: false,
        message: 'Failed to unlink legacy bank account',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaLegacyBankAccounts;
