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

# Withdrawal account

Used to withdraw funds from an internal `conomy_hq` account to an external destination.

The transaction is initiated by the account owner when they decide to move money out of the platform.

| Field          | Value                                                              |
| -------------- | ------------------------------------------------------------------ |
| `type`         | `WITHDRAWAL_ACCOUNT`                                               |
| `origins`      | One internal `ACCOUNT` node                                        |
| `destinations` | One or more payout rail nodes (e.g., `BANK_ACCOUNT`, `SPEI`, `PIX`, `ACH`, etc.) |

The destination must be a payout rail specific to the recipient's country and currency. See [Nodes](../origins-and-destinations/nodes.md) for all available payout rails.

### Example

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "product": "ARS:ARS",
  "type": "WITHDRAWAL_ACCOUNT",
  "purchaseAmount": "5000",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [
    {
      "type": "ACCOUNT",
      "currency": "ARS",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER>" }
    }
  ],
  "destinations": [
    {
      "type": "BANK_ACCOUNT",
      "currency": "ARS",
      "bank": {
        "accountNumber": "0000267900000001588730",
        "bank": "BANCO_CMF",
        "currency": "ARS",
        "typeAccount": "CHECKING",
        "accountHolder": "Fernando Domínguez",
        "accountHolderDni": "20219636890",
        "country": "AR"
      },
      "customer": {
        "firstName": "Fernando",
        "lastName": "Domínguez",
        "documentNumber": "20219636890",
        "country": "ARG",
        "email": "fernando@example.com"
      }
    }
  ]
}
```

### Ownership

Only the account owner can initiate a withdrawal.

### Settlement Time

Settlement time depends on the destination rail. Instant rails (PIX) settle in seconds. Traditional rails (ACH, SEPA) may take 1–3 business days.

### Bulk Payments

Bulk disbursements are **supported**: one origin, multiple destinations.

### Available Destinations by Region

| Region        | Rail          | Type           |
| ------------- | ------------- | -------------- |
| Argentina  | Bank transfer | `BANK_ACCOUNT` |
| Argentina  | CVU/CBU       | `CVU`          |
| Mexico     | CLABE         | `SPEI`         |
| Brazil     | PIX key       | `PIX`          |
| USA        | Bank transfer | `ACH`          |
| UK         | Faster Pay    | `FPE`          |
| Europe     | IBAN          | `SEPA`         |
| Chile      | Bank transfer | `BANK_ACCOUNT` |
| Colombia   | Bank transfer | `BANK_ACCOUNT` |
