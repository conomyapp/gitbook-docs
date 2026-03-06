# Webhooks

{% columns fullWidth="true" %}
{% column %}
Webhooks allow your application to receive real-time notifications when payment events occur on the platform.

Instead of polling the API for updates, you register an endpoint and Conomy sends HTTP `POST` requests to it whenever relevant events happen, such as a payment being received or a transaction status changing.

Use the Webhooks API to listen for payment lifecycle events and react to them in your backend systems.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /webhooks (callback)
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-webhook Payment API name="Client Transaction's Notification Webhook" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-webhook %}
