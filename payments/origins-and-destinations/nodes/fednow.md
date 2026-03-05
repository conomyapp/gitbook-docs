---
description: The Federal Reserve's instant payment rail. Used for instant transfers in the USA.
---

# FEDNOW

FedNow is the Federal Reserve's instant payment service, enabling real-time 24/7 bank-to-bank transfers in the USA. Funds settle in seconds, not days.

**Country:** USA | **Currency:** USD | **Direction:** Pay-in / Pay-out

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"FEDNOW"` |
| `currency` | `string` | Yes | Must be `"USD"` |
| `fedNow.bank.accountNumber` | `string` | Yes | Bank account number |
| `fedNow.routingNumber` | `string` | Yes | 9-digit ABA routing number |
| `fedNow.customer.firstName` | `string` | Yes | Account holder's first name |
| `fedNow.customer.lastName` | `string` | Yes | Account holder's last name |
| `fedNow.customer.email` | `string` | Yes | Account holder's email |
| `fedNow.customer.documentNumber` | `string` | Yes | SSN or ITIN |
| `fedNow.customer.documentType` | `string` | Yes | Document type |

## Example

```json
{
  "type": "FEDNOW",
  "currency": "USD",
  "fedNow": {
    "routingNumber": "021000021",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "Michael",
      "lastName": "Johnson",
      "email": "michael@example.com",
      "documentType": "SSN",
      "documentNumber": "123456789"
    }
  }
}
```
