---
description: US Automated Clearing House network. Used for pay-in and pay-out in the USA.
layout:
  width: full
---

# ACH

ACH (Automated Clearing House) is the standard US bank-to-bank transfer network. Settlement typically takes 1–3 business days. It supports both pay-in (collecting from a US bank account) and pay-out (disbursing to a US bank account).

**Country:** USA | **Currency:** USD | **Direction:** Pay-in / Pay-out

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
      <td>Must be <code>&quot;ACH&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;USD&quot;</code></td>
    </tr>
    <tr>
      <td><code>ach.bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>US bank account number</td>
    </tr>
    <tr>
      <td><code>ach.routingNumber</code></td>
      <td><code>string</code></td>
      <td>9-digit ABA routing number</td>
    </tr>
    <tr>
      <td><code>ach.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>ach.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>ach.customer.email</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s email</td>
    </tr>
    <tr>
      <td><code>ach.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>SSN or ITIN</td>
    </tr>
    <tr>
      <td><code>ach.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type (e.g., <code>&quot;SSN&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>ach.accountType</code></td>
      <td><code>string</code></td>
      <td><code>&quot;CHECKING&quot;</code> or <code>&quot;SAVINGS&quot;</code></td>
    </tr>
    <tr>
      <td><code>ach.accountHolderType</code></td>
      <td><code>string</code></td>
      <td><code>&quot;INDIVIDUAL&quot;</code> or <code>&quot;BUSINESS&quot;</code></td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "ACH",
  "currency": "USD",
  "ach": {
    "routingNumber": "021000021",
    "accountType": "CHECKING",
    "accountHolderType": "INDIVIDUAL",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "documentType": "SSN",
      "documentNumber": "123456789"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="ach" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
