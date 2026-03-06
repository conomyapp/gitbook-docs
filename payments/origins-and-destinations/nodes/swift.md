---
description: International wire transfer via the SWIFT network. Used for cross-border pay-out.
layout:
  width: full
---

# SWIFT

SWIFT transfers are the standard for international cross-border payments. They route through correspondent banks and typically settle in 1–5 business days depending on the currency and destination country.

**Countries:** International | **Currency:** Multi | **Direction:** Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"SWIFT"` |
| `currency` | `string` | Currency of the transfer (e.g., `"USD"`, `"EUR"`) |
| `swift.bank.accountNumber` | `string` | Recipient's bank account number |
| `swift.swiftCode` | `string` | SWIFT/BIC code of the recipient's bank |
| `swift.customer.firstName` | `string` | Recipient's first name |
| `swift.customer.lastName` | `string` | Recipient's last name |
| `swift.customer.email` | `string` | Recipient's email |
| `swift.customer.documentNumber` | `string` | ID or tax number |
| `swift.customer.documentType` | `string` | Document type |


## Optional fields


| Field | Type | Description |
| --- | --- | --- |
| `swift.bank.name` | `string` | Recipient bank name. |
| `swift.iban` | `string` | IBAN (required only for destinations that enforce IBAN format, such as SEPA-zone recipients). |


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
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
