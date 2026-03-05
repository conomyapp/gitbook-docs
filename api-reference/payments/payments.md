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
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}" method="get" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/authorized" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/{id}/captured" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payments/received" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/0f36260480fad24a158a2231ac8e0c854b771df811ae7a383a743dd61f484742.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T190040Z&X-Amz-Expires=172800&X-Amz-Signature=db382ff7722ba523ca38291c370cf80ab3c90a0d25ccf4c2850d023dbdf1372c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
