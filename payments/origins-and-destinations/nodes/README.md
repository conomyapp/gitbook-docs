---
description: Every payment needs at least one origin and one destination. This page explains what nodes are, how they work, and which rail to use for each country.
layout:
  width: full
---

# Nodes

A **node** represents a payment endpoint: either where money comes from (origin) or where it goes (destination). Each node has a `type` that identifies the payment rail and a matching sub-object with the rail-specific fields.

## How nodes work

Every payment includes an `origins` array and a `destinations` array. Each element in those arrays is a node.

```json
{
  "origins": [
    {
      "type": "PIX",
      "currency": "BRL",
      "pix": {
        "customer": {
          "firstName": "João",
          "lastName": "Silva",
          "email": "joao@example.com",
          "documentNumber": "12345678901"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "BRL",
      "account": {
        "accountNumber": "acc_123"
      }
    }
  ]
}
```

Rule: `type` is uppercase and the payload object matches it in camelCase. Example: `"type": "SPEI"` requires `spei: {}`.

## Node structure

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Rail identifier in uppercase (for example `"PIX"`, `"ACH"`, `"SEPA"`). |
| `currency` | `string` | `ISO 4217` currency code (for example `"BRL"`, `"USD"`, `"EUR"`). |
| `amount` | `string` | Amount in the smallest currency unit (for example, cents). |
| `railPayload` | `object` | Rail-specific object. Name must match `type` in camelCase. |

## Rail summary

Choose the rail by country, currency, and direction.

| Rail | Country | Currency | Direction | Type |
| --- | --- | --- | --- | --- |
| [CRYPTO](crypto.md) | Global | USDC, USDT (network-dependent) | Pay-in / Pay-out | Wallet transfer |
| [PIX](pix.md) | Brazil | BRL | Pay-in / Pay-out | Redirect / QR |
| [PCT](pct.md) | Argentina | ARS | Pay-in | QR |
| [CVU](cvu.md) | Argentina | ARS | Pay-in | Bank transfer |
| [ETPAY](etpay.md) | Chile | CLP | Pay-in | Redirect |
| [FINTOC](fintoc.md) | Chile | CLP | Pay-in | Open banking |
| [WEBPAY](webpay.md) | Chile | CLP | Pay-in | Redirect |
| [SPEI](spei.md) | Mexico | MXN | Pay-in / Pay-out | Bank transfer |
| [PSE](pse.md) | Colombia | COP | Pay-in | Redirect |
| [BANCOLOMBIA](bancolombia.md) | Colombia | COP | Pay-in | Redirect |
| [DAVIVIENDA](davivienda.md) | Colombia | COP | Pay-in | Redirect |
| [DAVIPLATA](daviplata.md) | Colombia | COP | Pay-in / Pay-out | Wallet |
| [NEQUI](nequi.md) | Colombia | COP | Pay-in / Pay-out | Wallet |
| [BREB](breb.md) | Colombia | COP | Pay-out | Bank transfer |
| [WOMPI](wompi.md) | Colombia | COP | Pay-in | Redirect |
| [PAGO_MOVIL](pago-movil.md) | Venezuela | VES | Pay-in | Mobile payment |
| [ACH](ach.md) | USA | USD | Pay-in / Pay-out | Bank transfer |
| [WIRE](wire.md) | USA | USD | Pay-out | Wire transfer |
| [FEDNOW](fednow.md) | USA | USD | Pay-in / Pay-out | Instant payment |
| [RTP](rtp.md) | USA | USD | Pay-in | Instant payment |
| [SEPA](sepa.md) | Europe | EUR | Pay-out | Bank transfer |
| [SWIFT](swift.md) | International | Multi | Pay-out | Wire transfer |
| [FPE](fpe.md) | UK | GBP | Pay-out | Faster Payments |
| [ACCOUNT](account.md) | Any | Multi | Pay-in / Pay-out | Platform account |
| [BANK_ACCOUNT](bank-account.md) | Any | Multi | Pay-out | Generic bank |

## The `customer` object

Most rails require a `customer` object nested inside the rail object for compliance and routing.

| Field | Type | Description |
| --- | --- | --- |
| `firstName` | `string` | First name. |
| `lastName` | `string` | Last name. |
| `email` | `string` | Email address. |
| `phoneNumber` | `string` | Phone number (digits only, no prefix). |
| `phoneNumberPrefix` | `string` | Country calling code (for example `"54"`). |
| `documentNumber` | `string` | National ID or tax number. |
| `documentType` | `string` | Document type (for example `"CPF"`, `"DNI"`, `"CC"`). |
| `country` | `string` | `ISO 3166-1 alpha-2` country code (for example `"BR"`, `"MX"`). |
| `address` | `object` | Address object (required by some rails). |

## What happens after submission

For redirect rails (`PIX`, `PCT`, `ETPAY`, `WEBPAY`, `WOMPI`, `PSE`, `BANCOLOMBIA`, `DAVIVIENDA`), the API response includes a `url` or `qrCode` inside the node response object. Your user must complete the flow there.

For direct rails (`ACH`, `SEPA`, `SPEI` pay-out, `FPE`, `WIRE`, `SWIFT`, `CRYPTO`), funds move directly to the destination account or wallet.

A payment usually transitions `CREATED` -> `PENDING` -> `COMPLETED` (or `FAILED`). Track this in [payment status](../../transaction-status.md) or through [webhooks](../../../api-reference/payments/webhooks.md).
