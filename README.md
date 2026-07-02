# VivaWallet Node SDK

This is a Non-official VivaWallet Node SDK. It provides a simple way to interact with the VivaWallet API.

## Payment API

```typescript
import { Vivawallet } from '@nkhind/vivawallet-sdk';

const vivawallet = new Vivawallet({
  clientId: 'your-smartcheckout-client-id',
  clientSecret: 'your-smartcheckout-client-secret',
  merchantId: 'your-merchant-uuid',
  apikey: 'your-api-key',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});
```

The standard Payment API client uses Client ID/Client Secret credentials for OAuth 2.0 Bearer-token calls, and Merchant ID/API Key credentials for Viva Basic Auth endpoints.

## ISV API

```typescript
import { VivaISV } from '@nkhind/vivawallet-sdk';

const vivaIsv = new VivaISV({
  clientId: 'your-isv-client-id',
  clientSecret: 'your-isv-client-secret',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});
```

The ISV client uses ISV Client ID/Client Secret credentials for OAuth 2.0 calls. Some ISV Basic Auth endpoints require a Reseller ID and Reseller API Key on the client:

```typescript
const vivaIsv = new VivaISV({
  clientId: 'your-isv-client-id',
  clientSecret: 'your-isv-client-secret',
  resellerId: 'your-reseller-id',
  resellerApiKey: 'your-reseller-api-key',
});
```

For these ISV Basic Auth calls, Viva expects `Username = Reseller ID:Merchant ID` and `Password = Reseller API Key`. The Merchant ID is the target merchant account for the request, so pass it on the method options:

```typescript
await vivaIsv.payments.cancelOrder({
  orderCode: 1234567890123456,
  targetMerchantId: 'target-merchant-uuid',
});
```

## Marketplace API

```typescript
import { Marketplace } from '@nkhind/vivawallet-sdk';

const vivaMarketplace = new Marketplace({
  clientId: 'your-smartcheckout-client-id',
  clientSecret: 'your-smartcheckout-client-secret',
  merchantId: 'your-merchant-uuid',
  apikey: 'your-api-key',

  sourceCode: 'MY_SOURCE_CODE', // Optional
});

```

The Marketplace client uses the platform account's OAuth credentials for Platforms, Checkout and Acquiring API calls, while keeping merchant credentials available for legacy Basic Auth helpers such as payment sources.

## Cloud Terminal API

```typescript
const tokenResult = await vivawallet.getCloudTerminalAccessToken();
```

`getCloudTerminalAccessToken()` calls `POST /connect/token` with `grant_type=client_credentials` and returns Viva's full token response. The SDK does not cache this token, so callers can reuse it until `expires_in` when needed.

Use POS APIs credentials for merchant or marketplace Cloud Terminal calls, and ISV credentials for ISV Cloud Terminal calls.

## Webhook Types

```typescript
import {
  VivaWebhookDatas
  SmartCheckoutWebhookEventDatas,
  ConnectedAccountWebhookEventDatas,
} from '@nkhind/vivawallet-sdk';

const datas: VivaWebhookDatas<SmartCheckoutWebhookEventDatas> = req.body;
```

## TypeScript

The SDK is written in TypeScript for classes typesafety and Vivawallet Webhook typesafety.
