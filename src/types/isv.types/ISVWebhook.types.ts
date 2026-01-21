export interface ISVGetWebhookKeyReturn {
  key: string;
}

export interface ISVCreateWebhookOptions {
  /**
   * Webhook endpoint URL
   */
  url: string;
  /**
   * Event Type of the desired webhook:
   * 
   * - **1802** - Transaction POS Ecr Session Created
   * - **1803** - Transaction POS Ecr Session Failed
   * - **1796** - Transaction Payment Created
   * - **1797** - Transaction Reversal Created
   * - **1798** - Transaction Failed
   * - **1799** - Transaction Price Calculated
   * - **8193** - Account Connected
   * - **8194** - Account Verification Status Changed
   */
  eventTypeId: 1802 | 1803 | 1796 | 1797 | 1798 | 1799 | 8193 | 8194;
}