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
description: The Federal Reserve's instant payment rail. Used for instant transfers in the USA.
---

# FEDNOW

FedNow is the Federal Reserve's instant payment service, enabling real-time 24/7 bank-to-bank transfers in the USA. Funds settle in seconds, not days.

**Country:** USA | **Currency:** USD | **Direction:** Pay-in / Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"FEDNOW"` |
| `currency` | `string` | Must be `"USD"` |
| `fedNow.bank.accountNumber` | `string` | Bank account number |
| `fedNow.routingNumber` | `string` | 9-digit ABA routing number |
| `fedNow.customer.firstName` | `string` | Account holder's first name |
| `fedNow.customer.lastName` | `string` | Account holder's last name |
| `fedNow.customer.email` | `string` | Account holder's email |
| `fedNow.customer.documentNumber` | `string` | SSN or ITIN |
| `fedNow.customer.documentType` | `string` | Document type |


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

