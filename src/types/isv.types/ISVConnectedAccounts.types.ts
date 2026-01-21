export interface ISVGetAccountDatasOptions {
  /** 
   * The ID of the connected account
   * 
   * *Example: `93fddb89-a9de-4328-a06e-d99dc9719c01`*
   */
  accountId: string;
}

export interface ISVGetAccountDatasReturn {
  /** 
   * Account ID of the connected account
   */
  accountId: string;
  /** 
   * Merchant ID of the connected account
   */
  merchantId: string;
  /** 
   * Email address of the connected account
   */
  email: string;
  /** 
   * This value is set to `true` if the account has been verified
   */
  verified: boolean;
  /** 
   * This value is set to `true` if the account is able to charge cards and accept payments through the supported payment methods
   */
  acquiringEnabled: boolean;
  /** 
   * Date and time of connection of the connected account
   */
  created: string;
  /** 
   * The tax number of the connected account (can be null)
   */
  taxNumber: string | null;
  /** 
   * The VAT number of the connected account
   */
  vatNumber: string;
  /** 
   * The legal name of the entity
   */
  legalName: string;
  /** 
   * The registration number of the entity
   */
  registrationNumber: string;
  /** 
   * Invitation information for the created connected account
   */
  invitation: {
    /** 
     * Email address of the connected account
     */
    email: string;
    /** 
     * The URL that the user will be redirected to, to initiate the flow
     */
    redirectUrl: string;
    /** 
     * The date that the connected account was created
     */
    created: string;
  };
}

export interface ISVCreateAccountOptions {
  /** Email address. The same email address can be used to create multiple connected accounts. */
  email: string;
  /** The URL that the user will be redirected to upon completing the linked flow */
  returnurl: string;
  /** Branding information of the ISV Partner (optional) */
  branding?: {
    /** The name of the ISV Partner */
    partnerName: string;
    /** The brand colour of the ISV Partner (as a hex code) */
    primaryColor?: string;
    /** The URL of the brand logo of the ISV Partner */
    logoUrl: string;
  }
}

export interface ISVCreateAccountReturn {
  /** 
   * ID of the created connected account
   */
  accountId: string;
  /** 
   * Invitation information for the created connected account
   */
  invitation: {
    /** 
     * Email address of the connected account
     */
    email: string;
    /** 
     * The URL that the user will be redirected to, to initiate the flow
     */
    redirectUrl: string;
    /** 
     * Date and time of creation of the connected account
     */
    created: string;
  };
}