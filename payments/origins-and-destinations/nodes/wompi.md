---
description: Colombian payment gateway. Used for pay-in in Colombia.
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
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
