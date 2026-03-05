---
description: Colombian online bank transfer gateway. Used for pay-in in Colombia.
---

# PSE

PSE (Pagos Seguros en Línea) is Colombia's primary online bank transfer system. The user selects their bank and is redirected to complete the payment on the bank's page.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"PSE"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `pse.bankId` | `string` | Yes | Bank code selected by the user |
| `pse.customer.firstName` | `string` | Yes | Payer's first name |
| `pse.customer.lastName` | `string` | Yes | Payer's last name |
| `pse.customer.documentNumber` | `string` | Yes | Colombian ID number |
| `pse.customer.documentType` | `string` | Yes | Document type (e.g., `"CC"`, `"CE"`, `"NIT"`) |
| `pse.customer.phoneNumber` | `string` | Yes | Payer's phone number |
| `pse.customer.email` | `string` | Yes | Payer's email |

## Example

```json
{
  "type": "PSE",
  "currency": "COP",
  "pse": {
    "bankId": "1007",
    "customer": {
      "firstName": "Andrés",
      "lastName": "Martínez",
      "documentType": "CC",
      "documentNumber": "1020304050",
      "phoneNumber": "3001234567",
      "email": "andres@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Bank redirect URL — send the user here |
| `token` | PSE session token |

The `bankId` list can be retrieved from the [financial institutions](../../../home/financial-institutions.md) page.
