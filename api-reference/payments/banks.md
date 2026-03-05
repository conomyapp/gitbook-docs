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

# Banks

{% columns fullWidth="true" %}
{% column %}
Returns all supported financial institutions for a given country. Use the `code` value as the `bank` field in `BANK_ACCOUNT`, `BREB`, or `SPEI` payment nodes.

See the [Financial Institutions](../../home/financial-institutions.md) page for a full reference of codes by country.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments/banks/{country}
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payments/banks/{country}" method="get" %}
[Payment API](../../.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
