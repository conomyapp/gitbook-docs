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

# Peer to peer payment - P2P

{% hint style="info" %}
You can use `payment-attempts` or create the payment directly.
{% endhint %}

A **P2P** (peer-to-peer) transaction is used to **transfer funds between service providers or organizations**. This is ideal for internal transfers, operator-to-operator flows, or any case where both origin and destination are known entities.\
Although similar in structure to `PURCHASE`, it must not be used for customer payment flows.

#### Payment flow

<details>

<summary><strong>Create payment</strong></summary>

Creates a `P2P` transaction by specifying the origin and destination accounts, both belonging to known internal identities.

```sh
curl --location 'https://api.conomyhq.com/sandbox/payments' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "identityId": "67f21a61d6d09fcbb4e84631",
  "externalId": "p2p-transfer-001",
  "accountNumber": "1743919714051743919010211",
  "product": "COP:COP",
  "type": "P2P",
  "purchaseAmount": "15000.00",
  "purchaseCurrency": "COP",
  "currency": "COP",
  "origins": [
    {
      "type": "ACCOUNT",
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
      "amount": "15000.00",
      "currency": "COP",
      "identity": {
        "identityId": "67f21d17d6d09fcbb4e84632"
      },
      "account": {
        "accountNumber": "17439204080520250406060905072"
      }
    }
  ]
}'
```

</details>

<details>

<summary><strong>Capture payment</strong></summary>

Capture the `P2P` transaction to finalize the transfer between entities.

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

Simulate a webhook event to confirm the `P2P` transaction has been received or processed.

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

<summary><strong>Check account information</strong></summary>

Verify the origin or destination account at any time to ensure correctness.

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
