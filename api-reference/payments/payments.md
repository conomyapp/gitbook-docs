# Payments

{% columns fullWidth="true" %}
{% column %}
Payments represent the intent and execution of moving funds from one or more origins to one or more destinations using a defined method.

Each payment moves through a lifecycle that may include optional authorization and capture stages before final confirmation by the payment provider. Payments are linked to prior attempts and become the definitive execution step once initiated.

A payment can be authorized (reserved but not yet charged), captured (confirmed for collection), and marked as received when the provider notifies that the payment was successful. Final reconciliation (settled) occurs in a separate stage and is managed by a different set of APIs.

Use the Payments API to create payments, retrieve them, or transition them through their authorization, capture, and received stages.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments
GET /payments/:id
POST /payments
POST /payments/:id/authorized
POST /payments/:id/captured
POST /payments/:id/received
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/authorized" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/captured" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/received" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
