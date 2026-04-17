# Refunds

{% columns fullWidth="true" %}
{% column %}
Refunds are child transactions linked to a `SETTLED` parent payment via `parentPaymentId`. The parent stays in `SETTLED` regardless of how many refunds are issued — the full refund history lives on the children.

This namespace exposes the cross-parent listing endpoint. Per-parent operations (creating a refund, listing the children of a single payment) live under [Payments](payments.md#refunds).
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /refunds
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## `GET /refunds`

Returns a paginated list of refund child transactions across the system (scoped to the caller's tenant).

**Query parameters**

| Name         | Type   | Description                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| `clientId`   | string | Limit to a specific client. Defaults to the caller's client when applicable.  |
| `status`     | string | Filter by child status (`RECEIVED`, `SETTLED`, `FAILED`, `EXPIRED`, `UNSETTLED`). |
| `dateFrom`   | string | ISO 8601 inclusive lower bound on `createdAt`.                                 |
| `dateTo`     | string | ISO 8601 inclusive upper bound on `createdAt`.                                 |
| `limit`      | int    | Page size. Default 50, max 500.                                                |
| `offset`     | int    | Pagination offset.                                                             |

**Response** `200 OK`

```json
{
  "total": 42,
  "refunds": [
    {
      "id": "69e25383b604159c5b8ba5bb",
      "parentPaymentId": "69e0df45b604159c5b8ba5a9",
      "status": "RECEIVED",
      "totalAmount": "150.00",
      "currency": "ARS",
      "createdAt": "2026-04-17T14:37:44Z",
      "description": "Client requested partial refund"
    }
  ]
}
```

### Refund lifecycle

Each child transaction transitions through:

1. `RECEIVED` — the refund request has been accepted by the provider.
2. `SETTLED` — the reversal has been reconciled. Webhook `payment.refund.settled`.

Failure paths land the child in `FAILED` (rejected at the provider) or `UNSETTLED` (received but unreconcilable).

### Guidance

* A `SETTLED` parent can have **multiple** refund children so long as the sum of their amounts does not exceed the parent's `totalAmount`.
* Use the aggregated summary from [`GET /payments/{id}/refunds`](payments.md#refunds) to size your next refund (`maxRefundable`).
* The parent's `totalAmount` is the absolute ceiling; partial refunds are honoured.
* To create a refund, use [`POST /payments/{id}/refund`](payments.md#refunds) on the parent.

### Webhook events

| Event                     | Fires when…                              |
| ------------------------- | ---------------------------------------- |
| `payment.refund.created`  | A refund child has been registered.      |
| `payment.refund.settled`  | The refund has reached `SETTLED`.        |
| `payment.refund.failed`   | The refund was rejected by the provider. |
