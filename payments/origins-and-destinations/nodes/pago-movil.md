---
description: Venezuela's mobile interbank payment system. Used for pay-in in Venezuela.
layout:
  width: full
---

# PAGO_MOVIL

Pago Móvil is Venezuela's interbank mobile payment system, allowing users to transfer funds between banks using their phone number and ID. Widely adopted across Venezuelan banks.

**Country:** Venezuela | **Currency:** VES | **Direction:** Pay-in

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
      <td>Must be <code>&quot;PAGO_MOVIL&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;VES&quot;</code></td>
    </tr>
    <tr>
      <td><code>pagoMovil.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>pagoMovil.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>pagoMovil.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
    <tr>
      <td><code>pagoMovil.customer.phoneNumber</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s registered Pago Móvil phone number</td>
    </tr>
    <tr>
      <td><code>pagoMovil.bankId</code></td>
      <td><code>string</code></td>
      <td>Bank code</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "PAGO_MOVIL",
  "currency": "VES",
  "pagoMovil": {
    "bankId": "0102",
    "customer": {
      "firstName": "Carlos",
      "lastName": "Pérez",
      "email": "carlos@example.com",
      "phoneNumber": "4141234567"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pago-movil" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
