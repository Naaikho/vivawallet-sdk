# Refactor Workflow

## Before Editing

1. Run or inspect the current validation command. Usually:

```bash
npm run build
```

2. Inspect the touched module, its root client, its type file, and its endpoint definitions.
3. Identify whether the change belongs to Standard, Marketplace, ISV, or POS.
4. Open the official Viva docs for the exact endpoint family.

## Refactor Rules

Keep refactors incremental:

- Move shared logic into helpers or core files first.
- Migrate one API family or module at a time.
- Preserve public method signatures.
- Preserve existing error return shape.
- Preserve root client property names.
- Do not rename public exports without aliases.

Prefer composition over inheritance for new core work, but do not rewrite every class in one pass.

## Good Refactor Targets

Good targets:

- Extract environment URL selection.
- Extract auth providers by auth mode.
- Extract endpoint specs.
- Extract a small HTTP client that applies auth headers.
- Extract query/path parameter helpers.
- Split a module that mixes unrelated Viva product concepts.

Bad targets:

- One generic `VivaClient` with every method.
- One huge `types.ts`.
- One endpoint map that loses Standard/Marketplace/ISV/POS grouping.
- Breaking public method names just because internal names improve.

## Validation Checklist

After each change:

1. Run `npm run build`.
2. Check that `index.ts` still exports the same public names.
3. Check that class files still instantiate their child modules.
4. Check auth headers for touched methods:
   - OAuth token: `Bearer`.
   - Basic merchant credentials: `Basic`.
5. Check comments for touched types against official Viva docs.
6. Mention any endpoint or doc page that could not be verified.

## Migration Order

Preferred order for a base cleanup:

1. Endpoint and environment helpers.
2. Auth helpers.
3. HTTP client wrapper.
4. Standard modules.
5. Marketplace modules.
6. ISV payment/account/webhook modules.
7. POS modules.
8. README examples and compatibility notes.
