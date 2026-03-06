---
description: Crypto wallet rail for global pay-in and pay-out.
layout:
  width: full
---

# CRYPTO

`CRYPTO` is the wallet rail used to move funds to or from external blockchain wallets.

- Country scope: Global
- Currency scope: USDC, USDT (network dependent)
- Direction: Pay-in and Pay-out

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"CRYPTO"`. |
| `currency` | `string` | Settlement currency for the flow. |
| `wallet.address` | `string` | Source or destination wallet address. |

## Optional fields

| Field | Type | Description |
| --- | --- | --- |
| `wallet.provider` | `string` | Provider identifier. |
| `wallet.referenceId` | `string` | External wallet identifier. |
| `wallet.token` | `string` | Token symbol. |
| `wallet.network` | `string` | Chain/network (for example `ETH`, `TRON`, `SOLANA`). |

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

| Origin | Destination |
| --- | --- |
| `CRYPTO` | `ACCOUNT` |
| `ACCOUNT` | `CRYPTO` |

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="crypto-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}

