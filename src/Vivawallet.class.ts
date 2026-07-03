import { MethodReturn } from './types/Methods.types';
import {
  VivaSmartCheckoutOptions,
  VivawalletAPIInit,
} from './types/Vivawallet.types';
import { VivaAuth } from './vivabases/VivaAuth.class';
import VivaEndpoints from './vivabases/VivaEndpoints.class';
import VivaBankTransfers from './vivawallet/VivaBankTransfers.class';
import VivaDataServices from './vivawallet/VivaDataServices.class';
import VivaLegacyBankAccounts from './vivawallet/VivaLegacyBankAccounts.class';
import VivaObligations from './vivawallet/VivaObligations.class';
import VivaPayments from './vivawallet/VivaPayments.class';
import VivaPos from './vivawallet/VivaPos.class';
import VivaRFCodePayments from './vivawallet/VivaRFCodePayments.class';
import VivaResellers from './vivawallet/VivaResellers.class';
import VivaSourceCode from './vivawallet/VivaSourceCode.class';
import VivaTransactions from './vivawallet/VivaTransactions.class';
import VivaWallets from './vivawallet/VivaWallets.class';
import VivaWebhooks from './vivawallet/VivaWebhooks.class';

class Vivawallet extends VivaAuth {
  payments: VivaPayments;
  transactions: VivaTransactions;
  source: VivaSourceCode;
  webhooks: VivaWebhooks;
  resellers: VivaResellers;
  wallets: VivaWallets;
  bankTransfers: VivaBankTransfers;
  dataServices: VivaDataServices;
  legacyBankAccounts: VivaLegacyBankAccounts;
  obligations: VivaObligations;
  rfCodePayments: VivaRFCodePayments;
  pos: VivaPos;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.payments = new VivaPayments(datas);
    this.transactions = new VivaTransactions(datas);
    this.source = new VivaSourceCode(datas);
    this.webhooks = new VivaWebhooks(datas);
    this.resellers = new VivaResellers(datas);
    this.wallets = new VivaWallets(datas);
    this.bankTransfers = new VivaBankTransfers(datas);
    this.dataServices = new VivaDataServices(datas);
    this.legacyBankAccounts = new VivaLegacyBankAccounts(datas);
    this.obligations = new VivaObligations(datas);
    this.rfCodePayments = new VivaRFCodePayments(datas);
    this.pos = new VivaPos(datas);
  }

  /* ------------------------- DEPRECATED METHODS ------------------------- */

  /**
   * Return the code needed for Viva webhooks returns or `null` on request failed.
   *
   * @deprecated Use `webhooks.retrieveWebhookKey()` instead.
   */
  async getVivaWebhookCode(): MethodReturn<string | null, 'webhookerror'> {
    return this.webhooks.retrieveWebhookKey();
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
