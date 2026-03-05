---
description: Generic bank account node for payouts. Used across multiple countries.
---

# BANK_ACCOUNT

BANK_ACCOUNT is a generic destination node for payouts to external bank accounts. It's used when the destination is a standard bank account that doesn't fit a specific rail — for example, Canadian or other country-specific accounts not covered by dedicated rail nodes.

**Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"BANK_ACCOUNT"` |
| `currency` | `string` | Yes | Currency of the transfer |
| `bank.accountNumber` | `string` | Yes | Recipient's bank account number |
| `bank.bank` | `string` | Yes | Bank name or identifier |
| `bank.typeAccount` | `string` | No | Account type: `"CHECKING"` or `"SAVINGS"` |
| `bank.country` | `string` | No | 2-letter ISO country code (e.g., `"AR"`, `"CA"`) |
| `customer` | `object` | No | Recipient's identity information |

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
