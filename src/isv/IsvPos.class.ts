import { VivawalletISVInit } from '../types/Vivawallet.types';
import { VivaAuthISV } from '../vivabases/VivaAuth.class';
import IsvPosDevices from './IsvPos/IsvPosDevices.class';
import IsvPosSession from './IsvPos/IsvPosSession.class';
import IsvPosTransactions from './IsvPos/IsvPosTransactions.class';

export default class IsvPos extends VivaAuthISV {
  devices: IsvPosDevices;
  transactions: IsvPosTransactions;
  session: IsvPosSession;

  constructor(datas: VivawalletISVInit) {
    super(datas);
    this.devices = new IsvPosDevices(datas);
    this.transactions = new IsvPosTransactions(datas);
    this.session = new IsvPosSession(datas);
  }
}
