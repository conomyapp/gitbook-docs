---
description: Colombian payment gateway. Used for pay-in in Colombia.
layout:
  width: full
---

# WOMPI

Wompi is a Colombian payment gateway that supports multiple payment methods including PSE, Nequi, credit/debit cards, and cash. The user is redirected to Wompi's hosted checkout to complete the payment.

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
      <td>Must be <code>&quot;WOMPI&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>wompi.redirectUrl</code></td>
      <td><code>string</code></td>
      <td>URL to redirect after payment</td>
    </tr>
    <tr>
      <td><code>wompi.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>wompi.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "WOMPI",
  "currency": "COP",
  "wompi": {
    "redirectUrl": "https://yourapp.com/return",
    "customer": {
      "firstName": "Luis",
      "email": "luis@example.com"
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
      <td>Wompi-hosted checkout URL</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>Payment session token</td>
    </tr>
    <tr>
      <td><code>expiresAt</code></td>
      <td>Session expiration timestamp</td>
    </tr>
  </tbody>
</table>

Redirect the user to `wompi.url` to complete their payment.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="wompi" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
