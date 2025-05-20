import { VivawalletAPIInit } from './types/Vivawallet.types';
import VivaSourceCode from './vivawallet/VivaSourceCode.class';
import MarketPlacePayments from './marketplace/MarketPlacePayments.class';
import MarketPlaceTransfers from './marketplace/MarketPlaceTransfers.class';
import MarketPlaceSellers from './marketplace/MarketPlaceSellers.class';
import MarketPlaceTransactions from './marketplace/MarketPlaceTransactions.class';
import { VivaAuth } from './vivabases/VivaAuth.class';

export class Marketplace extends VivaAuth {
  source: VivaSourceCode;
  payments: MarketPlacePayments;
  transactions: MarketPlaceTransactions;
  sellers: MarketPlaceSellers;
  transfers: MarketPlaceTransfers;

  constructor(datas: VivawalletAPIInit) {
    super(datas);
    this.source = new VivaSourceCode(datas);
    this.payments = new MarketPlacePayments(datas);
    this.transactions = new MarketPlaceTransactions(datas);
    this.sellers = new MarketPlaceSellers(datas);
    this.transfers = new MarketPlaceTransfers(datas);
  }
}
