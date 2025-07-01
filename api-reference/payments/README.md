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
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144932Z&X-Amz-Expires=172800&X-Amz-Signature=16aefa96a9b978dc6cc71ccd31d3003992b9218aef5e2fe317dfb2dc8c89a5e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-schemas spec="conomyhq-api" schemas="Fee" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
