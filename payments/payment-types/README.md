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

<summary><code>REMITTANCE</code></summary>

Crossborder payment from an internal or external account to receipient in another country.

<a href="p2p.md" class="button secondary">Go to remittance payment docs</a>

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
