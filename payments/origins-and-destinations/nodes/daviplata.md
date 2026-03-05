---
description: Davivienda's mobile wallet. Used for pay-in and pay-out in Colombia.
---

# DAVIPLATA

Daviplata is Davivienda's mobile wallet, widely used for transfers among unbanked and banked users in Colombia. It supports both pay-in (collection) and pay-out (disbursement).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"DAVIPLATA"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `daviplata.customer.documentType` | `string` | Yes | Document type (e.g., `"CC"`) |
| `daviplata.customer.documentNumber` | `string` | Yes | Colombian ID number |
| `daviplata.customer.email` | `string` | Yes | Customer's email |

## Example

```json
{
  "type": "DAVIPLATA",
  "currency": "COP",
  "daviplata": {
    "customer": {
      "documentType": "CC",
      "documentNumber": "1020304050",
      "email": "usuario@example.com"
    }
  }
}
```
