import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaEndpoints from './VivaEndpoints.class';

class VivaSkull extends VivaEndpoints {
  /** VivaWallet Client ID */
  clientId: string;
  /** VivaWallet Client Secret */
  clientSecret: string;
  /** VivaWallet Access Merchant ID */
  merchantId: string;
  /** VivaWallet Access API Key */
  apikey: string;
  /** Vivawallet payment source code */
  sourceCode: string | null;
  /** Active internal error logs in console */
  errorLogs = false;

  constructor(datas: VivawalletAPIInit) {
    super({ dev: datas.dev });
    this.clientId = datas.clientId;
    this.clientSecret = datas.clientSecret;
    this.merchantId = datas.merchantId;
    this.apikey = datas.apikey;
    this.sourceCode = datas.sourceCode || null;
    this.errorLogs = datas.logs || false;
  }
}

export default VivaSkull;
