---
description: Generic bank account node for payouts. Used across multiple countries.
---

# BANK_ACCOUNT

BANK_ACCOUNT is a generic destination node for payouts to external bank accounts. It's used when the destination is a standard bank account that doesn't fit a specific rail — for example, Canadian or other country-specific accounts not covered by dedicated rail nodes.

**Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"BANK_ACCOUNT"` |
| `currency` | `string` | Currency of the transfer |
| `bank.accountNumber` | `string` | Recipient's bank account number |
| `bank.bank` | `string` | Bank name or identifier |
| `bank.typeAccount` | `string` | Account type: `"CHECKING"` or `"SAVINGS"` |
| `bank.country` | `string` | 2-letter ISO country code (e.g., `"AR"`, `"CA"`) |
| `customer` | `object` | Recipient's identity information |

## Example

```json
{
  "type": "BANK_ACCOUNT",
  "currency": "ARS",
  "bank": {
    "accountNumber": "0000123456789",
    "bank": "BANCO_CMF",
    "typeAccount": "CHECKING",
    "country": "AR"
  },
  "customer": {
    "firstName": "Lucía",
    "lastName": "Fernández",
    "email": "lucia@example.com",
    "documentType": "DNI",
    "documentNumber": "32123456",
    "country": "AR"
  }
}
```

Note: For Argentina, prefer [CVU](cvu.md). For Colombia, prefer [BREB](breb.md). BANK_ACCOUNT is typically used when no country-specific rail is available.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="bank-account" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
