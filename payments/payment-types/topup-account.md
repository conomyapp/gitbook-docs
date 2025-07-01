---
layout:
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
---

# Topup account

Used to fund an account within **conomy\_hq**.

This payment type enables users to add funds to their internal balance for future use, such as payout or transfers. The action is initiated by the account owner.

| Field          | Value                          |
| -------------- | ------------------------------ |
| `type`         | `TOPUP_ACCOUNT`                |
| `origins`      | One external payment method    |
| `destinations` | One or more internal accounts. |

### Ownership

The owner of the account decides to top up their balance. Only the account owner has the privileges to initiate this action.

### Settlement Time

The time it takes for the funds to become available in the internal account depends on the selected payment method.

### Bulk Payments

Bulk payments are **not supported** for `TOPUP_ACCOUNT`.
