import { VivawalletAPIInit } from '../types/Vivawallet.types';
import { VivaAuth } from '../vivabases/VivaAuth.class';
import VivaPosDevices from './VivaPos/VivaPosDevices.class';
import VivaPosSession from './VivaPos/VivaPosSession.class';
import VivaPosTransactions from './VivaPos/VivaPosTransactions.class';

export default class VivaPos extends VivaAuth {
  devices: VivaPosDevices;
  transactions: VivaPosTransactions;
  session: VivaPosSession;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.devices = new VivaPosDevices(datas);
    this.transactions = new VivaPosTransactions(datas);
    this.session = new VivaPosSession(datas);
  }
}
