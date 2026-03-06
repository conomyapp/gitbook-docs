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

{% openapi-schemas spec="conomyhq-api" schemas="crypto-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
