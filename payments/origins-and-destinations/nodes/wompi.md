---
description: Colombian payment gateway. Used for pay-in in Colombia.
---

# WOMPI

Wompi is a Colombian payment gateway that supports multiple payment methods including PSE, Nequi, credit/debit cards, and cash. The user is redirected to Wompi's hosted checkout to complete the payment.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"WOMPI"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `wompi.redirectUrl` | `string` | Yes | URL to redirect after payment |
| `wompi.customer.firstName` | `string` | Yes | Payer's first name |
| `wompi.customer.email` | `string` | Yes | Payer's email |

## Example

```json
{
  "type": "WOMPI",
  "currency": "COP",
  "wompi": {
    "redirectUrl": "https://yourapp.com/return",
    "customer": {
      "firstName": "Luis",
      "email": "luis@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Wompi-hosted checkout URL |
| `token` | Payment session token |
| `expiresAt` | Session expiration timestamp |

Redirect the user to `wompi.url` to complete their payment.
