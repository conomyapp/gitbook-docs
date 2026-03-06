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
    visible: false
---

# Overview

Welcome to our Payments API! This guide will help you understand how to integrate payments into your application. Our flexible API allows you to create payments in two ways: using a step-by-step approach with payment attempts, or creating complete payments directly.

### Getting started

Before you begin, make sure you have:

1. Your API credentials (`x-api-key` and `bearer token`).
2. Completed the authentication process.
3. Created an identity for your user.

### Understanding payment flows

We offer two main approaches to handling payments. Choose the one that best fits your needs:


| Column1 | Column2 |
| --- | --- |
| **Step-by-step with payment attempts** | This flow gives you maximum flexibility and control over the payment process. It's perfect when you want to:<br>- Let users explore different payment methods.<br>- Handle complex payment scenarios.<br>- Build your own payment interface. |
| **Direct payment creation** | This simplified flow is ideal when you:<br>- Already know all payment details.<br>- Want to create and process payments quickly.<br>- Need a straightforward payment process. |


### Payment Components

Every payment in our system consists of these key elements:

* `Origins`: Where the money comes from (e.g., bank account, card, crypto wallet).
* `Destinations`: Where the money goes.
* `Amounts`: Original and final amounts (including fees).
* `Fees`: Transaction costs.
* **Exchange Rates**: When currency conversion is involved.

Let's move forward to the next step, where we’ll dive into creating your first payment, [click here! ✌️](quickstart.md).

