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

{% openapi-schemas spec="conomyhq-api" schemas="Payment-node" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T141705Z&X-Amz-Expires=172800&X-Amz-Signature=61f5bded0a9bce494ba5cdda2352c433d3e9344af8cd5655dda1e432d2e92980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

### Node types

Each `origin` and `destination` must include a `type` field that defines how the funds move. Go to [Transaction node page](../../payments/transaction-nodes.md) for more information.

{% openapi-schemas spec="conomyhq-api" schemas="PaymentLink,PaymentInitiation,PaymentMethod,Wallet,Card,BankAccount" grouped="true" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T141705Z&X-Amz-Expires=172800&X-Amz-Signature=61f5bded0a9bce494ba5cdda2352c433d3e9344af8cd5655dda1e432d2e92980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/payment-origins" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T141705Z&X-Amz-Expires=172800&X-Amz-Signature=61f5bded0a9bce494ba5cdda2352c433d3e9344af8cd5655dda1e432d2e92980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-destinations" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T141706Z&X-Amz-Expires=172800&X-Amz-Signature=d0eabc19a30b2ba12a168b30651a8e22f61c8505dcd0b219f1f4ff065b534ba2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
