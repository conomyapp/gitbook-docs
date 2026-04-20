# Payments

{% columns fullWidth="true" %}
{% column %}
Payments represent the intent and execution of moving funds from one or more origins to one or more destinations using a defined method.

Each payment moves through a lifecycle (created → authorized → captured → received → settled) that the platform drives automatically as the chosen rail reports back. You don't drive state transitions yourself — you react to them through webhooks.

See [Payment status](../../payments/transaction-status.md) for the complete state machine.

Use the Payments API to create payments, retrieve them, assign incoming push deposits, attach documentation for review, and link them to the customer they belong to. Refunds live under their own namespace — see [Refunds](refunds.md).
{% endcolumn %}

{% column %}
{% code title="Core endpoints" overflow="wrap" %}
```http
POST /payments
GET  /payments
GET  /payments/:id
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

## Core

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

***

## Assignment (push deposits)

Push deposits (CVU, PIX, …) arrive as pending-assignment payments: they're in `CREATED` with no destination `accountNumber` until your dashboard picks the destination account. See [Push deposits](../../payments/push-deposits.md) for the full lifecycle.

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
  "url": "https://documents.conomyhq.com/payments/69e25244.../source_of_funds/20260417T150000Z",
  "contentType": "application/pdf"
}
```

| Field         | Type   | Required | Description                                                                                                        |
| ------------- | ------ | :------: | ------------------------------------------------------------------------------------------------------------------ |
| `type`        | string |    ✓     | `kyc`, `source_of_funds`, `invoice`, `contract`, or `other`.                                                       |
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
    "url": "https://documents.conomyhq.com/...",
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
