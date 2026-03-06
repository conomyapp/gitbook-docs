---
description: Chilean open banking pay-in via redirect. Used for pay-in in Chile.
layout:
  width: full
---

# ETPAY

ETPAY is a Chilean open banking provider that lets users pay directly from their bank account via a redirect flow. After submitting the payment, you receive a URL to redirect the user to complete the transfer.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"ETPAY"` |
| `currency` | `string` | Must be `"CLP"` |
| `etpay.successUrl` | `string` | URL to redirect after successful payment |
| `etpay.failedUrl` | `string` | URL to redirect if payment fails |
| `etpay.customer.firstName` | `string` | Payer's first name |
| `etpay.customer.email` | `string` | Payer's email |


## Example

```json
{
  "type": "ETPAY",
  "currency": "CLP",
  "etpay": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "Valentina",
      "email": "valentina@example.com"
    }
  }
}
```

## Response fields


| Field | Description |
| --- | --- |
| `url` | Redirect URL — send the user here to complete the payment |
| `expiresAt` | When the session expires |


Redirect your user to `etpay.url` immediately after creating the payment.

