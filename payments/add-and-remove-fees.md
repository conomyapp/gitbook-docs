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
    visible: true
---

# Add & remove fees

These endpoints allow you to **assign or remove a fee rule** to/from an `identity`. This fee will be applied automatically when the identity participates in a transaction of a specific type (e.g. `P2P`, `PURCHASE`, etc.).

The fee can be either a **percentage** or a **fixed amount**, and applies only when the specified `transactionType` is executed.

***

### Add Fee Rule to Identity

#### Endpoint

```
POST /identities/{identityId}/fees
```

#### Example Request

```json
{
  "type": "PERCENTAGE",
  "transactionType": "P2P",
  "amount": "10.00",
  "currency": "USD",
  "description": "Fee por servicio",
  "name": "SERVICE FEE"
}
```

#### Request Parameters

| Field             | Description                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `type`            | Type of fee: `PERCENTAGE` or `FIXED`.                                                       |
| `transactionType` | The transaction type where the fee will be applied (e.g. `P2P`, `PURCHASE`).                |
| `amount`          | The fee value: `"10.00"` means 10% if type is `PERCENTAGE`, or 10 units if type is `FIXED`. |
| `currency`        | Required only if type is `FIXED`.                                                           |
| `description`     | A label or explanation for the fee rule.                                                    |
| `name`            | Internal name of the rule. Used for identifying and deleting later.                         |

#### Example Response

Returns the full updated identity object with all applied rules:

```json
{
  "type": "ORGANIZATION",
  "name": "Operator Cabify 8",
  "nickname": "Op Cabify 8",
  "email": "operatorCabify8@example.com",
  "phone": "+5693111118",
  "documentType": "RUT",
  "documentNumber": "77723128-K",
  "idv": "iv-43128",
  "country": "CHL",
  "securityOptions": {
    "twoFactorEnabled": false
  },
  "bankAccount": {
    "accountNumber": "123456",
    "typeAccount": "BANK_ACCOUNT",
    "userDni":"18782721-3",
    "countryCode": "CHL",
    "currency": "CLP",
    "accountHolder": "TOMAS GOMEZ"
  },
  "children": [],
  "rules": [
    {
      "id": "67f493c6c7201a42e4c3deaa",
      "type": "PERCENTAGE",
      "transactionType": "P2P",
      "amount": "10.00",
      "currency": "USD",
      "description": "Fee por servicio",
      "name": "SERVICE FEE"
    }
  ]
}
```

***

### Remove Fee Rule from Identity

#### Endpoint

```
DELETE /identities/{identityId}/fees/{ruleId}
```

#### Example Response

Returns the updated identity object without the removed rule:

```json
{
  "type": "ORGANIZATION",
  "name": "Operator Cabify 8",
  "nickname": "Op Cabify 8",
  "email": "operatorCabify8@example.com",
  "phone": "+5693111118",
  "documentType": "RUT",
  "documentNumber": "77723128-K",
  "idv": "iv-43128",
  "country": "CHL",
  "securityOptions": {
    "twoFactorEnabled": false
  },
  "bankAccount": {
    "accountNumber": "123456",
    "typeAccount": "BANK_ACCOUNT",
    "userDni":"18782721-3",
    "countryCode": "CHL",
    "currency": "CLP",
    "accountHolder": "TOMAS GOMEZ"
  },
  "children": [],
  "rules": []
}
```

***

### Notes

* Fees are evaluated automatically based on the `transactionType` during processing.
* You can add multiple fees per identity, for different transaction types or fee structures.
* Only the matching rule ID (`/fees/{ruleId}`) will be deleted per call.
