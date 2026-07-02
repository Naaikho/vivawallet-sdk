export interface VivawalletEnpointsInit {
  /** If `true`, the demo endpoints will be used */
  dev?: boolean;
}

export interface VivaOAuthCredentials {
  /** VivaWallet Client ID used to request an OAuth 2.0 access token. */
  clientId: string;
  /** VivaWallet Client Secret used to request an OAuth 2.0 access token. */
  clientSecret: string;
}

export interface VivaMerchantCredentials {
  /** VivaWallet Merchant ID used with Basic Auth. */
  merchantId: string;
  /** VivaWallet API Key used with Basic Auth. */
  apikey: string;
}

export interface VivaResellerCredentials {
  /** VivaWallet Reseller ID used by reseller-authenticated ISV Basic Auth calls. */
  resellerId: string;
  /** VivaWallet Reseller API Key used by reseller-authenticated ISV Basic Auth calls. */
  resellerApiKey: string;
}

export interface VivawalletBaseInit
  extends VivawalletEnpointsInit,
    VivaOAuthCredentials {
  /** Vivawallet payment source code */
  sourceCode?: string | null;
  /** Active logs in console */
  logs?: boolean;
}

export interface VivawalletAPIInit
  extends VivawalletBaseInit,
    VivaMerchantCredentials {}

export interface VivawalletISVInit
  extends VivawalletBaseInit,
    Partial<VivaResellerCredentials> {}

export interface VivaSmartCheckoutOptions {
  orderCode: string;
  color?: string;
  paymentMethod?: number;
  dev?: boolean;
}
