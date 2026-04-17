# Customers

{% columns fullWidth="true" %}
{% column %}
A **Customer** is the persistent record representing the end-user whose money is moving through the platform. Customers live longer than any single payment and accumulate identity, contact, operation-level and documentation state across all their transactions.

Customers are created in two ways:

* **Manually**, via `POST /customers` — typical when your operations team onboards a customer ahead of their first payment.
* **Automatically**, when a CVU deposit arrives from a new originante (CUIT). The platform creates a `BASIC`, `autoCreated=true` record so the deposit can be processed without human involvement. Your operations team can later promote the customer via `PATCH /customers/{id}` and attach verified documents.

Customers are tenant-scoped: every endpoint below requires a `clientId` so the API can enforce that callers never see or mutate another tenant's data.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST   /customers
GET    /customers
GET    /customers/:id
PATCH  /customers/:id

POST   /customers/:id/documents
POST   /customers/:id/documents/presign
POST   /customers/:id/documents/:index/approve
POST   /customers/:id/documents/:index/reject
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
  "documents": [
    {
      "type": "id_front",
      "url": "https://documents.conomyhq.com/customers/.../id_front/20260417T150000Z",
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

Transactional tier. Limits per level are configured server-side through the rules engine.

| Level       | Typical use                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `INACTIVE`  | Blocked. Any new payment attempt is rejected.                            |
| `BASIC`     | Default for auto-created customers. Conservative amount limits.          |
| `STANDARD`  | Customer provided basic KYC.                                             |
| `FULL`      | Fully documented. Highest limits.                                        |

### `documents`

An array of `Document` descriptors. Each document has its own lifecycle:

```
PENDING_UPLOAD  →  UPLOADED  →  SENT  →  APPROVED | REJECTED
```

A customer is considered **documented** (and therefore eligible for `REQUIRES_REVIEW` bypass) the moment at least one document reaches `APPROVED`.

Documents attached to a customer are addressed by their 0-based position in the array — `index` — when approving or rejecting.

### Identity-hierarchy scope (tenant)

`clientId` is **required** on every endpoint below. Cross-tenant reads return `404 Not Found` instead of `403` to avoid leaking record existence.

***

## `POST /customers`

Creates a customer.

**Query parameters**

| Name       | Type   | Required | Description          |
| ---------- | ------ | :------: | -------------------- |
| `clientId` | string |    ✓     | Tenant scope.        |

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

| Name             | Type   | Description                                           |
| ---------------- | ------ | ----------------------------------------------------- |
| `clientId`       | string | **Required.** Tenant scope.                           |
| `documentNumber` | string | Exact match — useful for CUIT lookups.                |
| `email`          | string | Exact match.                                          |
| `operationLevel` | string | Filter by tier.                                       |
| `count`          | int    | Page size. Default 50, max 500.                       |
| `offset`         | int    | Pagination offset.                                    |

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

| Name       | Type   | Required | Description   |
| ---------- | ------ | :------: | ------------- |
| `clientId` | string |    ✓     | Tenant scope. |

**Response** `200 OK` — the customer record.

***

## `PATCH /customers/{id}`

Applies a partial update (JSON-merge-patch semantics).

**Body**

Any subset of the mutable fields. Fields not present in the body keep their current value. `clientId` is immutable and cannot be changed.

```json
{
  "operationLevel": "STANDARD",
  "phoneNumber": "5491199999999"
}
```

**Response** `200 OK` — the merged customer.

Typical uses:

* **Promote tier** — `{"operationLevel":"STANDARD"}` after KYC.
* **Block operations** — `{"operationLevel":"INACTIVE"}` to freeze the customer.
* **Fill in missing contact data** on an `autoCreated` record.

***

## Document management

Every customer owns a list of `Document` entries. These endpoints drive the lifecycle.

### `POST /customers/{id}/documents`

Registers a new document on the customer.

**Body**

```json
{
  "type": "id_front",
  "url": "https://documents.conomyhq.com/customers/.../id_front/20260417T150000Z",
  "contentType": "image/jpeg"
}
```

| Field         | Type   | Required | Description                                                                                                   |
| ------------- | ------ | :------: | ------------------------------------------------------------------------------------------------------------- |
| `type`        | string |    ✓     | Free-form tag (`id_front`, `id_back`, `proof_of_address`, `source_of_funds`, …).                               |
| `url`         | string |          | Canonical storage URL, typically returned by `documents/presign`. When omitted, document is `PENDING_UPLOAD`. |
| `contentType` | string |          | MIME type.                                                                                                    |

**Response** `201 Created`

```json
{
  "customerId": "69e25243baa9fd9b463d6bac",
  "document": {
    "type": "id_front",
    "url": "https://documents.conomyhq.com/...",
    "contentType": "image/jpeg",
    "uploadedAt": "2026-04-17T15:41:57Z",
    "status": "UPLOADED"
  },
  "documented": false
}
```

`documented` reflects `IsDocumented()` after the mutation — it flips to `true` as soon as at least one document reaches `APPROVED` (see approve below).

### `POST /customers/{id}/documents/presign`

Requests a presigned upload descriptor so the client can upload directly to the document bucket.

**Body**

```json
{ "type": "id_front", "contentType": "image/jpeg" }
```

**Response** `200 OK`

```json
{
  "url": "https://documents.conomyhq.com/",
  "fields": {
    "Content-Type": "image/jpeg",
    "key": "customers/69e25243.../id_front/20260417T150000Z"
  },
  "canonicalUrl": "https://documents.conomyhq.com/customers/69e25243.../id_front/20260417T150000Z",
  "expiresAt": "2026-04-17T15:57:32Z"
}
```

**Client flow**

1. `POST /customers/{id}/documents/presign` → receive descriptor.
2. `POST` multipart-form to `url` with the `fields` entries and the file bytes under `file`.
3. Call `POST /customers/{id}/documents` with `url=canonicalUrl` to register the document.

### `POST /customers/{id}/documents/{index}/approve`

Approves the document at position `index`. Flips its status to `APPROVED` and, if the customer was not already `IsDocumented()`, fires a `customer.levelChanged` webhook.

**Response** `200 OK` — the updated customer record.

### `POST /customers/{id}/documents/{index}/reject`

Rejects the document at position `index`. Requires a `reason`.

**Body**

```json
{ "reason": "Document is illegible" }
```

**Response** `200 OK` — the updated customer record. The document's `status` flips to `REJECTED` and `rejectionReason` is populated for audit.

***

## Webhook events

| Event                    | Fires when…                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `customer.levelChanged`  | The customer flipped from "not documented" to "documented" (first `APPROVED` doc). |

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
