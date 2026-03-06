---
description: Argentina's virtual account identifier for bank transfers. Used for pay-in in Argentina.
layout:
  width: full
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as an origin when collecting funds from an Argentine payer.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

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
      <td>Must be <code>&quot;CVU&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Must be <code>&quot;ARS&quot;</code></td>
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
      <td><code>cvu.code</code></td>
      <td><code>string</code></td>
      <td>Optional CVU/CBU code when your flow provides a pre-assigned identifier.</td>
    </tr>
    <tr>
      <td><code>cvu.customer.*</code></td>
      <td><code>object</code></td>
      <td>Optional customer data for downstream reconciliation.</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {}
}
```

## Valid destinations

When CVU is used as origin, the valid destinations are:

<table data-full-width="true">
  <thead>
    <tr>
      <th>Node</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ACCOUNT</code></td>
      <td>Internal platform account</td>
    </tr>
  </tbody>
</table>

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="cvu" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
