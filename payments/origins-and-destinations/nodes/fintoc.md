---
description: Chilean open banking pay-in via bank widget. Used for pay-in in Chile.
layout:
  width: full
---

# FINTOC

Fintoc is a Chilean open banking provider. It uses a hosted widget where the user connects their bank account and authorizes the transfer. No required fields — the widget handles the flow.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"FINTOC"` |
| `currency` | `string` | Must be `"CLP"` |
| `fintoc.customer` | `object` | Optional payer information |


## Example

```json
{
  "type": "FINTOC",
  "currency": "CLP",
  "fintoc": {
    "customer": {
      "firstName": "Diego",
      "email": "diego@example.com"
    }
  }
}
```

## Response fields


| Field | Description |
| --- | --- |
| `url` | Hosted widget URL — redirect the user here |
| `token` | Session token for tracking |


Send the user to `fintoc.url` to complete the bank connection and authorization.

