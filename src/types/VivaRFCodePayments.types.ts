export interface VivaGenerateRfCodesOptions {
  /**
   * The 16-digit orderCode for which you wish to retrieve information.
   *
   * Please note: During payment order creation, the `disableExactAmount` parameter determines whether the Reference Number (RF) is restricted to a specific payment amount.
   */
  orderCode: string | number;
}

export type VivaGenerateRfCodesReturn = string | null;
