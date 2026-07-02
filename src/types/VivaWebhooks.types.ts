export type VivaWebhookSubscriptionEvent = 'SaleTransactionsFileGenerated';

export interface VivaWebhookSubscriptionOptions {
  /** URL that will receive the webhook POST requests. */
  url: string;

  /** This is a merchant-defined parameter, used to generate SHA-1 and SHA-256 signatures provided to webhook POST requests. */
  secret: string;

  /** WebHook subscription events (i.e. SaleTransactionsFileGenerated). */
  events: VivaWebhookSubscriptionEvent[];
}

export interface VivaWebhookSubscriptionReturn {
  /** Id of subscription (should be stored in order to be used for update/delete). */
  subscriptionId: string;
}

export interface VivaWebhookDeleteSubscriptionReturn {
  message: string;
}

export interface VivaWebhookSubscriptionDatas {
  /** URL that will receive the webhook POST requests. */
  url: string;

  /** Id of subscription. */
  subscriptionId: string;

  /** WebHook subscription events (i.e. SaleTransactionsFileGenerated). */
  events: VivaWebhookSubscriptionEvent[];

  /** Additional subscription data returned by Viva. */
  [key: string]: unknown;
}
