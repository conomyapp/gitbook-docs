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

# Accounts

{% columns fullWidth="true" %}
{% column %}
[Accounts](accounts.md#the-account-object) represent financial containers used to hold and manage funds.

Each account can store `balances`, receive or send funds, and be associated with a specific user or organization. Accounts can be [created](accounts.md#post-accounts), [updated](accounts.md#patch-accounts-id), and [deleted](accounts.md#delete-accounts-id) via the `API`, and are identified by a unique ID.

Use the Accounts API to[ list all accounts](accounts.md#get-accounts), create new ones, r[etrieve details of a specific account](accounts.md#get-accounts), update metadata, or delete an account when it’s no longer needed.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```
GET /accounts
POST /accounts
GET /accounts/:id
PATCH /accounts/:id
DELETE /accounts/:id
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-schemas spec="conomyhq-api" schemas="account" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145615Z&X-Amz-Expires=172800&X-Amz-Signature=ce71304655125482ca8e725ec6a7ef6fc1c6f6ec812fe4025b40055d9fb4640e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

{% openapi-operation spec="conomyhq-api" path="/accounts" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145615Z&X-Amz-Expires=172800&X-Amz-Signature=ce71304655125482ca8e725ec6a7ef6fc1c6f6ec812fe4025b40055d9fb4640e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145615Z&X-Amz-Expires=172800&X-Amz-Signature=ce71304655125482ca8e725ec6a7ef6fc1c6f6ec812fe4025b40055d9fb4640e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="get" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145616Z&X-Amz-Expires=172800&X-Amz-Signature=16fdc6b1713d766ef5d623390f24f294799e1cbb244ef44039a91763c26ac052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145616Z&X-Amz-Expires=172800&X-Amz-Signature=16fdc6b1713d766ef5d623390f24f294799e1cbb244ef44039a91763c26ac052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/552534d10e9e90a821a9938005d2ec468153b739a1864d0de7c25a1b32c21d83.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T145616Z&X-Amz-Expires=172800&X-Amz-Signature=16fdc6b1713d766ef5d623390f24f294799e1cbb244ef44039a91763c26ac052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
