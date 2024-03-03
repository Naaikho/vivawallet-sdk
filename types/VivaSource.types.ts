export interface SourceCodeDatas {
  /**
   * The primary domain of your site. You should not enter protocol information (http/https) or paths.
   *
   * For example `www.domain.com` is a valid value for this property, whereas `http://www.domain.gr` and `www.domain.com/site` are not.
   */
  domain: string;
  /** `True` indicates that your site's protocol is HTTPS. */
  isSecure: boolean;
  /** A meaningful name that will help you identify the source in the Web Self Care environment. */
  name: string;
  /** The relative URL path that your client will end up to after a failed transaction. */
  pathFail: string;
  /** The relative URL path that your client will end up to after a successful transaction. */
  pathSuccess: string;
  /** A unique code that is exchanged between your application and the API. */
  sourceCode: string;
}
