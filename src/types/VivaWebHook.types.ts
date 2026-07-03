import { VivaStatusId } from './VivaTransactions.types';

// --------------------- SMART CHECKOUT EVENT DATA ---------------------

export interface SmartCheckoutWebhookEventDatas {
  Moto: boolean;
  BinId: number;
  Ucaf: any;
  Email: string | null;
  Phone: string | null;
  BankId: string;
  Systemic: boolean;
  Switching: boolean;
  ParentId: any;
  Amount: number;
  ChannelId: string;
  TerminalId: number;
  MerchantId: string;
  OrderCode: number;
  ProductId: any;
  StatusId: VivaStatusId;
  FullName: string;
  ResellerId: any;
  DualMessage: boolean;
  InsDate: Date;
  TotalFee: number;
  CardToken: string;
  CardNumber: string;
  TipAmount: number;
  SourceCode: string;
  SourceName: string;
  Latitude: any;
  Longitude: any;
  CompanyName: string;
  TransactionId: string;
  CompanyTitle: any;
  PanEntryMode: string;
  ReferenceNumber: number;
  ResponseCode: string;
  CurrencyCode: string;
  OrderCulture: string;
  MerchantTrns: any;
  CustomerTrns: any;
  IsManualRefund: boolean;
  TargetPersonId: any;
  TargetWalletId: any;
  AcquirerApproved: boolean;
  LoyaltyTriggered: boolean;
  TransactionTypeId: number;
  AuthorizationId: string;
  TotalInstallments: number;
  CardCountryCode: string;
  CardIssuingBank: string;
  RedeemedAmount: number;
  ClearanceDate: any;
  CurrentInstallment: number;
  Tags: Array<any>;
  BillId: any;
  ConnectedAccountId: any;
  ResellerSourceCode: any;
  ResellerSourceName: any;
  MerchantCategoryCode: number;
  ResellerCompanyName: any;
  CardUniqueReference: string;
  ExternalTransactionId: any;
  ResellerSourceAddress: any;
  CardExpirationDate: Date;
  ServiceId: any;
  RetrievalReferenceNumber: string;
  AssignedMerchantUsers: Array<any>;
  AssignedResellerUsers: Array<any>;
  CardTypeId: number;
  ResponseEventId: any;
  ElectronicCommerceIndicator: string;
  OrderServiceId: number;
  DigitalWalletId: any;
}

// --------------------- CONNECTED ACCOUNT EVENT DATA ---------------------

export interface ConnectedAccountWebhookEventDatas {
  PersonId: string;
  WalletId: number;
  PlatformPersonId: string;
  ConnectedAccountId: string;
}

// --------------------- EVENT WRAPPER ---------------------

export interface VivaWebhookDatas<EventType = SmartCheckoutWebhookEventDatas> {
  Url?: string;
  EventData?: EventType;
  Created: Date;
  CorrelationId: string;
  EventTypeId: number;
  Delay: any;
  MessageId: string;
  RecipientId: string;
  MessageTypeId: number;
}

// --------------------- TOLERANT WEBHOOK TYPES ---------------------

export type VivaWebhookHeaders = Record<
  string,
  string | string[] | number | null | undefined
> & {
  /** Contains the HMAC hex digest of the request body, and is generated using the SHA-1 hash function and the secret as the HMAC key. */
  'Viva-Signature'?: string;

  /** Contains the HMAC hex digest of the request body, and is generated using the SHA-256 hash function and the secret as the HMAC key. */
  'Viva-Signature-256'?: string;

  /** A webhook unique value to identify the delivery. */
  'Viva-Delivery-Id'?: string;

  /** Name of the event that triggered the delivery. */
  'Viva-Event'?: string;

  /** The count of the retries where Viva.com is triggering the webhooks. */
  RetryCount?: string | number;

  /** Specify the delay between the retries where Viva.com is triggering the webhooks. */
  RetryDelayInSeconds?: string | number | null;
};

export type VivaKnownWebhookEventName =
  | 'Transaction Payment Created'
  | 'Transaction Failed'
  | 'Transaction Pos Ecr Session Created'
  | 'Transaction Pos Ecr Session Failed'
  | 'Transaction Price Calculated'
  | 'Transaction Reversal Created'
  | 'Account Transaction Created'
  | 'Command Bank Transfer Created'
  | 'Command Bank Transfer Executed'
  | 'Account Connected'
  | 'Account Verification Status Changed'
  | 'SaleTransactionsFileGenerated'
  | 'Transfer Created'
  | 'Obligation Created'
  | 'Obligation Captured'
  | 'Order Updated';

export interface VivaWebhookEnvelope<EventData = VivaWebhookEventData> {
  /** Your webhook URL. */
  Url?: string;

  EventData?: EventData;

  /** Transaction creation timestamp. This parameter is always given in UTC. */
  Created?: string | Date;

  /** Internal Id to track the request flow for debug reasons. */
  CorrelationId?: string | null;

  /** The type of the event that triggered the notification. */
  EventTypeId?: number;

  /** Delay timespan for messages that are sent at a future date and not instantly. */
  Delay?: string | null;

  /** The count of the retries where Viva.com is triggering the webhooks. */
  RetryCount?: number | null;

  /** Specify the delay between the retries where Viva.com is triggering the webhooks. */
  RetryDelayInSeconds?: number | null;

  /** Unique identifier of the message. */
  MessageId?: string;

  /** The recipient of the webhook. */
  RecipientId?: string;

  /** The type of the message, this will always be webhook for the merchants. */
  MessageTypeId?: number;

  /** Additional webhook envelope data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaWebhookEventData {
  /** Additional webhook event data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaPaymentResultWebhookEventData extends VivaWebhookEventData {
  OrderCode?: string | number;
  TransactionId?: string;
  StatusId?: VivaStatusId | string | number;
  Amount?: number;
  CurrencyCode?: string | number;
  ResponseEventId?: string | number | null;
}

export interface VivaTransactionPaymentCreatedWebhookEventData extends VivaPaymentResultWebhookEventData {}

export interface VivaTransactionFailedWebhookEventData extends VivaPaymentResultWebhookEventData {}

export interface VivaTransactionReversalCreatedWebhookEventData extends VivaPaymentResultWebhookEventData {}

export interface VivaOrderUpdatedWebhookEventData extends VivaWebhookEventData {
  OrderCode?: string | number;
  IsCancelled?: boolean;
}

export interface VivaAccountConnectedWebhookEventData extends VivaWebhookEventData {
  /** The Id of the created person/merchant. */
  PersonId?: string;

  /** The ID of the wallet. */
  WalletId?: string | number;

  /** The Id of the platform/ISV account. */
  PlatformPersonId?: string;

  /** The Id of the connected account (such as a seller or merchant account). */
  ConnectedAccountId?: string;
}

export interface VivaAccountVerificationStatusChangedWebhookEventData extends VivaAccountConnectedWebhookEventData {
  Verified?: boolean;
}

export interface VivaTransferCreatedWebhookEventData extends VivaWebhookEventData {
  TransferId?: string | number;
  TransactionId?: string;
  Amount?: number;
  CurrencyCode?: string | number;
  TargetWalletId?: string | number;
  TargetPersonId?: string;
  TransferTypeId?: string | number;
}

/**
 * Obligation webhook payload.
 *
 * @deprecated Viva obligation webhooks are kept for compatibility with the deprecated obligation flow.
 */
export interface VivaObligationWebhookEventData extends VivaWebhookEventData {
  ObligationId?: string | number;
  CaptureId?: string | number | null;
  Amount?: number;
  CurrencyCode?: string | number;
  TargetPersonId?: string;
  TargetWalletId?: string | number;
  IsCompleted?: boolean;
  Completed?: boolean;
}

export interface VivaSaleTransactionsWebhookEventData extends VivaWebhookEventData {
  Text?: string;
  Link?: string;
  Authorized?: boolean;
  ExpirationDate?: string;
  FileType?: string;
  RetryCount?: number | null;
  RetryDelayInSeconds?: number | null;
}

export interface VivaPosEcrSessionWebhookEventData extends VivaWebhookEventData {
  SessionId?: string;
  TransactionId?: string;
  TerminalId?: string | number;
  StatusId?: VivaStatusId | string | number;
  ResponseEventId?: string | number | null;
  Amount?: number;
  CurrencyCode?: string | number;
}

export interface VivaTransactionPriceCalculatedWebhookEventData extends VivaWebhookEventData {
  TransactionId?: string;
  OrderCode?: string | number;
  Amount?: number;
  CurrencyCode?: string | number;
  TotalFee?: number;
  ServiceFee?: number;
}

export interface VivaAccountTransactionCreatedWebhookEventData extends VivaWebhookEventData {
  TransactionId?: string;
  Amount?: number;
  CurrencyCode?: string | number;
  WalletId?: string | number;
  AccountId?: string;
  StatusId?: VivaStatusId | string | number;
}

export interface VivaBankTransferCommandWebhookEventData extends VivaWebhookEventData {
  CommandId?: string;
  BankTransferId?: string;
  TransactionId?: string;
  Amount?: number;
  CurrencyCode?: string | number;
  WalletId?: string | number;
  BankAccountId?: string;
  StatusId?: VivaStatusId | string | number;
}

export type VivaWebhookSoftValidationCode = 'missing' | 'mismatch' | 'invalid';

export interface VivaWebhookSoftValidationIssue {
  field: string;
  code: VivaWebhookSoftValidationCode;
  message: string;
  expected?: unknown;
  actual?: unknown;
}

export interface VivaWebhookSoftValidationResult<
  EventData = VivaWebhookEventData,
> {
  valid: boolean;
  data: EventData | null;
  issues: VivaWebhookSoftValidationIssue[];
  warnings: VivaWebhookSoftValidationIssue[];
}

export interface VivaWebhookFieldExpectations {
  expectedOrderCode?: string | number;
  expectedTransactionId?: string;
  expectedStatusId?: VivaStatusId | string | number;
  expectedAmount?: number;
  expectedCurrencyCode?: string | number;
  expectedIsCancelled?: boolean;
  expectedConnectedAccountId?: string;
  expectedPersonId?: string;
  expectedPlatformPersonId?: string;
  expectedWalletId?: string | number;
  expectedVerified?: boolean;
  expectedTransferId?: string | number;
  expectedTransferTypeId?: string | number;
  expectedTargetWalletId?: string | number;
  expectedTargetPersonId?: string;
  expectedObligationId?: string | number;
  expectedCaptureId?: string | number;
  expectedSessionId?: string;
  expectedCommandId?: string;
  expectedBankTransferId?: string;
  expectedAccountId?: string;
}

export interface VivaWebhookVerificationResponse<TBody> {
  statusCode: 200;
  body: TBody;
  headers: Record<string, string>;
}

export interface VivaMerchantWebhookVerificationBody {
  Key: string;
}

export interface VivaIsvWebhookVerificationBody {
  key: string;
}

export type VivaWebhookRawBody = string | Buffer | Uint8Array;

export interface VivaWebhookSignatureVerificationOptions {
  rawBody?: VivaWebhookRawBody | null;
  secret?: string | null;
  headers: VivaWebhookHeaders;
  algorithm?: 'sha1' | 'sha256' | 'any';
}

export interface VivaWebhookSignatureVerificationResult {
  valid: boolean;
  algorithm: 'sha1' | 'sha256' | null;
  issues: VivaWebhookSoftValidationIssue[];
  signature?: string;
  deliveryId?: string;
  event?: string;
}

export interface VivaWebhookIdentity {
  eventTypeId?: number;
  messageId?: string;
  correlationId?: string | null;
  created?: string | Date;
  retryCount?: number | null;
  retryDelayInSeconds?: number | null;
  recipientId?: string;
  messageTypeId?: number;
  deliveryId?: string;
  event?: string;
}

export interface VivaWebhookIdempotencyKeyResult {
  success: boolean;
  key: string | null;
  field: string | null;
  source: 'envelope' | 'headers' | 'eventData' | null;
  warnings: VivaWebhookSoftValidationIssue[];
}
