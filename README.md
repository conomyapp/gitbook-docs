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

Build and operate account and payment flows with a single API surface:

* Identity and organization management
* Multi-rail topups and withdrawals
* Account lifecycle and balances
* Checkout sessions, payment links, and webhooks

{% hint style="info" %}
Start in sandbox, then move to production credentials once your integration and webhook flow are validated.
{% endhint %}

## Environments

{% tabs %}
{% tab title="Sandbox" %}
Use sandbox for development, test payments, and webhook handling.

```bash
https://api.conomyhq.com/sandbox
```
{% endtab %}

{% tab title="Production" %}
Switch once your credentials, webhook verification, and error handling are ready.

```bash
https://api.conomyhq.com
```
{% endtab %}
{% endtabs %}

---

## Start here

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="quickstart/introduction.md" %}
[Quickstart](quickstart/introduction.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="api-reference/authentication.md" %}
[Authentication](api-reference/authentication.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="payments/payment-structure.md" %}
[Payment structure](payments/payment-structure.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

---

## Common flows

{% tabs %}
{% tab title="Collect funds" %}
Bring funds into an internal account using a pay-in rail (`CVU`, `PIX`, `ETPAY`, `PSE`, `ACH`, and others).

{% content-ref url="payments/payment-types/topup-account.md" %}
[Topup account](payments/payment-types/topup-account.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="Send funds" %}
Send funds from an internal account to an external destination using a pay-out rail (`BANK_ACCOUNT`, `SPEI`, `PIX`, `ACH`, `SWIFT`, and others).

{% content-ref url="payments/payment-types/withdrawal-account.md" %}
[Withdrawal account](payments/payment-types/withdrawal-account.md)
{% endcontent-ref %}
{% endtab %}

{% tab title="Charge customers" %}
Use `PURCHASE` with checkout sessions or payment links for end-user collection flows with webhook-driven lifecycle updates.

{% content-ref url="api-reference/payments/payment-links.md" %}
[Payment links](api-reference/payments/payment-links.md)
{% endcontent-ref %}
{% endtab %}
{% endtabs %}

---

## Explore

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="payments/origins-and-destinations/README.md" %}
[Payment rails](payments/origins-and-destinations/README.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="compliance/README.md" %}
[Compliance](compliance/README.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="api-reference/payments/README.md" %}
[API reference](api-reference/payments/README.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

---

## Support

Questions about integration, rails, or go-live:

* [hola@conomyhq.com](mailto:hola@conomyhq.com)
