---
description: Bancolombia's digital wallet. Used for pay-in and pay-out in Colombia.
layout:
  width: full
---

# NEQUI

Nequi is Bancolombia's digital wallet with over 20 million users in Colombia. It supports both pay-in (requesting payment to a Nequi number) and pay-out (sending to a Nequi account).

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
      <td>Must be <code>&quot;NEQUI&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>nequi.customer.phoneNumber</code></td>
      <td><code>string</code></td>
      <td>Nequi phone number (digits only)</td>
    </tr>
    <tr>
      <td><code>nequi.customer.email</code></td>
      <td><code>string</code></td>
      <td>Customer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "NEQUI",
  "currency": "COP",
  "nequi": {
    "customer": {
      "phoneNumber": "3001234567",
      "email": "usuario@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="nequi" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
