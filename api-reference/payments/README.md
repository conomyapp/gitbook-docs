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

{% openapi-schemas spec="conomyhq-api" schemas="payment" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-schemas spec="conomyhq-api" schemas="fee" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
