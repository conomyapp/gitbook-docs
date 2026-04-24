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
description: Argentina's virtual account identifier for instant bank transfers. Used for pay-in in Argentina.
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as an origin when collecting funds from an Argentine payer.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

---

## Static CVU vs dynamic CVU

The platform supports two CVU allocation modes. The mode determines how an incoming transfer is matched to a transaction.

| Characteristic | **Static CVU** | **Dynamic CVU** |
| --- | --- | --- |
| Allocation | A fixed code assigned to a specific identity. Shared across all topups for that identity. | A unique code allocated per payment attempt. |
| Transfer matching | No automatic match — an unassigned payment is created and reconciled against an account on our side. | Automatic 1:1 match with the originating payment attempt. |
| Typical use case | Recurring topups, off-platform onboarding, bulk collection flows. | Checkout flows where payer identity and amount are known upfront. |
| Underpaid / overpaid classification | At reconciliation time. | Automatic, by comparing the received amount against the amount on the attempt. |

---

## Static CVU

A static CVU is a fixed code bound to an identity in your tenant. Every topup that arrives on that code creates an **unassigned** payment in `CREATED` state, with no `accountNumber` set.

### How topups arrive

1. The payer initiates an ARS transfer to the static CVU code.
2. The platform receives the transfer notification and creates an unassigned payment in `CREATED`.
3. A webhook fires so your dashboard can surface the pending item.
4. The payment is reconciled against a destination account on our side and transitions to `SETTLED`.
5. Webhook `payment.settled` fires.

### Expiry

A topup that is not reconciled within 48 hours expires automatically:

* A refund is initiated back to the originating bank account.
* A child `REFUND` transaction is created in `RECEIVED` state.
* The parent transitions to `EXPIRED` and a `payment.expired` webhook fires.

---

## Dynamic CVU

A dynamic CVU is allocated per payment attempt. When you create a payment attempt with `type: CVU` as the origin, the platform returns a unique CVU code for that specific transaction. The payer transfers to that code and the topup auto-matches.

### Creating a payment attempt with CVU

```json
{
  "purchaseAmount": "1500.00",
  "purchaseCurrency": "ARS",
  "origins": [
    {
      "type": "CVU",
      "currency": "ARS",
      "cvu": {
        "customer": {
          "firstName": "Juan",
          "lastName": "Perez",
          "documentNumber": "12345678",
          "documentType": "DNI"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "ARS",
      "account": {
        "accountNumber": "17733420419010021326597"
      }
    }
  ]
}
```

The response includes the allocated CVU code in `origins[0].cvu.code`. Display this code to the payer so they can initiate the bank transfer.

### Matching

When the topup arrives, the platform matches it to the attempt by CVU code. The attempt is promoted to `CREATED` and continues through the normal lifecycle toward `SETTLED`.

If the received amount differs from the expected amount, `purchase.overpaid` or `purchase.underpaid` fires alongside the lifecycle events.

---

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"CVU"` |
| `currency` | `string` | Must be `"ARS"` |

---

## Optional fields

| Field | Type | Description |
| --- | --- | --- |
| `cvu.code` | `string` | Pre-assigned CVU code for static mode. Omit when using dynamic allocation via a payment attempt. |
| `cvu.customer` | `object` | Customer data for the originante — used for automatic customer resolution on topup receipt. |
| `cvu.customer.firstName` | `string` | Originante's first name. |
| `cvu.customer.lastName` | `string` | Originante's last name. |
| `cvu.customer.documentNumber` | `string` | Originante's document number. |
| `cvu.customer.documentType` | `string` | Document type, e.g. `"DNI"`. |

---

## Valid destinations

| Node | Description |
| --- | --- |
| `ACCOUNT` | Internal platform account |

---

## Related

* [Compliance overview](../../compliance/README.md)
* [Review flow](../../compliance/review-flow.md)

## OpenAPI reference

* Spec: `conomyhq-api`
* Component: `cvu`
* Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
