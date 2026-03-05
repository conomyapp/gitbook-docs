---
description: European bank transfer standard. Used for pay-out across the eurozone.
---

# SEPA

SEPA (Single Euro Payments Area) is the European standard for bank transfers in euros. It covers 36 countries including the EU, Switzerland, Norway, and Iceland. Use it as a destination for payouts to European bank accounts.

**Countries:** Eurozone + SEPA area | **Currency:** EUR | **Direction:** Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"SEPA"` |
| `currency` | `string` | Yes | Must be `"EUR"` |
| `sepa.iban` | `string` | Yes | Recipient's IBAN |
| `sepa.customer.firstName` | `string` | Yes | Recipient's first name |
| `sepa.customer.lastName` | `string` | Yes | Recipient's last name |
| `sepa.customer.email` | `string` | Yes | Recipient's email |
| `sepa.customer.documentNumber` | `string` | Yes | National ID or tax number |
| `sepa.customer.documentType` | `string` | Yes | Document type |
| `sepa.bic` | `string` | No | BIC/SWIFT code of the bank |

## Example

```json
{
  "type": "SEPA",
  "currency": "EUR",
  "sepa": {
    "iban": "DE89370400440532013000",
    "bic": "COBADEFFXXX",
    "customer": {
      "firstName": "Hans",
      "lastName": "Müller",
      "email": "hans@example.com",
      "documentType": "DNI",
      "documentNumber": "X1234567A"
    }
  }
}
```
