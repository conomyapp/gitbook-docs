---
description: Argentina's interoperable QR transfer standard. Used for pay-in in Argentina.
layout:
  width: full
---

# PCT

PCT (Pago con Transferencia) is Argentina's BCRA-regulated QR-based instant transfer standard. When used as an origin, it generates a QR code that the user scans with any participating banking or fintech app.

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
      <td>Must be <code>&quot;PCT&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;ARS&quot;</code></td>
    </tr>
    <tr>
      <td><code>pct.customer.phoneNumber</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s phone number (digits only)</td>
    </tr>
    <tr>
      <td><code>pct.customer.phoneNumberPrefix</code></td>
      <td><code>string</code></td>
      <td>Country code (e.g., <code>&quot;54&quot;</code> for Argentina)</td>
    </tr>
    <tr>
      <td><code>pct.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
    <tr>
      <td><code>pct.successUrl</code></td>
      <td><code>string</code></td>
      <td>Redirect URL on success</td>
    </tr>
    <tr>
      <td><code>pct.failedUrl</code></td>
      <td><code>string</code></td>
      <td>Redirect URL on failure</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "PCT",
  "currency": "ARS",
  "pct": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "phoneNumber": "1155551234",
      "phoneNumberPrefix": "54",
      "email": "usuario@example.com"
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
      <td><code>pct.qrCode</code></td>
      <td>QR code string for scanning</td>
    </tr>
  </tbody>
</table>

Display the `qrCode` to your user. They can scan it with Mercado Pago, BBVA, Galicia, Naranja X, or any other PCT-compatible app.

## Valid destinations

When PCT is used as origin, the valid destinations are:

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

{% openapi-schemas spec="conomyhq-api" schemas="pct" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
