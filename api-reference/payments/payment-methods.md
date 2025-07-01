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

# Payment methods

{% columns fullWidth="true" %}
{% column %}
Payment origins represent the sources from which funds are pulled to initiate a payment.

These can include bank accounts, cards, wallets, or other funding mechanisms linked to a user or organization. Every payment or payment attempt includes one or more origins that define where the money comes from.

Use the Payment Origins API to list all available origins associated with a payment flow.

***

Payment destinations represent where the funds are intended to go during a payment.

Destinations can include user accounts, external bank accounts, wallets, or third-party providers. Every payment or payment attempt includes one or more destinations that specify where the money should be delivered.

Use the Payment Destinations API to list all destinations defined in a payment flow.

Go to [origins and destinations](../../payments/origins-and-destinations.md) page for more information.
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

{% openapi-schemas spec="conomyhq-api" schemas="payment-node" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

### Node types

{% openapi-schemas spec="conomyhq-api" schemas="payment-initiation,payment-link,wallet,bank-account,card,account" grouped="true" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

Each `origin` and `destination` must include a `type` field that defines how the funds move. Go to [Transaction node page](../../payments/transaction-nodes.md) for more information.

{% openapi-operation spec="conomyhq-api" path="/payment-origins" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-destinations" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145422Z&X-Amz-Expires=172800&X-Amz-Signature=52c2ba90159b7ed1c953d566fdc51ceb1d0da24241fa682ebf1c1f356dcff1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
