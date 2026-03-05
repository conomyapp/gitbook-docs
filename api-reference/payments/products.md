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

# Available Products

{% columns fullWidth="true" %}
{% column %}
Returns all payment products enabled for an identity, grouped by currency. Each entry lists available pay-in and pay-out methods along with their schemas, required fields, and amount limits.

Use this endpoint to dynamically build payment flows without hardcoding supported methods. See the [Available Products](../../payments/available-products.md) page for full documentation.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments/available-products
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation Payment API path="/payments/available-products" method="get" %}
[Payment API](../../.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
