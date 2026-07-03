export interface VivaFeesOptions {
  /** The order code. */
  orderCode: string | number;

  /** The amount associated with the payment order. */
  amount: number;
}

export interface VivaFeesReturn {
  /** Fee */
  Fee?: number;

  /** BillFee */
  BillFee?: number;

  /** ServiceFee */
  ServiceFee?: number;

  /** ResellerFee */
  ResellerFee?: number;

  /** CollectionFee */
  CollectionFee?: number;

  /** TotalConversionFee */
  TotalConversionFee?: number;

  /** ErrorCode */
  ErrorCode?: number;

  /** ErrorText */
  ErrorText?: string | null;

  /** TimeStamp */
  TimeStamp?: string;

  /** CorrelationId */
  CorrelationId?: number | null;

  /** EventId */
  EventId?: number;

  /** Success */
  Success?: boolean;

  /** Additional fees data returned by Viva. */
  [key: string]: unknown;
}
