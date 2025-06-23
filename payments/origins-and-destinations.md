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

In every transaction, the flow of funds is defined by **origins** (where the money comes from) and **destinations** (where the money goes). Each item is represented as an object in the `origins[]` or `destinations[]` array.

The structure and required fields depend on the `type` you use. Only one of the specific fields must be included depending on the selected `type`.

***

### Common Fields

These fields can exist in both origins and destinations:

| Field      | Description                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `name`     | (Optional) A label for the origin/destination.                                                           |
| `type`     | (Required) One of: `ACCOUNT`, `BANK_ACCOUNT`, `CARD`, `CRYPTO`, `PAYMENT_INITIATION`, `PAYMENT_LINK`.    |
| `amount`   | (Optional) The amount associated with this origin/destination. Required if splitting funds across nodes. |
| `currency` | (Required) Currency code, e.g. `COP`, `USD`.                                                             |
| `identity` | (Optional) Object representing the user or entity involved.                                              |
| `metadata` | (Optional) Description, tags, etc.                                                                       |

***

### Required Fields by type&#x20;

Only one field block must be included depending on the selected `type`.

| Type                 | Required field      | Description                                                     |
| -------------------- | ------------------- | --------------------------------------------------------------- |
| `ACCOUNT`            | `account`           | Internal **conomy\_hq** account (used for most platform flows). |
| `BANK_ACCOUNT`       | `bank`              | External bank account (for withdrawals).                        |
| `CARD`               | `card`              | Card-based payments (debit, credit).                            |
| `CRYPTO`             | `wallet`            | Crypto wallet for sending or receiving crypto.                  |
| `PAYMENT_INITIATION` | `paymentInitiation` | External initiators like `EPAY` or `FINTOC`.                    |
| `PAYMENT_LINK`       | `paymentLink`       | Payment providers like WOMPI, MercadoPago, etc.                 |

***

### Examples

#### 🔗 Origin via WOMPI (PAYMENT\_LINK)

```json
{
  "name": "WOMPI",
  "currency": "COP",
  "type": "PAYMENT_LINK",
  "paymentLink": {
    "expiredAt": "2025-12-31T23:59:59Z",
    "name": "STATIC",
    "metadata": {
      "description": "Pago con Wompi"
    },
    "paymentMethods": [
      "WOMPI"
    ],
    "payer": {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    },
    "provider": "WOMPI"
  }
}
```

***

#### Destination to External Bank Account

```json
{
  "type": "BANK_ACCOUNT",
  "currency": "COP",
  "bank": {
    "bank": "BANCOLOMBIA",
    "accountHolder": "John Doe",
    "accountHolderDni": "12345678",
    "accountNumber": "1234567890",
    "currency": "COP"
  }
}
```

***

#### Origin from Internal Conomy Account

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "identity": {
    "identityId": "abc123"
  },
  "account": {
    "accountNumber": "174XXX"
  }
}
```

***

#### Destination via Crypto Wallet

```json
{
  "type": "CRYPTO",
  "currency": "USDT",
  "wallet": {
    "accountId": "abc123",
    "provider": "BINANCE",
    "address": "0x123...456"
  }
}
```

***

### Notes

* If only one origin/destination is used, you can omit `amount` and it will default to the full transaction amount.
* If multiple origins or destinations are used, the sum of all `amount` fields must match the `purchaseAmount`.
* Only the field required for the selected `type` should be present — others must be omitted.
