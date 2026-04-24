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
description: Compliance controls applied across payments and accounts on conomy_hq.
---

# Compliance

The `conomy_hq` platform operates under AML/KYC regulatory frameworks across every market it serves. This section covers the controls the platform enforces automatically, what your integration must provide, and how to handle compliance events end to end.

These controls apply to every transaction type — topups, withdrawals, remittances, purchases, collects, and P2P transfers alike. The specific limits and thresholds differ per transaction type and per customer tier.

---

## Controls the platform enforces

Three controls apply across the lifecycle of every transaction:

* **Review gate** — When a transaction amount meets or exceeds the threshold configured for its currency and the originating customer is not yet documented, the payment transitions to `REQUIRES_REVIEW` before it can settle. Your integration receives a `payment.requiresReview` webhook and must attach the required documentation for the payment to continue.
* **Minimum amount per rail** — Topups below the configured floor are rejected at the rail level: no transaction is created and no webhook is fired. Withdrawals have their own per-rail minimums configured separately.
* **Per-tier amount limits** — Every `Customer` carries an `operationLevel` (`INACTIVE` → `BASIC` → `STANDARD` → `FULL`). Transaction amount limits are enforced per level, in both directions — topups and withdrawals.

---

## What your integration provides

Two things are expected from your side:

1. **Customer records** — Maintain a `Customer` entity for each end user. The platform auto-creates a `BASIC` customer on the first unmatched topup if one does not exist, but operator-maintained records produce better compliance outcomes.
2. **Documentation on demand** — When `payment.requiresReview` fires, attach the requested documents to the payment via `POST /payments/{id}/documents`. The platform resumes the payment once the review is resolved.

---

## How compliance amortises

A customer who has passed review once keeps their approved documents on record. Every subsequent transaction from that customer — topup, withdrawal, or any other type — bypasses the review gate automatically. No re-upload, no operator action. See [Customer operation levels](operation-levels.md) for how levels evolve.

---

## In this section

* [Customer operation levels](operation-levels.md) — `INACTIVE` → `BASIC` → `STANDARD` → `FULL` and what each tier enables.
* [Transaction limits](transaction-limits.md) — review thresholds, rail minimums, and per-tier amount limits.
* [Supported documents](supported-documents.md) — accepted document types and when each applies.
* [Review flow](review-flow.md) — end-to-end walkthrough of the `REQUIRES_REVIEW` gate.
