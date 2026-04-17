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

# CVU deposits

Argentine-Peso CVU deposits arrive asynchronously: the payer initiates a transfer from their bank, Vita credits the merchant's CVU, and the platform has to decide which of the merchant's accounts the deposit should land on. This guide covers the full flow end-to-end.

## Lifecycle at a glance

```
Vita notifies deposit
      │
      ▼
  payment CREATED, no accountNumber, expiresAt = +24h ──► purchase.attempted
      │
      ├── operator assigns via POST /payments/{id}/assign ──► SETTLED (or UNDERPAID/OVERPAID child)
      │                                                     ──► payment.settled (+ underpaid/overpaid)
      │
      ├── amount > threshold + customer not documented ────► REQUIRES_REVIEW ──► payment.requiresReview
      │                                                                     │
      │                                                                     └── review resolved ──► CAPTURED or FAILED
      │
      └── 24h elapse without assignment ────────────────────► EXPIRED ──► payment.expired
```

## Payment creation (automatic)

Every deposit notification creates a new payment with:

* `type = "LOCAL_DEPOSIT"`.
* `status = "CREATED"`, no `accountNumber` yet.
* `externalId = "vitawallet:<providerReference>"` — the natural key used for idempotency.
* `expiresAt = depositedAt + 24h`.
* An `Origin` node of type `CVU` carrying the originante's CUIT + (when available) first/last name and e-mail, plus the resolved `customerId`.

The same deposit notification also drives **customer resolution**: the platform looks up a customer by `(clientId, documentNumber)` and creates a `BASIC`, `autoCreated=true` record when none exists. See [Customers](../api-reference/customers.md).

## Operator assignment

Assignment is the explicit step where someone (a human in your dashboard, or an automated process) binds the pending deposit to a destination account. Use [`POST /payments/{id}/assign`](../api-reference/payments/payments.md#assignment-cvu-deposits).

Two cases:

### Simple assign (deposit = expected amount)

```json
POST /payments/$PAYMENT_ID/assign
{
  "accountId": "69b30d599e252a224cfe6bd7"
}
```

The payment transitions to `SETTLED`. Reconciliation returns `PAID`. Your endpoint receives `payment.settled`.

### Assign with amount mismatch

When the operator is assigning against an invoice that expected a specific amount (for example, payer was supposed to transfer `10000.00` but only sent `7500.00`), pass `expectedAmount` so the platform can classify the outcome:

```json
POST /payments/$PAYMENT_ID/assign
{
  "accountId": "69b30d599e252a224cfe6bd7",
  "expectedAmount": "10000.00"
}
```

The platform:

1. Classifies the delta: `UNDERPAID`, `OVERPAID`, or `PAID` within tolerance.
2. Transitions the parent payment to `SETTLED` with `reconciliationStatus` set.
3. Creates a **companion child transaction** carrying the absolute delta as `totalAmount`, with `relatedPaymentId` pointing back to the parent. The parent's `relatedPaymentId` points at the child — the link is symmetric.
4. Fires `payment.settled` plus `purchase.underpaid` or `purchase.overpaid`.

The companion child is what you reconcile with your counterparty: chase the `UNDERPAID` balance or refund the `OVERPAID` difference.

## Expiry (no one assigned)

A deposit that sits un-assigned past `expiresAt` is swept automatically by the expiry checker. The payment transitions to `EXPIRED`; the escrow balance is released back to the provider; your endpoint receives `payment.expired`.

If your operations cadence needs more than 24h, reach out to your integration contact to configure the window per client.

## Dashboard views

Your dashboard typically needs three panels. All three are tenant-scoped; every request takes `clientId` as a query parameter.

1. **Unassigned balance widget** — [`GET /balances/unassigned`](../api-reference/balances.md) → total in escrow + a small list of urgent (near-expiry) deposits.
2. **Full pending list** — [`GET /deposits/pending`](../api-reference/balances.md) → paginated list with amount, originante, and `expiresAt`.
3. **Customer panel** — [`GET /payments/{id}/customer`](../api-reference/payments/payments.md#customer-link) on a selected deposit → the persistent customer record bound to the originante, ready for operationLevel editing or document uploads.

## Webhook summary

| Event                         | Fires on…                                                  |
| ----------------------------- | ---------------------------------------------------------- |
| `purchase.attempted`          | New deposit registered.                                    |
| `purchase.pendingAssignment`  | Deposit awaiting manual assignment.                        |
| `payment.requiresReview`      | Amount triggered review gate, customer not documented.     |
| `purchase.underpaid`          | Assigned with `expectedAmount > received`.                 |
| `purchase.overpaid`           | Assigned with `expectedAmount < received`.                 |
| `payment.settled`             | Deposit assigned and reconciled.                           |
| `payment.expired`             | Assignment window elapsed.                                 |
| `payment.unsettled`           | Operator flagged the deposit as unreconcilable after receipt. |
| `customer.levelChanged`       | Customer associated with the deposit became `documented`.  |
