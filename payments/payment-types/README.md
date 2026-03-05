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
    visible: true
---

# Payment types

`conomy_hq` supports multiple types of transactions to manage the movement of funds across internal and external accounts. Each payment type defines a specific financial behavior within the platform, including who initiates the transaction, what types of accounts are involved, and how the funds flow.

{% hint style="info" %}
Only the owner of an account can initiate or authorize payments from that account.
{% endhint %}

## Available Types

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="topup-account.md" %}
[⬇️ TOPUP\_ACCOUNT](topup-account.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="withdrawal-account.md" %}
[⬆️ WITHDRAWAL\_ACCOUNT](withdrawal-account.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="purchase.md" %}
[🧾 PURCHASE](purchase.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="remittance.md" %}
[🌐 REMITTANCE](remittance.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column %}
{% content-ref url="p2p.md" %}
[🔁 P2P](p2p.md)
{% endcontent-ref %}
{% endcolumn %}

{% column %}
{% content-ref url="collect.md" %}
[📥 COLLECT](collect.md)
{% endcontent-ref %}
{% endcolumn %}
{% endcolumns %}

{% content-ref url="fee.md" %}
[🧮 FEE](fee.md)
{% endcontent-ref %}

## Selection Guide

| Use case | Recommended type |
| ---: | ---: |
| Add funds to an internal balance | `TOPUP_ACCOUNT` |
| Send funds to external rails/banks | `WITHDRAWAL_ACCOUNT` |
| Charge customers for goods/services | `PURCHASE` |
| Cross-border transfer to another country | `REMITTANCE` |
| Internal transfer account-to-account | `P2P` |
| Pull funds from multiple internal accounts | `COLLECT` |
| Auto-generated business fees | `FEE` |
