---
description: Chilean open banking pay-in via redirect. Used for pay-in in Chile.
layout:
  width: full
---

# ETPAY

ETPAY is a Chilean open banking provider that lets users pay directly from their bank account via a redirect flow. After submitting the payment, you receive a URL to redirect the user to complete the transfer.

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
      <td>Must be <code>&quot;ETPAY&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;CLP&quot;</code></td>
    </tr>
    <tr>
      <td><code>etpay.successUrl</code></td>
      <td><code>string</code></td>
      <td>URL to redirect after successful payment</td>
    </tr>
    <tr>
      <td><code>etpay.failedUrl</code></td>
      <td><code>string</code></td>
      <td>URL to redirect if payment fails</td>
    </tr>
    <tr>
      <td><code>etpay.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>etpay.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "ETPAY",
  "currency": "CLP",
  "etpay": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "Valentina",
      "email": "valentina@example.com"
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
      <td>Redirect URL — send the user here to complete the payment</td>
    </tr>
    <tr>
      <td><code>expiresAt</code></td>
      <td>When the session expires</td>
    </tr>
  </tbody>
</table>

Redirect your user to `etpay.url` immediately after creating the payment.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="etpay" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
