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
description: Argentina's virtual account identifier for bank transfers. Used for pay-in in Argentina.
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as an origin when collecting funds from an Argentine payer.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

CVU deposits are processed under the generic [push-deposit flow](../../push-deposits.md). The lifecycle, the webhooks and the refund rules are described in full there — this page documents the CVU-specific fields and the two allocation modes.

## Allocation modes

The `mode` field on the CVU node decides how the platform matches incoming transfers:

| Mode | Description |
| --- | --- |
| `dedicated` | Long-lived CVU assigned to the merchant. Multiple payers can deposit on the same identifier. Amount matching happens at `POST /payments/{id}/assign` time. |
| `dynamic` | Per-attempt CVU generated on demand. Strict 1:1 match with the payment-attempt that requested it. |

Both modes go through the same lifecycle — see [Push deposits](../../push-deposits.md) for the end-to-end state machine.

Whenever possible we recommend **dynamic** for checkout-style flows (known amount + known payer) and **dedicated** for merchant-inbox flows (recurring inflow, multiple payers on the same identifier).

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"CVU"` |
| `currency` | `string` | Must be `"ARS"` |

## Optional fields

| Field | Type | Description |
| --- | --- | --- |
| `cvu.code` | `string` | Optional CVU/CBU code when your flow already has a pre-assigned identifier (dedicated mode). |
| `cvu.mode` | `string` | `"dedicated"` or `"dynamic"`. Defaults to the client's configured allocation strategy. |
| `cvu.customer.firstName` | `string` | Payer's first name. Improves matching and powers underpaid/overpaid classification. |
| `cvu.customer.lastName` | `string` | Payer's last name. |
| `cvu.customer.email` | `string` | Payer's email. |
| `cvu.customer.documentNumber` | `string` | Argentine CUIT / CUIL / DNI number. |

Payer info is optional but strongly recommended: when it is present, we can match the deposit to the attempt before the funds land, detect under/overpayment automatically, and keep the `customer` record up to date across deposits.

## Example — dynamic CVU checkout

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {
    "mode": "dynamic",
    "customer": {
      "firstName": "Carlos",
      "lastName": "Nuevo",
      "email": "carlos@example.com",
      "documentNumber": "23111222331"
    }
  }
}
```

On creation, the response includes the allocated CVU under `cvu.code`. Show that code to your payer; any transfer to it settles as that attempt.

## Example — dedicated CVU inbox

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {
    "mode": "dedicated",
    "code": "0000003100012345678901"
  }
}
```

Dedicated flows do not generate a per-attempt code — `cvu.code` is the merchant identifier you already have assigned. Deposits land as unassigned payments until you call [`POST /payments/{id}/assign`](../../../api-reference/payments/payments.md#assignment-push-deposits).

## Valid destinations

When CVU is used as origin, the valid destinations are:

| Node | Description |
| --- | --- |
| `ACCOUNT` | Internal platform account |

## OpenAPI reference

- Spec: `conomyhq-api`
- Component: `cvu`
- Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
