export type IsvStatusId = 0 | 1 | 2 | 3 | 5 | 6 | 7;

export interface ISVDevicesOptions {
  merchantId: string;
  statusId?: IsvStatusId;
  sourceCode?: string;
}

export interface ISVDevicesReturn {
  merchantId: string;
  terminalId: string;
  statusId: IsvStatusId;
  sourceCode: string;
  virtualTerminalId: string;
}

// ---------------------------------------

export interface ISVChargeItem {
  /** Item details for fiscalisation */
  itemCode?: string;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemDiscount?: number;
  itemVatRate?: number;
  itemVatAmount?: number;
  itemNetAmount: number;
  itemGrossAmount: number;
}

export interface ISVPayItem {
  /** Payment details for fiscalisation */
  paymentType: string;
  paymentAmount: number;
  paymentReference?: string;
}

export interface ISVUser {
  /** User details for fiscalisation */
  userId?: string;
  userName?: string;
  userRole?: string;
  userEmail?: string;
}

export interface ISVCustomer {
  /** Customer details for fiscalisation */
  customerId?: string;
  customerName?: string;
  customerTaxId?: string;
  customerAddress?: string;
  customerEmail?: string;
}

export interface ISVFiscalisationData {
  /** This parameter indicates the receipt type and defines how it should be processed by the Viva Fiscalisation */
  ftReceiptCase: number;
  /** Array of items included in the order's receipt */
  cbChargeItems: ISVChargeItem[];
  /** The array of payments associated with items included in this order */
  cbPayItems: ISVPayItem[];
  /** Indicates the user who creates the receipt */
  cbUser?: ISVUser;
  /** The data object representing the identification of the business customer */
  cbCustomer?: ISVCustomer;
  /** The receipt's date & time */
  cbReceiptMoment: string;
  /** A reference identification key for this specific receipt */
  cbReceiptReference: string;
  /** ISO 4217 numeric currency code of the transaction */
  currencyCode: string;
}

export interface ISVInitSaleRequest {
  /** Transaction session identification */
  sessionId: string;
  /** The ID of the target terminal. This can be found either by using the Search POS Devices API call, or within the Viva Terminal app (More > About > "Source Terminal ID") */
  terminalId: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId: string;
  /** Amount to be authorized */
  amount: number;
  /** The numeric code of the order's currency as defined in ISO 4712 */
  currencyCode: string;
  /** Free text value that can be used by the merchant as a reference */
  merchantReference: string;
  /** Free text value that can be used by the customer as a reference */
  customerTrns?: string;
  /** Max instalments allowed during card presentment - available only for merchants in Greece */
  maxInstalments?: number;
  /** The desired Tip Amount. Not compatible with preauth */
  tipAmount: number;
  /** A flag indicating whether transaction result will be shown */
  showTransactionResult?: boolean;
  /** A flag indicating if the receipt and transaction result will be shown */
  showReceipt?: boolean;
  /** JSON converted to base64 string containing additional metadata information */
  saleToAcquirerData?: string;
  /** Unique Number to identify your Provider for AADE integration */
  aadeProviderId?: string;
  /** The unencrypted signature for AADE integration */
  aadeProviderSignatureData?: string;
  /** The encrypted signature for AADE integration */
  aadeProviderSignature?: string;
  /** Field to indicate that the transaction sent is a to be loaded and payed at a later stage */
  aadePreloaded?: boolean;
  /** The duration of preloaded transaction to be deemed as expired (in hours) */
  aadePreloadedDuration?: number;
  /** Details relating to the ISV Partner, ISV amount and multi merchant functionality */
  isvDetails: {
    /** The ISV fee applied to the transaction by the ISV partner */
    amount: number;
    /** The merchant who activated the 'Viva.com Terminal' application/device */
    terminalMerchantId: string;
    /** The ISV Partner's Source code to be applied to the sale */
    sourceCode?: string;
    /** For multi merchant functionality - the Merchant to which the transaction will be assigned */
    merchantId?: string;
    /** For multi merchant functionality - the merchant's Source code to be applied to the sale */
    merchantSourceCode?: string;
  };
  /** An object detailing the fiscalisation of individual items listed on each line of the receipt */
  fiscalisationData?: ISVFiscalisationData;
}
