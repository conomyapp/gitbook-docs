---
description: Argentina's virtual account identifier for bank transfers. Used for pay-out in Argentina.
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as a destination when sending funds to an Argentine recipient.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"CVU"` |
| `currency` | `string` | Must be `"ARS"` |
| `cvu.code` | `string` | 22-digit CVU code of the recipient |
| `cvu.customer.firstName` | `string` | Recipient's first name |
| `cvu.customer.lastName` | `string` | Recipient's last name |
| `cvu.customer.email` | `string` | Recipient's email |

## Example

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {
    "code": "0000003100010000123456",
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "email": "maria@example.com"
    }
  }
}
```

## Valid origins

When CVU is used as destination, the valid origins are:

| Node | Description |
|---|---|
| `ACCOUNT` | Internal platform account |

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="cvu" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
