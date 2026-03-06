---
description: The Clearing House's Real-Time Payments network. Used for instant pay-in in the USA.
layout:
  width: full
---

# RTP

RTP (Real-Time Payments) is The Clearing House's instant payment network, operating 24/7 in the USA. Payments settle in seconds. Widely supported by major US banks.

**Country:** USA | **Currency:** USD | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"RTP"` |
| `currency` | `string` | Must be `"USD"` |
| `rtp.bank.accountNumber` | `string` | Bank account number |
| `rtp.routingNumber` | `string` | 9-digit ABA routing number |
| `rtp.customer.firstName` | `string` | Account holder's first name |
| `rtp.customer.lastName` | `string` | Account holder's last name |
| `rtp.customer.email` | `string` | Account holder's email |
| `rtp.customer.documentNumber` | `string` | SSN or ITIN |
| `rtp.customer.documentType` | `string` | Document type |


## Example

```json
{
  "type": "RTP",
  "currency": "USD",
  "rtp": {
    "routingNumber": "021000021",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "Sarah",
      "lastName": "Williams",
      "email": "sarah@example.com",
      "documentType": "SSN",
      "documentNumber": "456789012"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="rtp" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
