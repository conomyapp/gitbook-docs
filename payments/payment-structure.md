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

# Payment structure

The `Payments` entity represents all transactions processed through the **conomy\_hq** platform. This includes:

* Local payments
* Crossborder payments
* Mass (bulk) payments
* Internal transfers (e.g., P2P or Collect)

All payments involve at least one **internal account**, either as the origin or the destination of funds.

***

### Core Fields

Below are the key fields used in the Payment object:

| Field              | Description                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountNumber`    | The internal account number receiving or executing the payment.                                                                                                                             |
| `identityId`       | The entity (e.g., `USER` or `ORGANIZATION`) initiating the payment. This may be a user selling on behalf of an organization, topping up their own balance, or authorized to withdraw funds. |
| `totalAmount`      | The final transaction amount after all fees and currency conversions have been applied.                                                                                                     |
| `currency`         | The currency associated with `totalAmount`.                                                                                                                                                 |
| `purchaseAmount`   | The original amount before any fees or currency exchange were applied.                                                                                                                      |
| `purchaseCurrency` | The currency in which the original `purchaseAmount` was initiated.                                                                                                                          |
| `product`          | Represents the payment product format, structured as `purchaseCurrency:currency`.                                                                                                           |
| `status`           | The current status of the transaction, [see lifecycle below](payment-structure.md#transaction-lifecycle).                                                                                   |
| `type`             | The payment type (e.g., `PURCHASE`, `TOPUP_ACCOUNT`, etc.). Check the [payment type page](payment-types/) for more info.                                                                    |
| `fees`             | An array containing all fee transactions applied to this payment.                                                                                                                           |
| `origins`          | Array of origin sources (internal or external) involved in the transaction.                                                                                                                 |
| `destinations`     | Array of destinations receiving the funds.                                                                                                                                                  |

***

### Required Fields

To initiate a payment, the following fields are **mandatory**:

* `origins` (must contain at least one origin)
* `destinations` (must contain at least one destination)
* `product` (e.g., `CLP:USD`)
* `type` (one of the supported payment types)
* Either `purchaseAmount` or `totalAmount` must be provided

For **bulk payments**, the `amount` field must also be defined at the origin or destination level. Check the [Origins and Destinations page](origins-and-destinations.md) for more information.

***

### Transaction Lifecycle

The step of a payment evolves through the following lifecycle stages. For more information check the [payment status page](transaction-status.md).

| Status        | Description                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `CREATED`     | Transaction is created. If an external payment link is needed, it is generated at this stage.             |
| `INITIALIZED` | Indicates that the payment has been initialized. Useful when external payment gateways notify the system. |
| `AUTHORIZED`  | Applies to flows where funds can be reserved before final capture.                                        |
| `CAPTURED`    | Confirms that funds have been captured from the source of money.                                          |
| `RECEIVED`    | Notification received from the payment provider confirming the transaction was successfully paid.         |
| `SETTLED`     | The transaction amount was validated as correctly paid.                                                   |
| `DISPUTED`    | A dispute has been opened before the transaction is settled.                                              |
| `REVERSED`    | The transaction was cancelled before settlement was completed.                                            |

***

### Settlement

The execution flow and expected processing time of a payment depend on the **combination of origins and destinations**.\
For example:

* External origins (e.g., card, bank transfer) may involve delays depending on the provider.
* Internal transactions (e.g., P2P, Collect) are instant.
* Crossborder payments may require currency conversion and sometimes additional processing time.

This entity serves as the **core model for all payment operations** within **conomy\_hq**. A correct understanding and setup of this structure is essential for building reliable and traceable financial workflows.
