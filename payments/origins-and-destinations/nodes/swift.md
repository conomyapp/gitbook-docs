---
description: International wire transfer via the SWIFT network. Used for cross-border pay-out.
layout:
  width: full
---

# SWIFT

SWIFT transfers are the standard for international cross-border payments. They route through correspondent banks and typically settle in 1–5 business days depending on the currency and destination country.

**Countries:** International | **Currency:** Multi | **Direction:** Pay-out

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
      <td>Must be <code>&quot;SWIFT&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Currency of the transfer (e.g., <code>&quot;USD&quot;</code>, <code>&quot;EUR&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>swift.bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s bank account number</td>
    </tr>
    <tr>
      <td><code>swift.swiftCode</code></td>
      <td><code>string</code></td>
      <td>SWIFT/BIC code of the recipient&#x27;s bank</td>
    </tr>
    <tr>
      <td><code>swift.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>swift.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>swift.customer.email</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s email</td>
    </tr>
    <tr>
      <td><code>swift.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>ID or tax number</td>
    </tr>
    <tr>
      <td><code>swift.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type</td>
    </tr>
  </tbody>
</table>

## Optional fields

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
      <td><code>swift.bank.name</code></td>
      <td><code>string</code></td>
      <td>Recipient bank name.</td>
    </tr>
    <tr>
      <td><code>swift.iban</code></td>
      <td><code>string</code></td>
      <td>IBAN (required only for destinations that enforce IBAN format, such as SEPA-zone recipients).</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "SWIFT",
  "currency": "USD",
  "swift": {
    "swiftCode": "BNPAFRPPXXX",
    "bank": {
      "accountNumber": "00012345678"
    },
    "customer": {
      "firstName": "Pierre",
      "lastName": "Dupont",
      "email": "pierre@example.com",
      "documentType": "PASSPORT",
      "documentNumber": "FR1234567"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="swift" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
