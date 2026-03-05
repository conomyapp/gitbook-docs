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

# Purchase

Represents a payment for goods or services provided by a client using `conomy_hq`.

Typically initiated via a payment link or external checkout method, this transaction allows third-party customers to send funds to a client's internal account.

| Field          | Value                          |
| -------------- | ------------------------------ |
| `type`         | `PURCHASE`                     |
| `origins`      | One external payment method.   |
| `destinations` | One or more internal accounts. |

### Ownership

The payment is initiated by a third party (e.g., customer), not by the account owner. However, the account owner receives the funds. Only the account owner can configure or manage the receiving accounts.

### Settlement Time

The time it takes for the funds to become available in the internal account depends on the selected payment method.

### Bulk Payments

Bulk payments are **not supported** for `PURCHASE`.

