export type MPPayoutDayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type MPPayoutInterval = 1 | 2 | 3;

export interface MPConnectedAccountAddress {
  /** Street */
  street?: string;
  /** House, flat or building number */
  number?: string;
  /** City */
  city?: string;
  /** Postal Code */
  postCode?: string;
  /**
   * Postal Code
   *
   * @deprecated Use `postCode`, as documented by Viva.
   */
  postalCode?: string;
  /** Country Code */
  countryCode?: string;
  /** Second line address information (if relevant) */
  secondLine?: string | null;
}

export interface MPConnectedAccountBranding {
  /** The name of the marketplace (for header and title) */
  partnerName: string;
  /** The brand colour of the marketplace (as a hex code) */
  primaryColor?: string;
  /** The URL of the brand logo of the marketplace */
  logoUrl: string;
}

export interface MPConnectedAccountBankAccount {
  /**
   * IBAN of the bank account
   *
   * Note: It is not allowed the IBAN, to be a Viva IBAN.
   */
  iban?: string | null;
  /** Friendly name */
  friendlyName?: string | null;
  /** Beneficiary name */
  beneficiaryName: string;
  /** Branch code of the bank account */
  branchCode?: string | null;
  /** Account number of the bank account */
  accountNumber?: string | null;
  /** Country code */
  countryCode?: string | null;
}

export interface MPConnectedAccountPayouts {
  /** Description to show on the statement */
  statementDescriptor?: string | null;
  /**
   * Required when interval is `weekly`
   *
   * Possible values: `1 - sunday`, `2 - monday`, `3 - tuesday`, `4 - wednesday`, `5 - thursday`, `6 - friday`, `7 - saturday`.
   */
  dayOfWeek?: MPPayoutDayOfWeek | null;
  /**
   * Required when interval is `weekly`
   *
   * @deprecated Use `dayOfWeek`, as documented by Viva.
   */
  dayofWeek?: MPPayoutDayOfWeek | null;
  /** Required when interval is `monthly` */
  dayOfMonth?: number | null;
  /** Possible values: `1 - daily`, `2 - weekly`, `3 - monthly` */
  interval?: MPPayoutInterval | null;
  /** Amount threshold defines the least amount of balance that is required to create an automated payout transfer. Must be non-zero positive number and enough to cover any bank transfer fees that may apply Default is `10 EUR` or equivalent */
  amountThreshold?: number | null;
  /** Set this property to `true` if you want to hold the automatic handling of payouts */
  disable?: boolean | null;
  /** Either use `iban` - or - `accountNumber`, `branchCode` and `countryCode` */
  bankAccount?: MPConnectedAccountBankAccount;
}

export interface MPCreateConnectedAccountPayouts
  extends MPConnectedAccountPayouts {
  /** Possible values: `1 - daily`, `2 - weekly`, `3 - monthly` */
  interval: MPPayoutInterval;
  /** Either use `iban` - or - `accountNumber`, `branchCode` and `countryCode` */
  bankAccount: MPConnectedAccountBankAccount;
}

export interface MPConnectedAccountInvitation {
  /** Email address of the connected account */
  email: string;
  /** The invitation URL to be sent by the marketplace owner to the connected account; the seller will follow the URL to initiate the onboarding process to become a seller for the marketplace */
  redirectUrl: string;
  /** Date and time of creation of the connected account */
  created: string;
}

export interface MPCreateAccountDatas {
  /** Email address. The same email address can be used to create multiple connected accounts. */
  email: string;
  /** Mobile number */
  mobile?: string;
  /** Company's legal name */
  legalName?: string;
  /** Company's trade name */
  tradeName?: string;
  /** Company's tax number */
  taxNumber?: string;
  /** The URL that the seller will be redirected to upon completing the onboarding process */
  returnUrl: string;
  /** Company's address */
  address?: MPConnectedAccountAddress;
  /** Branding information of the marketplace */
  branding: MPConnectedAccountBranding;
  /** To be used for sellers that wish to automatically receive their payouts to a 3rd party bank account outside Viva according to a defined interval (leave empty for manual handling of payouts) */
  payouts?: MPCreateConnectedAccountPayouts;
}

export interface MPCreateAccountResponse {
  /** ID of the created connected account */
  accountId: string;
  /** Invitation information for the created connected account */
  invitation: MPConnectedAccountInvitation;
}

export interface MPConnectedAccountReturn {
  /** ID of the connected account */
  accountId: string;
  /** Email address of the connected account */
  email: string;
  /** Payouts configuration for the connected account */
  payouts?: MPConnectedAccountPayouts;
  /** This value is set to `true` if the connected account (Viva account) has been verified */
  verified: boolean;
  /** This value is set to `true` if the connected account (Viva account) is able to charge cards and accept payments through the supported payments methods */
  acquiringEnabled: boolean;
  /** Date and time of connection of the connected account to the platform account */
  created: string;
  /** Invitation information for the created connected account */
  invitation?: MPConnectedAccountInvitation;
}

export interface MPUpdateConnectedAccountOptions {
  /** To be used for sellers with full Viva accounts (leave empty for manual handling of payouts) */
  payouts?: MPConnectedAccountPayouts;
}

export type MPUpdateConnectedAccountReturn = null;
