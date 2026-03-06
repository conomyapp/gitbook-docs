# ConomyHQ GitBook Transaction Builder

Generate payment request payloads (`JSON`) and `cURL` commands for `POST /payments` directly inside GitBook.

This builder is **generate-only**. It does not execute requests.

## Files

- `gitbook-manifest.yaml`: GitBook integration manifest.
- `src/index.tsx`: ContentKit block implementation.

## Local development

```bash
cd integrations/transaction-builder
npm install
npx gitbook auth
npx gitbook integration:dev
```

## Publish integration

```bash
cd integrations/transaction-builder
npx gitbook integration:publish
```

## Add block to a page

After installation in the space, insert the block:

- Slash command: `Transaction Builder`
- Or Markdown code block:

```conomy-transaction-builder
generate-only
```
