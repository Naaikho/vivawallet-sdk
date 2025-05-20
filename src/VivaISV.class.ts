import IsvPos from './isv/IsvPos.class';
import { VivawalletAPIInit } from './types/Vivawallet.types';
import VivaAuth from './vivabases/VivaAuth.class';

export class VivaISV extends VivaAuth {
  pos: IsvPos;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.pos = new IsvPos(datas);
  }
}
