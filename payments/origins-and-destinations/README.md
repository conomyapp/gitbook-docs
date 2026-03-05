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

### Payment-node types

Each node `type` maps to a sub-object with the same name in camelCase. The table below shows the core types. For the full list of payment rails (PIX, SPEI, ETPAY, ACH, etc.), see the [Nodes page](nodes.md).

| Type           | Description                                               | Sub-object     |
| -------------- | --------------------------------------------------------- | -------------- |
| `ACCOUNT`      | Internal conomy\_hq account (origin or destination)       | `account`      |
| `BANK_ACCOUNT` | External bank account (for payouts)                       | `bank`         |
| `CRYPTO`       | Crypto wallet                                             | `wallet`       |
| `PIX`          | Brazil instant payment (pay-in / payout)                  | `pix`          |
| `PCT`          | Argentina QR transfer (pay-in)                            | `pct`          |
| `CVU`          | Argentina CVU/CBU bank transfer (payout)                  | `cvu`          |
| `SPEI`         | Mexico CLABE transfer (payout)                            | `spei`         |
| `ETPAY`        | Chile open banking (pay-in)                               | `etpay`        |
| `FINTOC`       | Chile open banking via Fintoc (pay-in)                    | `fintoc`       |
| `WEBPAY`       | Chile card payments via Transbank (pay-in)                | `webpay`       |
| `PSE`          | Colombia bank transfer (pay-in)                           | `pse`          |
| `BANCOLOMBIA`  | Colombia Bancolombia direct (pay-in)                      | `bancolombia`  |
| `DAVIPLATA`    | Colombia Daviplata wallet (pay-in)                        | `daviplata`    |
| `NEQUI`        | Colombia Nequi wallet (pay-in)                            | `nequi`        |
| `ACH`          | USA bank transfer (payout)                                | `ach`          |
| `SEPA`         | Europe IBAN transfer (payout)                             | `sepa`         |
| `FPE`          | UK Faster Payments (payout)                               | `fpe`          |

### Valid Origin and Destination Combinations

| Payment Type         | Valid Origins                                               | Valid Destinations              |
| -------------------- | ----------------------------------------------------------- | ------------------------------- |
| `P2P`                | `ACCOUNT`                                                   | `ACCOUNT`                       |
| `TOPUP_ACCOUNT`      | Any pay-in rail (`ETPAY`, `PIX`, `PCT`, `PSE`, etc.)        | `ACCOUNT`                       |
| `WITHDRAWAL_ACCOUNT` | `ACCOUNT`                                                   | Any payout rail (`BANK_ACCOUNT`, `SPEI`, `PIX`, `ACH`, etc.) |
| `REMITTANCE`         | `ACCOUNT` or any pay-in rail                                | Any payout rail                 |
| `PURCHASE`           | Any pay-in rail                                             | `ACCOUNT`                       |
| `COLLECT`            | `ACCOUNT`                                                   | `ACCOUNT`                       |

***

### Notes

* If only one origin/destination is used, you can omit `amount` and it will default to the full transaction amount.
* If multiple origins or destinations are used, the sum of all `amount` fields must match the `purchaseAmount`.
* Only the field required for the selected `type` should be present — others must be omitted.
