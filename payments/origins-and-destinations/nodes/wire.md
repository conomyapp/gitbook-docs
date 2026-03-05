---
description: Domestic and international wire transfer. Used for pay-out in the USA.
---

# WIRE

Wire transfers are same-day domestic bank transfers in the USA. They are typically used for large amounts and settle faster than ACH. Use as a destination for payouts to US bank accounts.

**Country:** USA | **Currency:** USD | **Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"WIRE"` |
| `currency` | `string` | Yes | Must be `"USD"` |
| `wire.bank.accountNumber` | `string` | Yes | Recipient's bank account number |
| `wire.swiftCode` | `string` | Yes | SWIFT/BIC code of the recipient's bank |
| `wire.customer.firstName` | `string` | Yes | Recipient's first name |
| `wire.customer.lastName` | `string` | Yes | Recipient's last name |
| `wire.customer.email` | `string` | Yes | Recipient's email |
| `wire.customer.documentNumber` | `string` | Yes | SSN or other ID |
| `wire.customer.documentType` | `string` | Yes | Document type |
| `wire.iban` | `string` | No | IBAN (for international wires) |

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
