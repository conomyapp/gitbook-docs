---
description: Argentina's virtual account identifier for bank transfers. Used for pay-in in Argentina.
layout:
  width: full
---

# CVU

CVU (Clave Virtual Uniforme) is the virtual account identifier used in Argentina for instant bank transfers between banks and fintechs. Use it as an origin when collecting funds from an Argentine payer.

**Country:** Argentina | **Currency:** ARS | **Direction:** Pay-in

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"CVU"` |
| `currency` | `string` | Must be `"ARS"` |


## Optional fields


| Field | Type | Description |
| --- | --- | --- |
| `cvu.code` | `string` | Optional CVU/CBU code when your flow provides a pre-assigned identifier. |
| `cvu.customer.*` | `object` | Optional customer data for downstream reconciliation. |


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


| Node | Description |
| --- | --- |
| `ACCOUNT` | Internal platform account |


## Schema

{% openapi-schemas spec="conomyhq-api" schemas="cvu-wrapper" grouped="false" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-schemas %}
