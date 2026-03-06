# Checkout Session

{% columns fullWidth="true" %}
{% column %}
Checkout sessions represent a temporary, tokenized context in which a payer completes a payment flow.

A session is created from a payment link or directly via the API, and it holds the state needed to process a payment — including the selected origins, destinations, and method. Sessions have a limited lifespan and can be refreshed using their associated token.

Use the Checkout Sessions API to create sessions, retrieve them, initiate payments within a session, or delete sessions that are no longer needed.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /checkout-sessions
GET /checkout-sessions/:checkout_session_id
DELETE /checkout-sessions/:checkout_session_id
POST /checkout-sessions
POST /checkout-sessions/:checkout_session_id/payments
POST /checkout-sessions/token/:checkout-token/refresh
POST /payment-links/token/:checkout-token/checkout-sessions
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions/{checkout_session_id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions/{checkout_session_id}" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions/token/{checkout-token}/refresh" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/checkout-sessions/{checkout_session_id}/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/token/{checkout-token}/checkout-sessions" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
