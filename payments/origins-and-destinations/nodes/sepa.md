---
description: European bank transfer standard. Used for pay-out across the eurozone.
layout:
  width: full
---

# SEPA

SEPA (Single Euro Payments Area) is the European standard for bank transfers in euros. It covers 36 countries including the EU, Switzerland, Norway, and Iceland. Use it as a destination for payouts to European bank accounts.

**Countries:** Eurozone + SEPA area | **Currency:** EUR | **Direction:** Pay-out

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
      <td>Must be <code>&quot;SEPA&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;EUR&quot;</code></td>
    </tr>
    <tr>
      <td><code>sepa.iban</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s IBAN</td>
    </tr>
    <tr>
      <td><code>sepa.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>sepa.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>sepa.customer.email</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s email</td>
    </tr>
    <tr>
      <td><code>sepa.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>National ID or tax number</td>
    </tr>
    <tr>
      <td><code>sepa.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type</td>
    </tr>
    <tr>
      <td><code>sepa.bic</code></td>
      <td><code>string</code></td>
      <td>BIC/SWIFT code of the bank</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "SEPA",
  "currency": "EUR",
  "sepa": {
    "iban": "DE89370400440532013000",
    "bic": "COBADEFFXXX",
    "customer": {
      "firstName": "Hans",
      "lastName": "Müller",
      "email": "hans@example.com",
      "documentType": "DNI",
      "documentNumber": "X1234567A"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="sepa" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
