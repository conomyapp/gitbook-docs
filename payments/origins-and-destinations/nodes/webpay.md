---
description: Chile's Transbank card and transfer gateway. Used for pay-in in Chile.
layout:
  width: full
---

# WEBPAY

Webpay is the Transbank gateway, widely used in Chile for both debit and credit card payments as well as bank transfers. The user is redirected to complete the payment on the Transbank-hosted page.

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
      <td>Must be <code>&quot;WEBPAY&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;CLP&quot;</code></td>
    </tr>
    <tr>
      <td><code>webpay.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>webpay.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>webpay.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "WEBPAY",
  "currency": "CLP",
  "webpay": {
    "customer": {
      "firstName": "Sebastián",
      "lastName": "Rojas",
      "email": "sebastian@example.com"
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
      <td>Transbank-hosted payment URL</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>Session token</td>
    </tr>
  </tbody>
</table>

Redirect your user to `webpay.url` to complete the payment on the Transbank page.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="webpay" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
