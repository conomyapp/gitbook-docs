# Refunds

{% columns fullWidth="true" %}
{% column %}
Refunds reverse a settled payment, sending the funds back to the original sender. They are modelled as **child transactions** linked to the parent via `parentPaymentId`: the parent stays in `SETTLED` regardless of how many refunds are issued — the full history lives on the children.

This namespace is the single entry point for refund operations: creating new refunds, listing them across the tenant, filtering by parent, and reading individual records.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /refunds
GET  /refunds
GET  /refunds/:id
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## `POST /refunds`

Creates a refund against a `SETTLED` parent payment. Supports partial refunds.

**Body**

```json
{
  "parentPaymentId": "69e0df45b604159c5b8ba5a9",
  "amount": "150.00",
  "reason": "Client requested partial refund"
}
```

| Field             | Type   | Required | Description                                                                                                       |
| ----------------- | ------ | :------: | ----------------------------------------------------------------------------------------------------------------- |
| `parentPaymentId` | string |    ✓     | Id of the `SETTLED` payment being refunded.                                                                        |
| `amount`          | string |          | Positive decimal. When omitted, refunds the full remaining refundable balance (parent total minus active refunds). |
| `reason`          | string |          | Free-text. Stored on the refund child for audit.                                                                  |

**Response** `201 Created`

```json
{
  "id": "69e25383b604159c5b8ba5bb",
  "parentPaymentId": "69e0df45b604159c5b8ba5a9",
  "status": "RECEIVED",
  "totalAmount": "150.00",
  "currency": "ARS",
  "createdAt": "2026-04-17T14:37:44Z"
}
```

**Errors**

| HTTP | Meaning                                                                                |
| :--: | -------------------------------------------------------------------------------------- |
|  404 | Parent payment not found.                                                              |
|  422 | Parent is not in `SETTLED`, or the requested amount exceeds the remaining refundable.  |

The parent stays in `SETTLED` and can receive further refunds while the sum does not exceed its `totalAmount`.

***

## `GET /refunds`

Returns a paginated list of refund children. Scope it to a single parent with `parentPaymentId`, or run tenant-wide queries for reporting.

**Query parameters**

| Name              | Type   | Description                                                                                  |
| ----------------- | ------ | -------------------------------------------------------------------------------------------- |
| `parentPaymentId` | string | Limit to refunds of a single parent payment. Also returns the aggregated `summary` block.    |
| `clientId`        | string | Limit to a specific client. Defaults to the caller's client when applicable.                 |
| `status`          | string | Filter by child status (`RECEIVED`, `SETTLED`, `FAILED`, `EXPIRED`, `UNSETTLED`).             |
| `dateFrom`        | string | ISO 8601 inclusive lower bound on `createdAt`.                                                |
| `dateTo`          | string | ISO 8601 inclusive upper bound on `createdAt`.                                                |
| `limit`           | int    | Page size. Default 50, max 500.                                                               |
| `offset`          | int    | Pagination offset.                                                                            |

**Response** `200 OK` — tenant-wide

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

**Response** `200 OK` — with `parentPaymentId` filter (adds aggregated summary)

```json
{
  "parentPaymentId": "69e0df45b604159c5b8ba5a9",
  "total": 1,
  "refunds": [
    {
      "id": "69e25383b604159c5b8ba5bb",
      "parentPaymentId": "69e0df45b604159c5b8ba5a9",
      "status": "RECEIVED",
      "totalAmount": "150.00",
      "currency": "ARS",
      "createdAt": "2026-04-17T14:37:44Z"
    }
  ],
  "summary": {
    "parentAmount": "2000.00",
    "currency": "ARS",
    "totalRefunded": "0",
    "totalInProgress": "150.00",
    "totalFailed": "0",
    "maxRefundable": "1850.00",
    "completedCount": 0,
    "inProgressCount": 1,
    "failedCount": 0
  }
}
```

| Bucket            | Includes children in status                       |
| ----------------- | ------------------------------------------------- |
| `totalRefunded`   | `SETTLED`                                         |
| `totalInProgress` | `CREATED`, `AUTHORIZED`, `CAPTURED`, `RECEIVED`   |
| `totalFailed`     | `FAILED`, `EXPIRED`, `UNSETTLED`                  |

`maxRefundable` = `parentAmount` − (`totalRefunded` + `totalInProgress`). Use it to size your next refund.

***

## `GET /refunds/{id}`

Returns a single refund child.

**Response** `200 OK`

```json
{
  "id": "69e25383b604159c5b8ba5bb",
  "parentPaymentId": "69e0df45b604159c5b8ba5a9",
  "status": "SETTLED",
  "totalAmount": "150.00",
  "currency": "ARS",
  "description": "Client requested partial refund",
  "createdAt": "2026-04-17T14:37:44Z",
  "settledAt": "2026-04-17T14:40:12Z"
}
```

***

## Lifecycle

Each refund child transitions through:

1. `RECEIVED` — the refund request was accepted by the rail.
2. `CAPTURED` — the rail confirmed the reversal was submitted (when applicable).
3. `SETTLED` — the reversal has been reconciled. Terminal.

Failure paths land the child in `FAILED` (rejected) or `UNSETTLED` (received but unreconcilable).

## Webhook events

| Event                      | Fires when…                                |
| -------------------------- | ------------------------------------------ |
| `payment.refund.created`   | A refund child has been registered.        |
| `payment.refund.captured`  | The rail accepted the reversal request.    |
| `payment.refund.settled`   | The refund reached `SETTLED`.              |
| `payment.refund.failed`    | The refund was rejected by the rail.       |

All deliveries are at-least-once and carry the same payload shape as payment events, with `transaction.parentPaymentId` populated and `transaction.type == "REFUND"`. See [Webhooks](webhooks.md) for the envelope.
