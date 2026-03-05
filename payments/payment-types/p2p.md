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

# P2P

Used for peer-to-peer transfers between internal accounts in `conomy_hq`.

This push-based transaction allows an account owner to send funds directly to one or more internal accounts, such as users, services, or other organizations.

| Field          | Value                          |
| -------------- | ------------------------------ |
| `type`         | `P2P`                          |
| `origins`      | One internal account.          |
| `destinations` | One or more internal accounts. |

### Ownership

The transaction is initiated by the owner of the origin account. Only the account owner has the authority to send funds.

### Settlement Time

P2P transactions are processed instantly.

### Bulk Payments

To perform a bulk payment for disbursement using `P2P`:

* `Structure`: one origin and multiple internal destinations.
