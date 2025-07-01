---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
---

# Transaction status

#### **ATTEMPT**

Represents an initial attempt to process a transaction. At this stage, no payment is initiated, nor are pre-registrations or pre-authorizations issued. This step is optional in the payment flow.

* **Endpoint:** [`/payment-attempts`](broken-reference)

#### **PENDING**

Indicates that the transaction has been initiated. If a pre-authorization or pre-registration is required, it is provided at this stage. This step is mandatory for further processing.

* **Endpoint:** [`/payments`](broken-reference)

#### **AUTHORIZED**

Used to reserve funds in payment methods that support fund reservation. At this stage, funds are held but not yet captured by the payment provider. This step is optional in the payment flow.

* **Endpoint:** [`/payments/{id}/authorized`](broken-reference)

#### **CAPTURED**

The instruction to capture the payment is sent to the payment provider. While the funds have not yet arrived in the destination account, the payment request has been successfully processed. This step is mandatory for further processing.

* **Endpoint:** [`/payments/{id}/captured`](broken-reference)

#### **RECEIVED**

The payment provider confirms that the funds have been successfully transferred to the destination account. The transaction is considered complete, but **conomy\_hq** still needs to validate the payment internally through a reconciliation process.

* **Endpoint:** [`/payments/received/{payment-provider}`](broken-reference)

#### **SETTLED**

Thee payment has been successfully received by the payment provider and has been reconciled with **conomy\_hq**'s internal payment and account systems. This status confirms that the funds are verified, matched, and fully available within the platform.

#### **FAILED**

Indicates that the transaction has failed due to an error or rejection during the payment process.

#### **REFUNDED**

The transaction has been reversed, returning the funds to the original source.

#### Transaction Status

| State      | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| ATTEMPT    | Initial transaction attempt, no payment initiated                          |
| PENDING    | Transaction initiated, pre-registration/pre-authorization issued if needed |
| AUTHORIZED | Funds reserved but not yet captured                                        |
| CAPTURED   | Payment instruction sent to provider, funds not yet settled                |
| RECEIVED   | Payment provider confirms fund transfer to destination account             |
| SETTLED    | After the settlement process take place                                    |
| FAILED     | Transaction failed                                                         |
| REFUNDED   | Transaction reversed and funds returned                                    |
