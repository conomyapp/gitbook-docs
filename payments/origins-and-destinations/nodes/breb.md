---
description: Colombia's interbank electronic transfer network. Used for pay-out in Colombia.
layout:
  width: full
---

# BREB

BREB (Banco de la República Electronic Bridge) is Colombia's interbank settlement network, used for direct bank-to-bank transfers. Use it as a destination for payouts to Colombian bank accounts.

**Country:** Colombia | **Currency:** COP | **Direction:** Pay-out

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
      <td>Must be <code>&quot;BREB&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;COP&quot;</code></td>
    </tr>
    <tr>
      <td><code>breB.bankId</code></td>
      <td><code>string</code></td>
      <td>Bank code of the recipient&#x27;s bank</td>
    </tr>
    <tr>
      <td><code>breB.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>breB.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>breB.customer.email</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s email</td>
    </tr>
    <tr>
      <td><code>breB.bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s account number</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "BREB",
  "currency": "COP",
  "breB": {
    "bankId": "1022",
    "bank": {
      "accountNumber": "123456789"
    },
    "customer": {
      "firstName": "Camila",
      "lastName": "Torres",
      "email": "camila@example.com"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="breb" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
