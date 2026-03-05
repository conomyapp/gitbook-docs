---
description: Mexico's interbank electronic transfer system. Used for pay-in and pay-out in Mexico.
---

# SPEI

SPEI (Sistema de Pagos Electrónicos Interbancarios) is Mexico's real-time interbank transfer network, operated by Banco de México. It supports both pay-in (receiving funds via CLABE) and pay-out (sending to a CLABE).

**Country:** Mexico | **Currency:** MXN | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"SPEI"` |
| `currency` | `string` | Must be `"MXN"` |
| `spei.customer.firstName` | `string` | Customer's first name |
| `spei.customer.lastName` | `string` | Customer's last name |
| `spei.clabe` | `string` | 18-digit CLABE (required for pay-out) |
| `spei.bankId` | `string` | Bank identifier code |

## Pay-in example

For pay-in, the user sends a transfer to the CLABE generated in the response:

```json
{
  "type": "SPEI",
  "currency": "MXN",
  "spei": {
    "customer": {
      "firstName": "Carlos",
      "lastName": "Mendoza"
    }
  }
}
```

## Pay-out example

For pay-out, provide the recipient's CLABE:

```json
{
  "type": "SPEI",
  "currency": "MXN",
  "spei": {
    "clabe": "032180000118359719",
    "customer": {
      "firstName": "Ana",
      "lastName": "López"
    }
  }
}
```

## Response fields (pay-in)

| Field | Description |
|---|---|
| `clabe` | CLABE the payer should transfer to |
| `bankId` | Receiving bank code |

Share the `spei.clabe` with your user so they can complete the transfer from their banking app.
