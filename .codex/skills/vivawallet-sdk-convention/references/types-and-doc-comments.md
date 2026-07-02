# Types and Documentation Comment Conventions

## Type File Placement

Put request and response types near the API family:

- Standard types: `src/types/Viva*.types.ts`
- Marketplace types: `src/types/marketplace.types/MP*.types.ts`
- ISV types: `src/types/isv.types/ISV*.types.ts`
- ISV POS types: `src/types/isv.types/IsvPos.types/IsvPos*.types.ts`

Do not put all SDK types into one large file.

## Type Naming

Use the existing suffixes consistently:

- `Options` for SDK method inputs or endpoint request bodies.
- `Return` for SDK method response payloads.
- `Response` when mirroring a raw HTTP response shape.
- `Datas` only when matching existing files or webhook/event data naming.

Use domain prefixes:

- `Viva` for Standard Payment API.
- `MP` for Marketplace.
- `ISV` for ISV and ISV POS.
- `IsvPos` in class names and nested POS files when matching existing names.

Prefer interfaces for object shapes and union types for restricted string/number values.

## JSDoc Style

Document exported interfaces, properties, and public methods with short JSDoc blocks. Use official Viva documentation wording as the source of truth.

For type properties, prefer this structure:

```ts
/**
 * The amount associated with this payment order in the currency's smallest unit of measurement.
 *
 * `integer <int64> >= 30`
 */
amount: number;
```

For defaults:

```ts
/**
 * If set to true, a pre-auth transaction will be performed.
 *
 * Default: `false`
 */
preauth?: boolean;
```

For allowed values, use union types plus a comment:

```ts
/**
 * The language (culture info) of the order.
 *
 * Allowed Values:
 * `bg-BG`, `hr-HR`, `cs-CZ`, `da-DK`
 */
requestLang?: VivaOrderRequestLang;
```

## Official Documentation Wording

When adding or changing comments for endpoint fields:

1. Open the official Viva documentation for the exact endpoint or type.
2. Copy field descriptions from the official docs when they are short and directly tied to the property.
3. Keep constraints, defaults, enum values, and unit notes exactly aligned with the docs.
4. Do not invent validation ranges, defaults, or business rules.
5. If the official docs cannot be loaded, add a minimal neutral comment and explicitly mention in the final response that the wording still needs official-doc verification.

Use official wording for comments, not marketing wording from examples or blog posts.

## Comment Scope

Comments should explain API semantics, not obvious TypeScript mechanics.

Good:

```ts
/** The code of the payment source associated with the merchant. */
sourceCode?: string;
```

Avoid:

```ts
/** This is a string. */
sourceCode?: string;
```

## Method Comments

Public method comments should describe the SDK action and returned value:

```ts
/** Make new VivaWallet order, return `orderCode` */
async createOrder(...)
```

When touching a method, improve unclear comments with doc-backed wording, but do not turn method comments into long endpoint documentation. Put detailed field documentation in types.

## Exactness Rules

If a comment claims a range, enum, default value, auth mode, endpoint path, or Viva feature limitation, verify it in official docs first.

If a local comment conflicts with the official docs, update it with the official wording and keep the implementation change scoped to the touched endpoint.
