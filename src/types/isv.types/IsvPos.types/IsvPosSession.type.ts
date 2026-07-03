import type {
  VivaPosRetrieveSessionInfoByDateOptions,
  VivaPosRetrieveSessionInfoByDateReturn,
  VivaPosSessionReturn,
} from '../../VivaPos.types';

export interface ISVAbortSessionOptions {
  /** Session ID that should be aborted. */
  sessionId: string;
  /** Cash register identification - set by the merchant */
  cashRegisterId: string;
}

export interface ISVRetrieveSessionByIdOptions {
  /** Transaction session identification - set by the merchant */
  sessionId: string;
}

export interface ISVRetrieveSessionInfoByDateOptions extends VivaPosRetrieveSessionInfoByDateOptions {}

export interface ISVGetSessionReturn extends VivaPosSessionReturn {}

export type ISVRetrieveSessionInfoByDateReturn =
  VivaPosRetrieveSessionInfoByDateReturn;
