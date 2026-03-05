---
description: Bancolombia's direct pay-in button. Used for pay-in in Colombia.
---

# BANCOLOMBIA

Bancolombia's transfer button allows Bancolombia account holders to authorize a payment directly from their app or web banking, without leaving your flow.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"BANCOLOMBIA"` |
| `currency` | `string` | Must be `"COP"` |
| `bancolombia.customer.email` | `string` | Payer's email |

## Example

```json
{
  "type": "BANCOLOMBIA",
  "currency": "COP",
  "bancolombia": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Deep link / redirect URL to Bancolombia's authorization flow |

Redirect the user to `bancolombia.url` to complete authorization.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="bancolombia" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
