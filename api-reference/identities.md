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
[Identities](identities.md#the-identity-object) represent any entity that can own accounts, perform transactions, or be subject to permissions within the platform.

Each identity can be a person, organization, or system-level actor. You can [create](identities.md#post-identities), [update](identities.md#patch-identities-id), [delete](identities.md#delete-identities-id-children), and [retrieve identities](identities.md#get-identities), as well as define hierarchical relationships and [attach rules](identities.md#post-identities-id-rules).
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
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules/{rule-id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T005023Z&X-Amz-Expires=172800&X-Amz-Signature=79deef49d0c3aebf94dc35e753790b774e5d508532a16ec9cc6bb758aae92885&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
