---
description: Argentina's virtual account identifier for bank transfers. Used for pay-in in Argentina.
layout:
  width: full
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as an origin when collecting funds from an Argentine payer.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

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
      <td>Must be <code>&quot;CVU&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;ARS&quot;</code></td>
    </tr>
  </tbody>
</table>

## Optional fields

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
      <td><code>cvu.code</code></td>
      <td><code>string</code></td>
      <td>Optional CVU/CBU code when your flow provides a pre-assigned identifier.</td>
    </tr>
    <tr>
      <td><code>cvu.customer.*</code></td>
      <td><code>object</code></td>
      <td>Optional customer data for downstream reconciliation.</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {}
}
```

## Valid destinations

When CVU is used as origin, the valid destinations are:

<table data-full-width="true">
  <thead>
    <tr>
      <th>Node</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ACCOUNT</code></td>
      <td>Internal platform account</td>
    </tr>
  </tbody>
</table>

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="cvu" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
