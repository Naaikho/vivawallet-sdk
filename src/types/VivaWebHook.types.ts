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
