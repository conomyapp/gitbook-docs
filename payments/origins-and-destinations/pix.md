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
description: Brazilian instant payment system. Used for pay-in and pay-out in Brazil.
---

# PIX

PIX is Brazil's instant payment rail operated by the Banco Central do Brasil. When used as an origin, it generates a QR code and a PIX copy-paste code that the user scans or copies to complete the payment.

**Country:** Brazil | **Currency:** BRL | **Direction:** Pay-in / Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"PIX"` |
| `currency` | `string` | Must be `"BRL"` |
| `pix.customer.firstName` | `string` | Payer's first name |
| `pix.customer.lastName` | `string` | Payer's last name |
| `pix.customer.email` | `string` | Payer's email |
| `pix.customer.documentNumber` | `string` | Brazilian CPF (11 digits) |
| `pix.successUrl` | `string` | Redirect URL on success |
| `pix.failedUrl` | `string` | Redirect URL on failure |


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
| --- | --- |
| `qrCode` | Base64-encoded QR code image |
| `data` | PIX copy-paste code (EMV string) |
| `expiredAt` | Expiration timestamp (UTC) |


Show the `qrCode` or `data` to your user so they can complete the payment in their banking app.

## OpenAPI reference

- Spec: `conomyhq-api`
- Component: `pix`
- Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
