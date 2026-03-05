---
description: Venezuela's mobile interbank payment system. Used for pay-in in Venezuela.
---

# PAGO_MOVIL

Pago Móvil is Venezuela's interbank mobile payment system, allowing users to transfer funds between banks using their phone number and ID. Widely adopted across Venezuelan banks.

**Country:** Venezuela | **Currency:** VES | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"PAGO_MOVIL"` |
| `currency` | `string` | Must be `"VES"` |
| `pagoMovil.customer.firstName` | `string` | Payer's first name |
| `pagoMovil.customer.lastName` | `string` | Payer's last name |
| `pagoMovil.customer.email` | `string` | Payer's email |
| `pagoMovil.customer.phoneNumber` | `string` | Payer's registered Pago Móvil phone number |
| `pagoMovil.bankId` | `string` | Bank code |

## Example

```json
{
  "type": "PAGO_MOVIL",
  "currency": "VES",
  "pagoMovil": {
    "bankId": "0102",
    "customer": {
      "firstName": "Carlos",
      "lastName": "Pérez",
      "email": "carlos@example.com",
      "phoneNumber": "4141234567"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pago-movil" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
