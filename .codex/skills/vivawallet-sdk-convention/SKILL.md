---
name: vivawallet-sdk-convention
description: Apply Naikho's VivaWallet SDK code design conventions. Use when working in the vivawallet-sdk repository, adding or refactoring SDK classes, endpoint modules, helper groups, TypeScript types, comments based on official Viva documentation, folder organization, file naming, or public API compatibility for Standard, ISV, Marketplace, and POS integrations.
---

# VivaWallet SDK Convention

## Core Rule

Preserve the public SDK logic and make the codebase cleaner by fragmenting responsibilities into small classes, endpoint modules, type files, and helper groups. Do not turn this project into a monolith.

Before editing, inspect the current repo shape and the official Viva documentation for the API family being changed. Do not invent endpoint behavior, constraints, or wording.

## Required References

Load only the reference needed for the task:

- For folder layout, file naming, module boundaries, and non-monolith rules, read `references/code-design.md`.
- For class structure, method structure, return contracts, and compatibility rules, read `references/classes-and-methods.md`.
- For type naming, JSDoc style, and official documentation wording, read `references/types-and-doc-comments.md`.
- For refactor planning and validation workflow, read `references/refactor-workflow.md`.

## Workflow

1. Locate the relevant API family: Standard Payment API, Marketplace, ISV Payment API, or POS/Cloud Terminal.
2. Read the local module and adjacent type files before proposing or editing anything.
3. Check the official Viva documentation page for the endpoint or type being touched.
4. Preserve existing public class names, public module names, and public method names unless the user explicitly asks for a breaking rename.
5. Add new behavior as a small class, helper, endpoint spec, or type group instead of expanding a large class.
6. Keep comments and type property descriptions aligned with the official Viva documentation. If exact wording is unavailable, leave a concise neutral comment and do not invent constraints.
7. Run the repo's available validation command after changes, normally `npm run build`.

## Compatibility Contract

Treat these exported surfaces as compatibility-sensitive:

- `Vivawallet` with `payments`, `transactions`, and `source`.
- `VivaISV` with `connectedAccounts`, `payments`, `pos`, and `webhook`.
- `Marketplace` with `source`, `payments`, `transactions`, `sellers`, and `transfers`.
- `getSmartCheckout`.
- `MethodReturn<T, E>`.
- Existing type names under `src/types/**`.

Internal refactors may introduce cleaner names, but keep aliases or wrappers for the existing public names.

## Documentation Sources

Use official Viva sources first:

- Standard Payment API: `https://developer.viva.com/apis-for-payments/payment-api/`
- Marketplace API: `https://developer.viva.com/apis-for-payments/marketplace-api/`
- ISV Payment API: `https://developer.viva.com/isv-partner-program/payment-isv-api/`
- POS / EFT API: `https://developer.viva.com/apis-for-point-of-sale/card-terminals-devices/rest-api/eft-pos-api-documentation/`
- API reference index: `https://developer.viva.com/api-docs/`

When the docs are dynamic, search the official `developer.viva.com` domain for the specific endpoint path, parameter, or type name.
