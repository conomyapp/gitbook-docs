---
layout:
  width: default
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
  metadata:
    visible: true
  tags:
    visible: true
description: Reference for the payment-node entity, the rails available per country, and the valid origin and destination combinations per payment type.
---

# Origins and destinations

Every payment defines its flow of funds through `origins` (where the money comes from) and `destinations` (where the money goes). Each entry is a **payment-node**: a `type` plus a sub-object that carries the configuration for that rail.

Only one node sub-object should be present per payment-node, matching the selected `type`.

---

## Core fields

| Field | Description |
| --- | --- |
| `name` | Provider executing or receiving the payment. Defaults to `conomy_hq`. |
| `type` | Defines the rail. Drives which sub-object is required. |
| `amount` | Per-node amount. Required only when splitting funds across multiple nodes. |
| `currency` | ISO currency code. See [Currencies](../../home/currencies.md). |
| `identity` | Identity associated with the node — typically the account owner. |
| `{node}` | Rail-specific sub-object. Its key matches the `type` in camelCase (e.g. `"type": "PIX"` → `"pix": {...}`). |

---

## Available rails

Rails are grouped by country. Each rail page documents required fields, optional fields, an example, and valid destinations.

### Internal

| Type | Description |
| --- | --- |
| [`ACCOUNT`](account.md) | Internal `conomy_hq` account. Used as origin or destination on internal flows. |
| [`BANK_ACCOUNT`](bank-account.md) | External bank account. Used as a destination when no country-specific rail applies. |

### Argentina

| Type | Description | Direction |
| --- | --- | :---: |
| [`CVU`](cvu.md) | Bank transfer via the CVU rail | Pay-in |
| [`PCT`](pct.md) | QR transfer | Pay-in |

### Brazil

| Type | Description | Direction |
| --- | --- | :---: |
| [`PIX`](pix.md) | Instant payment | Pay-in / Pay-out |

### Chile

| Type | Description | Direction |
| --- | --- | :---: |
| [`ETPAY`](etpay.md) | Open banking | Pay-in |
| [`FINTOC`](fintoc.md) | Open banking via Fintoc | Pay-in |
| [`WEBPAY`](webpay.md) | Card payments via Transbank | Pay-in |

### Colombia

| Type | Description | Direction |
| --- | --- | :---: |
| [`BANCOLOMBIA`](bancolombia.md) | Direct bank transfer | Pay-in |
| [`BREB`](breb.md) | Bank payout | Pay-out |
| [`DAVIPLATA`](daviplata.md) | Wallet | Pay-in |
| [`DAVIVIENDA`](davivienda.md) | Direct bank transfer | Pay-in |
| [`NEQUI`](nequi.md) | Wallet | Pay-in |
| [`PSE`](pse.md) | Bank transfer | Pay-in |
| [`WOMPI`](wompi.md) | Gateway | Pay-in |

### Mexico

| Type | Description | Direction |
| --- | --- | :---: |
| [`SPEI`](spei.md) | CLABE transfer | Pay-out |

### USA

| Type | Description | Direction |
| --- | --- | :---: |
| [`ACH`](ach.md) | Bank transfer | Pay-in / Pay-out |
| [`FEDNOW`](fednow.md) | Instant bank | Pay-in / Pay-out |
| [`RTP`](rtp.md) | Real-time payments | Pay-in / Pay-out |
| [`WIRE`](wire.md) | Wire transfer | Pay-out |

### Venezuela

| Type | Description | Direction |
| --- | --- | :---: |
| [`PAGO_MOVIL`](pago-movil.md) | Mobile bank transfer | Pay-in |

### Europe & UK

| Type | Description | Direction |
| --- | --- | :---: |
| [`SEPA`](sepa.md) | IBAN transfer | Pay-out |
| [`FPE`](fpe.md) | UK Faster Payments | Pay-out |

### International

| Type | Description | Direction |
| --- | --- | :---: |
| [`SWIFT`](swift.md) | International wire transfer | Pay-out |

### Crypto

| Type | Description | Direction |
| --- | --- | :---: |
| [`CRYPTO`](crypto.md) | Crypto wallet | Pay-in / Pay-out |

---

## Valid combinations per payment type

| Payment type | Valid origins | Valid destinations |
| --- | --- | --- |
| `TOPUP_ACCOUNT` | Any pay-in rail | `ACCOUNT` |
| `WITHDRAWAL_ACCOUNT` | `ACCOUNT` | Any pay-out rail |
| `PURCHASE` | Any pay-in rail | `ACCOUNT` |
| `REMITTANCE` | `ACCOUNT` or any pay-in rail | Any pay-out rail |
| `P2P` | `ACCOUNT` | `ACCOUNT` |
| `COLLECT` | `ACCOUNT` | `ACCOUNT` |

---

## Rules

* If a payment has a single origin and a single destination, `amount` per node is optional — it defaults to the payment's `purchaseAmount`.
* If a payment has multiple origins or destinations, every node must carry an `amount` and the sums must equal `purchaseAmount`.
* Only the sub-object matching `type` is allowed on a node. Send `"type": "PIX"` together with `"pix": {...}` and nothing else.
