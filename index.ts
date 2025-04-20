/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import { Marketplace } from './src/MarketPlace.class';
import VivaAuth from './src/vivabases/VivaAuth.class';
import VivaEndpoints from './src/vivabases/VivaEndpoints.class';
import VivaSkull from './src/vivabases/VivaSkull.class';
import Vivawallet, { getSmartCheckout } from './src/Vivawallet.class';

const VivaBases = {
  VivaEndpoints,
  VivaSkull,
  VivaAuth,
};

export { Vivawallet, getSmartCheckout, Marketplace, VivaBases };
