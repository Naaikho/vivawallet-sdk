# VivaWallet Node SDK

This is a Non-official VivaWallet Node SDK. It provides a simple way to interact with the VivaWallet API.

Exemple:

```typescript
import { VivaWallet } from '@nkh/vivawallet-sdk';

const vivawallet = new VivaWallet({
  smartClientId: 'your-smartcheckout-client-id',
  smartClientSecret: 'your-smartcheckout-client-secret',
  merchantId: 'your-merchant-uuid',
  apikey: 'your-api-key',
  // Optional
  sourceCode: 'MY_SOURCE_CODE',
});
```

## TypeScript

The SDK is written in TypeScript for classes typesafety and Vivawallet Webhook typesafety.
