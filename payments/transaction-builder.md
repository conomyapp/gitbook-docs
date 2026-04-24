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
description: Assemble a valid POST /payments payload from user intent, currency pair, and rail availability — without sending the request.
---

# Transaction builder

The transaction builder helps you assemble a valid `POST /payments` payload from four inputs — intent, currencies, identity, and amount — without executing the transaction. Use it to generate the JSON or cURL you will ship into your own client.

{% hint style="info" %}
The builder is dynamic: it resolves available rails and required fields at runtime via [`GET /payments/available-products`](available-products.md).
{% endhint %}

---

## How it works

The builder takes four inputs:

| Input | Maps to |
| --- | --- |
| Intent | The transaction `type` — `TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, or `PURCHASE`. |
| Amount | `purchaseAmount`. |
| Source currency | `purchaseCurrency`. |
| Settlement currency | `currency`. |
| Identity | `identityId` — the owner of the internal `ACCOUNT` node. |

From those inputs, the builder calls `GET /payments/available-products` to discover which pay-in and pay-out rails are enabled for the identity, then assembles the correct origin and destination nodes with their required fields.

---

## Intent to route mapping

| Intent | `type` | Origin | Destination |
| --- | --- | --- | --- |
| Load an internal account | `TOPUP_ACCOUNT` | Any pay-in rail from `paymentMethods` | `ACCOUNT` |
| Withdraw from an internal account | `WITHDRAWAL_ACCOUNT` | `ACCOUNT` | Any pay-out rail from `withdrawalMethods` |
| Cross-border transfer | `REMITTANCE` | `ACCOUNT` or any pay-in rail | Any pay-out rail |
| Charge an end customer | `PURCHASE` | Any pay-in rail | `ACCOUNT` |

---

## Resolve available rails

Call `available-products` first. Its response tells you what the user can build for each currency pair on this identity.

{% openapi-operation spec="conomyhq-api" path="/payments/available-products" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

Use the response to drive the builder UI:

* `byCurrency[].payin.paymentMethods` — origin choices.
* `byCurrency[].payout.withdrawalMethods` — destination choices.
* `requiredFields` and `requiredFieldTypes` — node input form.
* `validOrigins` and `validDestinations` — allowed combinations.

---

## Payload template

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
        "<requiredField1>": "<value>"
      }
    }
  ],
  "destinations": [
    {
      "type": "<DESTINATION_TYPE>",
      "currency": "<DESTINATION_CURRENCY>",
      "<destinationNodeKey>": {
        "<requiredField1>": "<value>"
      }
    }
  ]
}
```

### Rules

1. `product` must equal `purchaseCurrency:currency`.
2. Each origin or destination carries exactly one node sub-object, matching its `type`. Example: `"type": "PIX"` → include only `"pix": {...}`.
3. On a single origin and single destination, `amount` is optional — it defaults to the full payment amount.
4. On split flows (multiple origins or destinations), every node must include `amount`, and the sums must match `purchaseAmount`.

---

## Common presets

{% tabs %}
{% tab title="ARS topup (CVU)" %}
`type`: `TOPUP_ACCOUNT` · `product`: `ARS:ARS` · `origin`: `CVU` · `destination`: `ACCOUNT`
{% endtab %}

{% tab title="ARS topup (PCT)" %}
`type`: `TOPUP_ACCOUNT` · `product`: `ARS:ARS` · `origin`: `PCT` · `destination`: `ACCOUNT`
{% endtab %}

{% tab title="BRL → CLP topup (PIX)" %}
`type`: `TOPUP_ACCOUNT` · `product`: `BRL:CLP` · `origin`: `PIX` · `destination`: `ACCOUNT`
{% endtab %}

{% tab title="ARS withdrawal (bank)" %}
`type`: `WITHDRAWAL_ACCOUNT` · `product`: `ARS:ARS` · `origin`: `ACCOUNT` · `destination`: `BANK_ACCOUNT`
{% endtab %}
{% endtabs %}

---

## Generate the payload

1. Click **Try it** in the block below.
2. Complete `type`, currencies, `product`, `origins`, and `destinations`.
3. Copy the generated request from the code preview as JSON or cURL.
4. Do not send the request if you only want to generate the payload.

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

---

## Related

* [Available products](available-products.md)
* [Origins and destinations](origins-and-destinations/README.md)
* [Creating payments](creating-payments.md)
