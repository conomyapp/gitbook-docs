---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: false
---

# Welcome to conomy\_hq

Build and operate account + payment flows with a single API surface for:

- Identity and organization management
- Multi-rail pay-ins and payouts
- Account lifecycle and balances
- Checkout sessions, payment links, and webhooks

{% hint style="info" %}
Start in `sandbox`, then move to production credentials once your integration and webhook flow are validated.
{% endhint %}

## Environments

{% tabs %}
{% tab title="🧪 Sandbox" %}
Use sandbox for development, test payments, and webhook handling.

```bash
https://api.conomyhq.com/sandbox
```
{% endtab %}

{% tab title="🚀 Production" %}
Switch once your credentials, idempotency, and webhook verification are ready.

```bash
https://api.conomyhq.com
```
{% endtab %}
{% endtabs %}

## Integrate in 4 Steps

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="quickstart/obtain-an-access-token.md" %}
[1. 🔐 Authenticate](quickstart/obtain-an-access-token.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="quickstart/create-an-organization.md" %}
[2. 🧩 Create identity model](quickstart/create-an-organization.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="quickstart/create-accounts.md" %}
[3. 🏦 Open accounts](quickstart/create-accounts.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="quickstart/create-your-first-top-up.md" %}
[4. 🚀 Execute first transaction](quickstart/create-your-first-top-up.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

## Common Workflows

{% tabs %}
{% tab title="⬇️ Collect funds (pay-in)" %}
Use external rails (`PIX`, `ETPAY`, `PSE`, `CARD`, etc.) as origin and settle into internal `ACCOUNT` destinations.

{% content-ref url="payments/payment-types/topup-account.md" %}
[⬇️ Top-up account](payments/payment-types/topup-account.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="⬆️ Send funds (pay-out)" %}
Use internal `ACCOUNT` origins and external rails (`BANK_ACCOUNT`, `SPEI`, `ACH`, `SWIFT`, etc.) as destinations.

{% content-ref url="payments/payment-types/withdrawal-account.md" %}
[⬆️ Withdrawal account](payments/payment-types/withdrawal-account.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="🧾 Charge customers" %}
Use `PURCHASE` with checkout/payment-link flows and webhook-driven lifecycle updates.

{% content-ref url="api-reference/payments/payment-links.md" %}
[🔗 Payment links](api-reference/payments/payment-links.md)
{% endcontent-ref %}
{% endtab %}
{% endtabs %}

## Core Docs

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="api-reference/authentication.md" %}
[🔑 Authentication](api-reference/authentication.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="payments/payment-structure.md" %}
[🧱 Payment structure](payments/payment-structure.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="api-reference/payments/README.md" %}
[💸 Payments API](api-reference/payments/README.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="payments/origins-and-destinations/nodes/README.md" %}
[🧭 Nodes reference](payments/origins-and-destinations/nodes/README.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="home/countries.md" %}
[🌍 Countries](home/countries.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="home/currencies.md" %}
[💱 Currencies](home/currencies.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

## Support and Go-live

Questions about integration, rails, or go-live:

- [hola@conomyhq.com](mailto:hola@conomyhq.com)



