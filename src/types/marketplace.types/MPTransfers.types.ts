export interface MPTransfersDatas {
  /**
   * Amount to be sent.
   *
   * Must be a positive, non-zero number.
   *
   * The amount will be in the currency of the merchant account using the currency's smallest unit of measurement (e.g. cents of a euro).
   */
  amount: number;
  /**ID of the connected account */
  connectedAccountId: string;
  /**
   * Default: `null`
   *
   * Denotes the transaction (i.e. customer payment) associated with this transfer.
   *
   * If left empty or if the transaction is already settled, an instant balance transfer will be made and the `executed` parameter in the response will have a value (the account must have enough balance to complete the transfer).
   *
   * If the transaction is not yet settled, the transfer will be handled during settlement and the `executed` parameter in the response will not have a value.
   */
  transactionId?: string | null;
}

export interface MPTransfersResponse {
  /** The ID of the transfer */
  transferId: string;
  /** The date that the transfer was executed. If the transaction is not settled this value is empty, otherwise the transfer is executed instantly with funds from the account's available balance */
  executed: string | null;
}
