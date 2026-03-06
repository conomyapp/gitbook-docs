---
description: Cryptocurrency wallet node for global transfers. Used for pay-in and pay-out.
layout:
  width: full
---

# CRYPTO

Use `CRYPTO` when funds move to or from an external blockchain wallet.

**Countries:** Global
**Currency:** `USDC`, `USDT` (network-dependent)
**Direction:** Pay-in / Pay-out

## Required fields

1. `type` (`string`): must be `"CRYPTO"`.
2. `currency` (`string`): settlement currency configured for the flow (for example, `"USDC"` or `"USDT"`).
3. `wallet.address` (`string`): source or destination wallet address.

## Optional fields

1. `wallet.provider` (`string`): provider identifier used by your integration.
2. `wallet.referenceId` (`string`): external wallet identifier in the provider system.
3. `wallet.token` (`string`): token symbol when you need to clarify or override the token in the payload.
4. `wallet.network` (`string`): blockchain network (for example, `ETH`, `TRON`, `SOLANA`).

## Example

```json
{
  "type": "CRYPTO",
  "currency": "USDC",
  "wallet": {
    "address": "0x7e57b4f8f53f0f0c0a2c8e5f8d5b4f19a0a2c8e5",
    "network": "ETH",
    "token": "USDC"
  }
}
```

## Valid combinations

- If `CRYPTO` is the origin, valid counterpart node type: `ACCOUNT`.
- If `CRYPTO` is the destination, valid counterpart node type: `ACCOUNT`.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="wallet" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
