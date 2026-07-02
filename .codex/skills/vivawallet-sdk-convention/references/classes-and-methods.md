# Classes and Methods Conventions

## Class Shape

Use small classes that represent one SDK module. Keep the current pattern:

```ts
class VivaPayments extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** -------------------- PAYMENT -------------------- */

  /** Make new VivaWallet order, return `orderCode` */
  async createOrder(
    orderData: VivaPaymentOrderOptions
  ): MethodReturn<VivaPaymentOrderReturn | null, 'nodatas'> {
    // implementation
  }
}

export default VivaPayments;
```

For a refactor, composition is allowed, but preserve the same visible module shape:

```ts
class VivaPayments {
  constructor(private readonly context: VivaSdkContext) {}
}
```

Do not add unrelated methods to a class just because they share credentials.

## Public Client Aggregators

Root clients aggregate modules and keep no endpoint-heavy logic:

```ts
export class VivaISV extends VivaAuthISV {
  connectedAccounts: IsvConnectedAccounts;
  payments: IsvPayments;
  pos: IsvPos;
  webhook: IsvWebhook;
}
```

When adding a module, instantiate it from the relevant root client and keep the property name short and domain-specific.

## Method Shape

Preserve the current SDK return style unless the user explicitly asks for a breaking redesign:

```ts
async methodName(options: OptionsType): MethodReturn<ReturnType | null, 'nodatas'> {
  try {
    const vivaToken = (await this.getVivaAccessToken()).data;

    const response = await useAxios.post<ReturnType>(url, options, {
      headers: {
        Authorization: 'Bearer ' + vivaToken,
      },
    });

    if (!response.data) {
      if (this.errorLogs) console.error('ClassName.methodName', response.data);
      return {
        success: false,
        message: 'Readable failure message',
        code: 'nodatas',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Readable success message',
      data: response.data,
    };
  } catch (e) {
    if (this.errorLogs) console.error('ClassName.methodName', e);
    return {
      success: false,
      message: 'Readable failure message',
      code: 'error',
      data: null,
    };
  }
}
```

If introducing a central HTTP client, keep the same success/error return contract at public method boundaries.

## Auth Header Rules

Never guess auth mode from a boolean flag. Prefer explicit helpers or endpoint specs:

- OAuth access token calls use `Authorization: Bearer <access_token>`.
- Merchant API key calls use `Authorization: Basic <base64 merchantId:apiKey>`.
- ISV OAuth calls use the ISV client credentials token as a Bearer token.
- Do not use placeholder credentials such as `merchantId: 'null'` or `apikey: 'null'`.

When refactoring legacy code, fix wrong `Bearer <basicToken>` usage only where the official Viva endpoint requires Basic auth.

## Endpoint Handling

Prefer endpoint specs over hardcoded URL assembly in methods:

```ts
{
  method: 'POST',
  base: 'api',
  path: '/checkout/v2/orders',
  auth: 'oauth',
}
```

Use path parameters and query builders instead of string concatenation in new code. Existing string replacement can stay until the touched module is migrated.

## Logging

Keep `errorLogs` behavior. Do not log by default. When logging errors, use `ClassName.methodName` so the failing call is searchable.

## Compatibility

During cleanup, preserve:

- Method names.
- Parameter order.
- Return type shape.
- Error code strings where user code may depend on them.
- Root client property names.

Add aliases before renaming public APIs.
