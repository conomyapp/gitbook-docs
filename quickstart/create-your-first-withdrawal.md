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

A **WITHDRAWAL\_ACCOUNT** transaction moves funds from an internal conomy\_hq account to an external destination such as a bank account or payment rail. The origin is always an internal `ACCOUNT`.

---

#### Payment flow

<details>

<summary>Create payment</summary>

Creates a withdrawal from an internal account to an external bank account.

The example below uses **BANK\_ACCOUNT** as the destination (Argentina). For other rails — such as `SPEI` (Mexico), `PIX` (Brazil), or `ACH` (USA) — replace the `destinations` node accordingly. See the [Nodes page](../payments/origins-and-destinations/nodes/README.md) for all available rails.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/payments' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "identityId": "<IDENTITY_ID>",
  "accountNumber": "<ACCOUNT_NUMBER>",
  "product": "ARS:ARS",
  "type": "WITHDRAWAL_ACCOUNT",
  "purchaseAmount": "5000",
  "purchaseCurrency": "ARS",
  "currency": "ARS",
  "origins": [
    {
      "type": "ACCOUNT",
      "currency": "ARS",
      "identity": {
        "identityId": "<IDENTITY_ID>"
      },
      "account": {
        "accountNumber": "<ACCOUNT_NUMBER>"
      }
    }
  ],
  "destinations": [
    {
      "type": "BANK_ACCOUNT",
      "currency": "ARS",
      "bank": {
        "accountNumber": "0000267900000001588730",
        "bank": "BANCO_CMF",
        "currency": "ARS",
        "typeAccount": "CHECKING",
        "accountHolder": "Fernando Domínguez",
        "accountHolderDni": "20219636890",
        "country": "AR"
      },
      "customer": {
        "firstName": "Fernando",
        "lastName": "Domínguez",
        "documentNumber": "20219636890",
        "country": "ARG",
        "email": "fernando@example.com"
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

Simulate a webhook to test your system's handling of withdrawal confirmations.

{% code overflow="wrap" %}
```sh
curl --location --request POST 'https://api.conomyhq.com/sandboxwebhook/payments/received/payment-provider' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: */*' \
--data-raw '{
  "id": "<PAYMENT_ID>"
}'
```
{% endcode %}

</details>

<details>

<summary>Check account balance</summary>

Verify the updated balance after the withdrawal.

{% code overflow="wrap" %}
```sh
curl --location 'https://api.conomyhq.com/sandbox/accounts?accountNumber=<ACCOUNT_NUMBER>' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: application/json'
```
{% endcode %}

</details>

---

### Withdrawal by region

| Region        | Destination type | Rail          |
| ------------- | ---------------- | ------------- |
| Argentina  | `BANK_ACCOUNT`   | Bank transfer |
| Mexico     | `SPEI`           | CLABE         |
| Brazil     | `PIX`            | PIX key       |
| USA        | `ACH`            | Bank transfer |
| UK         | `FPE`            | Faster Pay    |
| Europe     | `SEPA`           | IBAN          |
| Chile      | `BANK_ACCOUNT`   | Bank transfer |
| Colombia   | `BANK_ACCOUNT`   | Bank transfer |
