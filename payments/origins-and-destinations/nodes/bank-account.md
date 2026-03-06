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
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
