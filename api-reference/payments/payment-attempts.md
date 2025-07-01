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

# Payment-attempts

{% columns fullWidth="true" %}
{% column %}
Payment attempts represent preliminary steps in a payment flow before actual authorization, capture, or settlement occurs.

They are used to simulate or stage a payment prior to executing a real transaction. Each attempt defines the intended origins, destinations, and method, allowing systems to validate or prepare the flow before the user completes the checkout process.

Use the Payment Attempts API to [create new or simulated attempts](payment-attempts.md#post-payment-attempts), [list all attempts](payment-attempts.md#get-payment-attempts), or [retrieve details](payment-attempts.md#get-payment-attempts-id) of a specific attempt.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /payment-attempts
GET /payment-attempts
GET /payment-attempts/:id
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041412Z&X-Amz-Expires=172800&X-Amz-Signature=ea426cad7e117953762c76534390588d62f86cca098c06215cb2a4727bd588a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-attempts/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041412Z&X-Amz-Expires=172800&X-Amz-Signature=ea426cad7e117953762c76534390588d62f86cca098c06215cb2a4727bd588a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
