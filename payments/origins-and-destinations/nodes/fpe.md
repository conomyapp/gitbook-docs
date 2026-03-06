---
description: UK's Faster Payments scheme. Used for pay-out in the United Kingdom.
layout:
  width: full
---

# FPE

FPE (Faster Payments) is the UK's real-time payment network. Payments settle in seconds, 24/7. Use it as a destination to send funds to UK bank accounts identified by account number and sort code.

**Country:** UK | **Currency:** GBP | **Direction:** Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"FPE"` |
| `currency` | `string` | Must be `"GBP"` |
| `fpe.accountNumber` | `string` | UK bank account number (8 digits) |
| `fpe.sortCode` | `string` | Sort code (6 digits, e.g., `"200415"`) |
| `fpe.customer.firstName` | `string` | Recipient's first name |
| `fpe.customer.lastName` | `string` | Recipient's last name |
| `fpe.customer.email` | `string` | Recipient's email |


## Example

```json
{
  "type": "FPE",
  "currency": "GBP",
  "fpe": {
    "accountNumber": "12345678",
    "sortCode": "200415",
    "customer": {
      "firstName": "Emma",
      "lastName": "Thompson",
      "email": "emma@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="fpe-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
