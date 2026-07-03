import type {
  VivawalletAPIInit,
  VivawalletISVInit,
} from '../../src/types/Vivawallet.types';

export const standardCredentials: VivawalletAPIInit = {
  clientId: 'client-id',
  clientSecret: 'client-secret',
  merchantId: 'merchant-id',
  apikey: 'api-key',
  sourceCode: 'default-source',
  dev: true,
};

export const isvCredentials: VivawalletISVInit = {
  clientId: 'isv-client-id',
  clientSecret: 'isv-client-secret',
  resellerId: 'reseller-id',
  resellerApiKey: 'reseller-api-key',
  dev: true,
};

export function basicAuth(value: string): string {
  return 'Basic ' + Buffer.from(value).toString('base64');
}
