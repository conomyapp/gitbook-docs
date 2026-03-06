---
description: Chilean open banking pay-in via bank widget. Used for pay-in in Chile.
layout:
  width: full
---

# FINTOC

Fintoc is a Chilean open banking provider. It uses a hosted widget where the user connects their bank account and authorizes the transfer. No required fields — the widget handles the flow.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

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
      <td>Must be <code>&quot;FINTOC&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;CLP&quot;</code></td>
    </tr>
    <tr>
      <td><code>fintoc.customer</code></td>
      <td><code>object</code></td>
      <td>Optional payer information</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "FINTOC",
  "currency": "CLP",
  "fintoc": {
    "customer": {
      "firstName": "Diego",
      "email": "diego@example.com"
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
      <td>Hosted widget URL — redirect the user here</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>Session token for tracking</td>
    </tr>
  </tbody>
</table>

Send the user to `fintoc.url` to complete the bank connection and authorization.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="fintoc" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
