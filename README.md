# VivaWallet Node SDK

This is a Non-official VivaWallet Node SDK. It provides a simple way to interact with the VivaWallet API.

## Payment API

```typescript
import { VivaWallet } from '@nkhind/vivawallet-sdk';

const vivawallet = new VivaWallet({
  smartClientId: 'your-smartcheckout-client-id',
  smartClientSecret: 'your-smartcheckout-client-secret',
  merchantId: 'your-merchant-uuid',
  apikey: 'your-api-key',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});
```

## ISV API

```typescript
import { VivaISV } from '@nkhind/vivawallet-sdk';

const vivaIsv = new VivaISV({
  smartClientId: 'your-smartcheckout-client-id',
  smartClientSecret: 'your-smartcheckout-client-secret',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});
```

## Marketplace API

```typescript
import { Marketplace } from '@nkhind/vivawallet-sdk';

const vivaMarketplace = new Marketplace({
  smartClientId: 'your-smartcheckout-client-id',
  smartClientSecret: 'your-smartcheckout-client-secret',
  merchantId: 'your-merchant-uuid',
  apikey: 'your-api-key',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});

```

## Webhook Types

```typescript
import {
  VivaWebhookDatas
  SmartCheckoutWebhookEventDatas,
  ConnectedAccountWebhookEventDatas,
} from '@nkhind/vivawallet-sdk';
```

## TypeScript

The SDK is written in TypeScript for classes typesafety and Vivawallet Webhook typesafety.
