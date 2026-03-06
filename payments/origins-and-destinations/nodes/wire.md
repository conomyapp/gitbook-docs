---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: Domestic and international wire transfer. Used for pay-out in the USA.
---

# WIRE

Wire transfers are same-day domestic bank transfers in the USA. They are typically used for large amounts and settle faster than ACH. Use as a destination for payouts to US bank accounts.

**Country:** USA | **Currency:** USD | **Direction:** Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
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

