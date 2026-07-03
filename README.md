# VivaWallet Node SDK

Non-official TypeScript SDK for VivaWallet APIs.

Use this package when you need a typed Node.js wrapper around VivaWallet standard merchant payments, Marketplace, ISV, webhooks, wallets, bank transfers, POS helpers, and related API modules.

Full documentation: [vivawallet-sdk-docs.mintlify.app](https://vivawallet-sdk-docs.mintlify.app)

## Install

```bash
npm install @nkhind/vivawallet-sdk
```

```bash
yarn add @nkhind/vivawallet-sdk
```

```bash
pnpm add @nkhind/vivawallet-sdk
```

## Minimal SmartCheckout Demo

Create a payment order on your server, then redirect the customer to VivaWallet SmartCheckout.

```typescript
import { Vivawallet, getSmartCheckout } from '@nkhind/vivawallet-sdk';

const vivawallet = new Vivawallet({
  clientId: process.env.VIVA_CLIENT_ID!,
  clientSecret: process.env.VIVA_CLIENT_SECRET!,
  merchantId: process.env.VIVA_MERCHANT_ID!,
  apikey: process.env.VIVA_API_KEY!,
  dev: process.env.VIVA_ENV === 'demo',
});

const order = await vivawallet.payments.createOrder({
  amount: 1000, // EUR 10.00, expressed in cents
  customerTrns: 'Order #1234',
  customer: {
    email: 'customer@example.com',
    fullName: 'John Doe',
    requestLang: 'en-GB',
  },
  sourceCode: 'Default',
});

if (!order.success || !order.data) {
  throw new Error(order.message);
}

const checkoutUrl = getSmartCheckout({
  orderCode: String(order.data.orderCode),
  dev: process.env.VIVA_ENV === 'demo',
});

console.log('Redirect customer to:', checkoutUrl);
```

Every async SDK method returns a `MethodReturn` result. Check `result.success` before reading `result.data`; API failures are returned as typed failure values instead of being thrown for normal VivaWallet errors.

## Available Clients

```typescript
import {
  Vivawallet,
  VivaISV,
  Marketplace,
  getSmartCheckout,
} from '@nkhind/vivawallet-sdk';
```

- `Vivawallet`: standard merchant client for payment orders, transactions, webhooks, bank transfers, wallets, data services, POS helpers, and legacy modules.
- `VivaISV`: ISV / reseller client for connected accounts, merchant payment orders, ISV transactions, source helpers, webhooks, and POS modules.
- `Marketplace`: platform client for marketplace payment orders, sellers, transactions, transfers, webhooks, and source helpers.
- `getSmartCheckout`: helper that builds the hosted SmartCheckout redirect URL from an `orderCode`.

## Documentation

The README intentionally stays small. Use the Mintlify docs for setup details, credentials, method signatures, examples, and TypeScript type references:

[https://vivawallet-sdk-docs.mintlify.app](https://vivawallet-sdk-docs.mintlify.app)

## Disclaimer

This SDK is community-maintained and is not officially affiliated with Viva Payments S.A.
