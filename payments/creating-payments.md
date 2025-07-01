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

# Creating payments

A payment uses the transaction model. The model has several key elements that are essential for creating a payment.

### Key Elements

* **identityId**: The identity initiating the payment.
* **accountNumber**: The account number linked to the payment. It must be an account owned by the identity assigned in `identityId`.
* **type**: The [transaction types](payment-types/) as defined in the system.
* **purchaseAmount**: The amount before any fees are applied. A payment can be initiated using either `purchaseAmount` or `totalAmount`, but only one of the two should be provided.
* **purchaseCurrency**: The currency associated with `purchaseAmount`.
* **totalAmount**: The final amount after all fees have been applied. A payment can be initiated using either `purchaseAmount` or `totalAmount`, but only one of the two should be provided.
* **currency**: The currency associated with `totalAmount`.
* **product**: Defined as `purchaseCurrency:currency`.
* **origins**: Specifies the source of funds for the payment.
* **destinations**: Specifies the destination of the funds.

This structure ensures that payments are properly linked, calculated, and processed within the system.
