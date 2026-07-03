export type VivaPosStatusId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type VivaPosPaymentMethod =
  | 'CardPresent'
  | 'MOTO'
  | 'QrDefault'
  | 'AliPay'
  | 'Paypal'
  | 'Klarna'
  | 'IRIS'
  | 'BLIK';

export type VivaPosActionType = 'aade-fim-control';

export interface VivaPosExtraOptions {
  [key: string]: unknown;
}

export interface VivaPosFiscalisationData extends VivaPosExtraOptions {}

export interface VivaPosSearchDevicesOptions {
  /**
   * Status of the device:
   *
   * - `0 = WareHouse`
   * - `1 = Live`
   * - `2 = Ready To Ship`
   * - `3 = In Stock`
   * - `4 = Pending Key Injection`
   * - `5 = Lost`
   * - `6 = Broken`
   * - `7 = Locked`
   */
  statusId?: VivaPosStatusId;
  /** Custom identification code assigned to the device by the merchant */
  sourceCode?: string;
}

export interface VivaPosSearchDevicesReturn {
  /** The ID of the terminal */
  terminalId: string;
  /** Status of the device */
  statusId: VivaPosStatusId;
  /** Custom identification code assigned to the device by the merchant */
  sourceCode: string;
  /** Virtual Terminal identification - the virtual serial number of the terminal */
  virtualTerminalId: string;
}

export interface VivaPosTransactionBaseOptions extends VivaPosExtraOptions {
  /** Transaction session identification */
  sessionId: string;
  /**
   * The ID of the target terminal. This can be found either by using the Search POS Devices API call, or within the Viva Terminal app (More > About > "Source Terminal ID")
   */
  terminalId: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId: string;
  /** Amount to be authorized */
  amount: number;
  /** The numeric code of the order's currency as defined in ISO 4712. */
  currencyCode: string;
  /** Free text value that can be used by the merchant as a reference */
  merchantReference: string;
  /** Free text value that can be used by the customer as a reference */
  customerTrns?: string;
  /** A flag indicating whether transaction result will be shown. */
  showTransactionResult?: boolean;
  /** A flag indicating if the receipt and transaction result will be shown. */
  showReceipt?: boolean;
  /** Specifies how the terminal app should return control after a transaction. */
  interappCallback?: string;
  /** Set the Unique Number to identify your Provider. */
  aadeProviderId?: string;
  /** The unencrypted signature that includes the fields below with semicolon as a delimiter `;`. */
  aadeProviderSignatureData?: string;
  /** The fields of providerSignatureFields encrypted using a public key and the Elliptic Curve Digital Signature Algorithm (ECDSA). */
  aadeProviderSignature?: string;
  /** An object detailing the fiscalisation of individual items listed on each line of the receipt. */
  fiscalisationData?: VivaPosFiscalisationData;
}

export interface VivaPosInitiateSaleRequestOptions extends VivaPosTransactionBaseOptions {
  /**
   * This flag determines whether a surcharge is applied during a transaction.
   *
   * Default: `false`
   */
  skipSurcharge?: boolean;
  /** Specifies the payment method displayed to the user first by default; users can, however, select an alternative payment method. */
  paymentMethod?: VivaPosPaymentMethod;
  /** Boolean flag indicating whether the payment is or is not a pre-authorization. */
  preauth?: boolean;
  /** Max instalments allowed during card presentment - available only for merchants in Greece */
  maxInstalments?: number;
  /** The desired Tip Amount. */
  tipAmount: number;
  /** JSON converted to base64 string containing additional metadata information. */
  saleToAcquirerData?: string;
  /** Field to indicate that the transaction sent is a to be loaded and payed at a later stage. */
  aadePreloaded?: boolean;
  /** The duration of preloaded transaction to be deemed as expired. */
  aadePreloadedDuration?: number;
}

export interface VivaPosCapturePreAuthRequestOptions extends VivaPosTransactionBaseOptions {
  /** Parent transaction session identification to be captured. */
  parentSessionId: string;
  /** JSON converted to base64 string containing additional metadata information. */
  saleToAcquirerData?: string;
  /** Field to indicate that the transaction sent is a to be loaded and payed at a later stage. */
  aadePreloaded?: boolean;
  /** The duration of preloaded transaction to be deemed as expired. */
  aadePreloadedDuration?: number;
}

export interface VivaPosRefundTransactionOptions extends VivaPosTransactionBaseOptions {
  /** Parent transaction session identification to be refunded */
  parentSessionId: string;
}

export interface VivaPosUnreferencedRefundOptions extends VivaPosTransactionBaseOptions {}

export interface VivaPosFastRefundOptions extends VivaPosTransactionBaseOptions {}

export interface VivaPosRebateOptions extends VivaPosTransactionBaseOptions {}

export interface VivaPosCreateActionOptions extends VivaPosExtraOptions {
  /** The ID of the target terminal */
  terminalId: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId: string;
  /**
   * Enum specifying the action to be invoked on the device.
   *
   * Allowed Values:
   * `aade-fim-control`
   */
  actionType?: VivaPosActionType;
  /** The essential information needed for the POS device to process the request */
  request: VivaPosExtraOptions;
}

export interface VivaPosActionReturn {
  /** Terminal identification. */
  terminalId: string;
  /** Cash register identification. */
  cashRegisterId: string;
  /**
   * Enum specifying the action to be invoked on the device.
   *
   * Allowed Values:
   * `aade-fim-control`
   */
  actionType: VivaPosActionType;
  /** Action ID generated by the CPH to obtain data about a scheduled action. */
  actionId: string;
}

export interface VivaPosActionDetailsReturn extends VivaPosActionReturn {
  /** General status indicating whether the action was successfully processed. */
  successfullyProcessed: boolean;
  /** Contains the data resulting from the action processing. */
  response: {
    /** The status of the request (e.g., "success"). */
    status: string;
    /** A string providing additional information about the request status. */
    message: string;
  };
}

export interface VivaPosGetActionDetailsOptions {
  /** Action ID by which the data should be filtered. */
  actionId: string;
}

export interface VivaPosRetrieveSessionByIdOptions {
  /** Transaction session identification - set by the merchant */
  sessionId: string;
}

export interface VivaPosRetrieveSessionInfoByDateOptions {
  /**
   * Returned sessions will be filtered only for given `date`.
   *
   * This will be treated as date object in `UTC` timezone. If this parameter isn't set, the current day in `UTC` timezone will be taken.
   */
  date?: string;
  /** Returned sessions will be filtered only for Autonomous AADE transactions. */
  AadeAutonomouslyOnly?: boolean;
  /** @deprecated Use `AadeAutonomouslyOnly`, as documented by Viva. */
  aadeAutonomouslyOnly?: boolean;
}

export interface VivaPosAbortSessionOptions {
  /** Session ID that should be aborted. */
  sessionId: string;
  /** Cash register identification. */
  cashRegisterId: string;
}

export interface VivaPosSessionReturn extends VivaPosExtraOptions {
  /** Transaction session identification - set by the merchant */
  sessionId?: string;
  /** The ID of the target terminal, as sent in the original request */
  terminalId?: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId?: string;
  /** Total amount authorized, including tip amount */
  amount?: number;
  /** The numeric code of the order's currency as defined in ISO 4712 */
  currencyCode?: string;
  /** Free text value that can be used by the merchant as a reference */
  merchantReference?: string | null;
  /** Customer reference applied to a sale */
  customerTrns?: string | null;
  /** Tip amount */
  tipAmount?: number;
  /** A string indicating the AID of the card. (Used in successful receipts) */
  aid?: string | null;
  /** A flag indicating whether transaction result will be shown. */
  showTransactionResult?: boolean;
  /** A flag indicating if the receipt and transaction result will be shown. */
  showReceipt?: boolean;
  /** Indicates if surcharge is skipped */
  skipSurcharge?: boolean;
  /** Indicates successful authorization result */
  success?: boolean;
  /** Used for transfering system state information, such as Error IDs. */
  eventId?: number;
  /** A numeric code that indicates the outcome of the transaction. */
  transactionEventId?: number;
  /** The card type information. */
  cardType?: string | null;
  /** Authorization Id response from the authorizing institution */
  authorizationId?: string | null;
  /** Transaction identification value */
  transactionId?: string;
  /** Provides information about the type of transaction. */
  transactionTypeId?: number;
  /** Unique transaction identification */
  retrievalReferenceNumber?: number;
  /** Indicates the method used for PAN entry to initiate a transaction. */
  panEntryMode?: string | null;
  /** Selected application label, VISA / AMEX etc. */
  applicationLabel?: string | null;
  /** The ID of the card network. */
  bankId?: string | null;
  /** Masked PAN number */
  primaryAccountNumberMasked?: string | null;
  /** Transaction date time in ISO 8601 format */
  transactionDateTime?: string;
  /** Specifies how the terminal app returned control after a transaction. */
  interappCallback?: string | null;
  /** Indicates whether this transaction should be aborted. */
  abortOperation?: boolean | null;
  /** Timestamp indicating when the POS retrieved the request to abort transaction. */
  abortAckTime?: string | null;
  /** Indicates whether status of abort operation was successful */
  abortSuccess?: boolean;
  /** The verification method used */
  verificationMethod?: string | null;
  /** The ID of the terminal, as returned in the transaction response. */
  tid?: string | null;
  /** 10-digit integer */
  shortOrderCode?: string | null;
  /** Number of card installments */
  installments?: number;
  /** Description of error if one occured */
  message?: string | null;
  /** Boolean flag indicating a preauth */
  preauth?: boolean;
  /** STAN number */
  referenceNumber?: number;
  loyaltyInfo?: VivaPosExtraOptions | null;
  dccDetails?: VivaPosExtraOptions | null;
  fiscalisationDetails?: VivaPosExtraOptions | null;
}

export type VivaPosRetrieveSessionInfoByDateReturn =
  VivaPosSessionReturn | VivaPosSessionReturn[];
