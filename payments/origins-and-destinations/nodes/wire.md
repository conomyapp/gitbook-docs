---
description: Domestic and international wire transfer. Used for pay-out in the USA.
layout:
  width: full
---

# WIRE

Wire transfers are same-day domestic bank transfers in the USA. They are typically used for large amounts and settle faster than ACH. Use as a destination for payouts to US bank accounts.

**Country:** USA | **Currency:** USD | **Direction:** Pay-out

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
      <td>Must be <code>&quot;WIRE&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;USD&quot;</code></td>
    </tr>
    <tr>
      <td><code>wire.bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s bank account number</td>
    </tr>
    <tr>
      <td><code>wire.swiftCode</code></td>
      <td><code>string</code></td>
      <td>SWIFT/BIC code of the recipient&#x27;s bank</td>
    </tr>
    <tr>
      <td><code>wire.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>wire.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>wire.customer.email</code></td>
      <td><code>string</code></td>
      <td>Recipient&#x27;s email</td>
    </tr>
    <tr>
      <td><code>wire.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>SSN or other ID</td>
    </tr>
    <tr>
      <td><code>wire.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type</td>
    </tr>
    <tr>
      <td><code>wire.iban</code></td>
      <td><code>string</code></td>
      <td>IBAN (for international wires)</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "WIRE",
  "currency": "USD",
  "wire": {
    "swiftCode": "CHASUS33",
    "bank": {
      "accountNumber": "000987654321"
    },
    "customer": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "documentType": "SSN",
      "documentNumber": "987654321"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="wire" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
