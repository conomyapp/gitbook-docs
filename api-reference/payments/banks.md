# Banks

{% columns fullWidth="true" %}
{% column %}
Banks represent the financial institutions available for a given country in the Conomy network.

Use the Banks API to retrieve the list of supported banks by country code. This is useful when building payment flows that require the payer to select their bank, such as PSE or local bank transfer methods.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /payments/banks/:country
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-operation spec="conomyhq-api" path="/payments/banks/{country}" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}
