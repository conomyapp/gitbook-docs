---
description: Colombia's interbank electronic transfer network. Used for pay-out in Colombia.
---

# BREB

BREB (Banco de la República Electronic Bridge) is Colombia's interbank settlement network, used for direct bank-to-bank transfers. Use it as a destination for payouts to Colombian bank accounts.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"BREB"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `breB.bankId` | `string` | Yes | Bank code of the recipient's bank |
| `breB.customer.firstName` | `string` | Yes | Recipient's first name |
| `breB.customer.lastName` | `string` | Yes | Recipient's last name |
| `breB.customer.email` | `string` | Yes | Recipient's email |
| `breB.bank.accountNumber` | `string` | No | Recipient's account number |

## Example

```json
{
  "type": "BREB",
  "currency": "COP",
  "breB": {
    "bankId": "1022",
    "bank": {
      "accountNumber": "123456789"
    },
    "customer": {
      "firstName": "Camila",
      "lastName": "Torres",
      "email": "camila@example.com"
    }
  }
}
```
