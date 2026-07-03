export type VivaDataServicesOrderBy = 'Ascending' | 'Descending';

export interface VivaDataServicesPaginationQuery {
  /** Specifies the number of items (records) to be included per page in the API response. */
  PageSize?: number;

  /** Determines which page of data to retrieve from the paginated API results. */
  Page?: number;

  /** Specifies the order in which the results should be sorted. */
  OrderBy?: VivaDataServicesOrderBy;
}

export interface VivaDataServicesTransactionsSearchOptions {
  /** The start date and time for retrieving data, based on the transaction creation time. */
  insDateFrom?: string;

  /** The end date and time for retrieving data, based on the transaction creation time. */
  insDateTo?: string;

  /** The start date and time for retrieving data, based on the transaction clerance time. */
  ClearanceDateFrom?: string;

  /** The end date and time for retrieving data, based on the transaction clerance time. */
  ClearanceDateTo?: string;

  /** The transaction type to be filtered. */
  TransactionTypeIds?: number[];

  /** The statuses of transactions to filter. */
  StatusIds?: string[];

  /** The transaction ids to be filtered. */
  TransactionIds?: string[];

  /** The terminal ID used to filter the transactions. */
  SourceTerminalId?: string;

  /** The order code used to filter the transaction. */
  OrderCode?: string;

  /** The StoreCode of the reseller. */
  ResellerSourceCode?: string;

  /** The minimum transaction amount to filter the results. */
  AmountFrom?: number;

  /** The maximum transaction amount to filter the results. */
  AmountTo?: number;

  /** The numeric code of the order's currency as defined in ISO 4712. */
  CurrencyCode?: string;

  /** The merchant reference number used during transaction creation. */
  MerchantTrns?: string;
}

export interface VivaDataServicesTransactionDatas {
  /** The transaction's unique ID. */
  TransactionId?: string;

  /** The unique ID of the transaction type. */
  TransactionTypeId?: number;

  /** The merchant's unique ID. */
  MerchantId?: string;

  /** The order's unique code. */
  OrderCode?: number;

  /** The customer's email address. */
  Email?: string | null;

  /** The customer's phone number. */
  Phone?: string | null;

  /** An ID or a short description that helps you uniquely identify the transaction. */
  MerchantTrns?: string | null;

  /** A friendly description that is displayed to the customer. */
  CustomerTrns?: string | null;

  /** The date and time that the transaction took place. */
  InsDate?: string;

  /** The transaction's current status. */
  StatusId?: string;

  /** Array of additional transaction data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaDataServicesTransactionsSearchReturn {
  /** Indicator of the current page in the results. */
  currentPage?: number;

  /** Number of results displayed per page. */
  pageSize?: number;

  /** Array of transactions returned in the results. */
  data?: VivaDataServicesTransactionDatas[];

  /** Array of pagination links. */
  link?: Array<Record<string, unknown>>;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaRetrieveMt940DataOptions {
  /** Date for which MT940 data should be retrieved. */
  ReportDate: string;
}

export interface VivaMt940DataReturn {
  /** [MT940 response data] */
  Response?: string;

  /** Additional response data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaSaleTransactionsExportOptions {
  /** Request identifier. If not provided, a new identifier will be generated. */
  Id?: string;

  /** Date of sale transaction records. */
  Date: string;

  /** File extension of requested file (currently only csv is supported). */
  FileType?: 'csv' | string;
}

export interface VivaSaleTransactionsExportReturn {
  /** Request identifier. */
  requestId: string;
}

export interface VivaSaleTransactionsWebhookDatas {
  /** Request identifier provided in the response of File Request(Sale transactions) API call. */
  requestId: string;

  /** User readable text of webhook. */
  Text: string;

  /** URL link location of the generated file. */
  Link: string;

  /** Authorization state returned by Viva for the generated file. */
  Authorized?: boolean;

  /** Expiration date of the generated report file. */
  ExpirationDate?: string;

  /** File extension of the generated report file. */
  FileType?: string;

  /** The count of the retries where Viva.com is triggering the webhooks. */
  RetryCount?: number | null;

  /** Specify the delay between the retries where Viva.com is triggering the webhooks. */
  RetryDelayInSeconds?: number | null;

  /** Additional webhook data received from Viva. */
  [key: string]: unknown;
}

export interface VivaAccountTransactionsSearchOptions {
  /** Start date of search. */
  DateFrom: string;

  /** End date of search. */
  DateTo: string;

  /** The ID of the wallet. */
  WalletId?: number;

  /** The 'subtype' of the transaction. */
  SubTypeIds?: number[];

  /** Minimum amount to search. */
  AmountFrom?: number;

  /** Maximum amount to search. */
  AmountTo?: number;
}

export interface VivaAccountTransactionReturn {
  /** The ID of the transaction. */
  accountTransactionId?: string;

  /** The creation date of the transaction. */
  created?: string;

  /** The Person ID. */
  personId?: string;

  /** The wallet in which this transaction took place. */
  walletId?: number;

  /** The Type ID. */
  typeId?: number;

  /** The subtype of the transaction. */
  subTypeId?: number;

  /** The amount of the transaction. */
  amount?: number;

  /** The currency used for this transaction. */
  currencyCode?: number;

  /** Additional account transaction data returned by Viva. */
  [key: string]: unknown;
}
