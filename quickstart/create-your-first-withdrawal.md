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

# Create your first withdrawal

{% hint style="info" %}
You can use `payment-attempts` or create the payment directly.
{% endhint %}

A **WITHDRAWAL\_ACCOUNT** transaction allows a user to **withdraw funds from their conomy\_hq account** and transfer them to an **external destination**, such as a **bank account**. This is typically used when users want to move money out of the platform.

***

#### Payment flow

<details>

<summary>Create payment</summary>

Creates a withdrawal request using an internal conomy\_hq account as the origin and a bank account as the destination.

{% code overflow="wrap" %}
```
curl --location 'https://api.conomyhq.com/sandbox/payments' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "identityId": "67a0307eaddea901a60144ec",
  "accountNumber": "174127721505166050317",
  "externalId": "1234-ext",
  "product": "COP:COP",
  "type": "WITHDRAWAL_ACCOUNT",
  "purchaseAmount": "5000",
  "purchaseCurrency": "COP",
  "currency": "COP",
  "origins": [
    {
      "type": "ACCOUNT",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec"
      },
      "account": {
        "accountNumber": "174127721505166050317"
      }
    }
  ],
  "destinations": [
    {
      "type": "BANK_ACCOUNT",
      "bank": {
        "accountNumber": "173853177805176050114",
        "bank": "SANTANDER",
        "currency": "COP",
        "accountHolder": "Jorgito Cabane",
        "accountHolderDni": "18782721-3",
        "nickname": "santander"
      }
    }
  ]
}'
```
{% endcode %}

</details>

<details>

<summary>Capture payment</summary>

Finalize the withdrawal by capturing the transaction.

{% code overflow="wrap" %}
```sh
curl --location --request POST 'https://api.conomyhq.com/sandbox/payments/<PAYMENT_ID>/captured' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data ''
```
{% endcode %}

</details>

<details>

<summary>Webhook simulation</summary>

Use this webhook simulation to test your system’s handling of withdrawal confirmations.

{% code overflow="wrap" %}
```sh
curl --location --request POST 'https://api.conomyhq.com/sandboxwebhook/payments/received/payment-provider' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
  "id": "<PAYMENT_ID>"
}'
```
{% endcode %}

</details>

<details>

<summary>Check account information</summary>

Check the internal account before or after the withdrawal to confirm the balance or ownership.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/accounts?accountNumber=174127721505166050317' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data ''
```
{% endcode %}

</details>
