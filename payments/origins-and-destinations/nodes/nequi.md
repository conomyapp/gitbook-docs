---
description: Bancolombia's digital wallet. Used for pay-in and pay-out in Colombia.
---

# NEQUI

Nequi is Bancolombia's digital wallet with over 20 million users in Colombia. It supports both pay-in (requesting payment to a Nequi number) and pay-out (sending to a Nequi account).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"NEQUI"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `nequi.customer.phoneNumber` | `string` | Yes | Nequi phone number (digits only) |
| `nequi.customer.email` | `string` | Yes | Customer's email |

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
