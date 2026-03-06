---
description: Chile Transbank card and transfer gateway. Used for pay-in in Chile.
layout:
  width: full
---

# WEBPAY

Webpay is the Transbank gateway for card and bank-transfer payments in Chile.
The user is redirected to a Transbank-hosted checkout page.

**Country:** Chile  
**Currency:** CLP  
**Direction:** Pay-in

## Required fields

- `type` (`string`): Must be `"WEBPAY"`.
- `currency` (`string`): Must be `"CLP"`.
- `webpay.customer.firstName` (`string`): Payer first name.
- `webpay.customer.lastName` (`string`): Payer last name.
- `webpay.customer.email` (`string`): Payer email.

## Example

```json
{
  "type": "WEBPAY",
  "currency": "CLP",
  "webpay": {
    "customer": {
      "firstName": "Sebastian",
      "lastName": "Rojas",
      "email": "sebastian@example.com"
    }
  }
}
```

## Response fields

- `url`: Transbank-hosted payment URL.
- `token`: Session token.

Redirect your user to `webpay.url` to complete the payment on the Transbank page.
