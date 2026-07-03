import { VivawalletEnpointsInit } from '../types/Vivawallet.types';

class VivaEndpoints {
  public static demoEndpoints = {
    auth: {
      url: 'https://demo-accounts.vivapayments.com/connect/token',
      method: 'POST',
    },
    cloudTerminal: {
      auth: {
        token: {
          url: 'https://demo-accounts.vivapayments.com/connect/token',
          method: 'POST',
        },
      },
      devices: {
        search: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/devices:search',
          method: 'POST',
        },
      },
      action: {
        create: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/actions',
          method: 'POST',
        },
        get: {
          /**
           * @Param `{actionId}`
           */
          url: 'https://demo-api.vivapayments.com/ecr/v1/actions/{actionId}',
          method: 'GET',
        },
      },
      transaction: {
        sale: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:sale',
          method: 'POST',
        },
        capturePreauth: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:preauth-completion',
          method: 'POST',
        },
        refund: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:refund',
          method: 'POST',
        },
        unreferencedRefund: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:unreferenced-refund',
          method: 'POST',
        },
        fastRefund: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:fast-refund',
          method: 'POST',
        },
        rebate: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/transactions:rebate',
          method: 'POST',
        },
      },
      session: {
        get: {
          /**
           * @Param `{sessionId}`
           */
          url: 'https://demo-api.vivapayments.com/ecr/v1/sessions/{sessionId}',
          method: 'GET',
        },
        list: {
          url: 'https://demo-api.vivapayments.com/ecr/v1/sessions',
          method: 'GET',
        },
        abort: {
          /**
           * @Param `{sessionId}`
           */
          url: 'https://demo-api.vivapayments.com/ecr/v1/sessions/{sessionId}',
          method: 'DELETE',
        },
      },
    },
    webhookAuth: {
      url: 'https://demo.vivapayments.com/api/messages/config/token',
      method: 'GET',
    },
    source: {
      url: 'https://demo.vivapayments.com/api/sources',
      method: 'POST',
    },
    fees: {
      get: {
        url: 'https://demo.vivapayments.com/api/fees',
        method: 'GET',
      },
    },
    payment: {
      get: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'GET',
      },
      create: {
        url: 'https://demo-api.vivapayments.com/checkout/v2/orders',
        method: 'POST',
      },
      legacyCreate: {
        url: 'https://demo.vivapayments.com/api/orders',
        method: 'POST',
      },
      update: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'PATCH',
      },
      cancel: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'DELETE',
      },
    },
    transaction: {
      get: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/checkout/v2/transactions/{transactionId}',
        method: 'GET',
      },
      create: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'POST',
      },
      motoCharge: {
        url: 'https://demo.vivapayments.com/api/transactions',
        method: 'POST',
      },
      cancel: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
      legacyGet: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'GET',
      },
      cardToken: {
        url: 'https://demo-api.vivapayments.com/acquiring/v1/cards/tokens',
        method: 'POST',
      },
      increasePreauth: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}:increasepreauth',
        method: 'POST',
      },
      cancelPartialAuthorization: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
        method: 'DELETE',
      },
      octPayout: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
      rebate: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}:rebate',
        method: 'POST',
      },
      fastRefund: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}:fastrefund',
        method: 'POST',
      },
      cancelRebateFastRefund: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
        method: 'DELETE',
      },
    },
    webhooks: {
      subscriptions: {
        add: {
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions',
          method: 'POST',
        },
        update: {
          /**
           * @Param `{subscriptionId}`
           */
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions/{subscriptionId}',
          method: 'PUT',
        },
        delete: {
          /**
           * @Param `{subscriptionId}`
           */
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions/{subscriptionId}',
          method: 'DELETE',
        },
        list: {
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions',
          method: 'GET',
        },
      },
    },
    resellers: {
      transactions: {
        checkCashPaymentEligibility: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/cashPayments:validate',
          method: 'POST',
        },
        checkBillPaymentEligibility: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/billPayments:validate',
          method: 'POST',
        },
        resendCashPaymentOtp: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/cashPayments:sendotp',
          method: 'POST',
        },
        resendBillPaymentOtp: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/billPayments:sendotp',
          method: 'POST',
        },
        cashPayment: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/cashPayments',
          method: 'POST',
        },
        billPayment: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/transactions/billPayments',
          method: 'POST',
        },
      },
      orders: {
        create: {
          url: 'https://demo-api.vivapayments.com/resellers/v1/orders',
          method: 'POST',
        },
      },
    },
    wallets: {
      legacyGet: {
        url: 'https://demo.vivapayments.com/api/wallets',
        method: 'GET',
      },
      merchantGet: {
        url: 'https://demo-api.vivapayments.com/merchants/v1/wallets',
        method: 'GET',
      },
      balanceTransfer: {
        /**
         * @Param `{walletId}`
         * @Param `{targetWalletId}`
         */
        url: 'https://demo.vivapayments.com/api/wallets/{walletId}/balancetransfer/{targetWalletId}',
        method: 'POST',
      },
    },
    dataServices: {
      transactions: {
        search: {
          url: 'https://demo-api.vivapayments.com/dataservices/v2/transactions/Search',
          method: 'POST',
        },
      },
      mt940: {
        url: 'https://api.vivapayments.com/dataservices/v2/merchants/mt940',
        method: 'GET',
      },
      saleTransactions: {
        export: {
          url: 'https://api.vivapayments.com/dataservices/v1/transactions/exports',
          method: 'POST',
        },
      },
      accountTransactions: {
        search: {
          url: 'https://demo-api.vivapayments.com/dataservices/v2/accounttransactions/Search',
          method: 'POST',
        },
      },
    },
    rfCodePayments: {
      generate: {
        url: 'https://demo.vivapayments.com/web2/checkout/v2/paymentsessions',
        method: 'POST',
      },
    },
    legacyBankAccounts: {
      link: {
        url: 'https://demo.vivapayments.com/api/bankaccounts',
        method: 'POST',
      },
      list: {
        url: 'https://demo.vivapayments.com/api/bankaccounts',
        method: 'GET',
      },
      outgoingBankTransfer: {
        /**
         * @Param `{walletId}`
         * @Param `{bankAccountId}`
         */
        url: 'https://demo.vivapayments.com/api/wallets/{walletId}/commands/banktransfer/{bankAccountId}',
        method: 'POST',
      },
      get: {
        /**
         * @Param `{bankAccountId}`
         */
        url: 'https://demo.vivapayments.com/api/bankaccounts/{bankAccountId}',
        method: 'GET',
      },
      unlink: {
        /**
         * @Param `{bankAccountId}`
         */
        url: 'https://demo.vivapayments.com/api/bankaccounts/{bankAccountId}',
        method: 'DELETE',
      },
    },
    obligations: {
      create: {
        url: 'https://demo-api.vivapayments.com/obligations/v1/obligations',
        method: 'POST',
      },
    },
    bankTransfers: {
      bankAccounts: {
        link: {
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts',
          method: 'POST',
        },
        list: {
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts',
          method: 'GET',
        },
        get: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}',
          method: 'GET',
        },
        update: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}',
          method: 'PATCH',
        },
        instructionTypes: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}/instructiontypes',
          method: 'GET',
        },
        fees: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}/fees',
          method: 'POST',
        },
        send: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://demo-api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}:send',
          method: 'POST',
        },
      },
    },
    checkout: {
      // &color={color}&paymentMethod={paymentMethod}
      /**
       * @Param `{orderCode}`
       *
       * ---
       *
       * Queries you can add to the url
       * - color=`{color}`
       * - paymentMethod=`{paymentMethod}`
       */
      url: 'https://demo.vivapayments.com/web/checkout?ref={orderCode}',
    },
    marketplace: {
      accounts: {
        get: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://demo-api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://demo-api.vivapayments.com/platforms/v1/accounts',
          method: 'POST',
        },
        update: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://demo-api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'PATCH',
        },
      },
      payment: {
        create: {
          url: 'https://demo-api.vivapayments.com/checkout/v2/orders',
          method: 'POST',
        },
      },
      transaction: {
        cancel: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo-api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
          method: 'DELETE',
        },
      },
      transfers: {
        send: {
          url: 'https://demo-api.vivapayments.com/platforms/v1/transfers',
          method: 'POST',
        },
        reverse: {
          /**
           * @Param `{transferId}`
           */
          url: 'https://demo-api.vivapayments.com/platforms/v1/transfers/{transferId}:reverse',
          method: 'POST',
        },
      },
    },
    isv: {
      connectedAccounts: {
        get: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://demo-api.vivapayments.com/isv/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://demo-api.vivapayments.com/isv/v1/accounts',
          method: 'POST',
        },
      },
      payments: {
        create: {
          url: 'https://demo-api.vivapayments.com/checkout/v2/isv/orders',
          method: 'POST',
        },
        get: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
          method: 'GET',
        },
        cancel: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
          method: 'DELETE',
        },
      },
      source: {
        create: {
          url: 'https://demo.vivapayments.com/api/sources',
          method: 'POST',
        },
      },
      transactions: {
        get: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo-api.vivapayments.com/checkout/v2/isv/transactions/{transactionId}',
          method: 'GET',
        },
        legacyGet: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
          method: 'GET',
        },
        legacyList: {
          url: 'https://demo.vivapayments.com/api/transactions/',
          method: 'GET',
        },
        resellerPosList: {
          url: 'https://demo.vivapayments.com/api/resellers/pos/transactions/',
          method: 'GET',
        },
        dataServicesSearch: {
          url: 'https://demo-api.vivapayments.com/dataservices/v2/transactions/Search',
          method: 'POST',
        },
        cancel: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
          method: 'DELETE',
        },
        payOutOld: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
          method: 'DELETE',
        },
        createRecurring: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
          method: 'POST',
        },
        increasePreauth: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo-api.vivapayments.com/acquiring/v1/isv/transactions/{transactionId}:increasepreauth',
          method: 'POST',
        },
        capturePreauth: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
          method: 'POST',
        },
        motoCharge: {
          url: 'https://demo.vivapayments.com/api/transactions',
          method: 'POST',
        },
      },
      webhook: {
        getKey: {
          url: 'https://demo-api.vivapayments.com/isv/v1/webhooks/token',
          method: 'GET',
        },
        create: {
          url: 'https://demo-api.vivapayments.com/isv/v1/webhooks',
          method: 'POST',
        },
      },
      pos: {
        devices: {
          url: 'https://demo-api.vivapayments.com/ecr/isv/v1/devices:search',
          method: 'POST',
        },
        transaction: {
          create: {
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/transactions:sale',
            method: 'POST',
          },
          refund: {
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/transactions:refund',
            method: 'POST',
          },
        },
        session: {
          get: {
            /**
             * @Param `{sessionId}`
             */
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/sessions/{sessionId}',
            method: 'GET',
          },
          list: {
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/sessions',
            method: 'GET',
          },
          abort: {
            /**
             * @Param `{sessionId}`
             */
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/sessions/{sessionId}',
            method: 'DELETE',
          },
        },
        action: {
          create: {
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/actions',
            method: 'POST',
          },
          get: {
            /**
             * @Param `{actionId}`
             */
            url: 'https://demo-api.vivapayments.com/ecr/isv/v1/actions/{actionId}',
            method: 'GET',
          },
        },
      },
    },
  };

  public static prodEndpoints: typeof VivaEndpoints.demoEndpoints = {
    auth: {
      url: 'https://accounts.vivapayments.com/connect/token',
      method: 'POST',
    },
    cloudTerminal: {
      auth: {
        token: {
          url: 'https://accounts.vivapayments.com/connect/token',
          method: 'POST',
        },
      },
      devices: {
        search: {
          url: 'https://api.vivapayments.com/ecr/v1/devices:search',
          method: 'POST',
        },
      },
      action: {
        create: {
          url: 'https://api.vivapayments.com/ecr/v1/actions',
          method: 'POST',
        },
        get: {
          /**
           * @Param `{actionId}`
           */
          url: 'https://api.vivapayments.com/ecr/v1/actions/{actionId}',
          method: 'GET',
        },
      },
      transaction: {
        sale: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:sale',
          method: 'POST',
        },
        capturePreauth: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:preauth-completion',
          method: 'POST',
        },
        refund: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:refund',
          method: 'POST',
        },
        unreferencedRefund: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:unreferenced-refund',
          method: 'POST',
        },
        fastRefund: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:fast-refund',
          method: 'POST',
        },
        rebate: {
          url: 'https://api.vivapayments.com/ecr/v1/transactions:rebate',
          method: 'POST',
        },
      },
      session: {
        get: {
          /**
           * @Param `{sessionId}`
           */
          url: 'https://api.vivapayments.com/ecr/v1/sessions/{sessionId}',
          method: 'GET',
        },
        list: {
          url: 'https://api.vivapayments.com/ecr/v1/sessions',
          method: 'GET',
        },
        abort: {
          /**
           * @Param `{sessionId}`
           */
          url: 'https://api.vivapayments.com/ecr/v1/sessions/{sessionId}',
          method: 'DELETE',
        },
      },
    },
    webhookAuth: {
      url: 'https://www.vivapayments.com/api/messages/config/token',
      method: 'GET',
    },
    source: {
      url: 'https://www.vivapayments.com/api/sources',
      method: 'POST',
    },
    fees: {
      get: {
        url: 'https://www.vivapayments.com/api/fees',
        method: 'GET',
      },
    },
    payment: {
      get: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'GET',
      },
      create: {
        url: 'https://api.vivapayments.com/checkout/v2/orders',
        method: 'POST',
      },
      legacyCreate: {
        url: 'https://www.vivapayments.com/api/orders',
        method: 'POST',
      },
      update: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'PATCH',
      },
      cancel: {
        /**
         * @Param `{orderCode}`
         */
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'DELETE',
      },
    },
    transaction: {
      get: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/checkout/v2/transactions/{transactionId}',
        method: 'GET',
      },
      create: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'POST',
      },
      motoCharge: {
        url: 'https://www.vivapayments.com/api/transactions',
        method: 'POST',
      },
      cancel: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
      legacyGet: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'GET',
      },
      cardToken: {
        url: 'https://api.vivapayments.com/acquiring/v1/cards/tokens',
        method: 'POST',
      },
      increasePreauth: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}:increasepreauth',
        method: 'POST',
      },
      cancelPartialAuthorization: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
        method: 'DELETE',
      },
      octPayout: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
      rebate: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}:rebate',
        method: 'POST',
      },
      fastRefund: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}:fastrefund',
        method: 'POST',
      },
      cancelRebateFastRefund: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
        method: 'DELETE',
      },
    },
    webhooks: {
      subscriptions: {
        add: {
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions',
          method: 'POST',
        },
        update: {
          /**
           * @Param `{subscriptionId}`
           */
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions/{subscriptionId}',
          method: 'PUT',
        },
        delete: {
          /**
           * @Param `{subscriptionId}`
           */
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions/{subscriptionId}',
          method: 'DELETE',
        },
        list: {
          url: 'https://api.vivapayments.com/dataservices/v1/webhooks/subscriptions',
          method: 'GET',
        },
      },
    },
    resellers: {
      transactions: {
        checkCashPaymentEligibility: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/cashPayments:validate',
          method: 'POST',
        },
        checkBillPaymentEligibility: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/billPayments:validate',
          method: 'POST',
        },
        resendCashPaymentOtp: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/cashPayments:sendotp',
          method: 'POST',
        },
        resendBillPaymentOtp: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/billPayments:sendotp',
          method: 'POST',
        },
        cashPayment: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/cashPayments',
          method: 'POST',
        },
        billPayment: {
          url: 'https://api.vivapayments.com/resellers/v1/transactions/billPayments',
          method: 'POST',
        },
      },
      orders: {
        create: {
          url: 'https://api.vivapayments.com/resellers/v1/orders',
          method: 'POST',
        },
      },
    },
    wallets: {
      legacyGet: {
        url: 'https://www.vivapayments.com/api/wallets',
        method: 'GET',
      },
      merchantGet: {
        url: 'https://api.vivapayments.com/merchants/v1/wallets',
        method: 'GET',
      },
      balanceTransfer: {
        /**
         * @Param `{walletId}`
         * @Param `{targetWalletId}`
         */
        url: 'https://www.vivapayments.com/api/wallets/{walletId}/balancetransfer/{targetWalletId}',
        method: 'POST',
      },
    },
    dataServices: {
      transactions: {
        search: {
          url: 'https://api.vivapayments.com/dataservices/v2/transactions/Search',
          method: 'POST',
        },
      },
      mt940: {
        url: 'https://api.vivapayments.com/dataservices/v2/merchants/mt940',
        method: 'GET',
      },
      saleTransactions: {
        export: {
          url: 'https://api.vivapayments.com/dataservices/v1/transactions/exports',
          method: 'POST',
        },
      },
      accountTransactions: {
        search: {
          url: 'https://api.vivapayments.com/dataservices/v2/accounttransactions/Search',
          method: 'POST',
        },
      },
    },
    rfCodePayments: {
      generate: {
        url: 'https://www.vivapayments.com/web2/checkout/v2/paymentsessions',
        method: 'POST',
      },
    },
    legacyBankAccounts: {
      link: {
        url: 'https://www.vivapayments.com/api/bankaccounts',
        method: 'POST',
      },
      list: {
        url: 'https://www.vivapayments.com/api/bankaccounts',
        method: 'GET',
      },
      outgoingBankTransfer: {
        /**
         * @Param `{walletId}`
         * @Param `{bankAccountId}`
         */
        url: 'https://www.vivapayments.com/api/wallets/{walletId}/commands/banktransfer/{bankAccountId}',
        method: 'POST',
      },
      get: {
        /**
         * @Param `{bankAccountId}`
         */
        url: 'https://www.vivapayments.com/api/bankaccounts/{bankAccountId}',
        method: 'GET',
      },
      unlink: {
        /**
         * @Param `{bankAccountId}`
         */
        url: 'https://www.vivapayments.com/api/bankaccounts/{bankAccountId}',
        method: 'DELETE',
      },
    },
    obligations: {
      create: {
        url: 'https://api.vivapayments.com/obligations/v1/obligations',
        method: 'POST',
      },
    },
    bankTransfers: {
      bankAccounts: {
        link: {
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts',
          method: 'POST',
        },
        list: {
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts',
          method: 'GET',
        },
        get: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}',
          method: 'GET',
        },
        update: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}',
          method: 'PATCH',
        },
        instructionTypes: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}/instructiontypes',
          method: 'GET',
        },
        fees: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}/fees',
          method: 'POST',
        },
        send: {
          /**
           * @Param `{bankAccountId}`
           */
          url: 'https://api.vivapayments.com/banktransfers/v1/bankaccounts/{bankAccountId}:send',
          method: 'POST',
        },
      },
    },
    checkout: {
      /**
       * @Param `{orderCode}`
       *
       * ---
       *
       * Queries you can add to the url
       * - color=`{color}`
       * - paymentMethod=`{paymentMethod}`
       */
      url: 'https://www.vivapayments.com/web/checkout?ref={orderCode}',
    },
    marketplace: {
      accounts: {
        get: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://api.vivapayments.com/platforms/v1/accounts',
          method: 'POST',
        },
        update: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'PATCH',
        },
      },
      transaction: {
        cancel: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://api.vivapayments.com/acquiring/v1/transactions/{transactionId}',
          method: 'DELETE',
        },
      },
      payment: {
        create: {
          url: 'https://api.vivapayments.com/checkout/v2/orders',
          method: 'POST',
        },
      },
      transfers: {
        send: {
          url: 'https://api.vivapayments.com/platforms/v1/transfers',
          method: 'POST',
        },
        reverse: {
          /**
           * @Param `{transferId}`
           */
          url: 'https://api.vivapayments.com/platforms/v1/transfers/{transferId}:reverse',
          method: 'POST',
        },
      },
    },
    isv: {
      connectedAccounts: {
        get: {
          /**
           * @Param `{accountId}`
           */
          url: 'https://api.vivapayments.com/isv/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://api.vivapayments.com/isv/v1/accounts',
          method: 'POST',
        },
      },
      payments: {
        create: {
          url: 'https://api.vivapayments.com/checkout/v2/isv/orders',
          method: 'POST',
        },
        get: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://www.vivapayments.com/api/orders/{orderCode}',
          method: 'GET',
        },
        cancel: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://www.vivapayments.com/api/orders/{orderCode}',
          method: 'DELETE',
        },
      },
      source: {
        create: {
          url: 'https://www.vivapayments.com/api/sources',
          method: 'POST',
        },
      },
      transactions: {
        get: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://api.vivapayments.com/checkout/v2/isv/transactions/{transactionId}',
          method: 'GET',
        },
        legacyGet: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
          method: 'GET',
        },
        legacyList: {
          url: 'https://www.vivapayments.com/api/transactions/',
          method: 'GET',
        },
        resellerPosList: {
          url: 'https://www.vivapayments.com/api/resellers/pos/transactions/',
          method: 'GET',
        },
        dataServicesSearch: {
          url: 'https://api.vivapayments.com/dataservices/v2/transactions/Search',
          method: 'POST',
        },
        cancel: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
          method: 'DELETE',
        },
        payOutOld: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
          method: 'DELETE',
        },
        createRecurring: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
          method: 'POST',
        },
        increasePreauth: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://api.vivapayments.com/acquiring/v1/isv/transactions/{transactionId}:increasepreauth',
          method: 'POST',
        },
        capturePreauth: {
          /**
           * @Param `{transactionId}`
           */
          url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
          method: 'POST',
        },
        motoCharge: {
          url: 'https://www.vivapayments.com/api/transactions',
          method: 'POST',
        },
      },
      webhook: {
        getKey: {
          url: 'https://api.vivapayments.com/isv/v1/webhooks/token',
          method: 'GET',
        },
        create: {
          url: 'https://api.vivapayments.com/isv/v1/webhooks',
          method: 'POST',
        },
      },
      pos: {
        devices: {
          url: 'https://api.vivapayments.com/ecr/isv/v1/devices:search',
          method: 'POST',
        },
        transaction: {
          create: {
            url: 'https://api.vivapayments.com/ecr/isv/v1/transactions:sale',
            method: 'POST',
          },
          refund: {
            url: 'https://api.vivapayments.com/ecr/isv/v1/transactions:refund',
            method: 'POST',
          },
        },
        session: {
          get: {
            /**
             * @Param `{sessionId}`
             */
            url: 'https://api.vivapayments.com/ecr/isv/v1/sessions/{sessionId}',
            method: 'GET',
          },
          list: {
            url: 'https://api.vivapayments.com/ecr/isv/v1/sessions',
            method: 'GET',
          },
          abort: {
            /**
             * @Param `{sessionId}`
             */
            url: 'https://api.vivapayments.com/ecr/isv/v1/sessions/{sessionId}',
            method: 'DELETE',
          },
        },
        action: {
          create: {
            url: 'https://api.vivapayments.com/ecr/isv/v1/actions',
            method: 'POST',
          },
          get: {
            /**
             * @Param `{actionId}`
             */
            url: 'https://api.vivapayments.com/ecr/isv/v1/actions/{actionId}',
            method: 'GET',
          },
        },
      },
    },
  };

  endpoints: typeof VivaEndpoints.demoEndpoints;

  constructor(datas: VivawalletEnpointsInit) {
    this.endpoints = datas.dev
      ? VivaEndpoints.demoEndpoints
      : VivaEndpoints.prodEndpoints;
  }
}

export default VivaEndpoints;
