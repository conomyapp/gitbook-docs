# Refunds

{% columns fullWidth="true" %}
{% column %}
A refund reverses a settled payment and sends the funds back to the original sender. Refunds are not a separate resource — they are **child payments** linked to the parent via `parentPaymentId`, with `type=REFUND`.

Because refunds are payments, their primary API surface lives under [Payments](payments.md#refunds):

* `POST /payments/{id}/refund` — create a refund against a `SETTLED` parent.
* `GET  /payments/{id}/refunds` — list the refund children of a single parent plus an aggregated summary.

This page documents the cross-tenant listing endpoint (`GET /refunds`), which is a convenience over `GET /payments?type=REFUND` for reporting dashboards.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /refunds
```
{% endcode %}

{% code title="See also" overflow="wrap" %}
```http
POST /payments/:id/refund
GET  /payments/:id/refunds
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## `GET /refunds`

Returns a paginated list of refund child payments across the caller's tenant.

**Query parameters**

| Name         | Type   | Description                                                                      |
| ------------ | ------ | -------------------------------------------------------------------------------- |
| `clientId`   | string | Limit to a specific client. Defaults to the caller's client when applicable.     |
| `status`     | string | Filter by child status (`RECEIVED`, `SETTLED`, `FAILED`, `EXPIRED`, `UNSETTLED`). |
| `dateFrom`   | string | ISO 8601 inclusive lower bound on `createdAt`.                                    |
| `dateTo`     | string | ISO 8601 inclusive upper bound on `createdAt`.                                    |
| `limit`      | int    | Page size. Default 50, max 500.                                                   |
| `offset`     | int    | Pagination offset.                                                                |

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

The shape matches `GET /payments` filtered to `type=REFUND`; use whichever feels more natural to your integration.

***

## Refund lifecycle

Each refund child transitions through:

1. `RECEIVED` — the refund request was accepted by the rail.
2. `CAPTURED` — the rail confirmed the reversal was submitted (when applicable).
3. `SETTLED` — the reversal has been reconciled. Terminal.

Failure paths land the child in `FAILED` (rejected) or `UNSETTLED` (received but unreconcilable).

## Guidance

* A `SETTLED` parent can have **multiple** refund children so long as the sum of their amounts does not exceed the parent's `totalAmount`.
* Use the aggregated summary from [`GET /payments/{id}/refunds`](payments.md#refunds) to size your next refund (`maxRefundable`).
* Partial refunds are honoured.
* To create a refund, use [`POST /payments/{id}/refund`](payments.md#refunds) on the parent.

## Webhook events

| Event                      | Fires when…                                |
| -------------------------- | ------------------------------------------ |
| `payment.refund.created`   | A refund child has been registered.        |
| `payment.refund.captured`  | The rail accepted the reversal request.    |
| `payment.refund.settled`   | The refund reached `SETTLED`.              |
| `payment.refund.failed`    | The refund was rejected by the rail.       |

All deliveries are at-least-once and carry the same payload shape as payment events, with `transaction.parentPaymentId` populated and `transaction.type == "REFUND"`. See [Webhooks](webhooks.md) for the envelope.
