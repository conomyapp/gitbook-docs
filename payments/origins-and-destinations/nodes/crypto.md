---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: Crypto wallet rail for global pay-in and pay-out.
---

# CRYPTO

`CRYPTO` is the wallet rail used to move funds to or from external blockchain wallets.

**Country:** Global  
**Currency:** USDC, USDT (network dependent)  
**Direction:** Pay-in / Pay-out

## Required fields

- `type` (`string`): Must be `"CRYPTO"`.
- `currency` (`string`): Settlement currency for the flow.
- `wallet.address` (`string`): Source or destination wallet address.

## Optional fields

- `wallet.provider` (`string`): Provider identifier.
- `wallet.referenceId` (`string`): External wallet identifier.
- `wallet.token` (`string`): Token symbol.
- `wallet.network` (`string`): Chain/network (for example `ETH`, `TRON`, `SOLANA`).

## Example

```json
{
  "type": "CRYPTO",
  "currency": "USDC",
  "wallet": {
    "address": "0x1234567890abcdef1234567890abcdef12345678",
    "network": "ETH",
    "token": "USDC"
  }
}
```

## Valid combinations

- `CRYPTO` -> `ACCOUNT`
- `ACCOUNT` -> `CRYPTO`
