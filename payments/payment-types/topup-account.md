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

# Topup account

Used to fund an account within `conomy_hq`.

This payment type enables users to add funds to their internal balance for future use, such as payout or transfers. The action is initiated by the account owner.

| Field          | Value                                                              |
| --------------: | ------------------------------------------------------------------: |
| `type`         | `TOPUP_ACCOUNT`                                                                                  |
| `origins`      | One pay-in rail node (for example: `CARD`, `PIX`, `ETPAY`, `PSE`, `WOMPI`, `ACH`, `FEDNOW`)   |
| `destinations` | One or more internal `ACCOUNT` nodes                                                             |

The origin must be a payment rail specific to the destination country and currency. The `type` field of the origin node determines the rail used — for example, `"type": "ETPAY"` for Chile or `"type": "PIX"` for Brazil. See [Nodes](../origins-and-destinations/nodes.md) for all available rails.

### Example

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "product": "CLP:CLP",
  "type": "TOPUP_ACCOUNT",
  "purchaseAmount": "100000",
  "purchaseCurrency": "CLP",
  "currency": "CLP",
  "origins": [
    {
      "type": "ETPAY",
      "currency": "CLP",
      "etpay": {
        "successUrl": "https://yourapp.com/success",
        "failedUrl": "https://yourapp.com/failed",
        "customer": {
          "firstName": "John",
          "email": "john@example.com"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "CLP",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER>" }
    }
  ]
}
```

### Ownership

Only the account owner can initiate a top-up.

### Settlement Time

Settlement time depends on the payment rail. Instant rails (e.g., PIX) settle in seconds. Open banking rails (e.g., ETPAY) may take a few minutes after bank authorization.

### Bulk Payments

Bulk payments are **not supported** for `TOPUP_ACCOUNT`.

### Available Origins by Region

| Region        | Rail          | Type          |
| -------------: | -------------: | -------------: |
| Chile      | Open banking  | `ETPAY`       |
| Chile      | Open banking  | `FINTOC`      |
| Chile      | Card          | `WEBPAY`      |
| Brazil     | Instant QR    | `PIX`         |
| Argentina  | QR Transfer   | `PCT`         |
| Colombia   | Bank transfer | `PSE`         |
| Colombia   | Direct bank   | `BANCOLOMBIA` |
| Colombia   | Direct bank   | `DAVIVIENDA`  |
| Colombia   | Wallet        | `DAVIPLATA`   |
| Colombia   | Wallet        | `NEQUI`       |
| Colombia   | Gateway       | `WOMPI`       |
| Peru       | QR            | `LIGO`        |
| Peru       | Interbank     | `SIP`         |
| Bolivia    | Interbank     | `SIP`         |
| USA        | Bank transfer | `ACH`         |
| USA        | Instant bank  | `FEDNOW`      |
| USA        | Real-time     | `RTP`         |

### Available Destinations

`TOPUP_ACCOUNT` credits internal balances only:

| Destination | Type |
| -----------: | ----: |
| Internal account | `ACCOUNT` |
