---
description: Venezuela's mobile interbank payment system. Used for pay-in in Venezuela.
layout:
  width: full
---

# PAGO_MOVIL

Pago Móvil is Venezuela's interbank mobile payment system, allowing users to transfer funds between banks using their phone number and ID. Widely adopted across Venezuelan banks.

**Country:** Venezuela | **Currency:** VES | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
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
Schema from the conomyhq-api OpenAPI specification.
{% endopenapi-schemas %}
