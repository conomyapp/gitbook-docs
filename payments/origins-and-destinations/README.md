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
    visible: false
---

# Origins and Destinations

In every payment, the flow of funds is defined by **origins** (where the money comes from) and **destinations** (where the money goes). Each item is represented as an object within the `origins[]` or `destinations[]` array.

Both **origins** and **destinations** are defined using the `payment-node` entity, which encapsulates the configuration needed for the payment source or target.

The payment-node includes a `type` field. Based on the selected `type`, a corresponding `node` must be provided, containing the specific structure required to process the payment.

Only one `node` should be included per `payment-node`, matching the selected `type`.

***

### Core Fields

Below are the key fields used in `origins` and `destinations`:

| Field      | Description                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | The provider executing or receiving the payment. If not specified, the default value is `conomy_hq`. This is used to identify the payment processor or custody service involved in the transaction.                             |
| `type`     | This field determines the nature of the payment `origin` or `destination`. It defines what kind of financial entity is initiating or receiving the payment. This determines the kind of `{node}` required for the transaction.  |
| `amount`   | The amount associated with this origin/destination. Required if splitting funds across nodes.                                                                                                                                   |
| `currency` | Currency code, e.g. `COP`, `USD`. Check the [currency page](../../home/currencies.md) for more info.                                                                                                                            |
| `identity` | Object representing the `identity` involved.                                                                                                                                                                                    |
| `{node}`   | The node field contains the detailed configuration required for the payment. Its structure depends entirely on the value of the `type` field. Only **one node** object should be included, and it must match the selected type. |

***

### Payment-node types&#x20;

The following table outlines the supported type values for a `payment-node`, along with the expected structure of the corresponding `node` field. Each type unlocks a specific node schema, which must be provided when constructing the origin or destination of a payment:

| Type                 | Description                                                     | Node field          |
| -------------------- | --------------------------------------------------------------- | ------------------- |
| `ACCOUNT`            | Internal **conomy\_hq** account (used for most platform flows). | `account`           |
| `BANK_ACCOUNT`       | External bank account.                                          | `bank`              |
| `CARD`               | Card-based payments (debit, credit).                            | `card`              |
| `CRYPTO`             | Crypto wallet for sending or receiving crypto.                  | `wallet`            |
| `PAYMENT_INITIATION` | A payment initiated through a  open banking flow.               | `paymentInitiation` |
| `PAYMENT_LINK`       | A reusable or one-time payment link shared with a payer.        | `paymentLink`       |

### Valid Origin and Destination Combinations

The table below defines the valid combinations of `origin` and `destination` types that are supported. These combinations reflect the permitted flows for transferring funds, whether between internal accounts, external instruments, or across borders.

| Payment Type         | Valid Origin Types                                                                 | Valid Destination Types |
| -------------------- | ---------------------------------------------------------------------------------- | ----------------------- |
| `P2P`                | `ACCOUNT`, `WALLET`                                                                | `ACCOUNT`               |
| `TOPUP_ACCOUNT`      | `PAYMENT_LINK`, `WALLET`, `CARD`, `PAYMENT_INITIATION`, `BANK_ACCOUNT`             | `ACCOUNT`               |
| `REMITTANCE`         | `ACCOUNT`, `WALLET`, `PAYMENT_LINK`, `CARD`, `PAYMENT_INITIATION`, `BANK_ACCOUNT`  | `BANK_ACCOUNT`          |
| `WITHDRAWAL_ACCOUNT` | `ACCOUNT`                                                                          | `BANK_ACCOUNT`          |
| `PURCHASE`           | `PAYMENT_LINK`, `CARD`, `PAYMENT_INITIATION`, `BANK_ACCOUNT`                       | `ACCOUNT`               |
| `COLLECT`            | `ACCOUNT`                                                                          | `ACCOUNT`               |

***

### Notes

* If only one origin/destination is used, you can omit `amount` and it will default to the full transaction amount.
* If multiple origins or destinations are used, the sum of all `amount` fields must match the `purchaseAmount`.
* Only the field required for the selected `type` should be present — others must be omitted.
