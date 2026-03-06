---
description: The Clearing House's Real-Time Payments network. Used for instant pay-in in the USA.
---

# RTP

RTP (Real-Time Payments) is The Clearing House's instant payment network, operating 24/7 in the USA. Payments settle in seconds. Widely supported by major US banks.

**Country:** USA | **Currency:** USD | **Direction:** Pay-in

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
      <td>Must be <code>&quot;RTP&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;USD&quot;</code></td>
    </tr>
    <tr>
      <td><code>rtp.bank.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Bank account number</td>
    </tr>
    <tr>
      <td><code>rtp.routingNumber</code></td>
      <td><code>string</code></td>
      <td>9-digit ABA routing number</td>
    </tr>
    <tr>
      <td><code>rtp.customer.firstName</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s first name</td>
    </tr>
    <tr>
      <td><code>rtp.customer.lastName</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s last name</td>
    </tr>
    <tr>
      <td><code>rtp.customer.email</code></td>
      <td><code>string</code></td>
      <td>Account holder&#x27;s email</td>
    </tr>
    <tr>
      <td><code>rtp.customer.documentNumber</code></td>
      <td><code>string</code></td>
      <td>SSN or ITIN</td>
    </tr>
    <tr>
      <td><code>rtp.customer.documentType</code></td>
      <td><code>string</code></td>
      <td>Document type</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "RTP",
  "currency": "USD",
  "rtp": {
    "routingNumber": "021000021",
    "bank": {
      "accountNumber": "000123456789"
    },
    "customer": {
      "firstName": "Sarah",
      "lastName": "Williams",
      "email": "sarah@example.com",
      "documentType": "SSN",
      "documentNumber": "456789012"
    }
  }
}
```

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="rtp" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
