# Code Design Conventions

## Repository Shape

Keep the SDK organized by public integration family:

```text
src/
  Vivawallet.class.ts
  VivaISV.class.ts
  MarketPlace.class.ts
  vivawallet/
  marketplace/
  isv/
  types/
  utils/
  vivabases/
```

Preserve this style unless the user asks for a larger migration. A refactor can add `core/` or `shared/`, but it must not flatten feature modules into one large service.

## File Naming

Follow the current project naming style:

- Public root clients use PascalCase with `.class.ts`: `Vivawallet.class.ts`, `VivaISV.class.ts`, `MarketPlace.class.ts`.
- Feature classes use a domain prefix and `.class.ts`: `VivaPayments.class.ts`, `MarketPlaceTransfers.class.ts`, `IsvPayments.class.ts`, `IsvPosTransactions.class.ts`.
- Type files use `.types.ts`: `VivaOrder.types.ts`, `ISVPayments.types.ts`, `MPTransfers.types.ts`.
- Nested type folders keep the existing `.types` folder convention: `isv.types/`, `marketplace.types/`, `IsvPos.types/`.
- Utilities stay in `src/utils/` and do not use `.class.ts`.
- Base/shared classes stay in `src/vivabases/` unless a planned core refactor introduces a clearer replacement.

When adding a file, match the closest existing family:

```text
src/vivawallet/VivaSubscriptions.class.ts
src/types/VivaSubscriptions.types.ts
src/marketplace/MarketPlaceRefunds.class.ts
src/types/marketplace.types/MPRefunds.types.ts
src/isv/IsvWebhooks.class.ts
src/types/isv.types/ISVWebhook.types.ts
```

## Fragmentation Rules

Do not create monolithic clients. Prefer one class per API family or coherent endpoint group:

- Payment order methods go in a payments class.
- Transaction methods go in a transactions class.
- Source code methods go in a source class.
- Connected account methods go in a connected accounts or sellers class.
- POS device, transaction/action, and session methods stay separated.
- Cross-cutting work belongs in helpers, auth providers, endpoint specs, or HTTP client utilities.

Split a class when it starts mixing distinct Viva product concepts, auth modes, or endpoint families.

## Public Family Boundaries

Keep these conceptual boundaries visible:

- Standard: merchant payment orders, transactions, sources, subscriptions, webhooks.
- Marketplace: platform sellers/accounts, platform payment orders, transfers, acquiring refunds.
- ISV: ISV connected accounts, ISV payment orders, ISV webhooks, ISV partner operations.
- POS/Cloud Terminal: devices, actions, sessions, sales, refunds.

Do not hide Standard, Marketplace, ISV, and POS differences behind one generic catch-all service.

## Import Style

Follow the local relative import style. Import types from `src/types/**`, helpers from `src/utils/**`, and base/shared logic from `src/vivabases/**` or the new shared folder introduced by the refactor.

Avoid large barrel files inside feature folders unless they reduce public import churn without hiding feature boundaries.
