export type VivaBankTransferInstructionType = 1 | 2;

export interface VivaLinkBankAccountOptions {
  /** The IBAN of the bank account to link to. */
  iban: string;

  /** A friendly name of your choosing. */
  friendlyName?: string;

  /** A beneficiary name of your choosing. */
  beneficiaryName?: string;
}

export interface VivaLinkBankAccountReturn {
  /** The id of the linked bank account. */
  bankAccountId: string;

  /** Indicates if this IBAN is a Viva bank account or not. */
  isVivaIban: boolean;
}

export interface VivaBankAccountsQuery {
  /** Skip number of bank accounts. */
  skip?: number;

  /** Number of rows to fetch. */
  maxResults?: number;

  /** The iban of the bank account. */
  iban?: string;

  /** Option to get archived bank accounts. */
  isArchived?: boolean;

  /** The id of the linked bank account. */
  bankAccountId?: string;
}

export interface VivaBankAccountReturn {
  /** The International Bank Account Number. */
  iban: string;

  /** The IBAN's bank Id. */
  bankId: string;

  /**
   * The status of the specific bank account id.
   *
   * You can not make bank transfer(s) to archived bank account id(s).
   */
  isArchived: boolean;

  /** The SWIFT bank id. */
  swiftCode?: string;

  /** The id of the linked bank account. */
  bankAccountId: string;

  /** A friendly name of your choosing. */
  friendlyName?: string;

  /** A beneficiary name of your choosing. */
  beneficiaryName?: string;

  /** Indicates if this IBAN is a Viva bank account or not. */
  isVivaIban: boolean;

  /** Additional bank account data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaUpdateBankAccountOptions {
  /** The desired bank account status. */
  archive: boolean;

  /** A desired friendly name of your choosing. */
  friendlyName?: string;

  /** A desired beneficiary name of your choosing. */
  beneficiaryName?: string;
}

export interface VivaUpdateBankAccountReturn {
  /** The bank account status. */
  archive: boolean;

  /** A friendly name of your choosing. */
  friendlyName?: string;

  /** A beneficiary name of your choosing. */
  beneficiaryName?: string;

  /** Additional bank account data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaBankTransferOptionsQuery {
  /** The amount of the requested outgoing bank transfer. */
  amount: number;
}

export interface VivaBankTransferOptionsReturn {
  /** Indicates if the linked bank account supports instant transfers or not. */
  supportsInstant: boolean;

  /** The supported instruction types for the linked bank account. */
  instructionTypes: VivaBankTransferInstructionType[];

  /** Additional bank transfer option data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaCreateBankTransferFeeOptions {
  /** The amount of the requested outgoing bank transfer. */
  amount: number;

  /** The wallet id from which the amount will be transferred. */
  walletId: number;

  /** Indicates if the outgoing bank transfer will be instant or not. */
  isInstant?: boolean;

  /** Indicates the instruction type for this bank transfer. */
  instructionType: VivaBankTransferInstructionType;
}

export interface VivaCreateBankTransferFeeReturn {
  /** The fee associated with the desired outgoing bank transfer. */
  fee: number;

  /** Indicates if the outgoing bank transfer will be instant or not. */
  isInstant: boolean;

  /** The id of the bank transfer fee command, which is associated with the specific fee, instruction type and instant flag. */
  bankCommandId: string;

  /** Indicates the instruction type for this bank transfer. */
  instructionType: VivaBankTransferInstructionType;

  /** Additional bank transfer fee data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaExecuteBankTransferOptions {
  /** The amount of the requested outgoing bank transfer. */
  amount: number;

  /** The wallet id from which the amount will be transferred. */
  walletId: number;

  /** Specify a description for this outgoing bank transfer. */
  description?: string;

  /** Specify the id of the bank transfer fee command, which is associated with specific: fee, instruction type, and instant flag. */
  bankCommandId?: string;
}

export interface VivaExecuteBankTransferReturn {
  /** The fee represents only the part of the fee that the requestor/sender (ie. the merchant) will be charged and NOT the beneficiary's fee. */
  fee: number;

  /** The command id for the outgoing bank transfer, if the linked bank account is not an IBAN within Viva. */
  commandId?: string;

  /** Indicates if the outgoing bank transfer will be instant or not. */
  isInstant: boolean;

  /** The transaction id associated with the outgoing wallet transfer, if the linked bank account is an IBAN within Viva. */
  walletTransactionId?: string;

  /** Additional bank transfer execution data returned by Viva. */
  [key: string]: unknown;
}
