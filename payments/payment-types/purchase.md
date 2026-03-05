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

# Purchase

Represents a payment for goods or services provided by a client using `conomy_hq`.

Typically initiated via a payment link or external checkout method, this transaction allows third-party customers to send funds to a client's internal account.

| Field          | Value                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| `type`         | `PURCHASE`                                                                                                  |
| `origins`      | One external pay-in rail node (for example: `CARD`, `PIX`, `ETPAY`, `PSE`, `WOMPI`, `ACH`, `FEDNOW`)     |
| `destinations` | One or more internal `ACCOUNT` destinations (single merchant destination or split across multiple accounts) |

### Ownership

The payment is initiated by a third party (e.g., customer), not by the account owner. However, the account owner receives the funds. Only the account owner can configure or manage the receiving accounts.

### Settlement Time

The time it takes for the funds to become available in the internal account depends on the selected payment method.

### Bulk Payments

Bulk payments are **not supported** for `PURCHASE`.

### Available Origins by Region

| Region        | Rail          | Type          |
| ------------- | ------------- | ------------- |
| Global     | Card          | `CARD`        |
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

`PURCHASE` settles funds into internal balances:

| Destination | Type |
| ----------- | ---- |
| Internal account | `ACCOUNT` |
