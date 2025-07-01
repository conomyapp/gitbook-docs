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

# Withdrawal account

Used to withdraw funds from an internal **conomy\_hq** account to an external destination.

The transaction is initiated by the account owner when they decide to move money out of the platform.

| Field          | Value                                          |
| -------------- | ---------------------------------------------- |
| `type`         | `WITHDRAWAL_ACCOUNT`                           |
| `origins`      | One internal account                           |
| `destinations` | One or more external bank accounts or wallets. |

### Ownership

Only the account owner has the privileges to initiate a withdrawal.

### Settlement Time

The settlement time depends on the destination country and the selected payment rail.

### Bulk Payments

To perform a bulk payment for disbursement using `WITHDRAWAL_ACCOUNT`:

* **Structure**: one origin and multiple external destinations
