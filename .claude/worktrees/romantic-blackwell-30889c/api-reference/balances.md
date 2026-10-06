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
description: Endpoints for reading the unassigned balance and listing topups awaiting assignment.
---

# Unassigned balances

When a topup arrives without a destination account — for example, a transfer that hits one of the merchant's collecting rails without an identifier — the funds are parked in the client's **unassigned balance** until the payment is reconciled against an account.

These endpoints expose the unassigned balance widget and the paginated list of topups awaiting reconciliation.

{% code title="Endpoints" overflow="wrap" %}
```http
GET /accounts/unassigned
GET /payments/unassigned
```
{% endcode %}

***

## `GET /accounts/unassigned`

Returns a compact widget with the current unassigned balance and a short list of topups approaching expiry.

**Query parameters**

| Name       | Type   | Required | Description    |
| ---------- | ------ | :------: | -------------- |
| `clientId` | string |    ✓     | Tenant scope.  |

**Response** `200 OK`

```json
{
  "clientId": "your-client-id",
  "totalAmount": "15000.00",
  "currency": "ARS",
  "count": 3,
  "urgent": [
    {
      "paymentId": "69e25246baa9fd9b463d6baf",
      "originanteName": "Juan Perez",
      "amount": "7500.00",
      "currency": "ARS",
      "expiresAt": "2026-04-18T15:31:16Z"
    }
  ]
}
```

`urgent` contains only topups whose `expiresAt` falls within the configured warning window (typically 6 hours). The full list lives in `GET /payments/unassigned`.

***

## `GET /payments/unassigned`

Returns a paginated list of topups awaiting reconciliation.

**Query parameters**

| Name            | Type   | Required | Description                                                              |
| --------------- | ------ | :------: | ------------------------------------------------------------------------ |
| `clientId`      | string |    ✓     | Tenant scope.                                                            |
| `expiresWithin` | string |          | `6h` \| `24h` \| `48h` \| `""` (all). Filters by time-to-expiry.         |
| `amountMin`     | string |          | Inclusive lower bound on `totalAmount`.                                  |
| `amountMax`     | string |          | Inclusive upper bound on `totalAmount`.                                  |
| `search`        | string |          | Free-text match against the originante (first/last name, documentNumber). |
| `limit`         | int    |          | Page size. Default 50, max 500.                                          |
| `offset`        | int    |          | Pagination offset.                                                       |

**Response** `200 OK`

```json
{
  "total": 12,
  "totalAmount": "52300.50",
  "currency": "ARS",
  "payments": [
    {
      "paymentId": "69e25246baa9fd9b463d6baf",
      "providerReference": "bm_abc-123",
      "amount": "7500.00",
      "currency": "ARS",
      "receivedAt": "2026-04-17T15:31:16Z",
      "expiresAt": "2026-04-18T15:31:16Z",
      "originante": {
        "firstName": "Carlos",
        "lastName": "Nuevo",
        "documentNumber": "23111222331"
      },
      "customerId": "69e25243baa9fd9b463d6bac"
    }
  ]
}
```

***

## Lifecycle

1. A topup arrives on a rail without a pre-assigned destination account. The platform creates a `CREATED` payment with no `accountNumber` and an `expiresAt` 48 hours in the future.
2. The payment surfaces in `GET /payments/unassigned` until one of the following happens:
   * An operator or your integration calls [`POST /payments/{id}/assign`](payments/payments.md#assign-an-unassigned-balance) to reconcile the topup against one of the client's accounts. The payment transitions to `SETTLED` and `payment.settled` fires.
   * The expiry window elapses. The payment transitions to `EXPIRED`, a child `REFUND` is issued to the originante, and `payment.expired` fires.

See [Compliance](../compliance/README.md) for how review gates apply to unassigned topups.

***

## Webhook events

| Event | Fires when |
| --- | --- |
| `purchase.pendingAssignment` | A pay-in was received and is awaiting reconciliation against an account. |
| `purchase.underpaid` | On reconciliation, the received amount was below expected. |
| `purchase.overpaid` | On reconciliation, the received amount was above expected. |
| `payment.settled` | Pay-in reconciled against an account. |
| `payment.expired` | Expiry window elapsed without reconciliation. |
