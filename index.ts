/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import VivaAuth from './src/vivawallet/VivaAuth.class';
import VivaEndpoints from './src/vivawallet/VivaEndpoints.class';
import VivaSkull from './src/vivawallet/VivaSkull.class';
import Vivawallet, {
  getSmartCheckout,
} from './src/vivawallet/Vivawallet.class';

module.exports = {
  Vivawallet,
  getSmartCheckout,
  ClassBase: {
    VivaEndpoints,
    VivaSkull,
    VivaAuth,
  },
};
