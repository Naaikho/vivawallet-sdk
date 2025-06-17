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
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'GET',
      },
      create: {
        url: 'https://demo-api.vivapayments.com/checkout/v2/orders',
        method: 'POST',
      },
      update: {
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'PATCH',
      },
      cancel: {
        url: 'https://demo.vivapayments.com/api/orders/{orderCode}',
        method: 'DELETE',
      },
    },
    transaction: {
      get: {
        url: 'https://demo-api.vivapayments.com/checkout/v2/transactions/{transactionId}',
        method: 'GET',
      },
      create: {
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'POST',
      },
      cancel: {
        url: 'https://demo.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
    },
    checkout: {
      // &color={color}&paymentMethod={paymentMethod}
      url: 'https://demo.vivapayments.com/web/checkout?ref={orderCode}',
    },
    marketplace: {
      accounts: {
        get: {
          url: 'https://demo-api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://demo-api.vivapayments.com/platforms/v1/accounts',
          method: 'POST',
        },
        update: {
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
      payments: {
        create: {
          url: 'https://demo-api.vivapayments.com/checkout/v2/isv/orders',
          method: 'POST',
        },
      },
      devices: {
        url: 'https://demo-api.vivapayments.com/ecr/isv/v1/devices:search',
        method: 'POST',
      },
      transaction: {
        create: {
          url: 'https://demo-api.vivapayments.com/ecr/isv/v1/transactions:sale',
          method: 'POST',
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
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'GET',
      },
      create: {
        url: 'https://api.vivapayments.com/checkout/v2/orders',
        method: 'POST',
      },
      update: {
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'PATCH',
      },
      cancel: {
        url: 'https://www.vivapayments.com/api/orders/{orderCode}',
        method: 'DELETE',
      },
    },
    transaction: {
      get: {
        url: 'https://api.vivapayments.com/checkout/v2/transactions/{transactionId}',
        method: 'GET',
      },
      create: {
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'POST',
      },
      cancel: {
        url: 'https://www.vivapayments.com/api/transactions/{transactionId}',
        method: 'DELETE',
      },
    },
    checkout: {
      // &color={color}&paymentMethod={paymentMethod}
      url: 'https://www.vivapayments.com/web/checkout?ref={orderCode}',
    },
    marketplace: {
      accounts: {
        get: {
          url: 'https://api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'GET',
        },
        create: {
          url: 'https://api.vivapayments.com/platforms/v1/accounts',
          method: 'POST',
        },
        update: {
          url: 'https://api.vivapayments.com/platforms/v1/accounts/{accountId}',
          method: 'PATCH',
        },
      },
      transaction: {
        cancel: {
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
      payments: {
        create: {
          url: 'https://api.vivapayments.com/checkout/v2/isv/orders',
          method: 'POST',
        },
      },
      devices: {
        url: 'https://api.vivapayments.com/ecr/isv/v1/devices:search',
        method: 'POST',
      },
      transaction: {
        create: {
          url: 'https://api.vivapayments.com/ecr/isv/v1/transactions:sale',
          method: 'POST',
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
