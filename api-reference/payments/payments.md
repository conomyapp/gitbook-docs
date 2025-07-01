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

# Payments

{% columns fullWidth="true" %}
{% column %}
Payments represent the intent and execution of moving funds from one or more origins to one or more destinations using a defined method.

Each payment moves through a lifecycle that may include optional authorization and capture stages before final confirmation by the payment provider. Payments are linked to prior attempts and become the definitive execution step once initiated.

A payment can be authorized (reserved but not yet charged), captured (confirmed for collection), and marked as received when the provider notifies that the payment was successful. Final reconciliation (settled) occurs in a separate stage and is managed by a different set of APIs.

Use the Payments API to create payments, retrieve them, or transition them through their authorization, capture, and received stages.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments
GET /payments/:id
POST /payments
POST /payments/:id/authorized
POST /payments/:id/captured
POST /payments/:id/received
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/authorized" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/captured" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041411Z&X-Amz-Expires=172800&X-Amz-Signature=b94f3b4668b384565642e404eac650963fdf4787b76b6c545fd3d60c3b6756db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/received" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/af0d993cbae1a2ba3ceb1bb12e6b8b7abad4ca5ad73395a05077cf81b10d57d5.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T041412Z&X-Amz-Expires=172800&X-Amz-Signature=ea426cad7e117953762c76534390588d62f86cca098c06215cb2a4727bd588a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
