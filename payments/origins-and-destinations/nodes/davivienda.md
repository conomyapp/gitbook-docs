---
description: Davivienda's direct pay-in button. Used for pay-in in Colombia.
---

# DAVIVIENDA

Davivienda's payment button lets Davivienda account holders authorize a payment directly from their banking interface.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"DAVIVIENDA"` |
| `currency` | `string` | Must be `"COP"` |
| `davivienda.customer.email` | `string` | Payer's email |
| `davivienda.bankId` | `string` | Bank identifier |

## Example

```json
{
  "type": "DAVIVIENDA",
  "currency": "COP",
  "davivienda": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Redirect URL to Davivienda's authorization page |

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="davivienda" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
