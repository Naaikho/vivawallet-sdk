import {
  VivaSmartCheckoutOptions,
  VivawalletAPIInit,
} from './types/Vivawallet.types';
import VivaAuth from './vivabases/VivaAuth.class';
import VivaEndpoints from './vivabases/VivaEndpoints.class';
import VivaPayments from './vivawallet/VivaPayments.class';
import VivaTransactions from './vivawallet/VivaTransactions.class';
import VivaSourceCode from './vivawallet/VivaSourceCode.class';

class Vivawallet extends VivaAuth {
  payments: VivaPayments;
  transactions: VivaTransactions;
  source: VivaSourceCode;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.payments = new VivaPayments(datas);
    this.transactions = new VivaTransactions(datas);
    this.source = new VivaSourceCode(datas);
  }
}

/** Return the smart checkout url with the `orderCode` */
export function getSmartCheckout(options: VivaSmartCheckoutOptions): string {
  const endpoints = options.dev
    ? VivaEndpoints.demoEndpoints
    : VivaEndpoints.prodEndpoints;
  let res = endpoints.checkout.url.replace('{orderCode}', options.orderCode);
  if (options.color) res += '&color=' + options.color;
  if (options.paymentMethod) res += '&paymentMethod=' + options.paymentMethod;
  return res;
}

export default Vivawallet;
