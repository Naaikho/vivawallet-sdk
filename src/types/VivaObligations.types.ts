export interface VivaCreateObligationOptions {
  /** In decimals rather than the smallest denomination of the currency. */
  amount: number | string;

  /** Seller merchant ID from which the refund payback is being requested. */
  personId: string;

  /** Use 'null' unless there is a wallet other than the default primary one. */
  walletId?: number | string | null;

  /** A string with extra information you want to show in the transaction once the obligation is captured. */
  description?: string;

  /** The 3-digit currency code of the transaction. */
  currencyCode: number;
}

export interface VivaCreateObligationReturn {
  /** The Wallet Transaction Id which captured. */
  CaptureId?: string | null;

  /**
   * - `A` = Active
   * - `X` = Cancelled
   * - `F` = Finished.
   */
  StatusId?: 'A' | 'X' | 'F' | string;

  /** The Id of the obligation. */
  ObligationId?: string;

  /** The Wallet Transaction Id which cancel this obligation. */
  CancellationId?: string | null;

  /** The datetime of the obligation. */
  Created?: string;

  /** The dametime of the obligation capture or cancellation. */
  Completed?: string | null;

  /** The Wallet Transaction type. */
  WalletTransactionSubTypeId?: number;

  /** Additional obligation data returned by Viva. */
  [key: string]: unknown;
}
