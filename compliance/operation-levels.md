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
description: How customer operation levels control compliance requirements across the conomy_hq platform.
---

# Customer operation levels

Every `Customer` on the platform carries an `operationLevel` field that controls the compliance requirements applied to their transactions. Levels progress from `INACTIVE` to `FULL` as documentation is reviewed and approved.

---

## Levels

| Level | How assigned | Review gate |
| --- | --- | --- |
| `INACTIVE` | Manual — an operator sets it explicitly | All transactions blocked |
| `BASIC` | Default for auto-created customers and for operator-created customers without an explicit level | Review gate applies when the amount threshold is met |
| `STANDARD` | Assigned after basic documentation is approved | Reduced review exposure, configured per client |
| `FULL` | Assigned after full KYC documentation is approved | Review gate bypassed — every future transaction from the customer continues without review |

---

## Auto-created customers

When a topup arrives for an originante that has no existing customer record, the platform creates one automatically:

* `operationLevel` is set to `BASIC`.
* `autoCreated` is `true`.
* Fields are populated from the originante data in the topup notification (`firstName`, `lastName`, `documentNumber`, `documentType`).

Surface `autoCreated: true` customers in your dashboard as a prompt to complete and verify the record.

---

## Effect on the review gate

A customer at `FULL` level bypasses the review gate on every subsequent transaction, regardless of amount. This amortises compliance friction: the first qualifying transaction triggers a one-time review; every future transaction from the same customer settles without re-review.

The bypass applies as long as the customer has at least one `APPROVED` document on record (`isDocumented = true`).

---

## Checking a customer

```http
GET /customers/{id}
```

Returns the full customer record including `operationLevel`, `isDocumented`, and the `documents` array with per-document status.
