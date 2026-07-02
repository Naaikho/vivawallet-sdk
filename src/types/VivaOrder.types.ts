export type VivaOrderRequestLang =
  | 'bg-BG'
  | 'hr-HR'
  | 'cs-CZ'
  | 'da-DK'
  | 'nl-NL'
  | 'nl-BE'
  | 'en-GB'
  | 'en-US'
  | 'fi-FI'
  | 'fr-BE'
  | 'fr-FR'
  | 'de-DE'
  | 'el-GR'
  | 'hu-HU'
  | 'it-IT'
  | 'pl-PL'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'es-ES'
  | 'sv-SE';

export interface VivaOrderCustomerInfo {
  /**
   * The customer's e-mail address, used on the payment form.
   *
   * `[ 1 .. 50 ]` characters
   */
  email?: string;

  /**
   * The customer's full name, used on the payment form.
   *
   * `[ 1 .. 100 ]` characters
   */
  fullName?: string;

  /**
   * The customer's telephone number for inclusion in the sales transaction details.
   *
   * `[ 1 .. 30 ]` characters
   */
  phone?: string;

  /** The country code of the customer. Consists of two-letter ISO 3166-1 alpha-2 country code. */
  countryCode?: string;

  /**
   * The language (culture info) of the order.
   *
   * Allowed Values:
   * `bg-BG`, `hr-HR`, `cs-CZ`, `da-DK`, `nl-NL`, `nl-BE`, `en-GB`, `en-US`, `fi-FI`, `fr-BE`, `fr-FR`, `de-DE`, `el-GR`, `hu-HU`, `it-IT`, `pl-PL`, `pt-PT`, `ro-RO`, `ru-RU`, `es-ES`, `sv-SE`
   */
  requestLang?: VivaOrderRequestLang;
}

export interface VivaOrderPaymentMethodFee {
  /** The ID of the payment method. */
  paymentMethodId: string;

  /**
   * The fee associated with the payment method.
   *
   * *In the currency's smallest unit of measurement*
   */
  fee: number;
}

export interface VivaPaymentOrderOptions {
  /**
   * The amount associated with this payment order in the currency's smallest unit of measurement.
   *
   * `integer <int64> >= 30`
   */
  amount: number;

  /**
   * A friendly description to the payment order for display to the customer.
   *
   * `[ 1 .. 2048 ]` characters
   */
  customerTrns?: string;

  /** Information about the customer. */
  customer?: VivaOrderCustomerInfo;

  /**
   * The time given to the customer to complete the payment in seconds.
   *
   * Default: `1800`
   */
  paymentTimeout?: number;

  /**
   * If set to true, a pre-auth transaction will be performed.
   *
   * Default: `false`
   */
  preauth?: boolean;

  /**
   * If set to true, recurring payments are enabled.
   *
   * Default: `false`
   */
  allowRecurring?: boolean;

  /**
   * The maximum number of installments that the customer can choose.
   *
   * `integer <int32> [ 1 .. 36 ]`
   */
  maxInstallments?: number;

  /**
   * If set to true, the customer will be forced to pay with the specific number of installments.
   *
   * Default: `false`
   */
  forceMaxInstallments?: boolean;

  /**
   * If set to true, an email notification will be sent to the customer to request payment.
   *
   * Default: `false`
   */
  paymentNotification?: boolean;

  /**
   * The tip value included in the amount of the payment order and marked as tip.
   *
   * `integer <int64>`
   */
  tipAmount?: number;

  /**
   * If set to true, any amount specified in the payment order is ignored.
   *
   * Default: `false`
   */
  disableExactAmount?: boolean;

  /**
   * If set to true, the customer will not have the option to pay in cash at a Viva Spot.
   *
   * Default: `false`
   */
  disableCash?: boolean;

  /**
   * If set to true, the customer will not have the option to pay using their Viva personal account.
   *
   * Default: `false`
   */
  disableWallet?: boolean;

  /** The code of the payment source associated with the merchant. */
  sourceCode?: string;

  /**
   * An ID or a short description that helps uniquely identify the transaction.
   *
   * `[ 1 .. 2048 ]` characters
   */
  merchantTrns?: string;

  /** Tags to help in grouping and filtering transactions. */
  tags?: string[];

  /** Card tokens saved on your backend for this customer. */
  cardTokens?: string[];

  /** Additional `Service fee` for specific payment methods. */
  paymentMethodFees?: VivaOrderPaymentMethodFee[];

  /**
   * Set to true to trigger a verification using Card Verification functionality.
   *
   * Default: `false`
   */
  isCardVerification?: boolean;
}

export interface VivaPaymentOrderReturn {
  orderCode: number;
}

export interface VivaLegacyPaymentOrderOptions {
  /**
   * The amount associated with this payment order. The amount will be in the currency of your merchant account using the currency's smallest unit of measurement (e.g. cents of a euro). It must always be greater than 30 (which is the minimum amount you can charge with Viva).
   *
   * `integer <int64> >= 30`
   */
  amount: number;

  /**
   * The customer's e-mail address, used on the payment form.
   *
   * `[ 1 .. 50 ]` characters
   */
  email?: string;

  /**
   * The customer's full name, used on the payment form.
   *
   * `[ 1 .. 100 ]` characters
   */
  fullName?: string;

  /**
   * This optional parameter adds a friendly description to the payment order that you want to display to the customer on the payment form.
   *
   * `[ 1 .. 2048 ]` characters
   */
  customerTrns?: string;

  /** The customer's telephone number for inclusion in the sales transaction details in the viva banking app. */
  phone?: string;

  /** The language in which the payment form is displayed. */
  requestLang?: VivaOrderRequestLang;

  /** This is the code of the payment source you created to link with your online store. */
  sourceCode?: string;

  /** If this parameter is set to true, then any amount specified in the payment order is ignored. */
  disableExactAmount?: boolean | string;

  /** If this parameter is set to true, the customer will not have the option to pay in cash at a Viva Spot. */
  disableCash?: boolean | string;

  /** If this parameter is set to true, the customer will not have the option to pay using their Viva personal account. */
  disableWallet?: boolean | string;

  /** If this parameter is set to true, recurring payments are enabled for the payment order. */
  allowRecurring?: boolean | string;

  /** If set to true, a pre-authorization transaction will be performed. */
  isPreAuth?: boolean | string;

  /** The maximum number of installments that the customer can choose. */
  maxInstallments?: number;

  /** The tip value included in the amount of the payment order and marked as tip. */
  tipAmount?: number;

  /** The time given to the customer to complete the payment in seconds. */
  paymentTimeout?: number;

  /** The exact date and time at which the order expires. */
  expirationDate?: string;

  /** An ID or a short description that helps you uniquely identify the transaction. */
  merchantTrns?: string;

  /** Set to true to trigger a verification using Card Verification functionality. */
  isCardVerification?: boolean;

  /** Tags to help in grouping and filtering transactions. */
  tags?: string[];

  /** Additional request data supported by Viva's deprecated create payment order endpoint. */
  [key: string]: unknown;
}

export interface VivaLegacyPaymentOrderReturn {
  /** The order's unique code. */
  OrderCode: number;

  /**
   * If the call is unsuccessful, an error code is generated.
   * For successful calls, `0` is returned.
   */
  ErrorCode: number;

  /** If the ErrorCode is other than `0`, a descriptive error message is returned. */
  ErrorText: string | null;

  /** The server date and time (in ISO 8601 format) that the Order was created. */
  TimeStamp: string;

  /** Unique identifier logged by Viva for auditing purposes. */
  CorrelationId: string | null;

  /**
   * If the call is unsuccessful, an event ID is generated.
   * For successful calls, `0` is returned.
   */
  EventId: number;

  /** Indicates whether or not the payment order creation was successful. */
  Success: boolean;

  /** Additional response data returned by Viva's deprecated create payment order endpoint. */
  [key: string]: unknown;
}

export interface VivaGetOrderReturn {
  /** The unique 12-digit code of the order. */
  OrderCode: number;

  /** The code of the source related to this order. */
  SourceCode?: string;

  /** An array containing all related tags. */
  Tags?: string[];

  /** The tip amount of the order (if applicable). */
  TipAmount?: number;

  /** The ISO 3166-1 alpha-2-formatted request language. */
  RequestLang?: string;

  /** The merchant's reference code for the specific order. */
  MerchantTrns?: string;

  /** A user-friendly description for the order. */
  CustomerTrns?: string;

  /** The number of installments that were offered for the payment (if applicable). */
  MaxInstallments?: number;

  /** The net payment amount of the order (without fees). */
  RequestAmount?: number;

  /** The exact date and time at which the order expires. */
  ExpirationDate?: string;

  /**
   * The status of the order.
   *
   * `0` Pending, `1` Expired, `2` Canceled, `3` Paid
   */
  StateId?: string | number;

  /** Additional order details returned by Viva. */
  [key: string]: unknown;
}

export interface VivaUpdateOrderOptions {
  /**
   * The new amount of the order (in the currency's smallest unit of measurement).
   *
   * If this parameter is used, it cannot have a value of `0`.
   */
  amount?: number;

  /** Allows the order to accept multiple payments (`true`) or not (`false`). */
  disablePaidState?: boolean;

  /** The expiration date of the order. */
  expirationDate?: string;

  /** Changes the cancelled status of the order. */
  isCanceled?: boolean;

  /** Additional request data supported by Viva's update order endpoint. */
  [key: string]: unknown;
}

export interface VivaUpdateOrderReturn {
  /** Additional response data returned by Viva's update order endpoint. */
  [key: string]: unknown;
}
