import { VivaStatusId } from '../VivaTransactions.types';

export interface MPTransactionCancelOptions {
  /**
   * The amount to cancel
   *
   * Example: `amount=0`
   */
  amount: number;
  /**
   * Source to use for transaction cancellation. Defaults to source code of parent transaction
   *
   * Example: `sourceCode=1234`
   */
  sourceCode?: string;
  /**
   * An ID or a short description that helps you uniquely identify the transaction
   *
   * Example: `merchantTrns=1a2b3c4d`
   */
  merchantTrns?: string;
  /**
   * Specify a key in order for the call have idempotent behaviour for all calls with the same key
   *
   * Example: `idempotencyKey=ABC123DEF456`
   */
  idempotencyKey?: string;
  /**
   * Default: `false`
   * Example: `reverseTransfers=true`
   * Use this property to automatically return the funds back from the connected account to the platform account in order to cover the refund.
   * When `reverseTransfers=true` for **partial** refunds, a proportional amount will be returned.
   */
  reverseTransfers?: boolean;
  /**
   * Default: `false`
   * Example: `refundPlatformFee=true`
   * Use this property to automatically return the platform fee to the connected account from the platform account.
   * When `refundPlatformFee=true` for **partial** refunds, a proportional amount of the platfom fee wil be returned.
   */
  refundPlatformFee?: boolean;
}

export interface MPCancelTransactionReturn {
  transactionId: string;
}
