import { describe, expect, it, vi } from 'vitest';
import {
  getSmartCheckout,
  Marketplace,
  VivaBases,
  VivaISV,
  Vivawallet,
} from '../index';
import { isvCredentials, standardCredentials } from './helpers/credentials';

describe('root exports and clients', () => {
  it('exports base classes for advanced usage', () => {
    expect(VivaBases.VivaEndpoints).toBeTypeOf('function');
    expect(VivaBases.VivaSkull).toBeTypeOf('function');
    expect(VivaBases.VivaAuth).toBeTypeOf('function');
    expect(VivaBases.VivaAuthISV).toBeTypeOf('function');
  });

  it('builds Smart Checkout URLs from demo and production endpoints', () => {
    expect(getSmartCheckout({ orderCode: '123', dev: true })).toBe(
      'https://demo.vivapayments.com/web/checkout?ref=123'
    );
    expect(
      getSmartCheckout({
        orderCode: 'abc',
        color: '00ff00',
        paymentMethod: 1,
      })
    ).toBe(
      'https://www.vivapayments.com/web/checkout?ref=abc&color=00ff00&paymentMethod=1'
    );
  });

  it('initializes the Standard client modules', () => {
    const client = new Vivawallet(standardCredentials);

    expect(client.payments).toBeDefined();
    expect(client.transactions).toBeDefined();
    expect(client.source).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.resellers).toBeDefined();
    expect(client.wallets).toBeDefined();
    expect(client.bankTransfers).toBeDefined();
    expect(client.fees).toBeDefined();
    expect(client.dataServices).toBeDefined();
    expect(client.legacyBankAccounts).toBeDefined();
    expect(client.obligations).toBeDefined();
    expect(client.rfCodePayments).toBeDefined();
    expect(client.pos.devices).toBeDefined();
    expect(client.pos.transactions).toBeDefined();
    expect(client.pos.session).toBeDefined();
  });

  it('keeps the Standard deprecated webhook code wrapper compatible', async () => {
    const client = new Vivawallet(standardCredentials);
    client.webhooks.retrieveWebhookKey = vi.fn().mockResolvedValue({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: 'key',
    });

    await expect(client.getVivaWebhookCode()).resolves.toEqual({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: 'key',
    });
  });

  it('initializes the Marketplace client modules', async () => {
    const client = new Marketplace(standardCredentials);

    expect(client.source).toBeDefined();
    expect(client.payments).toBeDefined();
    expect(client.transactions).toBeDefined();
    expect(client.sellers).toBeDefined();
    expect(client.transfers).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.pos.devices).toBeDefined();

    client.webhooks.retrieveWebhookKey = vi.fn().mockResolvedValue({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: 'key',
    });
    await expect(client.getVivaWebhookCode()).resolves.toEqual({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: 'key',
    });
  });

  it('initializes the ISV client modules and webhook aliases', async () => {
    const client = new VivaISV(isvCredentials);

    expect(client.connectedAccounts).toBeDefined();
    expect(client.payments).toBeDefined();
    expect(client.transactions).toBeDefined();
    expect(client.source).toBeDefined();
    expect(client.pos.devices).toBeDefined();
    expect(client.pos.transactions).toBeDefined();
    expect(client.pos.session).toBeDefined();
    expect(client.webhooks).toBe(client.webhook);

    client.webhook.retrieveWebhookKey = vi.fn().mockResolvedValue({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: { key: 'isv-key' },
    });
    await expect(client.getVivaWebhookCode()).resolves.toEqual({
      success: true,
      message: 'Webhook key retrieved successfully',
      data: 'isv-key',
    });
  });

  it('normalizes ISV deprecated webhook wrapper failures', async () => {
    const client = new VivaISV(isvCredentials);

    client.webhook.retrieveWebhookKey = vi.fn().mockResolvedValueOnce({
      success: false,
      message: 'failure',
      data: null,
    });
    await expect(client.getVivaWebhookCode()).resolves.toEqual({
      success: false,
      message: 'failure',
      code: 'webhookerror',
      data: null,
    });

    client.webhook.retrieveWebhookKey = vi.fn().mockResolvedValueOnce({
      success: true,
      message: 'ok',
      data: {},
    });
    await expect(client.getVivaWebhookCode()).resolves.toEqual({
      success: false,
      message: 'Failed to retrieve webhook key',
      code: 'webhookerror',
      data: null,
    });
  });
});
