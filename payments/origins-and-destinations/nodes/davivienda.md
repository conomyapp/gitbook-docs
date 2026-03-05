---
description: Davivienda's direct pay-in button. Used for pay-in in Colombia.
---

# DAVIVIENDA

Davivienda's payment button lets Davivienda account holders authorize a payment directly from their banking interface.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"DAVIVIENDA"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `davivienda.customer.email` | `string` | Yes | Payer's email |
| `davivienda.bankId` | `string` | No | Bank identifier |

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
|---|---|
| `url` | Redirect URL to Davivienda's authorization page |
