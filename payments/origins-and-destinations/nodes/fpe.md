---
description: UK's Faster Payments scheme. Used for pay-out in the United Kingdom.
layout:
  width: full
---

# FPE

FPE (Faster Payments) is the UK's real-time payment network. Payments settle in seconds, 24/7. Use it as a destination to send funds to UK bank accounts identified by account number and sort code.

**Country:** UK | **Currency:** GBP | **Direction:** Pay-out

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
      <td>Must be <code>&quot;FPE&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;GBP&quot;</code></td>
    </tr>
    <tr>
      <td><code>fpe.accountNumber</code></td>
      <td><code>string</code></td>
      <td>UK bank account number (8 digits)</td>
    </tr>
    <tr>
      <td><code>fpe.sortCode</code></td>
      <td><code>string</code></td>
      <td>Sort code (6 digits, e.g., <code>&quot;200415&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>fpe.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>fpe.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>fpe.customer.email</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "FPE",
  "currency": "GBP",
  "fpe": {
    "accountNumber": "12345678",
    "sortCode": "200415",
    "customer": {
      "firstName": "Emma",
      "lastName": "Thompson",
      "email": "emma@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="fpe" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
