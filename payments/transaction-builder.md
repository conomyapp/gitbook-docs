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

## 1. Builder inputs

| Input | Description |
| --- | --- |
| User intent | `TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, `PURCHASE` |
| Amount | `purchaseAmount` |
| Source currency | `purchaseCurrency` |
| Settlement currency | `currency` |
| Identity | `identityId` |

## 2. Resolve products and rails (dynamic step)

Use this endpoint first. It defines what the user can build for each currency.

{% openapi-operation spec="conomyhq-api" path="/payments/available-products" method="get" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

Use:

- `byCurrency[].payin.paymentMethods` to render origin choices.
- `byCurrency[].payout.withdrawalMethods` to render destination choices.
- `requiredFields` and `requiredFieldTypes` to build and validate node inputs.
- `validOrigins` and `validDestinations` to enforce allowed combinations.

## 3. Route rules by intent

| User intent | `type` | Origin rule | Destination rule |
| --- | --- | --- | --- |
| Load internal account | `TOPUP_ACCOUNT` | Any pay-in rail from `paymentMethods` | `ACCOUNT` |
| Withdraw from internal account | `WITHDRAWAL_ACCOUNT` | `ACCOUNT` | Any pay-out rail from `withdrawalMethods` |
| Cross-border transfer | `REMITTANCE` | `ACCOUNT` or pay-in rail | Any valid pay-out rail |
| Checkout / customer charge | `PURCHASE` | Any pay-in rail | `ACCOUNT` |

## 4. Payload template (works for any route)

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

## 5. Validate and create the payment

Run the payment creation endpoint after selecting rail + required fields.

{% openapi-operation spec="conomyhq-api" path="/payments" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-operation %}

## 6. Example routes (using the same dynamic builder)

{% tabs %}
{% tab title="Load ARS account with CVU" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `ARS:ARS`  
`origin`: `CVU`  
`destination`: `ACCOUNT`

```json
{
  "type": "TOPUP_ACCOUNT",
  "product": "ARS:ARS",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [{ "type": "CVU" }],
  "destinations": [{ "type": "ACCOUNT" }]
}
```
{% endtab %}

{% tab title="Load ARS account with PCT" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `ARS:ARS`  
`origin`: `PCT`  
`destination`: `ACCOUNT`

```json
{
  "type": "TOPUP_ACCOUNT",
  "product": "ARS:ARS",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [{ "type": "PCT" }],
  "destinations": [{ "type": "ACCOUNT" }]
}
```
{% endtab %}

{% tab title="Pay in BRL (PIX) and settle CLP" %}

`type`: `TOPUP_ACCOUNT`  
`product`: `BRL:CLP`  
`origin`: `PIX`  
`destination`: `ACCOUNT`

```json
{
  "type": "TOPUP_ACCOUNT",
  "product": "BRL:CLP",
  "purchaseCurrency": "BRL",
  "currency": "CLP",
  "origins": [{ "type": "PIX", "currency": "BRL" }],
  "destinations": [{ "type": "ACCOUNT", "currency": "CLP" }]
}
```
{% endtab %}
{% endtabs %}

## 7. Builder validation rules

1. `type` controls which origin/destination families are valid.
2. `product` must match `purchaseCurrency:currency`.
3. For single origin and single destination, `amount` per node is optional.
4. For split flows, each node must include `amount`, and all sums must match the payment amount.
5. Keep only the node object that matches `origins[].type` or `destinations[].type`.

## 8. Implementation checklist

- Confirm the user goal (`TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, `PURCHASE`).
- Confirm source currency (`purchaseCurrency`) and settlement currency (`currency`).
- Call `GET /payments/available-products` for the target identity.
- Select a rail that appears in `paymentMethods`/`withdrawalMethods`.
- Render only the fields listed in `requiredFields`.
- Submit `POST /payments`.

## 9. Frontend payload factory (example)

```ts
type BuilderInput = {
  identityId: string;
  accountNumber: string;
  type: "TOPUP_ACCOUNT" | "WITHDRAWAL_ACCOUNT" | "REMITTANCE" | "PURCHASE";
  purchaseAmount: string;
  purchaseCurrency: string;
  currency: string;
  originType: string;
  destinationType: string;
  originCurrency: string;
  destinationCurrency: string;
  originNode: Record<string, unknown>;
  destinationNode: Record<string, unknown>;
};

const nodeKeyByType: Record<string, string> = {
  ACCOUNT: "account",
  BANK_ACCOUNT: "bank",
  CRYPTO: "wallet",
  PIX: "pix",
  PCT: "pct",
  CVU: "cvu",
  ETPAY: "etpay",
  FINTOC: "fintoc",
  WEBPAY: "webpay",
  SPEI: "spei",
  PSE: "pse",
  BANCOLOMBIA: "bancolombia",
  DAVIVIENDA: "davivienda",
  DAVIPLATA: "daviplata",
  NEQUI: "nequi",
  ACH: "ach",
  WIRE: "wire",
  SWIFT: "swift",
  RTP: "rtp",
  FEDNOW: "fednow",
  FPE: "fpe",
  SEPA: "sepa"
};

export function buildPaymentPayload(input: BuilderInput) {
  const originNodeKey = nodeKeyByType[input.originType];
  const destinationNodeKey = nodeKeyByType[input.destinationType];
  if (!originNodeKey || !destinationNodeKey) throw new Error("Unsupported node type");

  return {
    identityId: input.identityId,
    accountNumber: input.accountNumber,
    type: input.type,
    product: `${input.purchaseCurrency}:${input.currency}`,
    purchaseAmount: input.purchaseAmount,
    purchaseCurrency: input.purchaseCurrency,
    currency: input.currency,
    origins: [
      {
        type: input.originType,
        currency: input.originCurrency,
        [originNodeKey]: input.originNode
      }
    ],
    destinations: [
      {
        type: input.destinationType,
        currency: input.destinationCurrency,
        [destinationNodeKey]: input.destinationNode
      }
    ]
  };
}
```

## Related docs

- [Available products](available-products.md)
- [Origins and Destinations](origins-and-destinations/README.md)
- [Nodes reference](origins-and-destinations/nodes/README.md)
- [Creating payments](creating-payments.md)
