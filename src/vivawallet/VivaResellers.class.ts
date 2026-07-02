import { MethodReturn } from '../types/Methods.types';
import {
  VivaResellerBillPaymentOptions,
  VivaResellerBillPaymentReturn,
  VivaResellerCashPaymentOptions,
  VivaResellerCashPaymentReturn,
  VivaResellerCheckBillPaymentOptions,
  VivaResellerCheckCashPaymentOptions,
  VivaResellerCreateOrderOptions,
  VivaResellerCreateOrderReturn,
  VivaResellerEligibilityReturn,
  VivaResellerOtpOptions,
} from '../types/VivaResellers.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { useAxios } from '../utils/axiosInstance.ts';
import { querifyDefinedDatas } from '../utils/functions';
import { VivaAuth } from '../vivabases/VivaAuth.class';

class VivaResellers extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** Use this endpoint to check whether the customer is eligible to pay */
  async checkCashPaymentEligibility(
    options: VivaResellerCheckCashPaymentOptions
  ): MethodReturn<VivaResellerEligibilityReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaResellerEligibilityReturn>(
        this.endpoints.resellers.transactions.checkCashPaymentEligibility.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (response.status === 204) {
        return {
          success: true,
          message: 'Cash payment eligibility checked successfully',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Cash payment eligibility checked successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaResellers.checkCashPaymentEligibility', e);
      return {
        success: false,
        message: 'Failed to check cash payment eligibility',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this endpoint to check wether the customer is eligible to pay */
  async checkBillPaymentEligibility(
    options: VivaResellerCheckBillPaymentOptions
  ): MethodReturn<VivaResellerEligibilityReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaResellerEligibilityReturn>(
        this.endpoints.resellers.transactions.checkBillPaymentEligibility.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (response.status === 204) {
        return {
          success: true,
          message: 'Bill payment eligibility checked successfully',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bill payment eligibility checked successfully',
        data: response.data || null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaResellers.checkBillPaymentEligibility', e);
      return {
        success: false,
        message: 'Failed to check bill payment eligibility',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this endpoint to resend another OTP to customer only if OTP created by '/resellers/v1/transactions/cashPayments:validate' has been expired */
  async resendCashPaymentOtp(
    options: VivaResellerOtpOptions
  ): MethodReturn<null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(options);
      const url =
        this.endpoints.resellers.transactions.resendCashPaymentOtp.url +
        (queries ? '?' + queries : '');

      const response = await useAxios.post(url, null, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (response.status !== 204 && !response.data) {
        if (this.errorLogs)
          console.error('VivaResellers.resendCashPaymentOtp', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no cash payment OTP data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Cash payment OTP resent successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaResellers.resendCashPaymentOtp', e);
      return {
        success: false,
        message: 'Failed to resend cash payment OTP',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this endpoint to resend another OTP to customer only if OTP created by '/resellers/v1/transactions/billPayments:validate' has been expired */
  async resendBillPaymentOtp(
    options: VivaResellerOtpOptions
  ): MethodReturn<null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;
      const queries = querifyDefinedDatas(options);
      const url =
        this.endpoints.resellers.transactions.resendBillPaymentOtp.url +
        (queries ? '?' + queries : '');

      const response = await useAxios.post(url, null, {
        headers: {
          Authorization: this.getBearerAuthorization(vivaToken),
        },
      });

      if (response.status !== 204 && !response.data) {
        if (this.errorLogs)
          console.error('VivaResellers.resendBillPaymentOtp', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no bill payment OTP data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bill payment OTP resent successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaResellers.resendBillPaymentOtp', e);
      return {
        success: false,
        message: 'Failed to resend bill payment OTP',
        code: 'error',
        data: null,
      };
    }
  }

  /** Cash payment */
  async cashPayment(
    options: VivaResellerCashPaymentOptions
  ): MethodReturn<VivaResellerCashPaymentReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaResellerCashPaymentReturn>(
        this.endpoints.resellers.transactions.cashPayment.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaResellers.cashPayment', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no cash payment data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Cash payment created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaResellers.cashPayment', e);
      return {
        success: false,
        message: 'Failed to create cash payment',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this endpoint to pay bills */
  async billPayment(
    options: VivaResellerBillPaymentOptions
  ): MethodReturn<VivaResellerBillPaymentReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaResellerBillPaymentReturn>(
        this.endpoints.resellers.transactions.billPayment.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaResellers.billPayment', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no bill payment data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Bill payment created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaResellers.billPayment', e);
      return {
        success: false,
        message: 'Failed to create bill payment',
        code: 'error',
        data: null,
      };
    }
  }

  /** Use this endpoint to create an order */
  async createOrder(
    options: VivaResellerCreateOrderOptions
  ): MethodReturn<VivaResellerCreateOrderReturn | null, 'nodatas'> {
    try {
      const vivaToken = (await this.getVivaAccessToken()).data;

      const response = await useAxios.post<VivaResellerCreateOrderReturn>(
        this.endpoints.resellers.orders.create.url,
        options,
        {
          headers: {
            Authorization: this.getBearerAuthorization(vivaToken),
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaResellers.createOrder', response.data);
        return {
          success: false,
          message: 'Vivawallet returned no reseller order data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Reseller order created successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaResellers.createOrder', e);
      return {
        success: false,
        message: 'Failed to create reseller order',
        code: 'error',
        data: null,
      };
    }
  }
}

export default VivaResellers;
