---
description: Domestic and international wire transfer. Used for pay-out in the USA.
---

# WIRE

Wire transfers are same-day domestic bank transfers in the USA. They are typically used for large amounts and settle faster than ACH. Use as a destination for payouts to US bank accounts.

**Country:** USA | **Currency:** USD | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"WIRE"` |
| `currency` | `string` | Must be `"USD"` |
| `wire.bank.accountNumber` | `string` | Recipient's bank account number |
| `wire.swiftCode` | `string` | SWIFT/BIC code of the recipient's bank |
| `wire.customer.firstName` | `string` | Recipient's first name |
| `wire.customer.lastName` | `string` | Recipient's last name |
| `wire.customer.email` | `string` | Recipient's email |
| `wire.customer.documentNumber` | `string` | SSN or other ID |
| `wire.customer.documentType` | `string` | Document type |
| `wire.iban` | `string` | IBAN (for international wires) |

## Example

```json
{
  "type": "WIRE",
  "currency": "USD",
  "wire": {
    "swiftCode": "CHASUS33",
    "bank": {
      "accountNumber": "000987654321"
    },
    "customer": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "documentType": "SSN",
      "documentNumber": "987654321"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="wire" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
