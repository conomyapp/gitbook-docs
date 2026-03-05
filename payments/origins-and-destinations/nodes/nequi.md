---
description: Bancolombia's digital wallet. Used for pay-in and pay-out in Colombia.
---

# NEQUI

Nequi is Bancolombia's digital wallet with over 20 million users in Colombia. It supports both pay-in (requesting payment to a Nequi number) and pay-out (sending to a Nequi account).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"NEQUI"` |
| `currency` | `string` | Must be `"COP"` |
| `nequi.customer.phoneNumber` | `string` | Nequi phone number (digits only) |
| `nequi.customer.email` | `string` | Customer's email |

## Example

```json
{
  "type": "NEQUI",
  "currency": "COP",
  "nequi": {
    "customer": {
      "phoneNumber": "3001234567",
      "email": "usuario@example.com"
    }
  }
}
```
