---
hidden: true
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
    visible: true
---

# Nodes

The node field is a dynamic object inside a payment-node and defines the specific resource used to execute the payment depending on the value of `origin` or `destination` type.

Each type unlocks a different structure for the node field. Only one node structure is allowed per payment-node, and it must match the declared `type`.

Below are the supported `node` types and their expected structure by `payment-node` type.

<details>

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Example**

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

<summary>BANK_ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node           |
| ----------------- | -------------- |
| `BANK_ACCOUNT`    | `BANK_ACCOUNT` |

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

**Example**

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

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

**Destination example**

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>

<details>

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

**Destination example**

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>

<details>

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

**Destination example**

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>

<details>

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

**Destination example**

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>

<details>

<summary>ACCOUNT</summary>

Represents an internal account within the **conomy\_hq**.

| Payment-node type | node      |
| ----------------- | --------- |
| `ACCOUNT`         | `account` |

**Required node fields**

| Fields        | Description                               |
| ------------- | ----------------------------------------- |
| accountNumber | Internal reference number for the account |

**Origin example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

**Destination example**

```json
{
  "type": "ACCOUNT",
  "currency": "COP",
  "amount": "10000",
  "account": {
    "accountNumber": "174XXX"
  }
}
```

</details>







