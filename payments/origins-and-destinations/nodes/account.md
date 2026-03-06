---
description: Platform account node. Used to reference an account held on the platform.
---

# ACCOUNT

The ACCOUNT node references an internal account on the conomy_hq platform. It's used as an origin or destination when the funds move from or to a platform-managed account (identified by account number or identity).

**Direction:** Pay-in / Pay-out

## Fields

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
      <td>Must be <code>&quot;ACCOUNT&quot;</code></td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td>Currency of the account</td>
    </tr>
    <tr>
      <td><code>account.accountNumber</code></td>
      <td><code>string</code></td>
      <td>Platform account number</td>
    </tr>
    <tr>
      <td><code>account.identityId</code></td>
      <td><code>string</code></td>
      <td>Identity ID linked to the account</td>
    </tr>
  </tbody>
</table>

## Example — as origin (payout flow)

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "account": {
    "accountNumber": "acc_abc123"
  }
}
```

## Example — as destination (top-up flow)

```json
{
  "type": "ACCOUNT",
  "currency": "BRL",
  "account": {
    "accountNumber": "acc_xyz456",
    "identityId": "identity_789"
  }
}
```

The `accountNumber` corresponds to the account created via the [Accounts API](../../../api-reference/accounts.md).

## Schema

{% openapi-schemas spec="conomyhq-api" schemas="account" grouped="false" %}
[OpenAPI conomyhq-api](https://4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/gitbook-x-prod-openapi/raw/17d054ca6f1f82ffc0ac6c5ca258648bf9276ad3233875930d6934f6f1f2c995.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20260305%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260305T193243Z&X-Amz-Expires=172800&X-Amz-Signature=a4f0ac9a3025c54c4eb98035e6f025ebc44e7cd4009bd36c69dd99b1f03b375b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}
