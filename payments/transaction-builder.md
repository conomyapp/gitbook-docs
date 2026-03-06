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
---

# Transaction Builder

Build any valid `POST /payments` payload from user intent, currency pair, and rail availability.

{% hint style="info" %}
This builder is dynamic: it uses `GET /payments/available-products` to discover rails and required fields per identity and currency at runtime.
{% endhint %}

{% hint style="success" %}
Goal of this page: users can assemble a payment request and copy **JSON** or **cURL** from the GitBook API playground, without executing the transaction.
{% endhint %}

## 1. Interactive block (recommended)

If the `ConomyHQ Transaction Builder` integration is installed in your space, use this block to select values and generate payloads.

```conomy-transaction-builder
generate-only
```

## 2. Builder inputs

| Input | Description |
| --- | --- |
| User intent | `TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, `PURCHASE` |
| Amount | `purchaseAmount` |
| Source currency | `purchaseCurrency` |
| Settlement currency | `currency` |
| Identity | `identityId` |

## 3. Resolve products and rails (dynamic step)

Use this endpoint first. It defines what the user can build for each currency.

{% openapi-operation spec="conomyhq-api" path="/payments/available-products" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

Use:

- `byCurrency[].payin.paymentMethods` to render origin choices.
- `byCurrency[].payout.withdrawalMethods` to render destination choices.
- `requiredFields` and `requiredFieldTypes` to build and validate node inputs.
- `validOrigins` and `validDestinations` to enforce allowed combinations.

## 4. Route rules by intent

| User intent | `type` | Origin rule | Destination rule |
| --- | --- | --- | --- |
| Load internal account | `TOPUP_ACCOUNT` | Any pay-in rail from `paymentMethods` | `ACCOUNT` |
| Withdraw from internal account | `WITHDRAWAL_ACCOUNT` | `ACCOUNT` | Any pay-out rail from `withdrawalMethods` |
| Cross-border transfer | `REMITTANCE` | `ACCOUNT` or pay-in rail | Any valid pay-out rail |
| Checkout / customer charge | `PURCHASE` | Any pay-in rail | `ACCOUNT` |

## 5. Request shape

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<INTERNAL_ACCOUNT_NUMBER>",
  "type": "<TYPE>",
  "product": "<PURCHASE_CURRENCY>:<SETTLEMENT_CURRENCY>",
  "purchaseAmount": "<AMOUNT>",
  "purchaseCurrency": "<PURCHASE_CURRENCY>",
  "currency": "<SETTLEMENT_CURRENCY>",
  "origins": [
    {
      "type": "<ORIGIN_TYPE>",
      "currency": "<ORIGIN_CURRENCY>",
      "<originNodeKey>": {
        "<requiredField1>": "<value>",
        "<requiredField2>": "<value>"
      }
    }
  ],
  "destinations": [
    {
      "type": "<DESTINATION_TYPE>",
      "currency": "<DESTINATION_CURRENCY>",
      "<destinationNodeKey>": {
        "<requiredField1>": "<value>",
        "<requiredField2>": "<value>"
      }
    }
  ]
}
```

{% hint style="warning" %}
Use only one node object matching `type` in each origin/destination. Example: if `type` is `PIX`, send only `pix`.
{% endhint %}

## 6. Generate JSON/cURL in the API playground

Use the `POST /payments` block below to fill the request body and copy the generated request code.

1. Click `Try it` in the block.
2. Complete `type`, currencies, `product`, `origins`, and `destinations`.
3. Use the code preview to copy `cURL` or `JSON`.
4. Do not send the request if you only want request generation.

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

## 7. Common route presets

{% tabs %}
{% tab title="Load ARS account with CVU" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `ARS:ARS`  
`origin`: `CVU`  
`destination`: `ACCOUNT`
{% endtab %}

{% tab title="Load ARS account with PCT" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `ARS:ARS`  
`origin`: `PCT`  
`destination`: `ACCOUNT`
{% endtab %}

{% tab title="Pay in BRL (PIX) and settle CLP" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `BRL:CLP`  
`origin`: `PIX`  
`destination`: `ACCOUNT`
{% endtab %}
{% endtabs %}

## 8. Builder validation rules

1. `type` controls which origin/destination families are valid.
2. `product` must match `purchaseCurrency:currency`.
3. For single origin and single destination, `amount` per node is optional.
4. For split flows, each node must include `amount`, and all sums must match the payment amount.
5. Keep only the node object that matches `origins[].type` or `destinations[].type`.

## 9. Builder checklist

- Confirm the user goal (`TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, `PURCHASE`).
- Confirm source currency (`purchaseCurrency`) and settlement currency (`currency`).
- Call `GET /payments/available-products` for the target identity.
- Select a rail that appears in `paymentMethods`/`withdrawalMethods`.
- Render only the fields listed in `requiredFields`.
- Generate and copy `cURL`/`JSON`.

## Related docs

- [Available products](available-products.md)
- [Origins and Destinations](origins-and-destinations/README.md)
- [Nodes reference](origins-and-destinations/nodes/README.md)
- [Creating payments](creating-payments.md)
