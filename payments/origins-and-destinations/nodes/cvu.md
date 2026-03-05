---
description: Argentina's virtual account identifier for bank transfers. Used for pay-out in Argentina.
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as a destination when sending funds to an Argentine recipient.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"CVU"` |
| `currency` | `string` | Yes | Must be `"ARS"` |
| `cvu.code` | `string` | Yes | 22-digit CVU code of the recipient |
| `cvu.customer.firstName` | `string` | Yes | Recipient's first name |
| `cvu.customer.lastName` | `string` | Yes | Recipient's last name |
| `cvu.customer.email` | `string` | Yes | Recipient's email |

## Example

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {
    "code": "0000003100010000123456",
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "email": "maria@example.com"
    }
  }
}
```
