---
description: >-
  We offer our products in different countries. Let us know if you need us to
  expand to more countries!
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

# Countries

At `conomy_hq`, we help businesses grow globally. Below are the countries where we currently operate, along with the products available in each region. Country codes follow the `ISO 3166-1 alpha-3` standard.

{% hint style="info" %}
Country support can vary by `rail`, `currency`, and compliance configuration. Use `available-products` and `banks` endpoints to resolve runtime availability.
{% endhint %}

### Where We Operate

| Region         | Code                        | Payments     | Accounts     |
| --------------: | ---------------------------: | ------------: | ------------: |
| Chile          | `CHL`                       | `available` | `available` |
| Mexico         | `MEX`                       | `available` | `available` |
| Colombia       | `COL`                       | `available` | `available` |
| Brazil         | `BRA`                       | `available` | `available` |
| Argentina      | `ARG`                       | `available` | `available` |
| Peru           | `PER`                       | `available` | `available` |
| Bolivia        | `BOL`                       | `available` | `available` |
| Paraguay       | `PRY`                       | `available` | `not available` |
| Australia      | `AUS`                       | `available` | `not available` |
| Costa Rica     | `CRI`                       | `available` | `not available` |
| Dominican Republic | `DOM`                   | `available` | `not available` |
| Ecuador        | `ECU`                       | `available` | `not available` |
| Panama         | `PAN`                       | `available` | `not available` |
| Uruguay        | `URY`                       | `available` | `not available` |
| Venezuela      | `VEN`                       | `available` | `not available` |
| United States  | `USA`                       | `available` | `not available` |
| Canada         | `CAN`                       | `available` | `not available` |
| United Kingdom | `GBR`                       | `available` | `not available` |
| European Union | `FRA`, `DEU`, `ESP`, etc.   | `available` | `not available` |
| China          | `CHN`                       | `available` | `not available` |
| Hong Kong      | `HKG`                       | `available` | `not available` |

### Payment Rails per Country

Each country supports specific payment rails for moving funds in and out of the platform.

| Country        | Pay-in Rails                                        | Payout Rails                      |
| --------------: | ---------------------------------------------------: | ---------------------------------: |
| Chile      | `ETPAY`, `FINTOC`, `WEBPAY`                         | `BANK_ACCOUNT`                    |
| Mexico     | —                                                   | `SPEI`                            |
| Colombia   | `PSE`, `BANCOLOMBIA`, `DAVIVIENDA`, `DAVIPLATA`, `NEQUI` | `BREB`, `BANK_ACCOUNT`               |
| Brazil     | `PIX`                                               | `PIX`                             |
| Argentina  | `PCT`                                               | `CVU`, `BANK_ACCOUNT`             |
| Peru       | `LIGO`, `SIP`                                       | `BANK_ACCOUNT`                    |
| Bolivia    | `SIP`                                               | `BANK_ACCOUNT`                    |
| Paraguay   | —                                                   | `BANK_ACCOUNT`                    |
| Australia  | —                                                   | `BANK_ACCOUNT`                    |
| Costa Rica | —                                                   | `BANK_ACCOUNT`                    |
| Dominican Republic | —                                           | `BANK_ACCOUNT`                    |
| Ecuador    | —                                                   | `BANK_ACCOUNT`                    |
| Panama     | —                                                   | `BANK_ACCOUNT`                    |
| Uruguay    | —                                                   | `BANK_ACCOUNT`                    |
| Venezuela  | —                                                   | `BANK_ACCOUNT`                    |
| USA        | —                                                   | `ACH`, `WIRE`, `FEDNOW`, `RTP`    |
| Canada     | —                                                   | `BANK_ACCOUNT`, `SWIFT`           |
| UK         | —                                                   | `FPE`, `SEPA`, `SWIFT`            |
| Europe     | —                                                   | `SEPA`, `SWIFT`                   |
| China      | —                                                   | `SWIFT`                           |
| Hong Kong  | —                                                   | `SWIFT`                           |

### Need Another Country?

If you need our services in a country not listed here, reach out at [hola@conomyhq.com](mailto:hola@conomyhq.com). We're always open to expanding.

{% content-ref url="currencies.md" %}
[💱 View supported currencies](currencies.md)
{% endcontent-ref %}
