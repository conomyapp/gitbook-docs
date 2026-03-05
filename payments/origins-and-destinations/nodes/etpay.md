---
description: Chilean open banking pay-in via redirect. Used for pay-in in Chile.
---

# ETPAY

ETPAY is a Chilean open banking provider that lets users pay directly from their bank account via a redirect flow. After submitting the payment, you receive a URL to redirect the user to complete the transfer.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"ETPAY"` |
| `currency` | `string` | Must be `"CLP"` |
| `etpay.successUrl` | `string` | URL to redirect after successful payment |
| `etpay.failedUrl` | `string` | URL to redirect if payment fails |
| `etpay.customer.firstName` | `string` | Payer's first name |
| `etpay.customer.email` | `string` | Payer's email |

## Example

```json
{
  "type": "ETPAY",
  "currency": "CLP",
  "etpay": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "Valentina",
      "email": "valentina@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Redirect URL — send the user here to complete the payment |
| `expiresAt` | When the session expires |

Redirect your user to `etpay.url` immediately after creating the payment.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="etpay" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
