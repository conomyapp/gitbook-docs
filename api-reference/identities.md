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

***

{% openapi-operation spec="conomyhq-api" path="/identities" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}" method="patch" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/permissions/{toremoveId}" method="delete" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/children" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/permissions" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

{% openapi-operation spec="conomyhq-api" path="/identities/{id}/permissions" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
