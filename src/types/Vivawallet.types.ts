export interface VivawalletEnpointsInit {
  /** If `true`, the demo endpoints will be used */
  dev?: boolean;
}

export interface VivawalletAPIInit extends VivawalletEnpointsInit {
  /** VivaWallet Client ID */
  clientId: string;
  /** VivaWallet Client Secret */
  clientSecret: string;
  /** VivaWallet Access Merchant ID */
  merchantId: string;
  /** VivaWallet Access API Key */
  apikey: string;
  /** Vivawallet payment source code */
  sourceCode?: string | null;
  /** Active logs in console */
  logs?: boolean;
}

export interface VivawalletISVInit
  extends Omit<VivawalletAPIInit, 'merchantId' | 'apikey'> {}

export interface VivaSmartCheckoutOptions {
  orderCode: string;
  color?: string;
  paymentMethod?: number;
  dev?: boolean;
}
