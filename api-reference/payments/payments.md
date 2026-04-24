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
description: Create payments, retrieve them, refund them, assign unassigned balances, attach review documents, and resolve the customer.
---

# Payments

{% columns fullWidth="true" %}
{% column %}
Payments represent the intent and execution of moving funds from one or more origins to one or more destinations. Every payment progresses through a lifecycle of statuses (see [Payment status](../../payments/transaction-status.md)).

Use the Payments API to create payments, list or retrieve them, issue refunds, assign unassigned balances to an account, attach compliance documentation, and resolve the persistent customer record tied to the payment.
{% endcolumn %}

{% column %}
{% code title="Lifecycle endpoints" overflow="wrap" %}
```http
GET  /payments
GET  /payments/:id
POST /payments
POST /payments/:id/authorized
POST /payments/:id/captured
POST /payments/received
```
{% endcode %}

{% code title="Refunds" overflow="wrap" %}
```http
POST /payments/:id/refund
GET  /payments/:id/refund
```
{% endcode %}

{% code title="Unassigned balance" overflow="wrap" %}
```http
POST /payments/:id/assign
```
{% endcode %}

{% code title="Review documents" overflow="wrap" %}
```http
POST /payments/:id/documents
```
{% endcode %}

{% code title="Customer link" overflow="wrap" %}
```http
GET  /payments/:id/customer
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## Lifecycle

{% openapi-operation spec="conomyhq-api" path="/payments" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/authorized" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/captured" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/received" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

***

## Refunds

Refunds are issued as **child transactions** linked to the parent via `parentPaymentId`. See [Refunds](refunds.md) for the full guide.

### `POST /payments/{id}/refund`

Creates a refund on a `SETTLED` parent. Supports partial refunds.

**Path parameters**

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Parent payment id. |

**Body**

```json
{
  "amount": "150.00",
  "reason": "Client requested partial refund"
}
```

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `amount` | string | | Positive decimal. When omitted, refunds the full remaining refundable balance (parent total minus active refunds). |
| `reason` | string | | Free-text. Stored on the refund child's description for audit. |

**Response** `201 Created`

```json
{
  "refundId": "69e25383b604159c5b8ba5bb",
  "parentPaymentId": "69e0df45b604159c5b8ba5a9",
  "status": "RECEIVED",
  "totalAmount": "150.00",
  "currency": "ARS",
  "createdAt": "2026-04-17T14:37:44Z"
}
```

**Errors**

| HTTP | Meaning |
| :---: | --- |
| 404 | Parent payment not found. |
| 422 | Parent is not in `SETTLED`, or the requested amount exceeds the remaining refundable. |

The parent payment stays in `SETTLED` regardless of how many refunds are issued. Watch your webhooks for `payment.refund.created` and `payment.refund.settled`.

### `GET /payments/{id}/refund`

Returns the list of refund children plus an aggregated summary.

**Response** `200 OK`

```json
{
  "parentId": "69e0df45b604159c5b8ba5a9",
  "refunds": [
    {
      "id": "69e25383b604159c5b8ba5bb",
      "status": "RECEIVED",
      "totalAmount": "150.00",
      "currency": "ARS",
      "parentPaymentId": "69e0df45b604159c5b8ba5a9",
      "createdAt": "2026-04-17T14:37:44Z"
    }
  ],
  "summary": {
    "parentPaymentId": "69e0df45b604159c5b8ba5a9",
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

| Bucket | Includes children in status |
| --- | --- |
| `totalRefunded` | `SETTLED` |
| `totalInProgress` | `CREATED`, `AUTHORIZED`, `CAPTURED`, `RECEIVED` |
| `totalFailed` | `FAILED`, `EXPIRED`, `UNSETTLED` |

`maxRefundable` = `parentAmount` − (`totalRefunded` + `totalInProgress`). Use it to size your next refund.

***

## Assign an unassigned balance

When a topup arrives without a destination account (see [Unassigned balances](../balances.md)), the payment sits in `CREATED` until an account is assigned. Use this endpoint to reconcile the payment against one of your accounts.

### `POST /payments/{id}/assign`

**Path parameters**

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | Payment id of the unassigned topup. |

**Body**

```json
{
  "accountNumber": "17733420419010021326597",
  "expectedAmount": "10000.00"
}
```

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `accountNumber` | string | ✓ | Destination account number. Must belong to the same client. |
| `expectedAmount` | string | | Expected amount for reconciliation. When supplied, drives amount classification (`UNDERPAID` / `OVERPAID`) and spawns a companion child transaction for the difference. When omitted, the topup is treated as `PAID`. |

**Response** `200 OK`

```json
{
  "paymentId": "69e25246baa9fd9b463d6baf",
  "accountNumber": "17733420419010021326597",
  "status": "SETTLED",
  "reconciliationStatus": "PAID",
  "settledAt": "2026-04-17T15:00:00Z",
  "totalAmount": "10000.00",
  "currency": "ARS"
}
```

**Response** `200 OK` — underpaid / overpaid case

When `expectedAmount` does not match the received amount, the response includes a `childPaymentId` pointing at the companion transaction that captures the difference:

```json
{
  "paymentId": "69e25246baa9fd9b463d6baf",
  "accountNumber": "17733420419010021326597",
  "status": "SETTLED",
  "reconciliationStatus": "UNDERPAID",
  "settledAt": "2026-04-17T15:00:00Z",
  "totalAmount": "7500.00",
  "currency": "ARS",
  "relatedPaymentId": "69e25247baa9fd9b463d6bb0",
  "childPaymentId": "69e25247baa9fd9b463d6bb0"
}
```

See [Amount reconciliation](../../payments/transaction-status.md#amount-reconciliation) for how the platform classifies the delta.

**Errors**

| HTTP | Meaning |
| :---: | --- |
| 404 | Payment not found, or the `accountNumber` does not belong to the caller's client. |
| 422 | Payment is not in `CREATED` — already assigned, expired, or in another terminal state. |

**Webhook fired:** `payment.settled` (plus `purchase.underpaid` / `purchase.overpaid` when applicable).

***

## Attach a review document

When a payment is in `REQUIRES_REVIEW` and `documentationStatus` is `PENDING_UPLOAD`, attach a document to resume the lifecycle. See [Review flow](../../compliance/review-flow.md) for the end-to-end compliance flow.

### `POST /payments/{id}/documents`

**Body**

```json
{
  "type": "source_of_funds",
  "url": "https://documents.conomyhq.com/payments/.../source_of_funds/file.pdf",
  "contentType": "application/pdf"
}
```

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `type` | string | ✓ | Document type. See [Supported documents](../../compliance/supported-documents.md). |
| `url` | string | | Canonical storage URL. When omitted, the document is stored in `PENDING_UPLOAD`. |
| `contentType` | string | | MIME type. |

**Response** `201 Created`

```json
{
  "paymentId": "69e25244baa9fd9b463d6bad",
  "status": "REQUIRES_REVIEW",
  "documentationStatus": "UPLOADED",
  "document": {
    "type": "source_of_funds",
    "url": "https://documents.conomyhq.com/...",
    "contentType": "application/pdf",
    "uploadedAt": "2026-04-17T15:34:23Z",
    "status": "UPLOADED"
  }
}
```

***

## Customer link

### `GET /payments/{id}/customer`

Returns the persistent [`Customer`](../customers.md) record bound to the payment.

**Response** `200 OK`

```json
{
  "paymentId": "69e25244baa9fd9b463d6bad",
  "attached": true,
  "customer": {
    "id": "69e25243baa9fd9b463d6bac",
    "clientId": "your-client-id",
    "firstName": "Carlos",
    "lastName": "Nuevo",
    "documentNumber": "23111222331",
    "operationLevel": "BASIC",
    "autoCreated": true,
    "documents": []
  }
}
```

`attached: false` is returned for legacy payments that do not carry a persistent customer reference. In that case, fall back to the payment's embedded customer snapshot.
