export interface GetVivaTokenReturn {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface VivaCloudTerminalAccessTokenOptions {
  /**
   * Value MUST be set to "client_credentials"
   */
  grant_type: 'client_credentials';
}

export interface VivaCloudTerminalAccessTokenReturn {
  /**
   * The access token issued by the authorization server
   */
  access_token: string;
  /**
   * The lifetime in seconds of the access token. For example, the value "3600" denotes that the access token will expire in one hour from the time the response was generated
   */
  expires_in: number;
  /**
   * The type of the token issued
   */
  token_type: string;
  /**
   * The scope of the access token
   */
  scope: string;
}
