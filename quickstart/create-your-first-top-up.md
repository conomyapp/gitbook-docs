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

# Create your first Top-up

{% hint style="success" %}
You can use `payment-attempts` or create the payment directly.
{% endhint %}

A **TOPUP\_ACCOUNT** transaction is used to fund an accoun**t** within **conomy\_hq**. This type allows users to add money to their balance for future transactions, such as payments, purchases, or transfers.

#### Payment flow

<details>

<summary><strong>Retrieve Payment Origins</strong></summary>

Before creating a top-up, you must retrieve the available **payment origins** (e.g., ETPAY, WOMPI, etc.) linked to the client.

{% code overflow="wrap" %}
```sh
curl --location --request GET 'https://api.conomyhq.com/sandbox/payment-origins?accountId=<ACCOUNT_ID>' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive'
```
{% endcode %}

</details>

<details>

<summary><strong>Create Payment</strong></summary>

Creates a top-up request using a selected origin and specifying the destination account to be funded.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/payments' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "identityId": "679fd871addea901a60144e3",
  "accountNumber": "173854531105176050117",
  "externalId": "ext-1",
  "product": "CLP:CLP",
  "type": "TOPUP_ACCOUNT",
  "purchaseAmount": "700000",
  "purchaseCurrency": "CLP",
  "currency": "CLP",
  "origins": [
    {
      "name": "ETPAY",
      "type": "PAYMENT_INITATION",
      "paymentInitiation": {
        "origin": "ETPAY"
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "CLP",
      "identity": {
        "identityId": "679c482ee4420cb5b0966c9a"
      },
      "account": {
        "accountNumber": "173854531105176050117"
      }
    }
  ]
}'
```
{% endcode %}

</details>

<details>

<summary><strong>Capture Payment</strong></summary>

After confirming the top-up (via the payment provider), capture the funds to reflect them in the user’s account.

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

<summary><strong>Webhook simulation</strong></summary>

Simulate a webhook notification to test your payment confirmation handling.

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

<summary><strong>Check account info</strong></summary>

Use this request to verify that the funds were deposited correctly into the account.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/accounts?accountNumber=173854531105176050117' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data ''
```
{% endcode %}

</details>
