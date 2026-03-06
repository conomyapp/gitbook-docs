---
description: Chilean open banking pay-in via bank widget. Used for pay-in in Chile.
---

# FINTOC

Fintoc is a Chilean open banking provider. It uses a hosted widget where the user connects their bank account and authorizes the transfer. No required fields — the widget handles the flow.

**Country:** Chile | **Currency:** CLP | **Direction:** Pay-in

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
      <td>Must be <code>&quot;FINTOC&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;CLP&quot;</code></td>
    </tr>
    <tr>
      <td><code>fintoc.customer</code></td>
      <td><code>object</code></td>
      <td>Optional payer information</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "FINTOC",
  "currency": "CLP",
  "fintoc": {
    "customer": {
      "firstName": "Diego",
      "email": "diego@example.com"
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
      <td>Hosted widget URL — redirect the user here</td>
    </tr>
    <tr>
      <td><code>token</code></td>
      <td>Session token for tracking</td>
    </tr>
  </tbody>
</table>

Send the user to `fintoc.url` to complete the bank connection and authorization.

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="fintoc" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
