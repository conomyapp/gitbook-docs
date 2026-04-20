# Payments

{% columns fullWidth="true" %}
{% column %}
Payments represent the intent and execution of moving funds from one or more origins to one or more destinations using a defined method.

Each payment moves through a lifecycle that may include optional authorization, review, and capture stages before final confirmation by the payment provider. Payments are linked to prior attempts and become the definitive execution step once initiated.

A payment can be authorized (reserved but not yet charged), flagged for documentation review, captured (confirmed for collection), and marked as received when the provider notifies that the payment was successful. Final reconciliation (settled) occurs in a separate stage.

See [Payment status](../../payments/transaction-status.md) for the complete state machine.

Use the Payments API to create payments, retrieve them, refund them, transition them through their lifecycle, attach documentation, and link them to the customer they belong to.
{% endcolumn %}

{% column %}
{% code title="Lifecycle endpoints" overflow="wrap" %}
```http
GET  /payments
GET  /payments/:id
POST /payments
POST /payments/:id/authorized
POST /payments/:id/captured
POST /payments/:id/received
```
{% endcode %}

{% code title="Refunds" overflow="wrap" %}
```http
POST /payments/:id/refund
GET  /payments/:id/refunds
```
{% endcode %}

{% code title="Assignment (push deposits)" overflow="wrap" %}
```http
POST /payments/:id/assign
```
{% endcode %}

{% code title="Review documents" overflow="wrap" %}
```http
POST /payments/:id/documents
POST /payments/:id/documents/presign
```
{% endcode %}

{% code title="Customer link" overflow="wrap" %}
```http
GET /payments/:id/customer
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

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| `id` | string | Parent payment id (ObjectId) |

**Body**

```json
{
  "amount": "150.00",
  "reason": "Client requested partial refund"
}
```

| Field    | Type   | Required | Description                                                                                                             |
| -------- | ------ | :------: | ----------------------------------------------------------------------------------------------------------------------- |
| `amount` | string |          | Positive decimal. When omitted, refunds the full remaining refundable balance (parent total minus active refunds).       |
| `reason` | string |          | Free-text. Stored on the refund child's description for audit.                                                          |

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

| HTTP | Meaning                                                                                 |
| :--: | --------------------------------------------------------------------------------------- |
|  404 | Parent payment not found.                                                               |
|  422 | Parent is not in `SETTLED`, or the requested amount exceeds the remaining refundable.   |

The parent payment stays in `SETTLED` regardless of how many refunds are issued. Watch your webhooks for `payment.refund.created` and `payment.refund.settled`.

### `GET /payments/{id}/refunds`

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

| Bucket            | Includes children in status                  |
| ----------------- | -------------------------------------------- |
| `totalRefunded`   | `SETTLED`                                    |
| `totalInProgress` | `CREATED`, `AUTHORIZED`, `CAPTURED`, `RECEIVED` |
| `totalFailed`     | `FAILED`, `EXPIRED`, `UNSETTLED`             |

`maxRefundable` = `parentAmount` − (`totalRefunded` + `totalInProgress`). Use it to size your next refund.

***

## Assignment (push deposits)

Push deposits (CVU, PIX, …) arrive as pending-assignment payments: they're in `CREATED` with no destination `accountNumber` until an operator picks the destination account. See [Push deposits](../../payments/push-deposits.md) for the full lifecycle.

### `POST /payments/{id}/assign`

Assigns the pending deposit to one of the client's accounts and reconciles by amount.

**Body**

```json
{
  "accountId": "69b30d599e252a224cfe6bd7",
  "expectedAmount": "10000.00"
}
```

| Field            | Type   | Required | Description                                                                                                                                 |
| ---------------- | ------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`      | string |    ✓     | Destination account id (must belong to the same client).                                                                                    |
| `expectedAmount` | string |          | If supplied, drives amount classification (`UNDERPAID` / `OVERPAID`) and spawns a companion child transaction for the difference. If omitted, the deposit is treated as `PAID`. |

**Response** `200 OK`

```json
{
  "paymentId": "69e25246baa9fd9b463d6baf",
  "accountId": "69b30d599e252a224cfe6bd7",
  "status": "SETTLED",
  "reconciliationStatus": "UNDERPAID",
  "settledAt": "2026-04-17T15:00:00Z",
  "relatedPaymentId": "69e25247baa9fd9b463d6bb0",
  "childPaymentId": "69e25247baa9fd9b463d6bb0"
}
```

When `reconciliationStatus` is `UNDERPAID` or `OVERPAID`, `childPaymentId` points at the companion transaction that captures the difference. See [Amount reconciliation](../../payments/transaction-status.md#amount-reconciliation).

***

## Review documents

Some payments land in `REQUIRES_REVIEW` when the amount exceeds a configured threshold for a non-documented customer. See [Review flow](../../payments/review-flow.md) for the full guide. The endpoints below let your frontend attach the required documents while the payment is in review.

### `POST /payments/{id}/documents`

Attaches a document descriptor to a `REQUIRES_REVIEW` payment.

**Body**

```json
{
  "type": "source_of_funds",
  "url": "https://documents.stub.local/payments/69e25244.../source_of_funds/20260417T150000Z",
  "contentType": "application/pdf"
}
```

| Field         | Type   | Required | Description                                                                                                        |
| ------------- | ------ | :------: | ------------------------------------------------------------------------------------------------------------------ |
| `type`        | string |    ✓     | Free-form tag (`source_of_funds`, `id_front`, `id_back`, `bank_statement`, …). Used for key generation and audit.   |
| `url`         | string |          | Canonical storage URL (typically the `canonicalUrl` returned by `documents/presign`). When omitted, the document is stored in `PENDING_UPLOAD`. |
| `contentType` | string |          | MIME type captured at upload.                                                                                      |

**Response** `201 Created`

```json
{
  "paymentId": "69e25244baa9fd9b463d6bad",
  "status": "REQUIRES_REVIEW",
  "documentationStatus": "UPLOADED",
  "document": {
    "type": "source_of_funds",
    "url": "https://documents.stub.local/...",
    "contentType": "application/pdf",
    "uploadedAt": "2026-04-17T15:34:23Z",
    "status": "UPLOADED"
  }
}
```

### `POST /payments/{id}/documents/presign`

Requests a presigned upload descriptor so your client can upload the file directly to the document bucket without streaming it through the API.

**Body**

```json
{ "type": "source_of_funds", "contentType": "application/pdf" }
```

**Response** `200 OK`

```json
{
  "url": "https://documents.conomyhq.com/",
  "fields": {
    "Content-Type": "application/pdf",
    "key": "payments/69e25244baa9fd9b463d6bad/source_of_funds/20260417T150000Z"
  },
  "canonicalUrl": "https://documents.conomyhq.com/payments/69e25244.../source_of_funds/20260417T150000Z",
  "expiresAt": "2026-04-17T15:15:00Z"
}
```

**Client flow**

1. `POST /payments/{id}/documents/presign` → get the descriptor.
2. `POST` multipart-form-data to `url` with the `fields` as form fields and the file bytes under `file`.
3. On `204`, call `POST /payments/{id}/documents` with `url=canonicalUrl` to register the document.

Once the documents are attached, the review outcome is notified to your webhook endpoint — `payment.reviewApproved` moves the payment back to `CAPTURED` and resumes the lifecycle, `payment.reviewRejected` drops it to `FAILED` (and, for push deposits, automatically spawns a refund child so the funds flow back to the sender).

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
    "documents": [...]
  }
}
```

`attached=false` is returned for legacy payments (pre-release) that don't carry a persistent customer reference. In that case, fall back to the payment's embedded customer snapshot.
