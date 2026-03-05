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

Each `origin` and `destination` must include a `type` field that defines how the funds move. Go to [Payment node page](../../payments/origins-and-destinations/nodes.md) for more information.
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

{% openapi-schemas Payment API schemas="payment-node" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/39003fc9ba4a3ca3327f768c7de7c4b872ac882fd801407888a679b34d7ae294.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T222841Z&X-Amz-Expires=172800&X-Amz-Signature=d37664e1e926cae1723bc671a0424e82ca1cfde7e2a3507f7d75c99dddf543a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

### Node types

{% openapi-schemas Payment API schemas="payment-initiation,payment-link,wallet,bank-account,card,account" grouped="true" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/39003fc9ba4a3ca3327f768c7de7c4b872ac882fd801407888a679b34d7ae294.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T222841Z&X-Amz-Expires=172800&X-Amz-Signature=d37664e1e926cae1723bc671a0424e82ca1cfde7e2a3507f7d75c99dddf543a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation Payment API path="/payment-origins" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/39003fc9ba4a3ca3327f768c7de7c4b872ac882fd801407888a679b34d7ae294.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T222841Z&X-Amz-Expires=172800&X-Amz-Signature=d37664e1e926cae1723bc671a0424e82ca1cfde7e2a3507f7d75c99dddf543a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation Payment API path="/payment-destinations" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/39003fc9ba4a3ca3327f768c7de7c4b872ac882fd801407888a679b34d7ae294.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T222841Z&X-Amz-Expires=172800&X-Amz-Signature=d37664e1e926cae1723bc671a0424e82ca1cfde7e2a3507f7d75c99dddf543a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
