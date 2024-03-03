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
