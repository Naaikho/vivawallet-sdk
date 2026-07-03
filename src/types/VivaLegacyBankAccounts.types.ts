import type { VivaBankTransferInstructionType } from './VivaBankTransfers.types';

export interface VivaLegacyLinkBankAccountOptions {
  /** The desired IBAN. */
  iban: string;

  /** A friendly name of your choosing. */
  friendlyName?: string;

  /** A beneficiary name of your choosing. */
  beneficiaryName?: string;
}

export interface VivaLegacyBankAccountReturn {
  /** The linked IBAN as beneficiary in your Viva account. */
  Iban?: string;

  /** The IBAN's bank Id. */
  BankId?: string;

  IsArchived?: boolean;

  /** The id of the bank account in your Viva account. */
  BankAccountId?: string;

  /** A friendly name of your choosing. */
  FriendlyName?: string;

  /** The currency code of the targeted IBAN. */
  CurrencyCode?: number;

  /** A beneficiary name of your choosing. */
  BeneficiaryName?: string;

  VerificationRetries?: number;

  IdentificationState?: number;

  /** Additional bank account data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaLegacyOutgoingBankTransferOptions {
  /** The amount for the bank transfer. */
  amount: number;

  /** A short description for the bank transfer. */
  description?: string;

  /** Indicates the intent to try the transfer as instant. */
  trySendInstant?: boolean;

  /**
   * Indicates the instruction type for this bank transfer.
   *
   * Enum:
   * `1` = Shared
   * `2` = Ours
   *
   * The OUR instruction means you pay all transfer charges.
   * SHA (shared) means you only pay your bank's outgoing transfer charge.
   *
   * If OUR is specified but not supported, the transfers will be executed as SHA.
   *
   * Default: `1`
   */
  instructionTypeId?: VivaBankTransferInstructionType;
}

export interface VivaLegacyOutgoingBankTransferReturn {
  /** The command id for the outgoing bank transfer. */
  CommandId?: string;

  /** Indicates whether the transfer was executed as instant. */
  IsInstant?: boolean;

  /** Additional bank transfer data returned by Viva. */
  [key: string]: unknown;
}
