export interface ISVCreateSourceOptions {
  /** The id of the merchant that the source belongs to. */
  targetMerchantId: string;

  /**
   * The primary domain of your site. You should not enter protocol information (http/https) or paths.
   *
   * Note: This parameter is mandatory only if the source is for `e-commerce`.
   */
  domain?: string;

  /**
   * `True` indicates that your site's protocol is HTTPS.
   *
   * Note: This parameter is mandatory only if the source is for `e-commerce`.
   */
  isSecure?: boolean;

  /** A meaningful name that will help you identify the source in the Web Self Care environment. */
  name: string;

  /**
   * The relative URL path that your client will end up at after a failed transaction.
   *
   * Note: This parameter is mandatory only if the source is for `e-commerce`.
   */
  pathFail?: string;

  /**
   * The relative URL path that your client will end up at after a successful transaction.
   *
   * Note: This parameter is mandatory only if the source is for `e-commerce`.
   */
  pathSuccess?: string;

  /** A unique code that is exchanged between your application and the API. */
  sourceCode: string | number;

  /**
   * A phone contact number. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  phone?: string;

  /**
   * The address where the softPOS/card terminal will be located. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  address?: string;

  /**
   * The wallet ID with which the source will be linked. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  walletId?: number;

  /**
   * If the source is associated with in-person payments, this value should always be `true`. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  isPhysical?: boolean;

  /**
   * The latitude of the softPOS/card terminal location. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  latitude?: number;

  /**
   * The longitude of the softPOS/card terminal location. Used only for card-present transactions.
   *
   * Note: This parameter is mandatory only if the source is for `card-present transactions`.
   */
  longitude?: number;

  /** A description displayed on the cardholder's bank statement. Used only for card-present transactions. */
  transactionDescriptor?: string;
}
