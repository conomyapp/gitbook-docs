---
description: US Automated Clearing House network. Used for pay-in and pay-out in the USA.
---

# ACH

ACH (Automated Clearing House) is the standard US bank-to-bank transfer network. Settlement typically takes 1–3 business days. It supports both pay-in (collecting from a US bank account) and pay-out (disbursing to a US bank account).

**Country:** USA | **Currency:** USD | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"ACH"` |
| `currency` | `string` | Yes | Must be `"USD"` |
| `ach.bank.accountNumber` | `string` | Yes | US bank account number |
| `ach.routingNumber` | `string` | Yes | 9-digit ABA routing number |
| `ach.customer.firstName` | `string` | Yes | Account holder's first name |
| `ach.customer.lastName` | `string` | Yes | Account holder's last name |
| `ach.customer.email` | `string` | Yes | Account holder's email |
| `ach.customer.documentNumber` | `string` | Yes | SSN or ITIN |
| `ach.customer.documentType` | `string` | Yes | Document type (e.g., `"SSN"`) |
| `ach.accountType` | `string` | No | `"CHECKING"` or `"SAVINGS"` |
| `ach.accountHolderType` | `string` | No | `"INDIVIDUAL"` or `"BUSINESS"` |

## Example

```json
{
  "type": "ACH",
  "currency": "USD",
  "ach": {
    "routingNumber": "021000021",
    "accountType": "CHECKING",
    "accountHolderType": "INDIVIDUAL",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "documentType": "SSN",
      "documentNumber": "123456789"
    }
  }
}
```
