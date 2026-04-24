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
description: Shared vocabulary used across the conomy_hq platform — entities, transaction types, statuses, and roles.
---

# Glossary

Shared vocabulary used across the `conomy_hq` platform.

---

## Core entities

| Term | Definition |
| --- | --- |
| **Identity** | The entity initiating a transaction — a `USER` or an `ORGANIZATION`. See [Identities](../api-reference/identities.md). |
| **Account** | An internal balance held inside the platform. Every payment has at least one `ACCOUNT` as origin or destination. See [Accounts](../api-reference/accounts.md). |
| **Customer** | The end user whose money moves through the platform. Customers persist across payments and accumulate documentation over time. See [Customers](../api-reference/customers.md). |
| **Payment** | A single movement of funds with an `origin`, a `destination`, a `type`, and a `product`. Payments transition through a lifecycle of statuses. See [Payment structure](../payments/payment-structure.md). |
| **Payment attempt** | A pre-created payment reservation that has not yet received funds. Common on rails where the payer completes the transfer asynchronously (CVU, PIX). |
| **Transaction** | Generic term for any unit of funds movement on the platform. A `Refund` is a transaction; a `Topup` is a transaction. Used interchangeably with `Payment` in most contexts. |

---

## Transaction types

| Type | Direction | Purpose |
| --- | --- | --- |
| `TOPUP_ACCOUNT` | Pay-in | Add funds to an internal account from an external rail. |
| `WITHDRAWAL_ACCOUNT` | Pay-out | Send funds from an internal account to an external rail. |
| `REMITTANCE` | Cross-border | Send funds from one country to another, typically with FX. |
| `PURCHASE` | Pay-in | Collect funds from an end user — used with checkout and payment links. |
| `P2P` | Internal | Transfer between two internal accounts. |
| `COLLECT` | Internal | Aggregate funds across multiple internal accounts into one. |
| `FEE` | Internal | Fee line item attached to a parent transaction. |
| `REFUND` | Reversal | Reverses a previously settled payment. Child transaction linked to a parent via `parentPaymentId`. |
| `LOCAL_DEPOSIT` | Pay-in | Internal type for a topup that has not yet been reconciled against a destination account. |

---

## Transaction statuses

| Status | Meaning |
| --- | --- |
| `CREATED` | Payment was created. No funds have moved yet. |
| `AUTHORIZED` | Funds are reserved but not captured. Applies to flows that require pre-authorization. |
| `CAPTURED` | Funds were captured from the origin. |
| `RECEIVED` | The provider confirmed the transfer on their end. |
| `SETTLED` | Funds are fully reconciled and available in the destination account. |
| `REQUIRES_REVIEW` | Payment is blocked pending compliance documentation. See [Review flow](../compliance/review-flow.md). |
| `EXPIRED` | Payment was not completed within its expiry window. |
| `FAILED` | Payment failed and will not settle. |
| `DISPUTED` | A dispute has been opened against the payment. |
| `REVERSED` | Payment was canceled before settlement. |

---

## Compliance terms

| Term | Definition |
| --- | --- |
| **Operation level** | A Customer tier — `INACTIVE` → `BASIC` → `STANDARD` → `FULL` — that controls per-transaction amount limits and the review gate. See [Customer operation levels](../compliance/operation-levels.md). |
| **Documented customer** | A customer with at least one `APPROVED` document. Documented customers bypass the review gate. |
| **Review gate** | The `REQUIRES_REVIEW` state applied when a transaction crosses its compliance threshold and the customer is not yet documented. |
| **Originante** | The payer initiating a topup from their bank. The originante's identity data (name, document number) is captured on inbound transfers and surfaced on the payment. |
| **KYC** | Know Your Customer — identity verification required before a customer is considered documented. |

---

## Rails and nodes

| Term | Definition |
| --- | --- |
| **Rail** | An external payment network — PIX, CVU, ACH, SEPA, etc. Each rail is represented as a **node** type in the API. |
| **Node** | An element of a payment's `origins` or `destinations` array. Every node has a `type` (the rail identifier) and a rail-specific sub-object. See [Origins and destinations](../payments/origins-and-destinations/README.md). |
| **Payment node** | Synonym for **node**. |
| **Pay-in rail** | A rail used to bring funds into the platform (CVU, PIX, ETPAY, etc.). |
| **Pay-out rail** | A rail used to send funds out of the platform (BANK_ACCOUNT, SPEI, ACH, etc.). |
| **Static CVU** | A fixed CVU code assigned to an identity. Topups to this code require manual reconciliation against an account. |
| **Dynamic CVU** | A unique CVU code allocated per payment attempt. Topups to this code auto-match the attempt. See [CVU](../payments/origins-and-destinations/cvu.md). |

---

## Other terms

| Term | Definition |
| --- | --- |
| **Product** | A currency pair in the form `purchaseCurrency:currency` (for example `ARS:USD`). Identifies the FX leg of a payment. |
| **Tenant** | A client on the platform. Every API call is scoped to a tenant via `clientId`. |
| **Webhook** | HTTP callback the platform sends to your endpoint when a transaction changes state. See [Webhooks](../api-reference/payments/webhooks.md). |
| **Idempotency** | The platform deduplicates inbound rail notifications internally by `(provider, providerReference)`. Client-side idempotency keys are not supported on payment creation. |
