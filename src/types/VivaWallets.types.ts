export interface VivaLegacyWalletReturn {
  /** The `IBAN` which belongs to your Viva ID. */
  Iban: string;

  /** This is the ID of your Viva account. */
  WalletId: number;

  /** If the value is `true`, then this account is the primary. */
  IsPrimary: boolean;

  /** The grand total amount for this Viva account. */
  Amount: number;

  /** The available amount to use. */
  Available: number;

  /** The amount that the bank allows to the user to borrow. */
  Overdraft: number;

  /** The friendly name for this Viva id. */
  FriendlyName: string;

  /** The currency code for this Viva IBAN account. */
  CurrencyCode: number;

  /** Additional wallet data returned by Viva. */
  [key: string]: unknown;
}

export interface VivaMerchantWalletReturn {
  /** The `IBAN` which belongs to your Viva ID. */
  iban: string;

  /** This is the ID of your Viva account. */
  walletId: number;

  /** The grand total amount for this Viva account. */
  amount: number;

  /** If the value is `true`, then this account is the primary. */
  isPrimary: boolean;

  /** The available amount to use. */
  available: number;

  /** The amount that the bank allows to the user to borrow. */
  overdraft: number;

  /** The currency code for this Viva IBAN account. */
  currencyCode: number;

  /** The friendly name for this Viva id. */
  friendlyName: string;

  /** Additional wallet data returned by Viva. */
  [key: string]: unknown;
}
