---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: Davivienda's mobile wallet. Used for pay-in and pay-out in Colombia.
---

# DAVIPLATA

Daviplata is Davivienda's mobile wallet, widely used for transfers among unbanked and banked users in Colombia. It supports both pay-in (collection) and pay-out (disbursement).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"DAVIPLATA"` |
| `currency` | `string` | Must be `"COP"` |
| `daviplata.customer.documentType` | `string` | Document type (e.g., `"CC"`) |
| `daviplata.customer.documentNumber` | `string` | Colombian ID number |
| `daviplata.customer.email` | `string` | Customer's email |


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

