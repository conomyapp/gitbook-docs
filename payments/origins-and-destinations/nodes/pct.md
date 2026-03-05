---
description: Argentina's interoperable QR transfer standard. Used for pay-in in Argentina.
---

# PCT

PCT (Pago con Transferencia) is Argentina's BCRA-regulated QR-based instant transfer standard. When used as an origin, it generates a QR code that the user scans with any participating banking or fintech app.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"PCT"` |
| `currency` | `string` | Yes | Must be `"ARS"` |
| `pct.customer.phoneNumber` | `string` | Yes | Payer's phone number (digits only) |
| `pct.customer.phoneNumberPrefix` | `string` | Yes | Country code (e.g., `"54"` for Argentina) |
| `pct.customer.email` | `string` | Yes | Payer's email |
| `pct.successUrl` | `string` | No | Redirect URL on success |
| `pct.failedUrl` | `string` | No | Redirect URL on failure |

## Example

```json
{
  "type": "PCT",
  "currency": "ARS",
  "pct": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "phoneNumber": "1155551234",
      "phoneNumberPrefix": "54",
      "email": "usuario@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `qrCode` | QR code string for scanning |

Display the `qrCode` to your user. They can scan it with Mercado Pago, BBVA, Galicia, Naranja X, or any other PCT-compatible app.
