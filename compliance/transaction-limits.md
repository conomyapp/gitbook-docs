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
description: Amount-based controls applied to topups, withdrawals, and settlements on conomy_hq.
---

# Transaction limits

The platform applies three configurable amount controls, all tuned per client and currency. Every limit is set by `conomy_hq` and can be changed without a code deploy.

{% hint style="info" %}
**Configuring limits.** All limits described on this page are configured by `conomy_hq` per client. Reach out to [hola@conomyhq.com](mailto:hola@conomyhq.com) to request the current values or propose a change.
{% endhint %}

---

## Minimum amount per rail

Every pay-in and pay-out rail has a minimum amount floor configured per currency.

* **Topups** — Incoming transfers below the floor are rejected at the rail level: no transaction is created and no webhook is fired. The originante's funds remain at the rail.
* **Withdrawals** — Outgoing requests below the floor are rejected at submit time with `21 failedPrecondition`.

---

## Review threshold

When a transaction's `totalAmount` meets or exceeds the threshold configured for its currency, **and** the originating customer is not documented (`isDocumented = false`), the transaction transitions to `REQUIRES_REVIEW` instead of continuing toward settlement.

| Condition | Outcome |
| --- | --- |
| Amount < threshold | Transaction continues normally |
| Amount ≥ threshold, customer is documented | Review gate bypassed — transaction continues |
| Amount ≥ threshold, customer is not documented | Transaction enters `REQUIRES_REVIEW` |

See [Customer operation levels](operation-levels.md) for how the documented flag relates to `operationLevel`.

The review threshold applies to every transaction type, including topups and withdrawals.

---

## Per-tier amount limits

Beyond the review gate, every `operationLevel` tier enforces its own maximum single-transaction amount and rolling amount windows. The specific limits are configured per client and currency.

| Level | Expected limits |
| --- | --- |
| `INACTIVE` | All transactions blocked. |
| `BASIC` | Conservative defaults — covers day-one integrations without explicit review. |
| `STANDARD` | Raised limits — applied after basic KYC documentation is approved. |
| `FULL` | Highest limits — applied after full KYC documentation is approved. |

The exact per-tier and per-currency limits are returned with each `Customer` response and can also be requested from `conomy_hq` directly.

---

## What happens when a transaction enters review

1. Status transitions to `REQUIRES_REVIEW` and `documentationStatus` is set to `PENDING_UPLOAD`.
2. Webhook `payment.requiresReview` fires to your endpoint.
3. The required documents are attached to the payment via `POST /payments/{id}/documents`.
4. The review is resolved on our side.
5. On approval, the transaction resumes from where it was gated and `payment.reviewApproved` fires.
6. On rejection, the transaction transitions to `FAILED`, `payment.reviewRejected` fires, and a refund is initiated automatically if the payment had a pending unassigned balance.

See [Review flow](review-flow.md) for the full walkthrough.
