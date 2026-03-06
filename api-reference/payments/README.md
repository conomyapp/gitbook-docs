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
The Payments API enables you to simulate, initiate, and manage the lifecycle of a payment—from defining the flow to receiving real-time updates.

It provides a structured way to move funds from one or more origins to one or more destinations using a chosen method. The flow begins with defining the source (payment-origins) and destination (payment-destinations), optionally proceeds with a payment-attempt for simulation or validation, and then transitions to a payment for actual execution.

Payments can follow multi-step flows including authorization, capture, and receipt confirmation depending on the provider and method. Each stage is explicitly controlled via the API. Once the payment is confirmed by the provider, final reconciliation is handled separately in a settlement layer.

To support real-time processing, the client-url webhook endpoint allows your system to receive updates when a payment transitions between states, such as being authorized, captured, received, or failed.

Use this section to:

* Define where money is coming from and going to.
* Simulate and validate a payment attempt before execution.
* Create, authorize, capture, and track payments.
* Handle asynchronous provider notifications through webhooks.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments/banks/{country}
GET /payments/available-products
GET /payment-origins
GET /payment-destinations
POST /payment-attempts
GET /payment-attempts
GET /payment-attempts/:id
GET /payments
GET /payments/:id
POST /payments
POST /payments/:id/authorized
POST /payments/:id/captured
POST /payments/:id/received
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
Recommended execution flow: `payment-origins/payment-destinations` → `payment-attempt` (optional) → `payment` lifecycle (`authorized`, `captured`, `received`) + webhook reconciliation.
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
