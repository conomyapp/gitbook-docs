# Products

{% columns fullWidth="true" %}
{% column %}
Products represent the payment methods and financial instruments available for processing transactions on the platform.

Each product defines a specific payment rail or mechanism — such as a bank transfer, card payment, or wallet — that can be used when creating payment attempts or checkout sessions.

Use the Products API to retrieve the list of available products for a given configuration or context.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments/available-products
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payments/available-products" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
