---
description: The Clearing House's Real-Time Payments network. Used for instant pay-in in the USA.
---

# RTP

RTP (Real-Time Payments) is The Clearing House's instant payment network, operating 24/7 in the USA. Payments settle in seconds. Widely supported by major US banks.

**Country:** USA | **Currency:** USD | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"RTP"` |
| `currency` | `string` | Yes | Must be `"USD"` |
| `rtp.bank.accountNumber` | `string` | Yes | Bank account number |
| `rtp.routingNumber` | `string` | Yes | 9-digit ABA routing number |
| `rtp.customer.firstName` | `string` | Yes | Account holder's first name |
| `rtp.customer.lastName` | `string` | Yes | Account holder's last name |
| `rtp.customer.email` | `string` | Yes | Account holder's email |
| `rtp.customer.documentNumber` | `string` | Yes | SSN or ITIN |
| `rtp.customer.documentType` | `string` | Yes | Document type |

## Example

```json
{
  "type": "RTP",
  "currency": "USD",
  "rtp": {
    "routingNumber": "021000021",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "Sarah",
      "lastName": "Williams",
      "email": "sarah@example.com",
      "documentType": "SSN",
      "documentNumber": "456789012"
    }
  }
}
```
