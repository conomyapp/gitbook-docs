---
description: Chile's Transbank card and transfer gateway. Used for pay-in in Chile.
---

# WEBPAY

Webpay is the Transbank gateway, widely used in Chile for both debit and credit card payments as well as bank transfers. The user is redirected to complete the payment on the Transbank-hosted page.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"WEBPAY"` |
| `currency` | `string` | Must be `"CLP"` |
| `webpay.customer.firstName` | `string` | Payer's first name |
| `webpay.customer.lastName` | `string` | Payer's last name |
| `webpay.customer.email` | `string` | Payer's email |

## Example

```json
{
  "type": "WEBPAY",
  "currency": "CLP",
  "webpay": {
    "customer": {
      "firstName": "Sebastián",
      "lastName": "Rojas",
      "email": "sebastian@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Transbank-hosted payment URL |
| `token` | Session token |

Redirect your user to `webpay.url` to complete the payment on the Transbank page.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="webpay" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
