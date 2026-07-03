import { describe, expect, it, vi } from 'vitest';
import { axiosResponse, mockAxios } from './helpers/axios';
import { isvCredentials, standardCredentials } from './helpers/credentials';
import IsvPayments from '../src/isv/IsvPayments.class';
import IsvSourceCode from '../src/isv/IsvSourceCode.class';
import IsvTransactions from '../src/isv/IsvTransactions.class';
import MarketPlaceSellers from '../src/marketplace/MarketPlaceSellers.class';
import { useAxios } from '../src/utils/axiosInstance.ts';
import VivaDataServices from '../src/vivawallet/VivaDataServices.class';
import VivaResellers from '../src/vivawallet/VivaResellers.class';
import VivaSourceCode from '../src/vivawallet/VivaSourceCode.class';
import VivaWebhooks from '../src/vivawallet/VivaWebhooks.class';

const tokenResponse = axiosResponse({ access_token: 'token' });

describe('SDK edge contracts', () => {
  it('keeps the shared Axios response interceptor transparent', async () => {
    const handlers = (useAxios.interceptors.response as any).handlers;
    const handler = handlers[handlers.length - 1];
    const response = { data: { ok: true } };
    const error = new Error('network');

    expect(handler.fulfilled(response)).toBe(response);
    await expect(handler.rejected(error)).rejects.toBe(error);
  });

  it('handles Standard source-code missing source and already-existing source responses', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const withoutSource = new VivaSourceCode({
      ...standardCredentials,
      sourceCode: undefined,
      logs: true,
    });

    await expect(withoutSource.createSource({} as any)).resolves.toEqual({
      success: false,
      message: 'Source code is required in datas or at initialization',
      code: 'sourcecodeerror',
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith('Source code is required');

    axios.request.mockRejectedValueOnce({ status: 409 });
    const source = new VivaSourceCode({ ...standardCredentials, logs: true });
    await expect(
      source.createSource({ sourceCode: 'default-source' } as any)
    ).resolves.toEqual({
      success: false,
      message: 'Source code already exists',
      code: 'sourcecodeexist',
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith('Source code already exist');
  });

  it('handles ISV source-code init errors and already-existing source responses', async () => {
    const axios = mockAxios();
    const withoutReseller = new IsvSourceCode({
      clientId: 'client',
      clientSecret: 'secret',
    });

    await expect(
      withoutReseller.createSource({ targetMerchantId: 'target' } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'ISV Basic Auth credentials not provided',
    });

    const source = new IsvSourceCode(isvCredentials);
    await expect(source.createSource({} as any)).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'Target merchant ID not provided',
    });

    axios.request.mockRejectedValueOnce({ response: { status: 409 } });
    await expect(
      source.createSource({
        targetMerchantId: 'target',
        sourceCode: 'source',
      } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'sourcecodeexist',
    });
  });

  it('normalizes Marketplace connected-account address and payout aliases', async () => {
    const axios = mockAxios();
    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse({ id: 'account' }));
    const sellers = new MarketPlaceSellers(standardCredentials);

    await expect(
      sellers.createAccount({
        address: {
          line1: 'line',
          postalCode: '75001',
        },
        payouts: {
          dayofWeek: 2,
        },
      } as any)
    ).resolves.toMatchObject({ success: true });
    expect(axios.post.mock.calls[1][1]).toMatchObject({
      address: {
        line1: 'line',
        postCode: '75001',
      },
      payouts: {
        dayOfWeek: 2,
      },
    });

    axios.post.mockResolvedValueOnce(tokenResponse);
    axios.patch.mockResolvedValueOnce(axiosResponse({}));
    await expect(
      sellers.updateConnectedAccount('account', {
        payouts: {
          dayofWeek: 3,
        },
      } as any)
    ).resolves.toMatchObject({ success: true });
    expect(axios.patch.mock.calls[0][1]).toMatchObject({
      payouts: {
        dayOfWeek: 3,
      },
    });
  });

  it('handles ISV payment init errors and not-found order responses', async () => {
    const axios = mockAxios();
    const withoutReseller = new IsvPayments({
      clientId: 'client',
      clientSecret: 'secret',
    });

    await expect(
      withoutReseller.getOrder({
        orderCode: 123,
        targetMerchantId: 'target',
      })
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'ISV Basic Auth credentials not provided',
    });
    await expect(
      withoutReseller.cancelOrder({
        orderCode: 123,
        targetMerchantId: 'target',
      })
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'ISV Basic Auth credentials not provided',
    });

    const payments = new IsvPayments(isvCredentials);
    await expect(
      payments.getOrder({ orderCode: 'order' } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'Target merchant ID not provided',
    });
    await expect(
      payments.cancelOrder({ orderCode: 'order' } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'Target merchant ID not provided',
    });

    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    await expect(
      payments.getOrder({
        orderCode: 123,
        targetMerchantId: 'target',
      })
    ).resolves.toEqual({
      success: false,
      message: 'Order not found',
      code: 'nodatas',
      data: null,
    });
  });

  it('handles ISV transaction target merchant and reseller init errors', async () => {
    const withoutReseller = new IsvTransactions({
      clientId: 'client',
      clientSecret: 'secret',
    });

    await expect(
      withoutReseller.retrieveTransactionsByResellerSourceCode({
        targetMerchantId: 'target',
        resellerSourceCode: 'reseller-source',
      } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'ISV Basic Auth credentials not provided',
    });

    const transactions = new IsvTransactions(isvCredentials);
    await expect(
      transactions.retrieveTransactionsBySourceCode({
        sourceCode: 'source',
      } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'Target merchant ID not provided',
    });
    await expect(
      transactions.retrieveTransactionById({
        transactionId: 'transaction',
      } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'initerror',
      message: 'Target merchant ID not provided',
    });
  });

  it('handles Data Services empty 200 responses and invalid webhook payloads', async () => {
    const axios = mockAxios();
    const dataServices = new VivaDataServices({
      ...standardCredentials,
      logs: true,
    });

    axios.post.mockResolvedValueOnce(tokenResponse);
    axios.get.mockResolvedValueOnce(axiosResponse(null, 200));
    await expect(
      dataServices.retrieveMt940Data({ date: '2026-01-01' } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse(null, 200));
    await expect(
      dataServices.searchAccountTransactions({} as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    await expect(
      dataServices.parseSaleTransactionsWebhook(null)
    ).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });
  });

  it('handles Reseller OTP empty non-204 responses', async () => {
    const axios = mockAxios();
    const resellers = new VivaResellers({ ...standardCredentials, logs: true });

    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse(null, 200));
    await expect(
      resellers.resendCashPaymentOtp({ orderCode: 123 } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse(null, 200));
    await expect(
      resellers.resendBillPaymentOtp({ orderCode: 123 } as any)
    ).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });
  });

  it('handles Reseller eligibility status 200 payloads', async () => {
    const axios = mockAxios();
    const resellers = new VivaResellers(standardCredentials);

    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse({ eligible: true }, 200));
    await expect(
      resellers.checkCashPaymentEligibility({} as any)
    ).resolves.toMatchObject({
      success: true,
      data: { eligible: true },
    });

    axios.post
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(axiosResponse({ eligible: true }, 200));
    await expect(
      resellers.checkBillPaymentEligibility({} as any)
    ).resolves.toMatchObject({
      success: true,
      data: { eligible: true },
    });
  });

  it('keeps webhook key retrieval guarded when merchant credentials are absent', async () => {
    const webhooks = Object.create(VivaWebhooks.prototype) as VivaWebhooks;
    webhooks.merchantId = undefined;
    webhooks.apikey = undefined;

    await expect(webhooks.retrieveWebhookKey()).resolves.toEqual({
      success: false,
      message: 'Init not called',
      code: 'initerror',
      data: null,
    });
  });
});
