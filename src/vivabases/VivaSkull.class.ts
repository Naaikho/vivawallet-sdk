import {
  VivaMerchantCredentials,
  VivaOAuthCredentials,
  VivaResellerCredentials,
  VivawalletBaseInit,
} from '../types/Vivawallet.types';
import VivaEndpoints from './VivaEndpoints.class';

type VivaSkullInit = VivawalletBaseInit &
  Partial<VivaMerchantCredentials> &
  Partial<VivaResellerCredentials>;

class VivaSkull extends VivaEndpoints {
  /** VivaWallet Client ID */
  clientId: string;
  /** VivaWallet Client Secret */
  clientSecret: string;
  /** VivaWallet Access Merchant ID */
  merchantId?: string;
  /** VivaWallet Access API Key */
  apikey?: string;
  /** VivaWallet Reseller ID */
  resellerId?: string;
  /** VivaWallet Reseller API Key */
  resellerApiKey?: string;
  /** VivaWallet OAuth credentials */
  oauthCredentials: VivaOAuthCredentials;
  /** VivaWallet merchant Basic Auth credentials, when available */
  merchantCredentials?: VivaMerchantCredentials;
  /** VivaWallet reseller credentials, when available */
  resellerCredentials?: VivaResellerCredentials;
  /** Vivawallet payment source code */
  sourceCode: string | null;
  /** Active internal error logs in console */
  errorLogs = false;

  constructor(datas: VivaSkullInit) {
    super({ dev: datas.dev });
    this.clientId = datas.clientId;
    this.clientSecret = datas.clientSecret;
    this.merchantId = datas.merchantId;
    this.apikey = datas.apikey;
    this.resellerId = datas.resellerId;
    this.resellerApiKey = datas.resellerApiKey;
    this.oauthCredentials = {
      clientId: datas.clientId,
      clientSecret: datas.clientSecret,
    };
    this.merchantCredentials =
      datas.merchantId && datas.apikey
        ? {
            merchantId: datas.merchantId,
            apikey: datas.apikey,
          }
        : undefined;
    this.resellerCredentials =
      datas.resellerId && datas.resellerApiKey
        ? {
            resellerId: datas.resellerId,
            resellerApiKey: datas.resellerApiKey,
            merchantId: datas.merchantId,
          }
        : undefined;
    this.sourceCode = datas.sourceCode || null;
    this.errorLogs = datas.logs || false;
  }
}

export default VivaSkull;
