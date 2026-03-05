---
description: Brazilian instant payment system. Used for pay-in in Brazil.
---

# PIX

PIX is Brazil's instant payment rail operated by the Banco Central do Brasil. When used as an origin, it generates a QR code and a PIX copy-paste code that the user scans or copies to complete the payment.

**Country:** Brazil | **Currency:** BRL | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"PIX"` |
| `currency` | `string` | Yes | Must be `"BRL"` |
| `pix.customer.firstName` | `string` | Yes | Payer's first name |
| `pix.customer.lastName` | `string` | Yes | Payer's last name |
| `pix.customer.email` | `string` | Yes | Payer's email |
| `pix.customer.documentNumber` | `string` | Yes | Brazilian CPF (11 digits) |
| `pix.successUrl` | `string` | No | Redirect URL on success |
| `pix.failedUrl` | `string` | No | Redirect URL on failure |

## Example

```json
{
  "type": "PIX",
  "currency": "BRL",
  "pix": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "João",
      "lastName": "Silva",
      "email": "joao@example.com",
      "documentNumber": "12345678901"
    }
  }
}
```

## Response fields

After the payment is created, the `pix` object in the response includes:

| Field | Description |
|---|---|
| `qrCode` | Base64-encoded QR code image |
| `data` | PIX copy-paste code (EMV string) |
| `expiredAt` | Expiration timestamp (UTC) |

Show the `qrCode` or `data` to your user so they can complete the payment in their banking app.
