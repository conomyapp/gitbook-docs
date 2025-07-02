# Nodes

The node field is a dynamic object inside a payment-node and defines the specific resource used to execute the payment depending on the value of `origin` or `destination` type.

Each type unlocks a different structure for the node field. Only one node structure is allowed per payment-node, and it must match the declared `type`.

Below are the supported `node` types and their expected structure by `payment-node` type.

<details>

<summary><strong>Account</strong></summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin/Destination request example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>

<details>

<summary><strong>Bank account</strong></summary>

Represents an external bank account, typically used for payouts or remittances.

| Payment-node type | node   |
| ----------------- | ------ |
| `BANK_ACCOUNT`    | `bank` |

**Required node fields**

| Fields           | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| accountNumber    | The bank account number.                                            |
| typeAccount      | The type of bank account. `CHECKING_ACOUNT` `SAVINGS`               |
| bank             | The name of the bank where the account is held.                     |
| accountHolder    | The full name of the account holder.                                |
| accountHolderDni | The national identification number or tax ID of the account holder. |
| country          | The country of the bank account.                                    |
| currency         | The currency of the bank account.                                   |

**Origin/Destination request example**

```json
    {
      "type": "BANK_ACCOUNT",
      "bank": {
        "accountNumber": "11111111",
        "bank": "BANCO_SANTANDER",
        "currency": "CLP",
        "country": "CHL",
        "typeAccount": "CHECKING_ACCOUNT",
        "accountHolder": "John Doe",
        "accountHolderDni": "162115031-7",
      }
    }
```

</details>

<details>

<summary><strong>Payment link</strong></summary>

Represents a reusable or one-time link to initiate a payment.

| Payment-node type | node          |
| ----------------- | ------------- |
| `PAYMENT_LINK`    | `paymentLink` |

**Required node fields**

<table><thead><tr><th valign="top">Fields</th><th valign="top">Description</th></tr></thead><tbody><tr><td valign="top">customer</td><td valign="top">Information on who pays the transaction.</td></tr><tr><td valign="top">paymentMethodsAllowed</td><td valign="top">Allowed payment methods. If the fields is empty, all payment methods allowed will be shown.</td></tr><tr><td valign="top">metadata</td><td valign="top">Information will be displayed in the link.</td></tr><tr><td valign="top">redirectURL</td><td valign="top">The URL to which the end user will be redirected after completing the payment.</td></tr></tbody></table>

**Origin request example**

```json
    {
      "type": "PAYMENT_LINK",
      "paymentLink": {
        "customer": {
          "name": "Jhon Doe",
          "email": "jhon@email.com"
        },
        "paymentMethodsAllowed": [
          "CARD",
          "ETPAY",
          "PIX"
        ],
        "metadata": {
          "description": "Payments"
        }
      }
    }
```

#### Notes

* If some `customer` information is missing, the customer will be able to complete it directly within the payment link.
* When a payment link is created, the response includes a url and a token that can be used to construct the final link and access the payment interface.
* To learn more about the supported payment methods, please refer to the Payment Methods page.
* Once the payment is successfully processed, the user will be redirected to the `redirectURL` provided in the request.
* A payment link can be configured with an `expiredAt` timestamp to define its expiration time.
* The `response` also includes a `paymentMethod` object, which contains a `type` field. This field determines the structure of the payment method used by the customer to complete the payment. E.g., if type is `CARD`, the object will include a `card` node; if type is `PAYMENT_INITIATION`, it will include a `paymentInitiation` node, and so on.

</details>

<details>

<summary><strong>Payment initiation</strong></summary>

Represents a reusable or one-time link to initiate a payment.

| Payment-node type    | node                |
| -------------------- | ------------------- |
| `PAYMENT_INITIATION` | `paymentInitiation` |

**Required node fields**

<table><thead><tr><th valign="top">Fields</th><th valign="top">Description</th></tr></thead><tbody><tr><td valign="top">provider</td><td valign="top">Payment initiation provider.</td></tr><tr><td valign="top">referenceId</td><td valign="top">Identifier of the account in the payment initiation provider.</td></tr><tr><td valign="top">redirectUrl</td><td valign="top">URL where the user will be redirected after completing the payment.</td></tr></tbody></table>

**Origin request example**

```json
    {
      "type": "PAYMENT_INITIATION",
      "paymentInitiation": {
        "provider": "PLAID",
        "referenceId": "1230222",
        "redirectUrl": "https://url.com"
      }
    }
```

#### Notes

* For some payment initiation providers, bank accounts can be registered. When this occurs, the referenceId field is required.
* When a bank account is successfully registered, the account information will be sent via `webhook` notification.
* The `response` returns the `referenceToken`, which is required to continue the payment flow.
* The `language` field can be used to localize the user experience. Only some providers support this field — refer to the Payment Methods page for more details.
* The `minimumAmount` and `maximumAmount` fields define the allowed transaction range for this payment initiation.

</details>

<details>

<summary><strong>Crypto</strong></summary>

Crypto wallet for sending or receiving crypto.

| Payment-node type | node     |
| ----------------- | -------- |
| `CRYPTO`          | `wallet` |

**Required node fields**

<table><thead><tr><th valign="top">Fields</th><th valign="top">Description</th></tr></thead><tbody><tr><td valign="top">address</td><td valign="top">Wallet's address</td></tr></tbody></table>

**Origin request example**

```json
    {
      "type": "CRYPTO",
      "wallet": {
        "address": "0x123...456"
      }
    }
```

</details>

<details>

<summary><strong>Card</strong></summary>

Card-based payments (debit, credit, prepaid).

| Payment-node type | node   |
| ----------------- | ------ |
| `CARD`            | `card` |

**Required node fields**

<table><thead><tr><th valign="top">Fields</th><th valign="top">Description</th></tr></thead><tbody><tr><td valign="top">token</td><td valign="top">Card token</td></tr></tbody></table>

**Origin request example**

```json
    {
      "type": "CARD",
      "card": {
        "token": "111111111111"
      }
    }
```

#### Notes

* To perform a card payment via API, the card must first be pre-registered and tokenized. Refer to the Payment Methods page for more information on how to tokenize cards.
* The response will include the card holder and a masked card number containing the last 4 digits.

</details>
