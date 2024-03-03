export interface VivawalletEnpointsInit {
  /** If `true`, the demo endpoints will be used */
  dev?: boolean;
}

export interface VivawalletAPIInit extends VivawalletEnpointsInit {
  /** VivaWallet SmartCheckout Client ID */
  smartClientId: string;
  /** VivaWallet SmartCheckout Client Secret */
  smartClientSecret: string;
  /** VivaWallet Access Merchant ID */
  merchantId: string;
  /** VivaWallet Access API Key */
  apikey: string;
  /** Vivawallet payment source code */
  sourceCode?: string | null;
}

export interface VivaSmartCheckoutOptions {
  orderCode: string;
  color?: string;
  paymentMethod?: number;
  dev?: boolean;
}
