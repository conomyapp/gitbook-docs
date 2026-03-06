---
description: Colombia interbank transfer rail. Used for pay-out in Colombia.
layout:
  width: full
---

# BREB

BREB (Banco de la Republica Electronic Bridge) is Colombia's interbank settlement network for bank-to-bank transfers.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"BREB"` |
| `currency` | `string` | Must be `"COP"` |
| `breb.bankId` | `string` | Recipient bank code |
| `breb.accountNumber` | `string` | Recipient account number |
| `breb.customer.firstName` | `string` | Recipient first name |
| `breb.customer.lastName` | `string` | Recipient last name |
| `breb.customer.email` | `string` | Recipient email |

## Example

```json
{
  "type": "BREB",
  "currency": "COP",
  "breb": {
    "bankId": "1022",
    "accountNumber": "123456789",
    "customer": {
      "firstName": "Camila",
      "lastName": "Torres",
      "email": "camila@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="breb" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
