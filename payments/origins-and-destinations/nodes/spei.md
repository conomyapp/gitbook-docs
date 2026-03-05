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

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="spei-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
