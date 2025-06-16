import IsvPayments from './isv/IsvPayments.class';
import IsvPos from './isv/IsvPos.class';
import { VivawalletISVInit } from './types/Vivawallet.types';
import { VivaAuthISV } from './vivabases/VivaAuth.class';

export class VivaISV extends VivaAuthISV {
  pos: IsvPos;
  payments: IsvPayments;

  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.pos = new IsvPos(datas);
    this.payments = new IsvPayments(datas);
  }
}
