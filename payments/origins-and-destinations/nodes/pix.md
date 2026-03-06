---
description: Brazilian instant payment system. Used for pay-in and pay-out in Brazil.
layout:
  width: full
---

# PIX

PIX is Brazil's instant payment rail operated by the Banco Central do Brasil. When used as an origin, it generates a QR code and a PIX copy-paste code that the user scans or copies to complete the payment.

**Country:** Brazil | **Currency:** BRL | **Direction:** Pay-in / Pay-out

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
      <td>Must be <code>&quot;PIX&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;BRL&quot;</code></td>
    </tr>
    <tr>
      <td><code>pix.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>pix.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>pix.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
    <tr>
      <td><code>pix.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>Brazilian CPF (11 digits)</td>
    </tr>
    <tr>
      <td><code>pix.successUrl</code></td>
      <td><code>string</code></td>
      <td>Redirect URL on success</td>
    </tr>
    <tr>
      <td><code>pix.failedUrl</code></td>
      <td><code>string</code></td>
      <td>Redirect URL on failure</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "PIX",
  "currency": "BRL",
  "pix": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "João",
      "lastName": "Silva",
      "email": "joao@example.com",
      "documentNumber": "12345678901"
    }
  }
}
```

## Response fields

After the payment is created, the `pix` object in the response includes:

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>qrCode</code></td>
      <td>Base64-encoded QR code image</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>PIX copy-paste code (EMV string)</td>
    </tr>
    <tr>
      <td><code>expiredAt</code></td>
      <td>Expiration timestamp (UTC)</td>
    </tr>
  </tbody>
</table>

Show the `qrCode` or `data` to your user so they can complete the payment in their banking app.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pix" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
