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

# Identities

{% columns %}
{% column %}
[Identities](identity.md#the-identity-object) represent any entity that can own accounts, perform transactions, or be subject to permissions within the platform.

Each identity can be a person, organization, or system-level actor. You can [create](identity.md#post-identities), [update](identity.md#patch-identities-id), [delete](identity.md#delete-identities-id-children), and [retrieve identities](identity.md#get-identities), as well as define hierarchical relationships and [attach rules](identity.md#post-identities-id-rules).
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" fullWidth="true" %}
```http
GET /identities
POST /identities
GET /identities/:id
PATCH /identities/:id
DELETE /identities/:id
POST /identities/:id/children
DELETE /identities/:id/children
POST /identities/{id}/rules
DELETE /identities/{id}/rules
```
{% endcode %}


{% endcolumn %}
{% endcolumns %}

{% openapi-schemas spec="conomyhq-api" schemas="Identity" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules/{rule-id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005121Z&X-Amz-Expires=172800&X-Amz-Signature=1367398a666e6d0e05576dd7a90093b6e3c775aad7a209ee8007dde590ba0d9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
