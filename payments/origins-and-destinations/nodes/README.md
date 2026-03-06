---
description: Payment nodes define origins and destinations for each payment rail.
layout:
  width: full
---

# Nodes

A node is a payment endpoint. It can be an origin (where funds come from) or a destination (where funds go).

Each node has:

- `type`: rail identifier in uppercase.
- `currency`: ISO 4217 currency code.
- A rail payload object whose name matches `type` in camelCase.

Example:

- `type: "SPEI"` -> payload object `spei: {}`.

## How nodes work

Every payment includes `origins` and `destinations` arrays. Each array item is a node.

```json
{
  "origins": [
    {
      "type": "PIX",
      "currency": "BRL",
      "pix": {
        "customer": {
          "firstName": "Joao",
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

## Base node fields

- `type` (`string`): rail identifier in uppercase (for example `PIX`, `ACH`, `SEPA`).
- `currency` (`string`): ISO 4217 code (for example `BRL`, `USD`, `EUR`).
- `amount` (`string`): amount in the smallest currency unit.
- `railPayload` (`object`): rail-specific object matching the `type`.

## Rail summary

- [CRYPTO](crypto.md): Global, USDC/USDT, pay-in and pay-out.
- [PIX](pix.md): Brazil, BRL, pay-in and pay-out.
- [PCT](pct.md): Argentina, ARS, pay-in.
- [CVU](cvu.md): Argentina, ARS, pay-in.
- [ETPAY](etpay.md): Chile, CLP, pay-in.
- [FINTOC](fintoc.md): Chile, CLP, pay-in.
- [WEBPAY](webpay.md): Chile, CLP, pay-in.
- [SPEI](spei.md): Mexico, MXN, pay-in and pay-out.
- [PSE](pse.md): Colombia, COP, pay-in.
- [BANCOLOMBIA](bancolombia.md): Colombia, COP, pay-in.
- [DAVIVIENDA](davivienda.md): Colombia, COP, pay-in.
- [DAVIPLATA](daviplata.md): Colombia, COP, pay-in and pay-out.
- [NEQUI](nequi.md): Colombia, COP, pay-in and pay-out.
- [BREB](breb.md): Colombia, COP, pay-out.
- [WOMPI](wompi.md): Colombia, COP, pay-in.
- [PAGO_MOVIL](pago-movil.md): Venezuela, VES, pay-in.
- [ACH](ach.md): USA, USD, pay-in and pay-out.
- [WIRE](wire.md): USA, USD, pay-out.
- [FEDNOW](fednow.md): USA, USD, pay-in and pay-out.
- [RTP](rtp.md): USA, USD, pay-in.
- [SEPA](sepa.md): Europe, EUR, pay-out.
- [SWIFT](swift.md): International, multi-currency, pay-out.
- [FPE](fpe.md): UK, GBP, pay-out.
- [ACCOUNT](account.md): platform account, pay-in and pay-out.
- [BANK_ACCOUNT](bank-account.md): generic bank account, pay-out.

## Customer object

Many rails require a `customer` object inside the rail payload.

- `firstName` (`string`)
- `lastName` (`string`)
- `email` (`string`)
- `phoneNumber` (`string`)
- `phoneNumberPrefix` (`string`)
- `documentNumber` (`string`)
- `documentType` (`string`)
- `country` (`string`, ISO 3166-1 alpha-2)
- `address` (`object`)

## After submission

For redirect rails (`PIX`, `PCT`, `ETPAY`, `WEBPAY`, `WOMPI`, `PSE`, `BANCOLOMBIA`, `DAVIVIENDA`), the response includes a `url` or `qrCode` and the end user must complete the flow.

For direct rails (`ACH`, `SEPA`, `SPEI` pay-out, `FPE`, `WIRE`, `SWIFT`, `CRYPTO`), funds are routed directly.

Payment status usually transitions from `CREATED` to `PENDING` to `COMPLETED` (or `FAILED`).

- See [payment status](../../transaction-status.md)
- See [webhooks](../../../api-reference/payments/webhooks.md)
