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
description: Day-one compliance checklist for new integrations on conomy_hq.
---

# Integration checklist

A practical checklist for integrating compliance correctly the first time. Each item is paired with the page that explains the underlying mechanism.

---

## Customer records

* [ ] Create a `Customer` for every end user on first interaction. See [Customers](../api-reference/customers.md).
* [ ] Surface `autoCreated: true` records in your operator dashboard so the team can complete missing data.
* [ ] Promote `operationLevel` (`PATCH /customers/{id}`) when documentation is approved. See [Customer operation levels](operation-levels.md).
* [ ] Subscribe to `customer.levelChanged` to keep your local state synced.

---

## Documentation flow

* [ ] Subscribe to `payment.requiresReview` and route the event to the operator dashboard within minutes.
* [ ] Build a UI that lets the operator (or end user) attach the requested document via `POST /payments/{id}/documents`. See [Supported documents](supported-documents.md).
* [ ] Subscribe to `payment.reviewApproved` and `payment.reviewRejected` so your dashboard reflects the resolution.
* [ ] Reflect `documentationStatus` on the payment view: `PENDING_UPLOAD`, `UPLOADED`, `APPROVED`, `REJECTED`.

---

## Limits

* [ ] Confirm with `conomy_hq` the configured review threshold per currency.
* [ ] Confirm the configured minimum amount per rail.
* [ ] Confirm the configured per-tier amount limits and reflect them in your UX (e.g. show the user the cap before they submit a request).

See [Transaction limits](transaction-limits.md).

---

## Day-two operations

* [ ] Reconcile your customer records weekly: any `autoCreated: true` customer that has been transacting should be reviewed and promoted.
* [ ] Audit `REQUIRES_REVIEW` payments older than 24 hours and chase the document upload.
* [ ] Track refund volume from `REJECTED` reviews — sustained spikes signal a documentation UX issue.

---

## Final compliance check before going live

* [ ] End-to-end test in sandbox: customer creation → topup that triggers review → document upload → operator approval → settlement.
* [ ] End-to-end test in sandbox: customer creation → topup that triggers review → operator rejection → automatic refund visible.
* [ ] Webhook handler verified for every compliance event: `payment.requiresReview`, `payment.reviewApproved`, `payment.reviewRejected`, `customer.levelChanged`.
* [ ] Operator dashboard escalates blocked payments to a human within an SLA you have committed to (we recommend ≤ 4 hours).
