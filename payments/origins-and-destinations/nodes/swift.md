---
description: International wire transfer via the SWIFT network. Used for cross-border pay-out.
---

# SWIFT

SWIFT transfers are the standard for international cross-border payments. They route through correspondent banks and typically settle in 1–5 business days depending on the currency and destination country.

**Countries:** International | **Currency:** Multi | **Direction:** Pay-out

## Required fields

| Field | Type | Description |
|---|---|---|
| `type` | `string` | Must be `"SWIFT"` |
| `currency` | `string` | Currency of the transfer (e.g., `"USD"`, `"EUR"`) |
| `swift.bank.accountNumber` | `string` | Recipient's bank account number |
| `swift.swiftCode` | `string` | SWIFT/BIC code of the recipient's bank |
| `swift.customer.firstName` | `string` | Recipient's first name |
| `swift.customer.lastName` | `string` | Recipient's last name |
| `swift.customer.email` | `string` | Recipient's email |
| `swift.customer.documentNumber` | `string` | ID or tax number |
| `swift.customer.documentType` | `string` | Document type |
| `swift.iban` | `string` | IBAN (required for SEPA-zone recipients) |

## Example

```json
{
  "type": "SWIFT",
  "currency": "USD",
  "swift": {
    "swiftCode": "BNPAFRPPXXX",
    "bank": {
      "accountNumber": "00012345678"
    },
    "customer": {
      "firstName": "Pierre",
      "lastName": "Dupont",
      "email": "pierre@example.com",
      "documentType": "PASSPORT",
      "documentNumber": "FR1234567"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="swift-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
