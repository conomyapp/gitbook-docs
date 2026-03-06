---
description: Cryptocurrency wallet node for global transfers. Used for pay-in and pay-out.
layout:
  width: full
---

# CRYPTO

Use `CRYPTO` when funds move to or from an external blockchain wallet.

**Countries:** Global | **Currency:** `USDC`, `USDT` (network-dependent) | **Direction:** Pay-in / Pay-out

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
      <td>Must be <code>"CRYPTO"</code>.</td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Settlement currency configured for the flow (for example, <code>"USDC"</code> or <code>"USDT"</code>).</td>
    </tr>
    <tr>
      <td><code>wallet.address</code></td>
      <td><code>string</code></td>
      <td>Destination/source wallet address.</td>
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
      <td><code>wallet.provider</code></td>
      <td><code>string</code></td>
      <td>Provider identifier used by your integration.</td>
    </tr>
    <tr>
      <td><code>wallet.referenceId</code></td>
      <td><code>string</code></td>
      <td>External wallet identifier in the provider system.</td>
    </tr>
    <tr>
      <td><code>wallet.token</code></td>
      <td><code>string</code></td>
      <td>Token symbol when you need to override/clarify the token in the node payload.</td>
    </tr>
    <tr>
      <td><code>wallet.network</code></td>
      <td><code>string</code></td>
      <td>Blockchain network used by the wallet address (for example, <code>ETH</code>, <code>TRON</code>, <code>SOLANA</code>).</td>
    </tr>
  </tbody>
</table>

## Example

```json
{
  "type": "CRYPTO",
  "currency": "USDC",
  "wallet": {
    "address": "0x7e57b4f8f53f0f0c0a2c8e5f8d5b4f19a0a2c8e5",
    "network": "ETH",
    "token": "USDC"
  }
}
```

## Valid combinations

<table data-full-width="true">
  <thead>
    <tr>
      <th>When CRYPTO is used as...</th>
      <th>Valid counterpart node types</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Origin</td>
      <td><code>ACCOUNT</code></td>
    </tr>
    <tr>
      <td>Destination</td>
      <td><code>ACCOUNT</code></td>
    </tr>
  </tbody>
</table>

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="wallet" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
