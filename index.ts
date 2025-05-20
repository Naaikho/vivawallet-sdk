/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import VivaAuth from './src/vivabases/VivaAuth.class';
import VivaEndpoints from './src/vivabases/VivaEndpoints.class';
import VivaSkull from './src/vivabases/VivaSkull.class';
import Vivawallet, { getSmartCheckout } from './src/Vivawallet.class';
import { VivaISV } from './src/VivaISV.class';
import { Marketplace } from './src/MarketPlace.class';

const VivaBases = {
  VivaEndpoints,
  VivaSkull,
  VivaAuth,
};

export { Vivawallet, getSmartCheckout, Marketplace, VivaISV, VivaBases };
