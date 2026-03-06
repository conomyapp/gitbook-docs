---
description: Chile's Transbank card and transfer gateway. Used for pay-in in Chile.
layout:
  width: full
---

# WEBPAY

Webpay is the Transbank gateway, widely used in Chile for both debit and credit card payments as well as bank transfers. The user is redirected to complete the payment on the Transbank-hosted page.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"WEBPAY"` |
| `currency` | `string` | Must be `"CLP"` |
| `webpay.customer.firstName` | `string` | Payer's first name |
| `webpay.customer.lastName` | `string` | Payer's last name |
| `webpay.customer.email` | `string` | Payer's email |


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
| --- | --- |
| `url` | Transbank-hosted payment URL |
| `token` | Session token |


Redirect your user to `webpay.url` to complete the payment on the Transbank page.

