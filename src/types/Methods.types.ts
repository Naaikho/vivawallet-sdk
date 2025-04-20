export interface MethodReturnDatas<T> {
  success: boolean;
  message: string;
  code?: 'initerror' | 'tokenerror' | 'error';
  data: T;
}

export type MethodReturn<T> = Promise<MethodReturnDatas<T>>;
