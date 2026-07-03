import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Marketplace, VivaISV, Vivawallet } from '../index';
import { useAxios } from '../src/utils/axiosInstance.ts';
import { isvCredentials, standardCredentials } from './helpers/credentials';

type Mode = 'success' | 'nodata' | 'error' | 'tokenerror';

const privateMethodNames = new Set([
  'getCloudTerminalAuthorization',
  'getISVAuthorization',
  'getResellerAuthorization',
  'normalizeConnectedAccountAddress',
  'normalizeConnectedAccountPayouts',
  'normalizeCreateAccountDatas',
  'normalizeSessionInfoQuery',
  'normalizeUpdateConnectedAccountOptions',
  'postTransaction',
  'replaceBankAccountId',
  'validateTargetMerchantId',
]);

const sampleArg = {
  accountId: 'account-id',
  actionId: 'action-id',
  amount: 100,
  Amount: 100,
  bankAccountId: 'bank-account-id',
  commandId: 'command-id',
  connectedAccountId: 'connected-account-id',
  customerTrns: 'customer transaction',
  dateFrom: '2026-01-01T00:00:00Z',
  dateTo: '2026-01-02T00:00:00Z',
  deviceId: 'device-id',
  email: 'merchant@example.com',
  eventTypeId: 1796,
  iban: 'GB33BUKB20201555555555',
  orderCode: 'order-code',
  phone: '+306900000000',
  sessionId: 'session-id',
  sourceCode: 'source-code',
  targetMerchantId: 'target-merchant-id',
  transactionId: 'transaction-id',
  walletId: 1,
};

const successPayload = {
  access_token: 'token',
  accountId: 'account-id',
  actionId: 'action-id',
  bankAccountId: 'bank-account-id',
  code: 'source-code',
  commandId: 'command-id',
  data: [{ id: 'item-id' }],
  Data: [{ id: 'item-id' }],
  devices: [{ id: 'device-id' }],
  expires_in: 3600,
  id: 'id',
  key: 'webhook-key',
  Key: 'webhook-key',
  orderCode: 123,
  OrderCode: 123,
  sessionId: 'session-id',
  subscriptions: [{ id: 'subscription-id' }],
  token_type: 'Bearer',
  transactionId: 'transaction-id',
  TransactionId: 'transaction-id',
  transferId: 'transfer-id',
  walletId: 1,
};

function axiosResponse(data: unknown, status = 200) {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

function installAxiosMocks(mode: Mode) {
  const resolveByUrl = (url?: unknown) => {
    const urlString = String(url ?? '');
    if (urlString.includes('/connect/token')) {
      return Promise.resolve(
        axiosResponse(
          mode === 'tokenerror'
            ? null
            : {
                access_token: 'token',
                expires_in: 3600,
                token_type: 'Bearer',
              },
          mode === 'tokenerror' ? 204 : 200
        )
      );
    }

    if (mode === 'error') return Promise.reject(new Error('network'));

    return Promise.resolve(
      axiosResponse(mode === 'success' ? successPayload : null, 204)
    );
  };

  vi.spyOn(useAxios, 'get').mockImplementation((url) => resolveByUrl(url));
  vi.spyOn(useAxios, 'post').mockImplementation((url) => resolveByUrl(url));
  vi.spyOn(useAxios, 'patch').mockImplementation((url) => resolveByUrl(url));
  vi.spyOn(useAxios, 'put').mockImplementation((url) => resolveByUrl(url));
  vi.spyOn(useAxios, 'delete').mockImplementation((url) => resolveByUrl(url));
  vi.spyOn(useAxios, 'request').mockImplementation((config) =>
    resolveByUrl(config?.url)
  );
}

function collectMethodSpecs(logs = false) {
  const clients = [
    ['standard', new Vivawallet({ ...standardCredentials, logs })],
    ['marketplace', new Marketplace({ ...standardCredentials, logs })],
    ['isv', new VivaISV({ ...isvCredentials, logs })],
  ] as const;
  const specs: Array<{
    label: string;
    instance: Record<string, unknown>;
    methodName: string;
  }> = [];
  const visited = new Set<object>();

  const visit = (label: string, value: unknown) => {
    if (!value || typeof value !== 'object' || visited.has(value)) return;
    visited.add(value);

    const prototype = Object.getPrototypeOf(value);
    for (const methodName of Object.getOwnPropertyNames(prototype)) {
      if (methodName === 'constructor') continue;
      if (privateMethodNames.has(methodName)) continue;

      const method = (value as Record<string, unknown>)[methodName];
      if (typeof method === 'function') {
        specs.push({
          label: `${label}.${methodName}`,
          instance: value as Record<string, unknown>,
          methodName,
        });
      }
    }

    for (const [key, child] of Object.entries(value)) {
      if (!child || typeof child !== 'object') continue;
      if (key === 'endpoints' || key.endsWith('Credentials')) continue;
      visit(`${label}.${key}`, child);
    }
  };

  for (const [label, client] of clients) visit(label, client);

  return specs;
}

describe('SDK HTTP contract smoke coverage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('executes every public SDK method against mocked successful HTTP responses', async () => {
    installAxiosMocks('success');

    for (const spec of collectMethodSpecs()) {
      const method = spec.instance[spec.methodName] as (
        ...args: unknown[]
      ) => unknown;

      await expect(
        Promise.resolve(method.call(spec.instance, sampleArg, sampleArg)),
        spec.label
      ).resolves.toBeDefined();
    }
  });

  it('executes every public SDK method against mocked empty HTTP responses', async () => {
    installAxiosMocks('nodata');

    for (const spec of collectMethodSpecs(true)) {
      const method = spec.instance[spec.methodName] as (
        ...args: unknown[]
      ) => unknown;

      await expect(
        Promise.resolve(method.call(spec.instance, sampleArg, sampleArg)),
        spec.label
      ).resolves.toBeDefined();
    }
  });

  it('executes every public SDK method against mocked HTTP errors', async () => {
    installAxiosMocks('error');

    for (const spec of collectMethodSpecs(true)) {
      const method = spec.instance[spec.methodName] as (
        ...args: unknown[]
      ) => unknown;

      await expect(
        Promise.resolve(method.call(spec.instance, sampleArg, sampleArg)),
        spec.label
      ).resolves.toBeDefined();
    }
  });

  it('executes every public SDK method against mocked token failures', async () => {
    installAxiosMocks('tokenerror');

    for (const spec of collectMethodSpecs(true)) {
      const method = spec.instance[spec.methodName] as (
        ...args: unknown[]
      ) => unknown;

      await expect(
        Promise.resolve(method.call(spec.instance, sampleArg, sampleArg)),
        spec.label
      ).resolves.toBeDefined();
    }
  });
});
