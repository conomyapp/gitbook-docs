---
description: Chile's Transbank card and transfer gateway. Used for pay-in in Chile.
---

# WEBPAY

Webpay is the Transbank gateway, widely used in Chile for both debit and credit card payments as well as bank transfers. The user is redirected to complete the payment on the Transbank-hosted page.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"WEBPAY"` |
| `currency` | `string` | Yes | Must be `"CLP"` |
| `webpay.customer.firstName` | `string` | Yes | Payer's first name |
| `webpay.customer.lastName` | `string` | Yes | Payer's last name |
| `webpay.customer.email` | `string` | Yes | Payer's email |

## Example

```json
{
  "type": "WEBPAY",
  "currency": "CLP",
  "webpay": {
    "customer": {
      "firstName": "Sebastián",
      "lastName": "Rojas",
      "email": "sebastian@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Transbank-hosted payment URL |
| `token` | Session token |

Redirect your user to `webpay.url` to complete the payment on the Transbank page.
