/**
 * Package: VivaWallet API SDK
 * Autor: Naikho
 * Description: Non-Official VivaWallet API SDK
 * License: ISC
 */

import { Marketplace } from './src/MarketPlace.class';
import type { MethodReturn } from './src/types/Methods.types';
import type {
  VivaBankAccountReturn,
  VivaBankAccountsQuery,
  VivaBankTransferOptionsQuery,
  VivaBankTransferOptionsReturn,
  VivaCreateBankTransferFeeOptions,
  VivaCreateBankTransferFeeReturn,
  VivaExecuteBankTransferOptions,
  VivaExecuteBankTransferReturn,
  VivaLinkBankAccountOptions,
  VivaLinkBankAccountReturn,
  VivaUpdateBankAccountOptions,
  VivaUpdateBankAccountReturn,
} from './src/types/VivaBankTransfers.types';
import type {
  VivaGetOrderReturn,
  VivaLegacyPaymentOrderOptions,
  VivaLegacyPaymentOrderReturn,
  VivaUpdateOrderOptions,
  VivaUpdateOrderReturn,
} from './src/types/VivaOrder.types';
import type {
  VivaResellerBillPaymentOptions,
  VivaResellerBillPaymentReturn,
  VivaResellerCashPaymentOptions,
  VivaResellerCashPaymentReturn,
  VivaResellerCheckBillPaymentOptions,
  VivaResellerCheckCashPaymentOptions,
  VivaResellerCreateOrderOptions,
  VivaResellerCreateOrderReturn,
  VivaResellerEligibilityReturn,
  VivaResellerOtpOptions,
} from './src/types/VivaResellers.types';
import type {
  VivaCancelPartialAuthorizationOptions,
  VivaCancelRebateFastRefundOptions,
  VivaCreateCardTokenOptions,
  VivaCreateCardTokenReturn,
  VivaFastRefundOptions,
  VivaIncrementalPreauthOptions,
  VivaLegacyTransactionsQuery,
  VivaLegacyTransactionsReturn,
  VivaOctPayoutOptions,
  VivaRebateOptions,
  VivaTransactionIdReturn,
} from './src/types/VivaTransactions.types';
import type {
  VivaLegacyWalletReturn,
  VivaMerchantWalletReturn,
} from './src/types/VivaWallets.types';
import {
  ConnectedAccountWebhookEventDatas,
  SmartCheckoutWebhookEventDatas,
  VivaWebhookDatas,
} from './src/types/VivaWebHook.types';
import type {
  VivaWebhookDeleteSubscriptionReturn,
  VivaWebhookSubscriptionDatas,
  VivaWebhookSubscriptionEvent,
  VivaWebhookSubscriptionOptions,
  VivaWebhookSubscriptionReturn,
} from './src/types/VivaWebhooks.types';
import { VivaAuth, VivaAuthISV } from './src/vivabases/VivaAuth.class';
import VivaEndpoints from './src/vivabases/VivaEndpoints.class';
import VivaSkull from './src/vivabases/VivaSkull.class';
import { VivaISV } from './src/VivaISV.class';
import Vivawallet, { getSmartCheckout } from './src/Vivawallet.class';

const VivaBases = {
  VivaEndpoints,
  VivaSkull,
  VivaAuth,
  VivaAuthISV,
};

export {
  getSmartCheckout,
  Marketplace,
  VivaBases,
  VivaISV,
  Vivawallet,
  type ConnectedAccountWebhookEventDatas,
  type MethodReturn,
  type SmartCheckoutWebhookEventDatas,
  type VivaBankAccountReturn,
  type VivaBankAccountsQuery,
  type VivaBankTransferOptionsQuery,
  type VivaBankTransferOptionsReturn,
  type VivaCancelPartialAuthorizationOptions,
  type VivaCancelRebateFastRefundOptions,
  type VivaCreateBankTransferFeeOptions,
  type VivaCreateBankTransferFeeReturn,
  type VivaCreateCardTokenOptions,
  type VivaCreateCardTokenReturn,
  type VivaExecuteBankTransferOptions,
  type VivaExecuteBankTransferReturn,
  type VivaFastRefundOptions,
  type VivaGetOrderReturn,
  type VivaIncrementalPreauthOptions,
  type VivaLegacyPaymentOrderOptions,
  type VivaLegacyPaymentOrderReturn,
  type VivaLegacyTransactionsQuery,
  type VivaLegacyTransactionsReturn,
  type VivaLegacyWalletReturn,
  type VivaLinkBankAccountOptions,
  type VivaLinkBankAccountReturn,
  type VivaMerchantWalletReturn,
  type VivaOctPayoutOptions,
  type VivaRebateOptions,
  type VivaResellerBillPaymentOptions,
  type VivaResellerBillPaymentReturn,
  type VivaResellerCashPaymentOptions,
  type VivaResellerCashPaymentReturn,
  type VivaResellerCheckBillPaymentOptions,
  type VivaResellerCheckCashPaymentOptions,
  type VivaResellerCreateOrderOptions,
  type VivaResellerCreateOrderReturn,
  type VivaResellerEligibilityReturn,
  type VivaResellerOtpOptions,
  type VivaTransactionIdReturn,
  type VivaUpdateBankAccountOptions,
  type VivaUpdateBankAccountReturn,
  type VivaUpdateOrderOptions,
  type VivaUpdateOrderReturn,
  type VivaWebhookDatas,
  type VivaWebhookDeleteSubscriptionReturn,
  type VivaWebhookSubscriptionDatas,
  type VivaWebhookSubscriptionEvent,
  type VivaWebhookSubscriptionOptions,
  type VivaWebhookSubscriptionReturn,
};
