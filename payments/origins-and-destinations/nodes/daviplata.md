---
description: Davivienda's mobile wallet. Used for pay-in and pay-out in Colombia.
layout:
  width: full
---

# DAVIPLATA

Daviplata is Davivienda's mobile wallet, widely used for transfers among unbanked and banked users in Colombia. It supports both pay-in (collection) and pay-out (disbursement).

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-in / Pay-out

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
      <td>Must be <code>&quot;DAVIPLATA&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>daviplata.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type (e.g., <code>&quot;CC&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>daviplata.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>Colombian ID number</td>
    </tr>
    <tr>
      <td><code>daviplata.customer.email</code></td>
      <td><code>string</code></td>
      <td>Customer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "DAVIPLATA",
  "currency": "COP",
  "daviplata": {
    "customer": {
      "documentType": "CC",
      "documentNumber": "1020304050",
      "email": "usuario@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="daviplata" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
