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

| Field          | Value                                                                          |
| -------------- | ------------------------------------------------------------------------------ |
| `type`         | `REMITTANCE`                                                                   |
| `origins`      | One internal `ACCOUNT` node or a pay-in rail (e.g., `PIX`, `ETPAY`)           |
| `destinations` | One payout rail node (e.g., `BANK_ACCOUNT`, `SPEI`, `ACH`, `PIX`, `SEPA`)    |

The combination of origin and destination determines the currency exchange path. For cross-currency remittances, set `product` to reflect the conversion (e.g., `"product": "BRL:USD"`).

### Example — Brazil to USA

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "product": "BRL:USD",
  "type": "REMITTANCE",
  "purchaseAmount": "500",
  "purchaseCurrency": "BRL",
  "currency": "USD",
  "origins": [
    {
      "type": "ACCOUNT",
      "currency": "BRL",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER>" }
    }
  ],
  "destinations": [
    {
      "type": "ACH",
      "currency": "USD",
      "ach": {
        "routingNumber": "021000021",
        "accountType": "CHECKING",
        "bank": { "accountNumber": "123456789" },
        "customer": {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "documentNumber": "123-45-6789",
          "documentType": "SSN"
        }
      }
    }
  ]
}
```

### Ownership

Only the account owner can initiate a remittance.

### Settlement Time

Settlement depends on origin and destination rails. Cross-border transfers typically settle within 1–3 business days.

### Bulk Payments

Bulk disbursements are **supported**: one origin, multiple destinations.
