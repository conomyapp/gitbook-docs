# Payment Links

{% columns fullWidth="true" %}
{% column %}
Payment links are shareable URLs that allow payers to complete a payment without requiring a direct API integration.

Each payment link is associated with a product, amount, and configured payment method. Links can be activated, shared with customers, and used to initiate checkout sessions. They can also be deactivated or deleted when no longer needed.

Use the Payment Links API to create, retrieve, activate, and delete payment links.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payment-links
GET /payment-links/:id
POST /payment-links
DELETE /payment-links/:id
POST /payment-links/:id/activate
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payment-links" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}/activate" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
