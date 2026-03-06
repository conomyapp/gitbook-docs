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

# Origins and destinations

{% columns fullWidth="true" %}
{% column %}
Payment origins represent the sources from which funds are pulled to initiate a payment.

These can include bank accounts, cards, wallets, or other funding mechanisms linked to a user or organization. Every payment or payment attempt includes one or more origins that define where the money comes from.

Use the Payment Origins API to list all available origins associated with a payment flow.

***

Payment destinations represent where the funds are intended to go during a payment.

Destinations can include user accounts, external bank accounts, wallets, or third-party providers. Every payment or payment attempt includes one or more destinations that specify where the money should be delivered.

Use the Payment Destinations API to list all destinations defined in a payment flow.

Go to [origins and destinations](../../payments/origins-and-destinations/) page for more information.

Each `origin` and `destination` must include a `type` field that defines how the funds move. Go to [Payment node page](../../payments/origins-and-destinations/nodes/README.md) for more information.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payment-origins
GET /payment-destinations
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

### Node types

{% openapi-schemas spec="conomyhq-api" schemas="payment-node" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/payment-origins" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-destinations" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
