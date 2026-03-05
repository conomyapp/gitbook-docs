---
description: Brazilian instant payment system. Used for pay-in in Brazil.
---

# PIX

PIX is Brazil's instant payment rail operated by the Banco Central do Brasil. When used as an origin, it generates a QR code and a PIX copy-paste code that the user scans or copies to complete the payment.

**Country:** Brazil | **Currency:** BRL | **Direction:** Pay-in

## Required fields

| Field                         | Type     | Description               |
| ----------------------------- | -------- | ------------------------- |
| `type`                        | `string` | Must be `"PIX"`           |
| `currency`                    | `string` | Must be `"BRL"`           |
| `pix.customer.firstName`      | `string` | Payer's first name        |
| `pix.customer.lastName`       | `string` | Payer's last name         |
| `pix.customer.email`          | `string` | Payer's email             |
| `pix.customer.documentNumber` | `string` | Brazilian CPF (11 digits) |
| `pix.successUrl`              | `string` | Redirect URL on success   |
| `pix.failedUrl`               | `string` | Redirect URL on failure   |

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

| Field       | Description                      |
| ----------- | -------------------------------- |
| `qrCode`    | Base64-encoded QR code image     |
| `data`      | PIX copy-paste code (EMV string) |
| `expiredAt` | Expiration timestamp (UTC)       |

Show the `qrCode` or `data` to your user so they can complete the payment in their banking app.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pix" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
