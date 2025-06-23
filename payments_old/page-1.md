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

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>Step-by-step with payment attempts</strong></td><td><p></p><p>This flow gives you maximum flexibility and control over the payment process. It's perfect when you want to:</p><ul><li>Let users explore different payment methods.</li><li>Handle complex payment scenarios.</li><li>Build your own payment interface.</li></ul></td></tr><tr><td><strong>Direct payment creation</strong></td><td><p></p><p>This simplified flow is ideal when you:</p><ul><li>Already know all payment details.</li><li>Want to create and process payments quickly.</li><li>Need a straightforward payment process.</li></ul></td></tr></tbody></table>

### Payment Components

Every payment in our system consists of these key elements:

* **Origins**: Where the money comes from (e.g., bank account, card, crypto wallet).
* **Destinations**: Where the money goes.
* **Amounts**: Original and final amounts (including fees).
* **Fees**: Transaction costs.
* **Exchange Rates**: When currency conversion is involved.

Let's move forward to the next step, where we’ll dive into creating your first payment, [click here! ✌️](quickstart.md).

