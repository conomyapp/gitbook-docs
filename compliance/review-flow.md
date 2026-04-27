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
description: End-to-end walkthrough of the REQUIRES_REVIEW compliance gate on conomy_hq.
---

# Review flow

{% hint style="info" %}
**TL;DR.** When `payment.requiresReview` fires, attach the requested document with `POST /payments/{id}/documents`. The platform resolves the review and resumes the payment automatically.
{% endhint %}

Some payments need documentation review before the platform can settle them. The `REQUIRES_REVIEW` state is that gate: a payment sits there until the required documents are attached and the review is resolved.

---

## When a payment enters `REQUIRES_REVIEW`

A payment enters review when **any** of the following apply:

1. The amount meets or exceeds the threshold configured for its currency and the originating customer is not documented. See [Transaction limits](transaction-limits.md).
2. The rules engine matches a compliance policy — flagged account, client-level override, or similar.

If the customer already has at least one `APPROVED` document on record (`isDocumented = true`), the review gate is **bypassed** and the payment continues without review.

When a review is required, the platform fires a `payment.requiresReview` webhook so your dashboard can react immediately.

---

## Attaching documents

While `documentationStatus` is `PENDING_UPLOAD`, register a document against the payment:

```http
POST /payments/{id}/documents
Content-Type: application/json

{
  "type": "source_of_funds",
  "url": "https://documents.conomyhq.com/payments/.../source_of_funds/file.pdf",
  "contentType": "application/pdf"
}
```

`documentationStatus` transitions to `UPLOADED`. See [Supported documents](supported-documents.md) for accepted `type` values.

---

## Resolution

Once the review is resolved, the payment moves forward:

* **Approved** — The payment resumes from where it was gated. `documentationStatus` transitions to `APPROVED`. Webhook `payment.reviewApproved` fires.
* **Rejected** — The payment transitions to `FAILED` and balance reservations are reversed. `documentationStatus` transitions to `REJECTED`. Webhook `payment.reviewRejected` fires. For payments with a pending unassigned balance, a refund is initiated automatically.

Both outcomes also fire the umbrella `payment.reviewResolved` event for consumers that do not branch on the decision.

---

## Bypass via `Customer.isDocumented`

Documents attached to a **Customer** record are permanent. A customer with at least one `APPROVED` document is considered documented — every subsequent payment from that customer bypasses the review gate, regardless of amount.

This is how `REQUIRES_REVIEW` amortises over time: the first qualifying payment triggers a one-time review; every future payment from the same customer clears instantly. See [Customer operation levels](operation-levels.md).

---

## Status reference

| Status | Meaning |
| --- | --- |
| `PENDING_UPLOAD` | No documents attached yet. Payment is blocked. |
| `UPLOADED` | At least one document registered. Awaiting resolution. |
| `APPROVED` | Documents approved. Payment resumes. |
| `REJECTED` | Review rejected. Payment transitions to `FAILED`. |
