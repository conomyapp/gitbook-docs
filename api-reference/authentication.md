---
layout:
  width: default
  title:
    visible: false
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
---

# Authentication

{% columns fullWidth="true" %}
{% column %}
Authentication provides the mechanism to obtain an access token required to interact with the Conomy API.

All API requests must be authenticated using a Bearer token. To get a token, exchange your API credentials via the authentication endpoint. Tokens are time-limited and should be refreshed as needed.

Use the Authentication API to obtain access tokens before making any other API calls.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /auth
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/auth" method="post" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T192104Z&X-Amz-Expires=172800&X-Amz-Signature=c58c5270aa1a6a0687542c24ebda102978257d8dbd4aaca0cae0018c800ef015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
