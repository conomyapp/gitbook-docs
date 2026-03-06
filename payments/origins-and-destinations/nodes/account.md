---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: Platform account node. Used to reference an account held on the platform.
---

# ACCOUNT

The ACCOUNT node references an internal account on the conomy_hq platform. It's used as an origin or destination when the funds move from or to a platform-managed account (identified by account number or identity).

**Direction:** Pay-in / Pay-out

## Fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"ACCOUNT"` |
| `currency` | `string` | Currency of the account |
| `account.accountNumber` | `string` | Platform account number |
| `account.identityId` | `string` | Identity ID linked to the account |


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

