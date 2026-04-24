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
description: Endpoints for creating, reading, updating, and documenting persistent customer records on conomy_hq.
---

# Customers

{% columns fullWidth="true" %}
{% column %}
A **Customer** is the persistent record representing the end user whose money moves through the platform. Customers live longer than any single payment and accumulate identity, contact, operation level, and documentation state across every transaction.

Customers are created in two ways:

* **Manually**, via `POST /customers` — typical when your operations team onboards a customer before their first payment.
* **Automatically**, when a topup arrives from a new originante. The platform creates a `BASIC`, `autoCreated: true` record so the payment can proceed. Promote the customer later via `PATCH /customers/{id}` and attach verified documents.

Customers are tenant-scoped: every endpoint requires a `clientId` so callers never see or mutate another tenant's records.

See [Compliance](../compliance/README.md) for how `operationLevel` and documentation drive the review gate.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST   /customers
GET    /customers
GET    /customers/:id
PATCH  /customers/:id

POST   /customers/:id/documents
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## Customer model

```json
{
  "id": "69e25243baa9fd9b463d6bac",
  "clientId": "your-client-id",
  "firstName": "Carlos",
  "lastName": "Nuevo",
  "email": "carlos.nuevo@example.com",
  "phoneNumber": "5491100000000",
  "phoneNumberPrefix": "+54",
  "documentNumber": "23111222331",
  "documentType": "CUIT",
  "country": "AR",
  "operationLevel": "BASIC",
  "autoCreated": true,
  "isDocumented": true,
  "documents": [
    {
      "type": "kyc",
      "url": "https://documents.conomyhq.com/customers/.../kyc/20260417T150000Z",
      "contentType": "image/jpeg",
      "status": "APPROVED",
      "uploadedAt": "2026-04-17T15:41:57Z"
    }
  ],
  "createdAt": "2026-04-17T15:30:00Z",
  "updatedAt": "2026-04-17T15:42:10Z"
}
```

### `operationLevel`

Transactional tier. Amount limits per level are configured server-side through the rules engine. See [Customer operation levels](../compliance/operation-levels.md) for the full reference.

| Level | Typical use |
| --- | --- |
| `INACTIVE` | Blocked. Any new payment attempt is rejected. |
| `BASIC` | Default for auto-created customers. Conservative amount limits. |
| `STANDARD` | Customer has basic documentation approved. |
| `FULL` | Fully documented. Review gate bypassed on every future transaction. |

### `documents`

An array of document descriptors. Each document transitions through:

```
PENDING_UPLOAD  →  UPLOADED  →  APPROVED | REJECTED
```

A customer is considered **documented** (`isDocumented: true`) as soon as at least one document reaches `APPROVED`. See [Supported documents](../compliance/supported-documents.md) for accepted document types.

### Tenant scope

`clientId` is required on every endpoint. Cross-tenant reads return `404 Not Found` instead of `403` to avoid leaking record existence.

***

## `POST /customers`

Creates a customer.

**Query parameters**

| Name | Type | Required | Description |
| --- | --- | :---: | --- |
| `clientId` | string | ✓ | Tenant scope. |

**Body**

```json
{
  "firstName": "Ana",
  "lastName": "García",
  "email": "ana.garcia@example.com",
  "phoneNumber": "5491122334455",
  "phoneNumberPrefix": "+54",
  "documentNumber": "27987654321",
  "documentType": "CUIT",
  "country": "AR",
  "operationLevel": "BASIC"
}
```

Minimum required fields: `clientId` (from query) **and** at least one of `documentNumber` or `email`. `operationLevel` defaults to `BASIC` when omitted.

**Response** `201 Created` — the persisted customer.

***

## `GET /customers`

Lists tenant-scoped customers.

**Query parameters**

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | **Required.** Tenant scope. |
| `documentNumber` | string | Exact match — useful for CUIT lookups. |
| `email` | string | Exact match. |
| `operationLevel` | string | Filter by tier. |
| `count` | int | Page size. Default 50, max 500. |
| `offset` | int | Pagination offset. |

**Response** `200 OK`

```json
{
  "count": 2,
  "customers": [ ... ]
}
```

***

## `GET /customers/{id}`

Retrieves a single customer. Returns `404 Not Found` if the customer does not exist or belongs to another client.

**Query parameters**

| Name | Type | Required | Description |
| --- | --- | :---: | --- |
| `clientId` | string | ✓ | Tenant scope. |

**Response** `200 OK` — the customer record.

***

## `PATCH /customers/{id}`

Applies a partial update (JSON-merge-patch semantics).

**Body**

Any subset of the mutable fields. Fields not present in the body keep their current value. `clientId` is immutable.

```json
{
  "operationLevel": "STANDARD",
  "phoneNumber": "5491199999999"
}
```

**Response** `200 OK` — the merged customer.

Typical uses:

* **Promote tier** — `{"operationLevel":"STANDARD"}` after KYC approval.
* **Block operations** — `{"operationLevel":"INACTIVE"}` to freeze the customer.
* **Fill in missing contact data** on an `autoCreated` record.

***

## `POST /customers/{id}/documents`

Registers a new document on the customer.

**Body**

```json
{
  "type": "kyc",
  "url": "https://documents.conomyhq.com/customers/.../kyc/20260417T150000Z",
  "contentType": "image/jpeg"
}
```

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `type` | string | ✓ | Document type. See [Supported documents](../compliance/supported-documents.md). |
| `url` | string | | Canonical storage URL. When omitted, the document is registered in `PENDING_UPLOAD`. |
| `contentType` | string | | MIME type. |

**Response** `201 Created`

```json
{
  "customerId": "69e25243baa9fd9b463d6bac",
  "document": {
    "type": "kyc",
    "url": "https://documents.conomyhq.com/...",
    "contentType": "image/jpeg",
    "uploadedAt": "2026-04-17T15:41:57Z",
    "status": "UPLOADED"
  },
  "isDocumented": false
}
```

`isDocumented` reflects the customer's state after the mutation. It flips to `true` once at least one document reaches `APPROVED`.

***

## Webhook events

| Event | Fires when |
| --- | --- |
| `customer.levelChanged` | The customer transitions from "not documented" to "documented" — i.e. the first document reaches `APPROVED`. |

The payload carries:

```json
{
  "eventType": "customer.levelChanged",
  "timestamp": "2026-04-17T15:42:10Z",
  "customer": {
    "id": "69e25243baa9fd9b463d6bac",
    "clientId": "your-client-id",
    "firstName": "Carlos",
    "lastName": "Nuevo",
    "documentNumber": "23111222331",
    "operationLevel": "BASIC",
    "autoCreated": true,
    "documentsCount": 1
  }
}
```

Document URLs are never included in the webhook payload — only the count.
