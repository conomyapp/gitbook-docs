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
description: Error response format and full list of internal error codes returned by the conomy_hq API.
---

# Errors

Every non-2xx response from the conomy_hq API returns a structured error body. The same shape is returned across all endpoints so your integration can handle failures uniformly.

---

## Error response format

```json
{
  "status": 400,
  "code": "11",
  "type": "invalidParam",
  "detail": "accountNumber is required",
  "traceId": "5f8f2a8e-4b7c-4a1e-8d3f-1234567890ab"
}
```

| Field | Type | Description |
| --- | --- | --- |
| `status` | integer | HTTP status code. |
| `code` | string | Internal error code — a stable, machine-readable identifier. |
| `type` | string | Short, stable tag describing the error category. |
| `detail` | string | Human-readable explanation. Safe to surface in logs. |
| `traceId` | string | UUID that correlates this error with server logs. Include it in any support request. |

Branch on `code` or `type` in your integration — both are stable. Do not parse `detail`; its wording can change.

---

## Error codes

| `code` | `type` | HTTP | When it fires |
| --- | --- | :---: | --- |
| `01` | `serverError` | 500 | Unexpected internal error. Retry after a backoff; if persistent, contact support with the `traceId`. |
| `02` | `unknown` | 500 | Unclassified error. Treat as a retriable server error. |
| `11` | `invalidParam` | 400 | A request parameter failed validation (wrong shape, bad value). |
| `12` | `missingParam` | 400 | A required parameter was omitted. |
| `13` | `alreadyExist` | 409 | The resource already exists — typical on create with a conflicting unique key. |
| `14` | `parsingResource` | 400 | The request body could not be parsed. |
| `21` | `failedPrecondition` | 422 | The request is well-formed but the resource is not in a state that allows the operation (e.g. resolving a non-`REQUIRES_REVIEW` payment). |
| `31` | `notFound` | 404 | The resource does not exist or is out of scope for the caller. |
| `32` | `tooManyRequests` | 429 | Rate limit exceeded. Back off and retry. |
| `41` | `unauthorized` | 401 | Missing or invalid authentication. |
| `42` | `unimplemented` | 501 | The operation is not supported on this endpoint or environment. |
| `43` | `forbiddenOperation` | 403 | The caller is authenticated but not authorized to perform the operation. |

---

## Handling errors

* **4xx errors** are caused by the request. Fix the request before retrying — retrying without changes will fail again with the same code.
* **5xx errors** are server-side. Retry with exponential backoff: start at 1 second, double on each attempt, cap at 32 seconds, give up after 5 attempts. If the error persists, open a support ticket with the `traceId`.
* **`21 failedPrecondition`** is the most common business error. It means the request is well-formed but the resource is in the wrong state (e.g. assigning a payment that is already `SETTLED`). Read the current state of the resource before retrying.
* **`13 alreadyExist`** usually indicates a previous attempt succeeded. Query the resource before creating a duplicate.

## Forward compatibility

Build your integration to be tolerant of additive change:

* **Unknown fields in responses** — ignore them. New fields may be added at any time without a major version bump.
* **New `eventType` values on webhooks** — handle defensively. Treat unknown event types as no-ops or log them; do not error.
* **New error codes** — branch on `code` ranges (`1x`, `2x`, `3x`, `4x`) when possible so a new code in an existing family inherits the right handling by default.

---

## Cross-tenant isolation

When a resource exists but belongs to a different tenant, the API returns `404 Not Found` — not `403 Forbidden` — to avoid leaking record existence. Treat `404` as "does not exist for you."

---

## Getting support

When opening a support request, include:

1. The `traceId` from the error response.
2. The HTTP method and path of the failing request.
3. The UTC timestamp of the failure.

Send to [hola@conomyhq.com](mailto:hola@conomyhq.com).
