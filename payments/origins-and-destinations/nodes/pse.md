---
description: Colombian online bank transfer gateway. Used for pay-in in Colombia.
layout:
  width: full
---

# PSE

PSE (Pagos Seguros en Línea) is Colombia's primary online bank transfer system. The user selects their bank and is redirected to complete the payment on the bank's page.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"PSE"` |
| `currency` | `string` | Must be `"COP"` |
| `pse.bankId` | `string` | Bank code selected by the user |
| `pse.customer.firstName` | `string` | Payer's first name |
| `pse.customer.lastName` | `string` | Payer's last name |
| `pse.customer.documentNumber` | `string` | Colombian ID number |
| `pse.customer.documentType` | `string` | Document type (e.g., `"CC"`, `"CE"`, `"NIT"`) |
| `pse.customer.phoneNumber` | `string` | Payer's phone number |
| `pse.customer.email` | `string` | Payer's email |


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
| --- | --- |
| `url` | Bank redirect URL — send the user here |
| `token` | PSE session token |


The `bankId` list can be retrieved from the [financial institutions](../../../home/financial-institutions.md) page.

## OpenAPI reference
- Spec: `conomyhq-api`
- Component: `pse`
- Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
