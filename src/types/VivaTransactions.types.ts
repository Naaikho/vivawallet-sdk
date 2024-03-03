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
