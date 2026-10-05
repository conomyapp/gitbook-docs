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
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
