---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
---

# Review flow (`REQUIRES_REVIEW`)

Some payments need documentation review before the platform can capture them. The `REQUIRES_REVIEW` state is the gate: a payment sits there until an operator decides to approve or reject it.

This guide walks the whole flow from the integrator's point of view — what triggers a review, what documents to attach, and how to resolve the case.

## When a payment enters `REQUIRES_REVIEW`

A payment lands in review when **any** of the following apply, after it reaches `AUTHORIZED` / `CAPTURED`:

1. The amount is above the configured per-currency threshold for a customer that is not yet documented (`IsDocumented() == false`).
2. The rules engine matches a policy rule configured for your client (flagged document number, vertical-specific override, …).

If the underlying customer is already documented (at least one `APPROVED` document), the review gate is **bypassed** automatically and the payment transitions straight to `CAPTURED`. No action required on your side.

When a review is required, the platform fires a `payment.requiresReview` webhook so your dashboard can react immediately.

## Operator decision: approve or reject

Once the payment is in `REQUIRES_REVIEW`, only two things move it forward:

* When the review is resolved with `decision=APPROVED` → payment transitions back to `CAPTURED`. Every attached document is flipped to `APPROVED`. Your endpoint receives `payment.reviewApproved`.
* When the review is resolved with `decision=REJECTED` → payment transitions to `FAILED`. Balance reservations are reversed. Every attached document is flipped to `REJECTED` with the supplied reason. Your endpoint receives `payment.reviewRejected`. For pending push deposits (CVU, PIX, …), the rejection also spawns a child `REFUND` transaction automatically so the funds flow back to the sender before the parent is marked `FAILED`.

Both outcomes also fire the umbrella `payment.reviewResolved` event for consumers that don't branch on the decision.

## Uploading documents

Two supported upload styles. Pick whichever fits your frontend best:

### Direct attach (server knows the URL)

Register a document associated with the payment — either for **KYC** (identification of the originator during review) **or as a proof of source of funds** (`source_of_funds`) required by vertical-specific regulations. The endpoint also accepts auxiliary documents such as invoices or contracts that back the payment.

Supported values for `type`:

| Value             | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `kyc`             | Identity document for the originator (passport, DNI, etc.).              |
| `source_of_funds` | Proof of source of funds required by regulated verticals.                |
| `invoice`         | Invoice or billing document backing the payment.                         |
| `contract`        | Signed contract or agreement tied to the payment.                        |
| `other`           | Any other supporting evidence that doesn't fit the categories above.     |

When you already have the document stored somewhere accessible to the platform (an internal KYC provider, a pre-existing S3 object), register it in one call:

```http
POST /payments/{id}/documents
Content-Type: application/json

{
  "type": "source_of_funds",
  "url": "https://documents.conomyhq.com/payments/.../source_of_funds/20260417T150000Z",
  "contentType": "application/pdf"
}
```

The document is registered in `UPLOADED` immediately.

### Presigned upload (frontend uploads directly to storage)

Typical for dashboards where the operator drops a file into a drag-and-drop zone. The upload stays off your API surface entirely — the browser posts the bytes directly to the document bucket.

1. **Request a descriptor**

    ```http
    POST /payments/{id}/documents/presign
    Content-Type: application/json

    { "type": "source_of_funds", "contentType": "application/pdf" }
    ```

    Response:

    ```json
    {
      "url": "https://documents.conomyhq.com/",
      "fields": { "key": "payments/.../source_of_funds/20260417T150000Z", "Content-Type": "application/pdf" },
      "canonicalUrl": "https://documents.conomyhq.com/payments/.../source_of_funds/20260417T150000Z",
      "expiresAt": "2026-04-17T15:15:00Z"
    }
    ```

2. **Upload** a `multipart/form-data` request to `url`, including every entry of `fields` as a form field and the file bytes under the form field `file`.
3. **Register** the document by calling `POST /payments/{id}/documents` with `url=canonicalUrl`.

The presigned descriptor is valid for 15 minutes. If the upload fails past expiry, request a fresh descriptor.

## Bypass via `Customer.isDocumented`

Documents can also live on the **Customer** record (see [Customers](../api-reference/customers.md)). A customer with at least one `APPROVED` document is considered documented — every subsequent payment from that customer bypasses the review gate entirely.

This is how `REQUIRES_REVIEW` amortises over time: the first high-value payment triggers a review, the customer's approved document survives on their record, and every future payment from the same customer clears instantly.

## Status reference

| Status               | Meaning                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `PENDING_UPLOAD`     | No documents attached yet. Payment is blocked.                         |
| `UPLOADED`           | At least one document has been registered with a URL.                  |
| `SENT`               | Documents sent to the review provider (KYC pipeline, manual review).   |
| `APPROVED`           | Every attached document was approved. Review unblocks the payment.     |
| `REJECTED`           | Any attached document was rejected. Review fails the payment.          |

## End-to-end example

Once a payment is in `REQUIRES_REVIEW`, your frontend only needs to drive the document upload. The review resolution itself is handled off-platform.

```bash
# 1. Customer drops a scan — request a presigned descriptor
curl -X POST https://api.conomyhq.com/payments/$PAYMENT_ID/documents/presign \
  -H 'Authorization: Bearer $TOKEN' \
  -d '{"type":"source_of_funds","contentType":"application/pdf"}'
# → Upload the bytes directly to canonicalUrl

# 2. Register the document against the payment
curl -X POST https://api.conomyhq.com/payments/$PAYMENT_ID/documents \
  -H 'Authorization: Bearer $TOKEN' \
  -d '{"type":"source_of_funds","url":"https://.../source_of_funds/...","contentType":"application/pdf"}'

# 3. Listen for payment.reviewApproved / payment.reviewRejected on your webhook
```
