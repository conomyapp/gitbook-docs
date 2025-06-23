---
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: false
---

# Quickstart

This guide demonstrates how to implement payments using our API through two different approaches: step-by-step with payment attempts and direct payments.

### Step-by-Step Flow

This approach gives you more control over the payment process by breaking it down into manageable steps.

#### 1. Create a Payment Attempt

First, initiate a payment attempt by specifying at least the `destination amount` or `origin amount`, as well as the `product` and `identityId`:

```json
{
    "externalId": "63d93f9b-35c8-470b-84fd-43a7282a62b0", // your transaction ID
    "externalIdentityId": "f0d16558-3a8f-4d74-9099-67cc46e01d97", // your identity or user UD
    "identityId": "ea5423d5-b4fe-4380-a33b-af2863d2c125", // identity ID, which is provided upon identity creation
    "originAmount": {
        "amount": "50000",
        "currency": "CLP"
    },
    "product": "CLP:MXN" 
}
```

The create payment attempt endpoint should return the transaction model.

```json
{
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "externalId": "63d93f9b-35c8-470b-84fd-43a7282a62b0",
    "externalIdentityId": "f0d16558-3a8f-4d74-9099-67cc46e01d97",
    "identityId": "ea5423d5-b4fe-4380-a33b-af2863d2c125",
    "originAmount": {
        "amount": "50000",
        "currency": "CLP"
    },
    "destinationAmount": {
        "amount": "1025.14",
        "currency": "MXN"
    },
    "fees":[{
      "name": "CONOMY_HQ",
      "type": "TRANSACTION",
      "method": "PERCENTAGE",
      "currency": "CLP",
      "value": "0"
    }],
    "type": "REMITTANCE",
    "product": "CLP:MXN",
    "status": "ATTEMPT",
    "exchange": {
        "type": "SPOT",
        "product": "CLP:MXN",
        "status": "SIMULATION",
        "fee": "0",
        "executable": true,
        "exchangeRate": "0.021",
        "provider": "PROVIDER_1",
        "marketValue": "0.021",
        "createdAt": "2025-01-13T15:00:00Z",
        "updatedAt": "2025-01-13T15:00:00Z"
    },
    "createdAt": "2025-01-13T15:00:00Z",
    "updatedAt": "2025-01-13T15:00:00Z",
}
```



