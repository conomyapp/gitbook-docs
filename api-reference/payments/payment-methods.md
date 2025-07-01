---
hidden: true
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

{% columns %}
{% column %}

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
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T032808Z&X-Amz-Expires=172800&X-Amz-Signature=46fb1592fb326f73745ca1261f52ccb67ae866c11971eb963c21aa39e204dfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

### Node types

Each `origin` and `destination` must include a `type` field that defines how the funds move. Go to [Transaction node page](../../payments/transaction-nodes.md) for more information.

{% openapi-schemas spec="conomyhq-api" schemas="PaymentLink,PaymentInitiation,PaymentMethod,Wallet,Card,BankAccount" grouped="true" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T032808Z&X-Amz-Expires=172800&X-Amz-Signature=46fb1592fb326f73745ca1261f52ccb67ae866c11971eb963c21aa39e204dfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/payment-origins" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T032808Z&X-Amz-Expires=172800&X-Amz-Signature=46fb1592fb326f73745ca1261f52ccb67ae866c11971eb963c21aa39e204dfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-destinations" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T032808Z&X-Amz-Expires=172800&X-Amz-Signature=46fb1592fb326f73745ca1261f52ccb67ae866c11971eb963c21aa39e204dfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
