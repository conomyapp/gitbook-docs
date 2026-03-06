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
---

# Payment-attempts

{% columns fullWidth="true" %}
{% column %}
Payment attempts represent preliminary steps in a payment flow before actual authorization, capture, or settlement occurs.

They are used to simulate or stage a payment prior to executing a real transaction. Each attempt defines the intended origins, destinations, and method, allowing systems to validate or prepare the flow before the user completes the checkout process.

Use the Payment Attempts API to [create new or simulated attempts](payment-attempts.md#post-payment-attempts), [list all attempts](payment-attempts.md#get-payment-attempts), or [retrieve details](payment-attempts.md#get-payment-attempts-id) of a specific attempt.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /payment-attempts
GET /payment-attempts
GET /payment-attempts/:id
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
