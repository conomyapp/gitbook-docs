---
description: UK's Faster Payments scheme. Used for pay-out in the United Kingdom.
---

# FPE

FPE (Faster Payments) is the UK's real-time payment network. Payments settle in seconds, 24/7. Use it as a destination to send funds to UK bank accounts identified by account number and sort code.

**Country:** UK | **Currency:** GBP | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
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
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
