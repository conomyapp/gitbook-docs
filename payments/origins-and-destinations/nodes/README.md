---
description: Every payment needs at least one origin and one destination. This page explains what nodes are, how they work, and which rail to use for each country.
---

# Nodes

A **node** represents a payment endpoint — either where money comes from (origin) or where it goes (destination). Each node has a `type` that identifies the payment rail, and a matching sub-object with the details specific to that rail.

## How nodes work

Every payment you create includes an `origins` array and a `destinations` array. Each element in those arrays is a node:

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

The rule is simple: the `type` field must always be in uppercase, and there must be a matching camelCase sub-object with the same name. For example, `"type": "SPEI"` requires a `spei: {}` object.

## Node structure

| Field | Type | Description |
|---|---|---|
| `type` | `string` | The rail identifier in uppercase (e.g., `"PIX"`, `"ACH"`, `"SEPA"`) |
| `currency` | `string` | `ISO 4217` currency code (e.g., `"BRL"`, `"USD"`, `"EUR"`) |
| `amount` | `string` | Amount in the smallest currency unit (e.g., cents) |
| `<rail>` | `object` | Rail-specific data object — name matches `type` in camelCase |

## Rail summary

Choose your rail based on country and direction:

| Rail | Country | Currency | Direction | Type |
|---|---|---|---|---|
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
| [PAGO\_MOVIL](pago-movil.md) | Venezuela | VES | Pay-in | Mobile payment |
| [ACH](ach.md) | USA | USD | Pay-in / Pay-out | Bank transfer |
| [WIRE](wire.md) | USA | USD | Pay-out | Wire transfer |
| [FEDNOW](fednow.md) | USA | USD | Pay-in / Pay-out | Instant payment |
| [RTP](rtp.md) | USA | USD | Pay-in | Instant payment |
| [SEPA](sepa.md) | Europe | EUR | Pay-out | Bank transfer |
| [SWIFT](swift.md) | International | Multi | Pay-out | Wire transfer |
| [FPE](fpe.md) | UK | GBP | Pay-out | Faster Payments |
| [ACCOUNT](account.md) | Any | Multi | Pay-in / Pay-out | Platform account |
| [BANK\_ACCOUNT](bank-account.md) | Any | Multi | Pay-out | Generic bank |

## The customer object

Most rails require a `customer` object nested inside the rail sub-object. It carries the end-user's identity for compliance and routing:

| Field | Type | Description |
|---|---|---|
| `firstName` | `string` | First name |
| `lastName` | `string` | Last name |
| `email` | `string` | Email address |
| `phoneNumber` | `string` | Phone number (digits only, no prefix) |
| `phoneNumberPrefix` | `string` | Country calling code (e.g., `"54"`) |
| `documentNumber` | `string` | National ID or tax number |
| `documentType` | `string` | Document type (e.g., `"CPF"`, `"DNI"`, `"CC"`) |
| `country` | `string` | `ISO 3166-1 alpha-2` country code (e.g., `"BR"`, `"MX"`) |
| `address` | `object` | Address object — required by some rails |

## What happens after you submit

For **redirect-based rails** (PIX, PCT, ETPAY, WEBPAY, WOMPI, PSE, BANCOLOMBIA, DAVIVIENDA), the API response includes a `url` or `qrCode` in the node's response object. You redirect your user there to complete the payment.

For **direct rails** (ACH, SEPA, SPEI pay-out, FPE, WIRE, SWIFT), funds move directly to the destination account without user interaction.

The payment status transitions from `CREATED` → `PENDING` → `COMPLETED` (or `FAILED`). You can track this via the [payment status page](../../transaction-status.md) or via [webhooks](../../../api-reference/payments/webhooks.md).
