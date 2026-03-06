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

| Field          | Value                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `type`         | `WITHDRAWAL_ACCOUNT`                                                                                              |
| `origins`      | One internal `ACCOUNT` node                                                                                       |
| `destinations` | One or more payout rail nodes (for example: `BANK_ACCOUNT`, `SPEI`, `PIX`, `ACH`, `WIRE`, `SEPA`, `SWIFT`) |

The destination must be a payout rail specific to the recipient's country and currency. See [Nodes](../origins-and-destinations/nodes/README.md) for all available payout rails.

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
| Mexico     | CLABE         | `SPEI`         |
| Brazil     | PIX key       | `PIX`          |
| Colombia   | Bank payout   | `BREB`         |
| USA        | Bank transfer | `ACH`          |
| USA        | Wire          | `WIRE`         |
| USA        | Instant bank  | `FEDNOW`       |
| USA        | Real-time     | `RTP`          |
| UK         | Faster Pay    | `FPE`          |
| Europe     | IBAN          | `SEPA`         |
| Global     | International | `SWIFT`        |
| Chile      | Bank transfer | `BANK_ACCOUNT` |
| Colombia   | Bank transfer | `BANK_ACCOUNT` |
| Peru       | Bank transfer | `BANK_ACCOUNT` |
| Bolivia    | Bank transfer | `BANK_ACCOUNT` |
| Paraguay   | Bank transfer | `BANK_ACCOUNT` |
| Australia  | Bank transfer | `BANK_ACCOUNT` |
| Costa Rica | Bank transfer | `BANK_ACCOUNT` |
| Dominican Republic | Bank transfer | `BANK_ACCOUNT` |
| Ecuador    | Bank transfer | `BANK_ACCOUNT` |
| Panama     | Bank transfer | `BANK_ACCOUNT` |
| Uruguay    | Bank transfer | `BANK_ACCOUNT` |
| Venezuela  | Bank transfer | `BANK_ACCOUNT` |
| Canada     | Bank transfer | `BANK_ACCOUNT` |
| Canada     | International | `SWIFT`        |
| China      | International | `SWIFT`        |
| Hong Kong  | International | `SWIFT`        |
