import {
  VivaDataServicesPaginationQuery,
  VivaDataServicesTransactionsSearchOptions,
  VivaDataServicesTransactionsSearchReturn,
} from '../VivaDataServices.types';
import {
  VivaLegacyTransactionsReturn,
  VivaMotoCreditCardOptions,
  VivaStatusId,
  VivaTransaction,
  VivaTransactionIdReturn,
  VivaTransactionReturn,
} from '../VivaTransactions.types';

export interface ISVTargetMerchantOptions {
  /** The id of the merchant that the transaction belongs to. */
  targetMerchantId: string;
}

export interface ISVTransactionPathOptions {
  /** The unique ID of the initial transaction. */
  transactionId: string;
}

export interface ISVRetrieveTransactionByIdOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {}

export interface ISVRetrieveLegacyTransactionOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {}

export interface ISVRetrieveTransactionsByDateOptions extends ISVTargetMerchantOptions {
  /** A given day for which all transactions will be returned. */
  date: string;
}

export interface ISVRetrieveTransactionsByClearanceDateOptions extends ISVTargetMerchantOptions {
  /** If we want to get all transactions that were cleared on a specific date. */
  clearanceDate: string;
}

export interface ISVRetrieveTransactionsByOrderCodeOptions extends ISVTargetMerchantOptions {
  /** A valid 16-digit payment order code. */
  orderCode: string | number;
}

export interface ISVRetrieveTransactionsBySourceCodeOptions extends ISVTargetMerchantOptions {
  /** The 4-digit code of the payment source you created to link with your online store. */
  sourceCode: string | number;

  /** A given day for which all transactions will be returned. */
  date: string;
}

export interface ISVRetrieveTransactionsByResellerSourceCodeOptions extends ISVTargetMerchantOptions {
  /** The 4-digit code of the reseller's (ISV partner's) payment source. */
  resellerSourceCode: string | number;

  /** A given day for which all transactions will be returned. */
  date: string;
}

export interface ISVDataServicesPaginationQuery extends VivaDataServicesPaginationQuery {}

export interface ISVDataServicesTransactionsSearchOptions extends VivaDataServicesTransactionsSearchOptions {}

export interface ISVDataServicesTransactionsSearchReturn extends VivaDataServicesTransactionsSearchReturn {}

export interface ISVCancelTransactionOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {
  /**
   * The amount that will be refunded in the currency's smallest denomination (e.g amount in pounds / euros x 100).
   *
   * For example, if you want to refund a payment of £100.37, you need to pass the value `10037`.
   */
  amount: number;

  /**
   * The source which the refund should be applied to.
   *
   * For example, to refund to the Source with the code `1234`, add `&sourceCode=1234`.
   */
  sourceCode?: string;

  /** The numeric code of the refund's currency as defined in ISO 4712. */
  currencyCode?: string;
}

export interface ISVPayOutOldOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {
  /**
   * The amount that will be refunded in the currency's smallest denomination (e.g amount in pounds / euros x 100).
   *
   * For example, if you want to refund a payment of £100.37, you need to pass the value `10037`.
   */
  amount: number;

  /** The value `14` is necessary in order to perform a Pay Out. */
  serviceId?: 14;

  /**
   * The source which the refund should be applied to.
   *
   * For example, to refund to the Source with the code `1234`, add `&sourceCode=1234`.
   */
  sourceCode?: string;

  /** An ID or a short description that helps you uniquely identify the transaction. */
  merchantTrns?: string;

  /** A friendly description that you want to display to the customer. This description appears on the receipt the customer receives. */
  customerTrns?: string;
}

export interface ISVCreateRecurringTransactionOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {
  /**
   * The amount requested in the currency's smallest unit of measurement.
   *
   * For example. if you want to create a payment for €100.37, you need to pass the value `10037`.
   */
  amount: number;

  /**
   * The ISV amount requested in the currency's smallest unit of measurement.
   *
   * For example. if you want to create a payment for €1.51, you need to pass the value `00151`.
   */
  isvAmount: number;

  /** A friendly description that you want to display to the customer. This description appears on the receipt the customer receives. */
  customerTrns?: string;

  /**
   * An ID or a short description that helps you uniquely identify the transaction.
   *
   * For example, this can be your customer order reference number.
   */
  merchantTrns?: string;

  /**
   * The merchant source code.
   *
   * Every source code is linked with a specific bank account.
   */
  sourceCode?: string | number;

  /** The ISV source code. */
  resellerSourceCode?: string | number;

  /** The numeric code of the transaction's currency as defined in ISO 4712. */
  currencyCode?: string;
}

export interface ISVIncrementalPreauthOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {
  /** The amount to be added to the original authorized amount through an incremental pre-authorization, expressed in the currency's smallest unit (e.g., cents). */
  amount: number;

  /** A friendly description that you want to display to the customer. This description appears on the receipt the customer receives. */
  customerTrns?: string;

  /** An ID or a short description that helps you uniquely identify the transaction. */
  merchantTrns?: string;

  /** A unique code that is exchanged between your application and the API. */
  sourceCode?: string;

  /** The numeric code of the transaction's currency as defined in ISO 4712. */
  currencyCode?: string;

  /** Specify a key in order for the call have idempotent behaviour for all calls with the same key */
  idempotencyKey?: string;
}

export interface ISVCapturePreAuthPaymentOptions
  extends ISVTargetMerchantOptions, ISVTransactionPathOptions {
  /**
   * The amount requested in the currency's smallest unit of measurement.
   *
   * For example. if you want to create a payment for €100.37, you need to pass the value `10037`.
   */
  amount: number;

  /**
   * The ISV amount requested in the currency's smallest unit of measurement.
   *
   * When creating a payment order for a pre-authorization (with `preauth` = `true`), The `isvAmount` is only set upon capture of the payment, and not upon creation of the original preauth payment order.
   */
  isvAmount: number;

  /** A friendly description that you want to display to the customer. This description appears on the receipt the customer receives. */
  customerTrns?: string;

  /** An ID or a short description that helps you uniquely identify the transaction. */
  merchantTrns?: string;

  /** The merchant source code. */
  sourceCode?: string | number;

  /** The ISV source code. */
  resellerSourceCode?: string | number;

  /** The tip value (if applicable for the customer's purchase) which is already included in the `amount` of the payment order and marked as tip. */
  tipAmount?: number | null;

  /** The numeric code of the transaction's currency as defined in ISO 4712. */
  currencyCode?: string;
}

export interface ISVMotoCardChargeOptions extends ISVTargetMerchantOptions {
  /** This should always be `true` */
  moto: true;

  /** Optional - an ID or a short description that helps you uniquely identify the transaction in the viva banking app */
  merchantTrns?: string;

  /** Optional - an ID or a short description that helps you uniquely identify the transaction in the viva banking app */
  customerTrns?: string;

  /** If this parameter is set to `true`, recurring payments are enabled so that the initial transaction ID can be used for subsequent payments. */
  allowsRecurring?: boolean;

  /** The customer's full name */
  fullName?: string;

  /** The customer's email address (this is where the customer will receive their invoice) */
  email?: string;

  /** The customer's phone number */
  phone?: string;

  /** Information about the card to be charged */
  creditcard: VivaMotoCreditCardOptions;

  /** The code of the payment order which is being charged */
  orderCode: number;

  /** The amount which will be paid out to the ISV partner. */
  isvAmount?: number | null;

  /** The 3-digit currency code of the transaction as defined in ISO 4712. */
  currencyCode?: string | number;

  /** The 3-digit currency code of the transaction as defined in ISO 4712. */
  CurrencyCode?: string | number;

  /** A descriptor tailored to the transaction, ensuring clarity and recognition for the buyer on their bank statement and 3DS verification page. */
  descriptor?: string;

  /** A descriptor tailored to the transaction, ensuring clarity and recognition for the buyer on their bank statement and 3DS verification page. */
  Descriptor?: string;

  /** Defines the number of card installments for the payment. */
  installments?: number;

  /** Defines the number of card installments for the payment. */
  Installments?: number;

  /** The ISV source code. */
  resellerSourceCode?: string | number | null;

  /** The code of the payment source to be used */
  sourceCode?: string | number | null;
}

export interface ISVCheckoutTransactionReturn extends Partial<VivaTransaction> {
  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface ISVLegacyTransactionsReturn extends VivaLegacyTransactionsReturn {}

export interface ISVResellerSourceTransactionReturn {
  /** Smart chip card type. For e-commerce transactions the value will only ever be null */
  Emv?: string | null;

  /** Customer's email address */
  Email?: string | null;

  /** The amount of the transaction */
  Amount?: number;

  /** The Merchant ID */
  MerchantId?: string;

  /** The Order Code of the transaction */
  OrderCode?: number;

  /** The Status ID of the transaction */
  StatusId?: VivaStatusId | string;

  /** The customer's full name */
  FullName?: string | null;

  /** The Reseller's (ISV Partner's) ID */
  ResellerId?: string;

  /** The date and time that the transaction took place */
  InsDate?: string;

  /** The customer's card number */
  CardNumber?: string;

  /** The source from which the order was initiated. */
  SourceCode?: string;

  /** The transaction's unique ID. */
  TransactionId?: string;

  /** The 3-digit currency code of the transaction. */
  CurrencyCode?: string | number;

  /** The ISV source code. */
  ResellerSourceCode?: string | number;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface ISVTransactionActionReturn extends Partial<VivaTransactionReturn> {
  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface ISVTransactionIdReturn extends VivaTransactionIdReturn {}

export interface ISVMotoCardChargeReturn extends ISVTransactionActionReturn {}
