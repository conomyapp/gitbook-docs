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

**conomy\_hq** supports multiple types of transactions to manage the movement of funds across internal and external accounts. Each payment type defines a specific financial behavior within the platform, including who initiates the transaction, what types of accounts are involved, and how the funds flow.

Only the **owner of a given account** has the privileges to initiate or authorize payments from that account.

{% openapi-schemas spec="conomyhq-api" schemas="payment-type" grouped="false" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/df7752dcd655f80f330d0c1b0f66d5af6504137751ebae2f2e372525e6af9775.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250701%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250701T193440Z&X-Amz-Expires=172800&X-Amz-Signature=297079c5c9ccfa9fda6803fd8b9c4f76f939c4201f80e9c7aac3f2e577e7dfe2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

Below you will find detailed documentation for each supported payment type:

<details>

<summary><code>TOPUP_ACCOUNT</code></summary>

Funds an account in **conomy\_hq.**

<a href="topup-account.md" class="button secondary">Go to topup payment docs</a>

</details>

<details>

<summary><code>WITHDRAWAL_ACCOUNT</code></summary>

Withdraws funds from a **conomy\_hq** account.

<a href="withdrawal-account.md" class="button secondary">Go to withdrawal payment docs</a>

</details>

<details>

<summary><code>PURCHASE</code></summary>

Sale payment between client and third party.

<a href="purchase.md" class="button secondary">Go to purchase payment docs</a>

</details>

<details>

<summary><code>P2P</code></summary>

Transfers between service providers or organizations.

<a href="p2p.md" class="button secondary">Go to P2P payment docs</a>

</details>

<details>

<summary><code>COLLECT</code></summary>

Collects funds from multiple origins into a single destination.

<a href="collect.md" class="button secondary">Go to collect payment docs</a>

</details>

<details>

<summary><code>FEE</code></summary>

Automatically generated fees per business rules.

<a href="./#topup_account" class="button secondary">Go to fee docs</a>

</details>
