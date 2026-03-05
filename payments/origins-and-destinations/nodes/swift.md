---
description: International wire transfer via the SWIFT network. Used for cross-border pay-out.
---

# SWIFT

SWIFT transfers are the standard for international cross-border payments. They route through correspondent banks and typically settle in 1–5 business days depending on the currency and destination country.

**Countries:** International | **Currency:** Multi | **Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"SWIFT"` |
| `currency` | `string` | Yes | Currency of the transfer (e.g., `"USD"`, `"EUR"`) |
| `swift.bank.accountNumber` | `string` | Yes | Recipient's bank account number |
| `swift.swiftCode` | `string` | Yes | SWIFT/BIC code of the recipient's bank |
| `swift.customer.firstName` | `string` | Yes | Recipient's first name |
| `swift.customer.lastName` | `string` | Yes | Recipient's last name |
| `swift.customer.email` | `string` | Yes | Recipient's email |
| `swift.customer.documentNumber` | `string` | Yes | ID or tax number |
| `swift.customer.documentType` | `string` | Yes | Document type |
| `swift.iban` | `string` | No | IBAN (required for SEPA-zone recipients) |

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
