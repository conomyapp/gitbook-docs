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
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
