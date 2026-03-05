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

# Collect

Used to pull funds from multiple internal accounts into a single internal destination.

This transaction is useful for pooling funds or collecting payments within an organization or ecosystem.

| Field          | Value                                            |
| -------------- | ------------------------------------------------ |
| `type`         | `P2P`                                            |
| `origins`      | One or more internal accounts (paying accounts). |
| `destinations` | One internal account (collector).                |

### Flow

* `Origin`: One or more internal accounts (paying accounts).
* `Destination`: One internal account (collector).

### Ownership

The transaction is initiated by the owner of the destination account to collect money from others. All accounts involved must be internally owned, and only the collector has the authority to initiate the request.

### Settlement Time

Collect transactions are processed instantly.

### Bulk Payments

To perform a bulk payment for collection using `COLLECT`:

* `Structure`: multiple internal origins and one internal destination.
