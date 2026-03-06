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
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
