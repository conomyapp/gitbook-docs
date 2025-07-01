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

# Remittance

Remittance payments allow a user to send funds from an external source to a recipient in another country, often involving a currency exchange and cross-border processing.

These payments are typically used for sending money to family members, paying for services internationally, or transferring funds to a recipient’s foreign bank account.

| Field          | Value                                            |
| -------------- | ------------------------------------------------ |
| `type`         | `REMITTANCE`                                     |
| `origins`      | One internal account or external payment method. |
| `destinations` | One external bank accounts.                      |

### Ownership

Only the account owner has the privileges to initiate a remittance.

### Settlement Time

The settlement time depends on the origin, destination country and the selected payment rail.

### Bulk Payments

To perform a bulk payment for disbursement using `REMITTANCE`:

* **Structure**: one origin and multiple external destinations
