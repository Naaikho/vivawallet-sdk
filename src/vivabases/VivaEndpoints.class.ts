import { VivawalletEnpointsInit } from '../types/Vivawallet.types';

class VivaEndpoints {
  public static demoEndpoints = {
    auth: {
      url: 'https://demo-accounts.vivapayments.com/connect/token',
      method: 'POST',
    },
    webhookAuth: {
      url: 'https://demo.vivapayments.com/api/messages/config/token',
      method: 'GET',
    },
    source: {
      url: 'https://demo.vivapayments.com/api/sources',
      method: 'POST',
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
      cancel: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
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
        cancel: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
          method: 'DELETE',
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
    webhookAuth: {
      url: 'https://www.vivapayments.com/api/messages/config/token',
      method: 'GET',
    },
    source: {
      url: 'https://www.vivapayments.com/api/sources',
      method: 'POST',
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
      cancel: {
        /**
         * @Param `{transactionId}`
         */
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
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
        cancel: {
          /**
           * @Param `{orderCode}`
           */
          url: 'https://www.vivapayments.com/api/orders/{orderCode}',
          method: 'DELETE',
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
