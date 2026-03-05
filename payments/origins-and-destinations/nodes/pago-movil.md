---
description: Venezuela's mobile interbank payment system. Used for pay-in in Venezuela.
---

# PAGO_MOVIL

Pago Móvil is Venezuela's interbank mobile payment system, allowing users to transfer funds between banks using their phone number and ID. Widely adopted across Venezuelan banks.

**Country:** Venezuela | **Currency:** VES | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"PAGO_MOVIL"` |
| `currency` | `string` | Yes | Must be `"VES"` |
| `pagoMovil.customer.firstName` | `string` | Yes | Payer's first name |
| `pagoMovil.customer.lastName` | `string` | Yes | Payer's last name |
| `pagoMovil.customer.email` | `string` | Yes | Payer's email |
| `pagoMovil.customer.phoneNumber` | `string` | Yes | Payer's registered Pago Móvil phone number |
| `pagoMovil.bankId` | `string` | No | Bank code |

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
