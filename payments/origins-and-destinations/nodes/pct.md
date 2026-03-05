---
description: Argentina's interoperable QR transfer standard. Used for pay-in in Argentina.
---

# PCT

PCT (Pago con Transferencia) is Argentina's BCRA-regulated QR-based instant transfer standard. When used as an origin, it generates a QR code that the user scans with any participating banking or fintech app.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

## Required fields

| Field                            | Type     | Description                               |
| -------------------------------- | -------- | ----------------------------------------- |
| `type`                           | `string` | Must be `"PCT"`                           |
| `currency`                       | `string` | Must be `"ARS"`                           |
| `pct.customer.phoneNumber`       | `string` | Payer's phone number (digits only)        |
| `pct.customer.phoneNumberPrefix` | `string` | Country code (e.g., `"54"` for Argentina) |
| `pct.customer.email`             | `string` | Payer's email                             |
| `pct.successUrl`                 | `string` | Redirect URL on success                   |
| `pct.failedUrl`                  | `string` | Redirect URL on failure                   |

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

| Field        | Description                 |
| ------------ | --------------------------- |
| `pct.qrCode` | QR code string for scanning |

Display the `qrCode` to your user. They can scan it with Mercado Pago, BBVA, Galicia, Naranja X, or any other PCT-compatible app.

## Valid destinations

When PCT is used as origin, the valid destinations are:

| Node      | Description               |
| --------- | ------------------------- |
| `ACCOUNT` | Internal platform account |

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pct" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
