export interface CreateAccountDatas {
  /** Email address */
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
  address?: {
    /** Street */
    street?: string;
    /** House, flat or building number */
    number?: string;
    /** City */
    city?: string;
    /** Postal Code */
    postalCode?: string;
    /** Country Code */
    countryCode?: string;
    /** Second line address information (if relevant) */
    secondLine?: string;
  };
  /** Branding information of the marketplace */
  branding: {
    /** The name of the marketplace (for header and title) */
    partnerName: string;
    /** The brand colour of the marketplace (as a hex code) */
    primaryColor?: string;
    /** The URL of the brand logo of the marketplace */
    logoUrl: string;
  };
  /** To be used for sellers that wish to automatically receive their payouts to a 3rd party bank account outside Viva according to a defined interval (leave empty for manual handling of payouts) */
  payouts?: {
    /** Description to show on the statement */
    statementDescriptor?: string;
    /**
     * ### Required when interval is `2 - weekly`
     *
     * Possible values: `1 - sunday`, `2 - monday`, `3 - tuesday`, `4 - wednesday`, `5 - thursday`, `6 - friday`, `7 - saturday`.
     */
    dayofWeek?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** ### Required when interval is `3 - monthly` */
    dayOfMonth?: number;
    /** Possible values: `1 - daily`, `2 - weekly`, `3 - monthly` */
    interval: 1 | 2 | 3;
    /** Amount threshold defines the least amount of balance that is required to create an automated payout transfer. Must be non-zero positive number and enough to cover any bank transfer fees that may apply Default is `10 EUR` or equivalent */
    amountThreshold?: number;
    /** Set this property to `true` if you want to hold the automatic handling of payouts */
    disable?: boolean;
    /** Either use `iban` - **or** - `accountNumber`, `branchCode` and `countryCode` */
    bankAccount: {
      /** IBAN of the bank account */
      iban?: string;
      /** Friendly name */
      friendlyName?: string;
      /** Beneficiary name */
      beneficiaryName: string;
      /** Branch code of the bank account */
      branchCode?: string;
      /** Account number of the bank account */
      accountNumber?: string;
      /** Country code */
      countryCode?: string;
    };
  };
}

export interface CreateAccountResponse {
  /** ID of the created connected account */
  accountId: string;
  /** Invitation information for the created connected account */
  invitation: {
    /** Email address of the connected account */
    email: string;
    /** The invitation URL to be sent by the marketplace owner to the connected account; the seller will follow the URL to initiate the onboarding process to become a seller for the marketplace */
    redirectUrl: string;
    /** Date and time of creation of the connected account */
    created: string;
  };
}
