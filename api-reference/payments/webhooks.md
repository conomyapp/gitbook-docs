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

### Payer / originator information

For inbound payments where the payer's identity is reported by the banking rail (for example, CVU deposits in Argentina), the webhook payload includes an `originator` block inside `data.transaction`. The block is always present with a stable shape: individual fields are set to `null` when the banking rail did not supply that particular piece of data.

| Field | Description |
| --- | --- |
| `firstName` | Payer's first name as reported by the bank. |
| `lastName` | Payer's last name as reported by the bank. |
| `documentType` | Type of the payer's identity document (e.g. `CUIT`, `CUIL`, `DNI`). |
| `documentNumber` | Payer's identity document number. |
| `email` | Payer's email, when provided by the banking rail. |
| `bankAccount` | Payer's bank account identifier (e.g. the originating CBU), when supplied by the banking rail. |
| `cvu` | Reserved for the payer's originating CVU. Currently always `null`; once available it flows through without consumer-side changes. |

> Because every field may be `null`, consumers should not branch on the presence of the `originator` block — only on the value of each field.
