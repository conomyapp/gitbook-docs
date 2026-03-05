---
description: Colombia's interbank electronic transfer network. Used for pay-out in Colombia.
---

# BREB

BREB (Banco de la República Electronic Bridge) is Colombia's interbank settlement network, used for direct bank-to-bank transfers. Use it as a destination for payouts to Colombian bank accounts.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"BREB"` |
| `currency` | `string` | Must be `"COP"` |
| `breB.bankId` | `string` | Bank code of the recipient's bank |
| `breB.customer.firstName` | `string` | Recipient's first name |
| `breB.customer.lastName` | `string` | Recipient's last name |
| `breB.customer.email` | `string` | Recipient's email |
| `breB.bank.accountNumber` | `string` | Recipient's account number |

## Example

```json
{
  "type": "BREB",
  "currency": "COP",
  "breB": {
    "bankId": "1022",
    "bank": {
      "accountNumber": "123456789"
    },
    "customer": {
      "firstName": "Camila",
      "lastName": "Torres",
      "email": "camila@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="breb" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
