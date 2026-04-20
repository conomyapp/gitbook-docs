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

# Payment status

A payment transitions through a defined lifecycle from its initial attempt all the way to settlement. Terminal states are `SETTLED`, `FAILED`, `EXPIRED`, `UNSETTLED` and `REFUNDED` — once a payment reaches any of these it will not move again.

#### `ATTEMPT`

Represents an initial attempt to process a transaction. At this stage, no payment is initiated, nor are pre-registrations or pre-authorizations issued. This step is optional in the payment flow.

* **Endpoint:** [`/payment-attempts`](../api-reference/payments/payment-attempts.md#post-payment-attempts)

#### `PENDING`

Indicates that the transaction has been initiated. If a pre-authorization or pre-registration is required, it is provided at this stage. This step is mandatory for further processing.

* **Endpoint:** [`/payments`](../api-reference/payments/payments.md#post-payments)

#### `AUTHORIZED`

Used to reserve funds in payment methods that support fund reservation. At this stage, funds are held but not yet captured by the rail. This step is driven by the platform as the rail reports back — you don't need to call an endpoint to move a payment into `AUTHORIZED`.

#### `REQUIRES_REVIEW`

The payment requires additional documentation before it can continue to capture. The customer (or an operator on their behalf) uploads documents through [`POST /payments/{id}/documents`](../api-reference/payments/payments.md). The review itself is resolved off-platform and the outcome is delivered to your webhook (`payment.reviewApproved` / `payment.reviewRejected`).

* An `APPROVED` review unlocks the payment, which transitions back to `CAPTURED`.
* A `REJECTED` review flips the payment to `FAILED`.
* If the underlying customer already has an approved document on record, this state is bypassed entirely and the payment moves directly to `CAPTURED`.

Your endpoint receives a `payment.requiresReview` webhook when this state is entered.

#### `CAPTURED`

The instruction to capture the payment is sent to the rail. While the funds have not yet arrived in the destination account, the payment request has been successfully processed. The transition is driven by the platform as the rail confirms capture — you don't need to call an endpoint.

#### `RECEIVED`

The payment provider confirms that the funds have been successfully transferred to the destination account. The transaction is considered complete, but `conomy_hq` still needs to validate the payment internally through a reconciliation process.

#### `SETTLED`

The payment has been successfully received by the payment provider and has been reconciled with `conomy_hq`'s internal payment and account systems. This status confirms that the funds are verified, matched, and fully available within the platform.

Reaching `SETTLED` triggers a `payment.settled` webhook. The payload carries `settledAt` (ISO 8601) and, when the amount reconciliation produced a difference, a `relatedPaymentId` linking the parent payment to its companion child transaction — see [Amount reconciliation](#amount-reconciliation).

#### `UNSETTLED`

The payment reached `RECEIVED` but could not be reconciled (for example, the provider couldn't match the incoming amount, or the deposit was later rejected post-receipt). This is a terminal state distinct from `FAILED`: the money did arrive, it just can't be applied to the intended destination.

* The transition is driven internally when reconciliation cannot be completed.
* The `payment.unsettled` webhook payload includes `unsettledAt` and `unsettledReason` so your backend can follow up with the counterparty.

#### `EXPIRED`

The payment was not completed before its time-to-live elapsed (typical for quote-based payments that require capture within a window, or for CVU deposits that remained unassigned beyond the assignment window).

* Distinct from `FAILED`: the payment didn't fail, it timed out.
* Any reserved balance is returned automatically.
* Your endpoint receives a `payment.expired` webhook. The payload includes `expiredAt`.

#### `FAILED`

Indicates that the transaction has failed due to an error or rejection during the payment process. Any reserved balance is released.

#### `REFUNDED`

**Legacy** status kept for backwards compatibility. New integrations should not rely on the parent payment transitioning to `REFUNDED`; instead, watch for **child REFUND transactions** created against a `SETTLED` parent — see [Refunds](#refunds).

***

### Refunds

Starting with the Observability & Conversion release, refunds are modelled as **independent child transactions** rather than a mutation of the parent.

* The parent payment remains in `SETTLED` regardless of how many refunds are issued against it.
* Each refund is a new `Transaction` with `type=REFUND` and `parentPaymentId` pointing at the original payment.
* Partial refunds are supported: you can issue several refunds up to the parent's `totalAmount`.
* Refund children transition through their own lifecycle (`RECEIVED` → `SETTLED`).
* Refunds live under the [`/refunds`](../api-reference/payments/refunds.md) namespace. Create with `POST /refunds`, filter by `parentPaymentId` to get the per-payment summary.

When a refund is initiated, your endpoint receives:

* `payment.refund.created` when the child is registered (status `RECEIVED`).
* `payment.refund.settled` when the provider confirms the money returned (status `SETTLED`).

***

### Amount reconciliation

When a payment's received amount differs from what was expected (for example an operator assigns a CVU deposit to an invoice with an expected total), the reconciliation engine classifies the outcome:

| Classification    | Meaning                                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| `PAID`            | Received amount equals the expected amount (within tolerance).              |
| `MINIMUM_PAID`    | Received amount is below the minimum acceptable amount for the currency.   |
| `UNDERPAID`       | Received amount is less than expected but above the minimum.                |
| `OVERPAID`        | Received amount is greater than expected.                                   |

`UNDERPAID` and `OVERPAID` spawn a companion child transaction that captures the difference. The parent reaches `SETTLED` and exposes `relatedPaymentId` pointing to the child; the child carries `relatedPaymentId` pointing back to the parent. Your endpoint receives `purchase.underpaid` or `purchase.overpaid` alongside the standard `payment.settled`.

***

### Transaction Status

| State              | Description                                                                          | Terminal |
| ------------------ | ------------------------------------------------------------------------------------ | :------: |
| `ATTEMPT`          | Initial transaction attempt, no payment initiated.                                   |          |
| `PENDING`          | Transaction initiated, pre-registration/pre-authorization issued if needed.         |          |
| `AUTHORIZED`       | Funds reserved but not yet captured.                                                 |          |
| `REQUIRES_REVIEW`  | Documentation review required before capture.                                        |          |
| `CAPTURED`         | Payment instruction sent to provider, funds not yet settled.                         |          |
| `RECEIVED`         | Payment provider confirms fund transfer to destination account.                      |          |
| `SETTLED`          | Reconciled with `conomy_hq` — funds fully available.                                |    ✓    |
| `UNSETTLED`        | Reached `RECEIVED` but could not be reconciled (terminal).                           |    ✓    |
| `EXPIRED`          | Transaction timed out before completion.                                             |    ✓    |
| `FAILED`           | Transaction failed or was rejected.                                                  |    ✓    |
| `REFUNDED`         | Legacy — parent payment marked as fully reversed. Prefer child REFUND transactions. |    ✓    |
