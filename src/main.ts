/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import VivaAuth from './vivawallet/VivaAuth.class';
import VivaEndpoints from './vivawallet/VivaEndpoints.class';
import VivaSkull from './vivawallet/VivaSkull.class';
import Vivawallet, { getSmartCheckout } from './vivawallet/Vivawallet.class';

const vivawallet = {
  Vivawallet,
  getSmartCheckout,
  base: {
    VivaEndpoints,
    VivaSkull,
    VivaAuth,
  },
};

export default vivawallet;
