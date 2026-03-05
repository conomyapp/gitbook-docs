---
description: Colombian online bank transfer gateway. Used for pay-in in Colombia.
---

# PSE

PSE (Pagos Seguros en Línea) is Colombia's primary online bank transfer system. The user selects their bank and is redirected to complete the payment on the bank's page.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"PSE"` |
| `currency` | `string` | Must be `"COP"` |
| `pse.bankId` | `string` | Bank code selected by the user |
| `pse.customer.firstName` | `string` | Payer's first name |
| `pse.customer.lastName` | `string` | Payer's last name |
| `pse.customer.documentNumber` | `string` | Colombian ID number |
| `pse.customer.documentType` | `string` | Document type (e.g., `"CC"`, `"CE"`, `"NIT"`) |
| `pse.customer.phoneNumber` | `string` | Payer's phone number |
| `pse.customer.email` | `string` | Payer's email |

## Example

```json
{
  "type": "PSE",
  "currency": "COP",
  "pse": {
    "bankId": "1007",
    "customer": {
      "firstName": "Andrés",
      "lastName": "Martínez",
      "documentType": "CC",
      "documentNumber": "1020304050",
      "phoneNumber": "3001234567",
      "email": "andres@example.com"
    }
  }
}
```

## Response fields

| Field | Description |
|---|---|
| `url` | Bank redirect URL — send the user here |
| `token` | PSE session token |

The `bankId` list can be retrieved from the [financial institutions](../../../home/financial-institutions.md) page.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pse" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
