# Payment Links

{% columns fullWidth="true" %}
{% column %}
Payment links are shareable URLs that allow payers to complete a payment without requiring a direct API integration.

Each payment link is associated with a product, amount, and configured payment method. Links can be activated, shared with customers, and used to initiate checkout sessions. They can also be deactivated or deleted when no longer needed.

Use the Payment Links API to create, retrieve, activate, and delete payment links.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payment-links
GET /payment-links/:id
POST /payment-links
DELETE /payment-links/:id
POST /payment-links/:id/activate
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payment-links" method="get" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}" method="get" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/payment-links/{id}/activate" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
