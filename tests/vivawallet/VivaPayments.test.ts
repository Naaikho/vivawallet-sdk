import { describe, expect, it, vi } from 'vitest';
import { axiosResponse, mockAxios } from '../helpers/axios';
import { basicAuth, standardCredentials } from '../helpers/credentials';
import VivaPayments from '../../src/vivawallet/VivaPayments.class';

describe('VivaPayments', () => {
  it('creates checkout orders with OAuth Bearer authorization', async () => {
    const axios = mockAxios();
    axios.post
      .mockResolvedValueOnce(axiosResponse({ access_token: 'token' }))
      .mockResolvedValueOnce(axiosResponse({ orderCode: 123 }));
    const payments = new VivaPayments(standardCredentials);

    await expect(
      payments.createOrder({ amount: 100, customerTrns: 'test' })
    ).resolves.toEqual({
      success: true,
      message: 'Order created successfully',
      data: { orderCode: 123 },
    });

    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      'https://demo-api.vivapayments.com/checkout/v2/orders',
      { amount: 100, customerTrns: 'test' },
      {
        headers: {
          Authorization: 'Bearer token',
        },
      }
    );
  });

  it('returns nodatas when checkout order creation returns no payload', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    axios.post
      .mockResolvedValueOnce(axiosResponse({ access_token: 'token' }))
      .mockResolvedValueOnce(axiosResponse(null));
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    await expect(payments.createOrder({ amount: 100 })).resolves.toEqual({
      success: false,
      message: 'Vivawallet returned no created order data',
      code: 'nodatas',
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith(
      'Vivawallet returned no created order data',
      null
    );
  });

  it('returns errors and logs only when enabled for checkout order creation', async () => {
    const axios = mockAxios();
    axios.post
      .mockResolvedValueOnce(axiosResponse({ access_token: 'token' }))
      .mockRejectedValueOnce(new Error('network'));
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    await expect(payments.createOrder({ amount: 100 })).resolves.toEqual({
      success: false,
      message: 'Failed to create VivaWallet order',
      code: 'error',
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.createOrder',
      expect.any(Error)
    );
  });

  it('retrieves orders with merchant Basic authorization', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValueOnce(axiosResponse({ orderCode: 123 }));
    const payments = new VivaPayments(standardCredentials);

    await expect(payments.getOrder('order/with space')).resolves.toEqual({
      success: true,
      message: 'Order retrieved successfully',
      data: { orderCode: 123 },
    });
    expect(axios.get).toHaveBeenCalledWith(
      'https://demo.vivapayments.com/api/orders/order%2Fwith%20space',
      {
        headers: {
          Authorization: basicAuth('merchant-id:api-key'),
        },
      }
    );
  });

  it('handles retrieve order empty and error responses', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    axios.get.mockResolvedValueOnce(axiosResponse(null));
    await expect(payments.getOrder(123)).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    axios.get.mockRejectedValueOnce(new Error('network'));
    await expect(payments.getOrder(123)).resolves.toMatchObject({
      success: false,
      code: 'error',
    });
    expect(consoleError).toHaveBeenCalledWith('VivaPayments.getOrder', null);
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.getOrder',
      expect.any(Error)
    );
  });

  it('cancels orders with merchant Basic authorization', async () => {
    const axios = mockAxios();
    axios.delete.mockResolvedValueOnce(axiosResponse({ canceled: true }));
    const payments = new VivaPayments(standardCredentials);

    await expect(payments.cancelOrder('order/1')).resolves.toEqual({
      success: true,
      message: 'Order canceled successfully',
      data: null,
    });
    expect(axios.delete).toHaveBeenCalledWith(
      'https://demo.vivapayments.com/api/orders/order%2F1',
      {
        headers: {
          Authorization: basicAuth('merchant-id:api-key'),
        },
      }
    );
  });

  it('normalizes cancel order no-data, 404 and generic errors', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    axios.delete.mockResolvedValueOnce(axiosResponse(null));
    await expect(payments.cancelOrder('123')).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    axios.delete.mockRejectedValueOnce({ response: { status: 404 } });
    await expect(payments.cancelOrder('123')).resolves.toEqual({
      success: false,
      message: 'Order already canceled or not found',
      code: 'alreadycanceled',
      data: null,
    });

    axios.delete.mockRejectedValueOnce(new Error('network'));
    await expect(payments.cancelOrder('123')).resolves.toMatchObject({
      success: false,
      code: 'error',
    });
    expect(consoleError).toHaveBeenCalledWith(
      'Vivawallet returned no canceled order data',
      null
    );
    expect(consoleError).toHaveBeenCalledWith('VivaPayments.cancelOrder', {
      response: { status: 404 },
    });
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.cancelOrder',
      expect.any(Error)
    );
  });

  it('updates orders with merchant Basic authorization', async () => {
    const axios = mockAxios();
    axios.patch.mockResolvedValueOnce(axiosResponse({ orderCode: 123 }));
    const payments = new VivaPayments(standardCredentials);

    await expect(
      payments.updateOrder(123, { customerTrns: 'updated' })
    ).resolves.toEqual({
      success: true,
      message: 'Order updated successfully',
      data: { orderCode: 123 },
    });
    expect(axios.patch).toHaveBeenCalledWith(
      'https://demo.vivapayments.com/api/orders/123',
      { customerTrns: 'updated' },
      {
        headers: {
          Authorization: basicAuth('merchant-id:api-key'),
        },
      }
    );
  });

  it('handles update order empty 200, empty non-200 and errors', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    axios.patch.mockResolvedValueOnce(axiosResponse(null, 200));
    await expect(payments.updateOrder(123, {})).resolves.toMatchObject({
      success: true,
      data: {},
    });

    axios.patch.mockResolvedValueOnce(axiosResponse(null, 204));
    await expect(payments.updateOrder(123, {})).resolves.toMatchObject({
      success: false,
      code: 'nodatas',
    });

    axios.patch.mockRejectedValueOnce(new Error('network'));
    await expect(payments.updateOrder(123, {})).resolves.toMatchObject({
      success: false,
      code: 'error',
    });
    expect(consoleError).toHaveBeenCalledWith('VivaPayments.updateOrder', null);
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.updateOrder',
      expect.any(Error)
    );
  });

  it('creates legacy orders with merchant Basic authorization', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValueOnce(axiosResponse({ OrderCode: 123 }));
    const payments = new VivaPayments(standardCredentials);

    await expect(payments.createLegacyOrder({ amount: 100 })).resolves.toEqual({
      success: true,
      message: 'Legacy order created successfully',
      data: { OrderCode: 123 },
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://demo.vivapayments.com/api/orders',
      { amount: 100 },
      {
        headers: {
          Authorization: basicAuth('merchant-id:api-key'),
        },
      }
    );
  });

  it('handles legacy order no-data and error responses', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const payments = new VivaPayments({ ...standardCredentials, logs: true });

    axios.post.mockResolvedValueOnce(axiosResponse(null));
    await expect(payments.createLegacyOrder({ amount: 100 })).resolves.toEqual({
      success: false,
      message: 'Vivawallet returned no legacy created order data',
      code: 'nodatas',
      data: null,
    });

    axios.post.mockRejectedValueOnce(new Error('network'));
    await expect(payments.createLegacyOrder({ amount: 100 })).resolves.toEqual({
      success: false,
      message: 'Failed to create legacy VivaWallet order',
      code: 'error',
      data: null,
    });
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.createLegacyOrder',
      null
    );
    expect(consoleError).toHaveBeenCalledWith(
      'VivaPayments.createLegacyOrder',
      expect.any(Error)
    );
  });
});
