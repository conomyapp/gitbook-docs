---
description: Bancolombia's digital wallet. Used for pay-in and pay-out in Colombia.
---

# NEQUI

Nequi is Bancolombia's digital wallet with over 20 million users in Colombia. It supports both pay-in (requesting payment to a Nequi number) and pay-out (sending to a Nequi account).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"NEQUI"` |
| `currency` | `string` | Must be `"COP"` |
| `nequi.customer.phoneNumber` | `string` | Nequi phone number (digits only) |
| `nequi.customer.email` | `string` | Customer's email |

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

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="nequi" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
