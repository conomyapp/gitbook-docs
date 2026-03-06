---
layout:
  width: default
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
  metadata:
    visible: true
  tags:
    visible: true
---

# Accounts

{% columns fullWidth="true" %}
{% column %}
[Accounts](accounts.md#the-account-object) represent financial containers used to hold and manage funds.

Each account can store `balances`, receive or send funds, and be associated with a specific user or organization. Accounts can be [created](accounts.md#post-accounts), [updated](accounts.md#patch-accounts-id), and [deleted](accounts.md#delete-accounts-id) via the `API`, and are identified by a unique ID.

Use the Accounts API to [list all accounts](accounts.md#get-accounts), create new ones, [retrieve details of a specific account](accounts.md#get-accounts-id), update metadata, or delete an account when it’s no longer needed.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /accounts
POST /accounts
GET /accounts/:id
PATCH /accounts/:id
DELETE /accounts/:id
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/accounts/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/customers/{customer-id}" method="patch" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
