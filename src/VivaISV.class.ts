import IsvConnectedAccounts from './isv/IsvConnectedAccounts.class';
import IsvPayments from './isv/IsvPayments.class';
import IsvPos from './isv/IsvPos.class';
import IsvWebhook from './isv/IsvWebhook.class';
import { VivawalletISVInit } from './types/Vivawallet.types';
import { VivaAuthISV } from './vivabases/VivaAuth.class';

export class VivaISV extends VivaAuthISV {
  connectedAccounts: IsvConnectedAccounts;
  payments: IsvPayments;
  pos: IsvPos;
  webhook: IsvWebhook;

  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.connectedAccounts = new IsvConnectedAccounts(datas);
    this.payments = new IsvPayments(datas);
    this.pos = new IsvPos(datas);
    this.webhook = new IsvWebhook(datas);
  }
}
