/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import VivaAuth from './src/vivabases/VivaAuth.class';
import VivaEndpoints from './src/vivabases/VivaEndpoints.class';
import VivaSkull from './src/vivabases/VivaSkull.class';
import Vivawallet, {
  getSmartCheckout,
} from './src/vivawallet/Vivawallet.class';
import { Marketplace } from './src/vivawallet/MarketPlace.class';

const ClassBase = {
  VivaEndpoints,
  VivaSkull,
  VivaAuth,
};

export { Vivawallet, getSmartCheckout, Marketplace, ClassBase };
