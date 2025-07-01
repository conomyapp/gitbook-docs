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

{% columns fullWidth="true" %}
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

{% openapi-schemas spec="conomyhq-api" schemas="identity" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144932Z&X-Amz-Expires=172800&X-Amz-Signature=16aefa96a9b978dc6cc71ccd31d3003992b9218aef5e2fe317dfb2dc8c89a5e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-schemas spec="conomyhq-api" schemas="bank-account" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules/{rule-id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/9e913261f18bf8e7a90637d3f1294b0bfecd67eb52c7c10bede7117e509d979a.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T144933Z&X-Amz-Expires=172800&X-Amz-Signature=a25d9b191eb9696aee844aea6ca875a3568c01b037ea66dccaa8ffa58f51a99f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
