import MarketPlacePayments from './marketplace/MarketPlacePayments.class';
import MarketPlaceSellers from './marketplace/MarketPlaceSellers.class';
import MarketPlaceTransactions from './marketplace/MarketPlaceTransactions.class';
import MarketPlaceTransfers from './marketplace/MarketPlaceTransfers.class';
import { MethodReturn } from './types/Methods.types';
import { VivawalletAPIInit } from './types/Vivawallet.types';
import { VivaAuth } from './vivabases/VivaAuth.class';
import VivaPos from './vivawallet/VivaPos.class';
import VivaSourceCode from './vivawallet/VivaSourceCode.class';
import VivaWebhooks from './vivawallet/VivaWebhooks.class';

export class Marketplace extends VivaAuth {
  source: VivaSourceCode;
  payments: MarketPlacePayments;
  transactions: MarketPlaceTransactions;
  sellers: MarketPlaceSellers;
  transfers: MarketPlaceTransfers;
  webhooks: VivaWebhooks;
  pos: VivaPos;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.source = new VivaSourceCode(datas);
    this.payments = new MarketPlacePayments(datas);
    this.transactions = new MarketPlaceTransactions(datas);
    this.sellers = new MarketPlaceSellers(datas);
    this.transfers = new MarketPlaceTransfers(datas);
    this.webhooks = new VivaWebhooks(datas);
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
