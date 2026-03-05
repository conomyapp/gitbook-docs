---
description: Chilean open banking pay-in via redirect. Used for pay-in in Chile.
---

# ETPAY

ETPAY is a Chilean open banking provider that lets users pay directly from their bank account via a redirect flow. After submitting the payment, you receive a URL to redirect the user to complete the transfer.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

## Required fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"ETPAY"` |
| `currency` | `string` | Yes | Must be `"CLP"` |
| `etpay.successUrl` | `string` | Yes | URL to redirect after successful payment |
| `etpay.failedUrl` | `string` | Yes | URL to redirect if payment fails |
| `etpay.customer.firstName` | `string` | Yes | Payer's first name |
| `etpay.customer.email` | `string` | Yes | Payer's email |

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
|---|---|
| `url` | Redirect URL — send the user here to complete the payment |
| `expiresAt` | When the session expires |

Redirect your user to `etpay.url` immediately after creating the payment.
