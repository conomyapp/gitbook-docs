---
description: Colombian online bank transfer gateway. Used for pay-in in Colombia.
---

# PSE

PSE (Pagos Seguros en Línea) is Colombia's primary online bank transfer system. The user selects their bank and is redirected to complete the payment on the bank's page.

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
      <td>Must be <code>&quot;PSE&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>pse.bankId</code></td>
      <td><code>string</code></td>
      <td>Bank code selected by the user</td>
    </tr>
    <tr>
      <td><code>pse.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>pse.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>pse.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>Colombian ID number</td>
    </tr>
    <tr>
      <td><code>pse.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type (e.g., <code>&quot;CC&quot;</code>, <code>&quot;CE&quot;</code>, <code>&quot;NIT&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>pse.customer.phoneNumber</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s phone number</td>
    </tr>
    <tr>
      <td><code>pse.customer.email</code></td>
      <td><code>string</code></td>
      <td>Payer&#x27;s email</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "PSE",
  "currency": "COP",
  "pse": {
    "bankId": "1007",
    "customer": {
      "firstName": "Andrés",
      "lastName": "Martínez",
      "documentType": "CC",
      "documentNumber": "1020304050",
      "phoneNumber": "3001234567",
      "email": "andres@example.com"
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
      <td>Bank redirect URL — send the user here</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>PSE session token</td>
    </tr>
  </tbody>
</table>

The `bankId` list can be retrieved from the [financial institutions](../../../home/financial-institutions.md) page.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="pse" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
