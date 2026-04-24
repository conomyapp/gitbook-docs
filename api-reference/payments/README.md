---
layout:
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
---

# Payments

{% columns fullWidth="true" %}
{% column %}
The Payments API lets you initiate, track, and manage the lifecycle of a payment — from defining the flow to receiving real-time updates.

It provides a structured way to move funds from one or more origins to one or more destinations. Begin by defining the source and destination, optionally validate with a payment-attempt, and then create the payment. The platform drives the authorize → capture → receive → settle transitions automatically based on the provider; your integration reacts to webhooks at each step.

Use this section to:

* Define origins and destinations.
* Validate a payment via a payment-attempt before execution.
* Create payments and track their lifecycle.
* Issue refunds, assign unassigned balances, and attach compliance documents.
* Handle asynchronous provider notifications through webhooks.
{% endcolumn %}

{% column %}
{% code title="Discovery" overflow="wrap" %}
```http
GET  /payments/banks/{country}
GET  /payments/available-products
GET  /payment-origins
GET  /payment-destinations
```
{% endcode %}

{% code title="Lifecycle" overflow="wrap" %}
```http
POST /payment-attempts
GET  /payment-attempts
GET  /payment-attempts/:id
POST /payments
GET  /payments
GET  /payments/:id
```
{% endcode %}

{% code title="Operations" overflow="wrap" %}
```http
POST /payments/:id/refund
GET  /payments/:id/refund
POST /payments/:id/assign
POST /payments/:id/documents
GET  /payments/:id/customer
```
{% endcode %}

{% code title="Webhooks" overflow="wrap" %}
```http
POST client-url
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% hint style="info" %}
Recommended flow: discovery (`available-products`) → `payment-attempt` (optional) → `POST /payments` → webhook-driven lifecycle updates.
{% endhint %}

## Explore Endpoints

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="banks.md" %}
[🏦 Banks](banks.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="products.md" %}
[🧩 Products](products.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="origins-and-destinations.md" %}
[🧭 Origins and destinations](origins-and-destinations.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="payment-attempts.md" %}
[🧪 Payment attempts](payment-attempts.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="payments.md" %}
[💸 Payments](payments.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="payment-links.md" %}
[🔗 Payment links](payment-links.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="checkout-session.md" %}
[🛒 Checkout session](checkout-session.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="webhooks.md" %}
[🪝 Webhooks](webhooks.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% openapi-schemas spec="conomyhq-api" schemas="payment" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}

{% openapi-schemas spec="conomyhq-api" schemas="fee" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
