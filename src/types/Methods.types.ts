export interface MethodReturnDatas<T> {
  success: true;
  message: string;
  data: T | null;
}

export interface MethodErrorReturnDatas<E> {
  success: false;
  message: string;
  code: E | 'sourcecodeerror' | 'initerror' | 'error';
  data: null;
}

export type MethodReturn<T, E = 'nodatas'> = Promise<MethodReturnDatas<T> | MethodErrorReturnDatas<E>>;
