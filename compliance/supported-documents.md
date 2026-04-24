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
description: Document types accepted by conomy_hq for compliance review on payments and customers.
---

# Supported documents

The platform accepts documents on two entities: **payments** (during a review gate) and **customers** (for a permanent KYC record). The same `type` values apply to both.

---

## Document types

| Type | Purpose |
| --- | --- |
| `kyc` | Identity document for the originante — national ID, passport, or equivalent. |
| `source_of_funds` | Proof of the economic origin of the funds — bank statement, payslip, invoice, or equivalent. Required in regulated verticals or for high-value transactions. |
| `invoice` | Invoice or billing document that backs the payment. |
| `contract` | Signed agreement tied to the payment — commercial contract, service agreement, etc. |
| `other` | Any supporting evidence that does not fit the categories above. |

---

## Attaching a document to a payment

Use this flow when a payment is in `REQUIRES_REVIEW` and `documentationStatus` is `PENDING_UPLOAD`.

```http
POST /payments/{id}/documents
Content-Type: application/json

{
  "type": "source_of_funds",
  "url": "https://documents.conomyhq.com/payments/.../source_of_funds/file.pdf",
  "contentType": "application/pdf"
}
```

`documentationStatus` transitions to `UPLOADED` and the payment waits for the review to be resolved.

---

## Attaching a document to a customer

Documents on a `Customer` record are permanent. Once at least one document is approved, the customer is considered documented (`isDocumented = true`) and every subsequent payment from that customer bypasses the review gate.

```http
POST /customers/{id}/documents
Content-Type: application/json

{
  "type": "kyc",
  "url": "https://documents.conomyhq.com/customers/.../kyc/file.pdf",
  "contentType": "application/pdf"
}
```

---

## Document status reference

| Status | Meaning |
| --- | --- |
| `PENDING_UPLOAD` | No documents attached yet. Payment is blocked at the review gate. |
| `UPLOADED` | At least one document has been registered. Awaiting review. |
| `APPROVED` | All attached documents were approved. Review gate unblocked. |
| `REJECTED` | A document was rejected. Payment transitions to `FAILED`; a refund is initiated if applicable. |
