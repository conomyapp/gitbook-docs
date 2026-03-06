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

Build a valid `POST /payments` payload from user intent, currency, and rail availability.

{% hint style="info" %}
Use this page as a decision guide. For dynamic integrations, always validate rails and required fields with `GET /payments/available-products` before creating the payment.
{% endhint %}

## 1. Define the user intent

| User intent | `type` | Typical origin | Typical destination |
| --- | --- | --- | --- |
| Load an internal balance | `TOPUP_ACCOUNT` | Pay-in rail (`PIX`, `CVU`, `PCT`, `PSE`, etc.) | `ACCOUNT` |
| Send money out from platform balance | `WITHDRAWAL_ACCOUNT` | `ACCOUNT` | Pay-out rail (`PIX`, `BANK_ACCOUNT`, `ACH`, `SWIFT`, etc.) |
| Cross-border transfer | `REMITTANCE` | `ACCOUNT` or pay-in rail | Pay-out rail |
| Charge a customer | `PURCHASE` | Pay-in rail | `ACCOUNT` |

## 2. Fetch available rails for the identity

```bash
curl --request GET \
  --url 'https://api.conomyhq.com/sandbox/payments/available-products?identityId=<IDENTITY_ID>&currencies=ARS,BRL,CLP' \
  --header 'Authorization: Bearer <TOKEN>'
```

Use:

- `byCurrency[].payin.paymentMethods` to render origin choices.
- `byCurrency[].payout.withdrawalMethods` to render destination choices.
- `requiredFields` and `requiredFieldTypes` to build and validate node inputs.
- `validOrigins` and `validDestinations` to enforce allowed combinations.

## 3. Ready-to-use flows

{% tabs %}
{% tab title="ARS top-up with CVU" %}

Use when the user wants to load an internal ARS account from Argentina bank rails.

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "type": "TOPUP_ACCOUNT",
  "product": "ARS:ARS",
  "purchaseAmount": "10000",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [
    {
      "type": "CVU",
      "currency": "ARS",
      "cvu": {
        "customer": {
          "firstName": "Juan",
          "lastName": "Perez",
          "email": "juan@example.com"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "ARS",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER>" }
    }
  ]
}
```
{% endtab %}

{% tab title="ARS top-up with PCT" %}

Use when the user pays with Argentina transfer QR (`PCT`) and funds an internal ARS account.

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "type": "TOPUP_ACCOUNT",
  "product": "ARS:ARS",
  "purchaseAmount": "10000",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [
    {
      "type": "PCT",
      "currency": "ARS",
      "pct": {
        "customer": {
          "email": "juan@example.com",
          "phoneNumber": "1123456789",
          "phoneNumberPrefix": "+54"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "ARS",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER>" }
    }
  ]
}
```
{% endtab %}

{% tab title="PIX to CLP account" %}

Use when the user pays in Brazil with `PIX` and you settle into an internal CLP account.

```json
{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER_CLP>",
  "type": "TOPUP_ACCOUNT",
  "product": "BRL:CLP",
  "purchaseAmount": "100",
  "purchaseCurrency": "BRL",
  "currency": "CLP",
  "origins": [
    {
      "type": "PIX",
      "currency": "BRL",
      "pix": {
        "successUrl": "https://yourapp.com/success",
        "failedUrl": "https://yourapp.com/failed",
        "customer": {
          "firstName": "Maria",
          "lastName": "Silva",
          "email": "maria@example.com",
          "documentNumber": "12345678901"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "CLP",
      "identity": { "identityId": "<IDENTITY_ID>" },
      "account": { "accountNumber": "<ACCOUNT_NUMBER_CLP>" }
    }
  ]
}
```
{% endtab %}
{% endtabs %}

## 4. Builder rules (must enforce)

1. `type` controls which origin/destination families are valid.
2. `product` must match `purchaseCurrency:currency`.
3. For single origin and single destination, `amount` per node is optional.
4. For split flows, each node must include `amount`, and all sums must match the payment amount.
5. Keep only the node object that matches `origins[].type` or `destinations[].type`.

## 5. Route selection checklist

- Confirm the user goal (`TOPUP_ACCOUNT`, `WITHDRAWAL_ACCOUNT`, `REMITTANCE`, `PURCHASE`).
- Confirm source currency (`purchaseCurrency`) and settlement currency (`currency`).
- Call `GET /payments/available-products` for the target identity.
- Select a rail that appears in `paymentMethods`/`withdrawalMethods`.
- Render only the fields listed in `requiredFields`.
- Submit `POST /payments`.

## Related docs

- [Available products](available-products.md)
- [Origins and Destinations](origins-and-destinations/README.md)
- [Nodes reference](origins-and-destinations/nodes/README.md)
- [Creating payments](creating-payments.md)
