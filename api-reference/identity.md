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

# Identity



### Endpoints

<table data-header-hidden data-full-width="true"><thead><tr><th width="100" align="right"></th><th></th></tr></thead><tbody><tr><td align="right">GET</td><td>/identities</td></tr><tr><td align="right">POST</td><td>/identities</td></tr><tr><td align="right">GET</td><td>/identities/:id</td></tr><tr><td align="right">PATCH</td><td>/identities/:id</td></tr><tr><td align="right">DELETE</td><td>/identities/:id</td></tr><tr><td align="right">POST</td><td>/identities/{id}/children</td></tr><tr><td align="right">DELETE</td><td>/identities/{id}/children</td></tr><tr><td align="right">POST</td><td>/identities/{id}/rules</td></tr><tr><td align="right">DELETE</td><td>/identities/{id}/rules</td></tr></tbody></table>

{% openapi-schemas spec="conomyhq-api" schemas="Identity" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

***

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/rules/{rule-id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/d7e2459e8aa0eab8108ce51ffcb0bb04f06d34824276ad77d4d22a8c5cddbe74.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T002127Z&X-Amz-Expires=172800&X-Amz-Signature=7c4978cbf311cae0c3b8a5c1c7cd68f3a33418a938378e93aaedb15a6c38e7b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
