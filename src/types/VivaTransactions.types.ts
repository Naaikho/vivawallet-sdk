export interface VivaTransactionRefundOptions {
  /**
   * The amount that will be refunded in the currency's smallest denomination
   * (e.g., amount in pounds / euros x 100). It cannot exceed the amount of the
   * original payment unless it is an OCT.
   *
   * *For example, if you want to refund a payment of £100.37, you need to pass the value `10037`.*
   */
  amount: number;

  /**
   * The source which the refund should be applied to.
   *
   * *For example, to refund to the Source with the code "HQ", add `&sourceCode=HQ`.*
   */
  sourceCode?: string;

  /**
   * An ID or a short description that helps you uniquely identify the transaction.
   *
   * *For example, this can be your customer order reference number.*
   */
  merchantTrns?: string;

  /**
   * A friendly description that you want to display to the customer. This description
   * appears on the receipt the customer receives.
   */
  customerTrns?: string;
}

/**
 * - `F` -> Finished
 * - `A` -> Active
 * - `C` -> Captured
 * - `E` -> Error
 * - `R` -> Refunded
 * - `X` -> Cancelled
 * - `M` -> Claimed
 * - `MA` -> Claim Awaiting Response
 * - `MI` -> Claim In Progress
 * - `ML` -> Claim Lost
 * - `MS` -> Suspected Claim
 * - `MW` -> Claim Won
 */
export type VivaStatusId =
  | 'F'
  | 'A'
  | 'C'
  | 'E'
  | 'M'
  | 'R'
  | 'X'
  | 'MA'
  | 'MI'
  | 'ML'
  | 'MS'
  | 'MW';

export interface VivaTransaction {
  email: string | null;
  bankId: string;
  /** Price in euro (not cents) */
  amount: number;
  switching: boolean;
  orderCode: number;
  statusId: VivaStatusId;
  fullName: string;
  insDate: string;
  cardNumber: string;
  currencyCode: number;
  customerTrns: string;
  merchantTrns: string;
  transactionTypeId: number;
  recurringSupport: boolean;
  totalInstallments: number;
  cardCountryCode: string | null;
  cardUniqueReference: string;
  cardIssuingBank: string | null;
  currentInstallment: number;
  cardTypeId: number;
  digitalWalletId: number;
}

export interface VivaTransactionDatas {
  /** The unique ID of the initial transaction */
  id: string;
  /**
   * The amount requested in the currency's smallest unit of measurement. For capturing authorized transactions, this amount should not exceed the amount entered in the initial transaction.
   *
   * > For example. if you want to create a payment for €100.37, you need to pass the value 10037.
   */
  amount: number;
  /**
   * The maximum number of installments that the customer can choose for this transaction. If this parameter is omitted, the customer will not see an option for paying with installments.
   *
   * > Available only to merchants set up in Greece.
   */
  installments?: number;
  /**
   * A friendly description that you want to display to the customer. This description appears on the receipt the customer receives.
   */
  customerTrns?: string;
  /** An ID or a short description that helps you uniquely identify the transaction. For example, this can be your customer order reference number. */
  merchantTrns?: string;
  /** A unique code that is exchanged between your application and the API. **Note that if you leave this parameter empty, it would take the Default value.** */
  sourceCode?: string;
  /**
   * The tip value (if applicable for the customer's purchase) which is already included in the `amount` of the payment order and marked as tip. It is in the currency of the merchant account using the currency's smallest unit of measurement (e.g. cents of a euro).
   *
   * Please note: when creating a payment order for a pre-authorization (with `isPreAuth = true`), `tipAmount` should only be set when **capturing** the pre-authorization, and not when creating the initial payment order.
   */
  tipAmount?: number;
}

export interface VivaTransactionReturn {
  /** Smart chip card type. For e-commerce transactions the value will only ever be null. */
  Emv: string | null;
  /** The net amount of the transaction (without fees). */
  Amount: number;
  /**
   * The transaction’s current status:
   *
   * - E – the transaction was not completed because of an error (PAYMENT UNSUCCESSFUL).
   * - A – the transaction is in progress (PAYMENT PENDING).
   * - M – the customer has disputed the transaction with the issuing bank.
   * - MA – dispute awaiting response.
   * - MI – dispute in progress.
   * - ML – a disputed transaction has been refunded (dispute lost).
   * - MW – dispute won.
   * - MS – suspected dispute.
   * - X – the transaction was cancelled by the merchant.
   * - R – the transaction has been fully or partially refunded.
   * - F – the transaction has been completed successfully (PAYMENT SUCCESSFUL).
   */
  StatusId: VivaStatusId;
  /** The 3-digit currency code of the transaction. */
  CurrencyCode: string;
  /** The transaction's unique ID. */
  TransactionId: string;
  /** The transaction's unique reference number. */
  ReferenceNumber: number;
  /** The transaction's unique authorization ID. */
  AuthorizationId: string;
  /** Unique ID for transaction retrieval. */
  RetrievalReferenceNumber: string;
  /**
   * The same as [Electronic Commerce Indicator](https://developer.vivawallet.com/integration-reference/response-codes/#electronic-commerce-indicator) (ECI), a code returned by the issuer relating to 3DS status. The following values are possible:
   *
   * - 0 = `Unspecified`
   * - 1 = `Authenticated`
   * - 2 = `no 3DS`
   * - 3 = `Attempt or not enrolled`
   */
  ThreeDSecureStatusId: 0 | 1 | 2 | 3;
  /** If the call is unsuccessful, an error code is generated. For successful calls, `0` is returned. */
  ErrorCode: number;
  /** If the ErrorCode is other than 0, a descriptive error message is returned. */
  ErrorText: string;
  /** The server date and time (in ISO 8601 format) that the transaction was cancelled. */
  TimeStamp: string;
  /** Unique identifier logged by Viva for auditing purposes. */
  CorrelationId: string;
  /** If the call is unsuccessful, an event ID is generated. For successful calls, `0` is returned. */
  EventId: number;
  /** Indicates whether or not the payment order creation was successful. */
  Success: boolean;
}
