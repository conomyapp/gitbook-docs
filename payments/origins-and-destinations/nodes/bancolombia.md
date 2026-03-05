---
description: Bancolombia's direct pay-in button. Used for pay-in in Colombia.
---

# BANCOLOMBIA

Bancolombia's transfer button allows Bancolombia account holders to authorize a payment directly from their app or web banking, without leaving your flow.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"BANCOLOMBIA"` |
| `currency` | `string` | Yes | Must be `"COP"` |
| `bancolombia.customer.email` | `string` | Yes | Payer's email |

## Example

```json
{
  "type": "BANCOLOMBIA",
  "currency": "COP",
  "bancolombia": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Deep link / redirect URL to Bancolombia's authorization flow |

Redirect the user to `bancolombia.url` to complete authorization.
