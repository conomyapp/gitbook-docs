---
description: Davivienda's direct pay-in button. Used for pay-in in Colombia.
layout:
  width: full
---

# DAVIVIENDA

Davivienda's payment button lets Davivienda account holders authorize a payment directly from their banking interface.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in

## Required fields

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;DAVIVIENDA&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>davivienda.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
    <tr>
      <td><code>davivienda.bankId</code></td>
      <td><code>string</code></td>
      <td>Bank identifier</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "DAVIVIENDA",
  "currency": "COP",
  "davivienda": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

## Response fields

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>url</code></td>
      <td>Redirect URL to Davivienda&#x27;s authorization page</td>
    </tr>
  </tbody>
</table>

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="davivienda" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
