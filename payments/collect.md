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

# Collect

{% hint style="info" %}
You can use `payment-attempts` or create the payment directly.
{% endhint %}

A **COLLECT** transaction allows you to **gather funds from multiple accounts** into a single destination account. It is commonly used for pooling money, collecting shared payments, or consolidating balances from multiple users.

***

#### Payment flow

<details>

<summary>Create payment</summary>

Creates a collect transaction specifying **multiple origins**, each with its own `amount`, and a **single destination**.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/payments' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "externalId": "payment-id-12345",
  "identityId": "67f21a61d6d09fcbb4e84631",
  "accountNumber": "1743919714051743919010211",
  "totalAmount": "30000.00",
  "currency": "COP",
  "product": "COP:COP",
  "type": "COLLECT",
  "purchaseAmount": "30000.00",
  "purchaseCurrency": "COP",
  "origins": [
    {
      "type": "ACCOUNT",
      "amount": "15000.00", 
      "currency": "COP",
      "identity": {
        "identityId": "67f21d17d6d09fcbb4e84632"
      },
      "account": {
        "accountNumber": "17439204080520250406060905072"
      }
    },
    {
      "type": "ACCOUNT",
      "amount": "15000.00",
      "currency": "COP",
      "identity": {
        "identityId": "67f21a61d6d09fcbb4e84631"
      },
      "account": {
        "accountNumber": "1743919714051743919010211"
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "amount": "30000.00",
      "currency": "COP",
      "identity": {
        "identityId": "67f21a61d6d09fcbb4e84631"
      },
      "account": {
        "accountNumber": "1743919714051743919010211"
      }
    }
  ]
}'
```
{% endcode %}

</details>

<details>

<summary>Capture payment</summary>

Captures the collected funds, finalizing the transaction once all origins have been committed.

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

Simulate the receipt confirmation of a collect payment.

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

<summary>Check Account information</summary>

Confirm the destination account where funds are being consolidated.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/accounts?accountNumber=1743919714051743919010211' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data ''
```
{% endcode %}

</details>
