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
description: Davivienda's direct pay-in button. Used for pay-in in Colombia.
---

# DAVIVIENDA

Davivienda's payment button lets Davivienda account holders authorize a payment directly from their banking interface.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
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
| --- | --- |
| `url` | Redirect URL to Davivienda's authorization page |

## OpenAPI reference

- Spec: `conomyhq-api`
- Component: `davivienda`
- Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
