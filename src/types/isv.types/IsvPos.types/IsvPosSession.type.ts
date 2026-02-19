export interface ISVAbortSessionOptions {
  /** Session ID that should be aborted. */
  sessionId: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId: string;
}
