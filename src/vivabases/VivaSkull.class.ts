import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaEndpoints from './VivaEndpoints.class';

class VivaSkull extends VivaEndpoints {
  /** VivaWallet SmartCheckout Client ID */
  smartClientId: string;
  /** VivaWallet SmartCheckout Client Secret */
  smartClientSecret: string;
  /** VivaWallet Access Merchant ID */
  merchantId: string;
  /** VivaWallet Access API Key */
  apikey: string;
  /** Vivawallet payment source code */
  sourceCode: string | null;

  constructor(datas: VivawalletAPIInit) {
    super({ dev: datas.dev });
    this.smartClientId = datas.smartClientId;
    this.smartClientSecret = datas.smartClientSecret;
    this.merchantId = datas.merchantId;
    this.apikey = datas.apikey;
    this.sourceCode = datas.sourceCode || null;
  }
}

export default VivaSkull;
