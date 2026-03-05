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

# Fee

Represents an automatically generated transaction based on the business rules defined by the client's organization.

Fees are not manually initiated and are collected by an internal `FEE` account.

| Field          | Value                 |
| -------------- | --------------------- |
| `type`         | `FEE`                 |
| `destinations` | Internal FEE account. |

### Ownership

Fee transactions are system-generated. However, the fee configuration is controlled by the organization. Only the account owner can view or manage fee-related behavior for their own account.

### Settlement Time

Fee transaction timing depends on the settlement time of the transaction it is associated with.

### Bulk Payments

Bulk payments are **not supported** for `FEE`.
