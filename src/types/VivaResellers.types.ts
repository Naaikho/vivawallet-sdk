export interface VivaResellerCheckCashPaymentOptions {
  /** The customer's phone number */
  phone?: string;

  /** Payment amount */
  amount?: number | null;

  /** The order's unique code */
  orderCode?: number | null;

  /** A unique 20-digit code that allows you to make a payment by bank deposit without knowing the IBAN of the account holder */
  rfPaymentCode?: string;

  /** The country code of the customer */
  countryCode?: string;
}

export interface VivaResellerCheckBillPaymentOptions {
  /** The customer's phone number */
  phone?: string;

  /** Payment amount */
  amount?: number | null;

  /** The country code of the customer */
  countryCode?: string;
}

export interface VivaResellerOtpOptions {
  /** The customer's phone number */
  phone: string;

  /** The country code of the customer */
  countryCode?: string;
}

export interface VivaResellerEligibilityReturn {
  /** Additional eligibility data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaResellerCashPaymentOptions {
  /** The customer's phone number */
  phone?: string;

  /** Payment amount */
  amount?: number | null;

  /** The order's unique code */
  orderCode?: number | null;

  /** The merchant's unique ID */
  merchantId?: string;

  /** A unique 20-digit code that allows you to make a payment by bank deposit without knowing the IBAN of the account holder */
  rfPaymentCode?: string;

  /** The country code of the customer */
  countryCode?: string;

  /** OTP - One-Time Password */
  oneTimePassword?: string;

  /** The Reseller's Source Code */
  resellerSourceCode?: string;

  /** Mandatory only when eligibility check responds with eventId 109101 */
  tags?: string[];
}

export interface VivaResellerCashPaymentReturn {
  /** The customer's email address */
  email?: string;

  /** Payment amount */
  amount?: number;

  /** The merchant's unique ID */
  merchantId?: string;

  /** The order's unique code */
  orderCode?: number | null;

  /** The Transaction's unique ID */
  transactionId?: string;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaResellerBillPaymentOptions {
  /** VAT */
  vat?: string;

  /** Payment amount */
  amount?: number;

  /** The customer's phone number */
  phone?: string;

  /** Date */
  date?: string;

  /** The customer's last name */
  lastName?: string;

  /** The order's unique code */
  orderCode?: number | null;

  /** The customer's last name */
  firstName?: string;

  /** Mandatory only when eligibility check responds with eventId 109101 */
  tags?: string[];

  /** The country code of the customer */
  countryCode?: string;

  /** An ID or a short description that helps you uniquely identify the transaction */
  merchantTrns?: string;

  /** OTP - One-Time Password */
  oneTimePassword?: string;

  /** The Bill ID */
  billId?: number;

  /** The reseller's Source Code */
  resellerSourceCode?: string;
}

export interface VivaResellerBillPaymentReturn {
  /** The customer's email address */
  email?: string;

  /** Payment amount */
  amount?: number;

  /** The order's unique code */
  orderCode?: number | null;

  /** The Transaction's unique ID */
  transactionId?: string;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaResellerCreateOrderOptions {
  /** Payment amount */
  amount?: number;

  /** The customer's email address */
  email?: string;

  /** The customer's phone number */
  phone?: string;

  /** Used only when you want to create an order for wallet top-up. */
  productId?: string | null;

  /** The customer's full name */
  fullName?: string;

  /** The Merchant's unique ID */
  merchantId?: string | null;

  /** The country code of the customer */
  countryCode?: string;

  /** The language in which the payment form is displayed. */
  requestLang?: string;

  /** The numeric code of the currency as defined in ISO 4712 */
  currencyCode?: string;

  /** Used to help the Merchant identify the order */
  merchantTrns?: string;

  /** Friendly description displayed to the customer */
  customerTrns?: string;

  /** Destination ID of the wallet to which you wish to make the transfer */
  targetWalletId?: number | null;

  /** Specify if the amount to be paid can be changed (true) or remains fixed (default value) */
  disableExactAmount?: boolean;

  /** The reseller's Source Code */
  resellerSourceCode?: string;
}

export interface VivaResellerCreateOrderReturn {
  /** The order's unique code */
  orderCode: number;

  /** A unique 20-digit code that allows you to make a payment by bank deposit without knowing the IBAN of the account holder */
  rfPaymentCode: string;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}
