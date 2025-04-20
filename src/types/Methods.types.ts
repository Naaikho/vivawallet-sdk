export interface MethodReturnDatas<T, E> {
  success: boolean;
  message: string;
  code?: E | 'sourcecodeerror' | 'initerror' | 'error';
  data?: T;
}

export type MethodReturn<T, E> = Promise<MethodReturnDatas<T, E>>;
