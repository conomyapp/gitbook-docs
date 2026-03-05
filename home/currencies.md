---
description: >-
  We support a variety of fiat and crypto currencies, enabling seamless
  transactions across multiple networks and regions.
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
---

# Currencies

At **conomy\_hq**, we support both fiat and cryptocurrencies across different payment networks. Fiat currencies follow the ISO 4217 standard. Cryptocurrencies are identified by token code; the network is specified in the payment node configuration.

---

### Supported Fiat Currencies

| Code  | Currency              | Region                |
| ----- | --------------------- | --------------------- |
| `CLP` | Chilean Peso          | Chile            |
| `MXN` | Mexican Peso          | Mexico           |
| `COP` | Colombian Peso        | Colombia         |
| `PEN` | Peruvian Sol          | Peru             |
| `BOB` | Bolivian Boliviano    | Bolivia          |
| `PYG` | Paraguayan Guaraní    | Paraguay         |
| `AUD` | Australian Dollar     | Australia        |
| `ARS` | Argentine Peso        | Argentina        |
| `BRL` | Brazilian Real        | Brazil           |
| `USD` | United States Dollar  | USA              |
| `CAD` | Canadian Dollar       | Canada           |
| `EUR` | Euro                  | Europe           |
| `GBP` | British Pound         | United Kingdom   |

### Supported Crypto Currencies

| Code    | Description                     |
| ------- | ------------------------------- |
| `USDC`  | USD Coin (network specified in payment node)  |
| `USDT`  | Tether (network specified in payment node)    |

---

### Payment Rails by Region

Each currency is processed through a specific payment rail. The rail determines the transfer speed and requirements.

| Rail          | Currency | Region          | Description                                    |
| ------------- | -------- | --------------- | ---------------------------------------------- |
| `PIX`         | `BRL`    | Brazil     | Brazilian instant payment system               |
| `PCT`         | `ARS`    | Argentina  | BCRA interoperable QR transfer standard        |
| `CVU`         | `ARS`    | Argentina  | Virtual account / CBU bank transfers           |
| `SPEI`        | `MXN`    | Mexico     | Electronic Interbank Payment System            |
| `ETPAY`       | `CLP`    | Chile      | Open banking pay-in                            |
| `FINTOC`      | `CLP`    | Chile      | Open banking pay-in via Fintoc widget          |
| `WEBPAY`      | `CLP`    | Chile      | Card payments via Transbank                    |
| `PSE`         | `COP`    | Colombia   | Online secure bank transfers                   |
| `BANCOLOMBIA` | `COP`    | Colombia   | Bancolombia direct payment                     |
| `DAVIVIENDA`  | `COP`    | Colombia   | Davivienda direct payment                      |
| `DAVIPLATA`   | `COP`    | Colombia   | Daviplata mobile wallet                        |
| `NEQUI`       | `COP`    | Colombia   | Nequi digital wallet                           |
| `BREB`        | `COP`    | Colombia   | Bank account transfer (payout)                 |
| `LIGO`        | `PEN`    | Peru       | QR-based payment system                        |
| `SIP`         | `PEN`    | Peru       | Interoperable payment system                   |
| `SIP`         | `BOB`    | Bolivia    | Interoperable payment system                   |
| `ACH`         | `USD`    | USA        | Automated Clearing House bank transfers        |
| `WIRE`        | `USD`    | USA        | Wire transfer via correspondent banks          |
| `FEDNOW`      | `USD`    | USA        | FedNow instant payment service                 |
| `RTP`         | `USD`    | USA        | Real-time payments network                     |
| `SEPA`        | `EUR`    | Europe     | Single Euro Payments Area                      |
| `FPE`         | `GBP`    | UK         | Faster Payments (near-instant bank transfers)  |
| `SWIFT`       | Multi    | Global      | International bank wire transfers              |

---

### Products by Currency

| Code           | Payments | Accounts |
| -------------- | -------- | -------- |
| `CLP`          |        | CHL   |
| `MXN`          |        | MEX   |
| `COP`          |        | COL   |
| `PEN`          |        | PER   |
| `BOB`          |        | BOL   |
| `PYG`          |        | -     |
| `AUD`          |        | -     |
| `ARS`          |        | ARG   |
| `BRL`          |        | BRA   |
| `USD`          |        | -     |
| `CAD`          |        | -     |
| `EUR`          |        | -     |
| `GBP`          |        | -     |
| `USDC`         |        |        |
| `USDT`         |        |        |

---

### Need Another Currency?

If you need a currency that's not listed, contact us at [hola@conomyhq.com](mailto:hola@conomyhq.com).
