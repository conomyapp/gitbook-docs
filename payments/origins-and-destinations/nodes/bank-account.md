---
description: Generic bank account node for payouts. Used across multiple countries.
layout:
  width: full
---

# BANK_ACCOUNT

BANK_ACCOUNT is a generic destination node for payouts to external bank accounts. It's used when the destination is a standard bank account that doesn't fit a specific rail — for example, Canadian or other country-specific accounts not covered by dedicated rail nodes.

**Direction:** Pay-out

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
      <td>Must be <code>&quot;BANK_ACCOUNT&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Currency of the transfer</td>
    </tr>
    <tr>
      <td><code>bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s bank account number</td>
    </tr>
    <tr>
      <td><code>bank.bank</code></td>
      <td><code>string</code></td>
      <td>Bank name or identifier</td>
    </tr>
    <tr>
      <td><code>bank.typeAccount</code></td>
      <td><code>string</code></td>
      <td>Account type: <code>&quot;CHECKING&quot;</code> or <code>&quot;SAVINGS&quot;</code></td>
    </tr>
    <tr>
      <td><code>bank.country</code></td>
      <td><code>string</code></td>
      <td>2-letter ISO country code (e.g., <code>&quot;AR&quot;</code>, <code>&quot;CA&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>customer</code></td>
      <td><code>object</code></td>
      <td>Recipient&#x27;s identity information</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "BANK_ACCOUNT",
  "currency": "ARS",
  "bank": {
    "accountNumber": "0000123456789",
    "bank": "BANCO_CMF",
    "typeAccount": "CHECKING",
    "country": "AR"
  },
  "customer": {
    "firstName": "Lucía",
    "lastName": "Fernández",
    "email": "lucia@example.com",
    "documentType": "DNI",
    "documentNumber": "32123456",
    "country": "AR"
  }
}
```

Note: For Argentina, prefer [CVU](cvu.md). For Colombia, prefer [BREB](breb.md). BANK_ACCOUNT is typically used when no country-specific rail is available.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="bank-account" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
