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

# Introduction

This guide walks you through a complete sandbox flow: authenticate, create entities, open accounts, and move funds.

{% hint style="info" %}
Recommended flow: complete each step in order and keep the generated IDs from every response (`identityId`, `accountNumber`, `paymentId`).
{% endhint %}

### Prerequisites

Before you begin, ensure you have

- A valid `x-api-key`.
- Your `clientId` and `clientSecret`.
- A development environment with `cURL` or Postman.
- A registered sandbox account.

### Step-by-Step

{% content-ref url="obtain-an-access-token.md" %}
[Step 1: 🔐 Obtain an access token](obtain-an-access-token.md)
{% endcontent-ref %}

{% content-ref url="create-an-organization.md" %}
[Step 2: 🏢 Create an organization](create-an-organization.md)
{% endcontent-ref %}

{% content-ref url="create-users.md" %}
[Step 3: 👥 Create users](create-users.md)
{% endcontent-ref %}

{% content-ref url="create-accounts.md" %}
[Step 4: 🏦 Create accounts](create-accounts.md)
{% endcontent-ref %}

{% content-ref url="create-your-first-top-up.md" %}
[Step 5: ⬇️ Create your first top-up](create-your-first-top-up.md)
{% endcontent-ref %}

{% content-ref url="create-your-first-withdrawal.md" %}
[Step 6: ⬆️ Create your first withdrawal](create-your-first-withdrawal.md)
{% endcontent-ref %}
