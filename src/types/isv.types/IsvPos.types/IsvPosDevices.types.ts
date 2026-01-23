export type IsvStatusId = 0 | 1 | 2 | 3 | 5 | 6 | 7;

export interface ISVDevicesOptions {
  /** ID of the relevant Merchant */
  merchantId: string;
  /** Status of the device:
   * 
   * - `0 = WareHouse`
   * - `1 = Live`
   * - `2 = Ready To Ship`
   * - `3 = In Stock`
   * - `4 = Pending Key Injection`
   * - `5 = Lost`
   * - `6 = Broken`
   * - `7 = Locked`
   */
  statusId?: IsvStatusId;
  /** Custom indentification code assigned to the device by the merchant */
  sourceCode?: string;
}

export interface ISVDevicesReturn {
  /** ID of the relevant Merchant */
  merchantId: string;
  /** ID of the terminal */
  terminalId: string;
  /** Status of the device */
  statusId: IsvStatusId;
  /** Custom indentification code assigned to the device by the merchant */
  sourceCode: string;
  /** Virtual Terminal identification - the virtual serial number if the terminal */
  virtualTerminalId: string;
}