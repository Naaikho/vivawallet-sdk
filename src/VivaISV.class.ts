import { VivawalletAPIInit } from './types/Vivawallet.types';
import VivaAuth from './vivabases/VivaAuth.class';

export class VivaISV extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }
}
