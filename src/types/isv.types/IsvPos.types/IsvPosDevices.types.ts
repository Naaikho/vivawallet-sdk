export type IsvStatusId = 0 | 1 | 2 | 3 | 5 | 6 | 7;

export interface ISVDevicesOptions {
  merchantId: string;
  statusId?: IsvStatusId;
  sourceCode?: string;
}

export interface ISVDevicesReturn {
  merchantId: string;
  terminalId: string;
  statusId: IsvStatusId;
  sourceCode: string;
  virtualTerminalId: string;
}