---
description: Mexico's interbank electronic transfer system. Used for pay-in and pay-out in Mexico.
---

# SPEI

SPEI (Sistema de Pagos Electrónicos Interbancarios) is Mexico's real-time interbank transfer network, operated by Banco de México. It supports both pay-in (receiving funds via CLABE) and pay-out (sending to a CLABE).

**Country:** Mexico | **Currency:** MXN | **Direction:** Pay-in / Pay-out

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
      <td>Must be <code>&quot;SPEI&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;MXN&quot;</code></td>
    </tr>
    <tr>
      <td><code>spei.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Customer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>spei.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Customer&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>spei.clabe</code></td>
      <td><code>string</code></td>
      <td>18-digit CLABE (required for pay-out)</td>
    </tr>
    <tr>
      <td><code>spei.bankId</code></td>
      <td><code>string</code></td>
      <td>Bank identifier code</td>
    </tr>
  </tbody>
</table>

## Pay-in example

For pay-in, the user sends a transfer to the CLABE generated in the response:

```json
{
  "type": "SPEI",
  "currency": "MXN",
  "spei": {
    "customer": {
      "firstName": "Carlos",
      "lastName": "Mendoza"
    }
  }
}
```

## Pay-out example

For pay-out, provide the recipient's CLABE:

```json
{
  "type": "SPEI",
  "currency": "MXN",
  "spei": {
    "clabe": "032180000118359719",
    "customer": {
      "firstName": "Ana",
      "lastName": "López"
    }
  }
}
```

## Response fields (pay-in)

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>clabe</code></td>
      <td>CLABE the payer should transfer to</td>
    </tr>
    <tr>
      <td><code>bankId</code></td>
      <td>Receiving bank code</td>
    </tr>
  </tbody>
</table>

Share the `spei.clabe` with your user so they can complete the transfer from their banking app.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="spei" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
