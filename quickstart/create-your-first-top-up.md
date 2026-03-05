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

A **TOPUP\_ACCOUNT** transaction funds an internal conomy\_hq account. The origin is a payment rail (e.g., ETPAY in Chile, PIX in Brazil) and the destination is an internal `ACCOUNT`.

#### Payment flow

<details>

<summary><strong>Create Payment</strong></summary>

Creates a top-up using a payment rail as the origin and an internal account as the destination.

The example below uses **ETPAY** (open banking, Chile). Replace the `origins` node type and sub-object to use a different rail — see the [Nodes page](../payments/origins-and-destinations/nodes.md) for all available rails.

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
  "product": "CLP:CLP",
  "type": "TOPUP_ACCOUNT",
  "purchaseAmount": "700000",
  "purchaseCurrency": "CLP",
  "currency": "CLP",
  "origins": [
    {
      "type": "ETPAY",
      "currency": "CLP",
      "etpay": {
        "successUrl": "https://yourapp.com/success",
        "failedUrl": "https://yourapp.com/failed",
        "customer": {
          "firstName": "John",
          "email": "john@example.com"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "CLP",
      "identity": {
        "identityId": "<IDENTITY_ID>"
      },
      "account": {
        "accountNumber": "<ACCOUNT_NUMBER>"
      }
    }
  ]
}'
```
{% endcode %}

{% hint style="info" %}
The response will include `origins[0].etpay.url` — redirect the customer to that URL to authorize the payment at their bank.
{% endhint %}

</details>

<details>

<summary><strong>Capture Payment</strong></summary>

After the customer completes the bank authorization, capture the funds to reflect them in the account.

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
--data-raw '{
  "id": "<PAYMENT_ID>"
}'
```
{% endcode %}

</details>

<details>

<summary><strong>Check account balance</strong></summary>

Verify that the funds were deposited correctly into the account.

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

### Top-up by region

| Region     | Origin type | Example rail  |
| ---------- | ----------- | ------------- |
| Chile   | `ETPAY`     | Open banking  |
| Chile   | `FINTOC`    | Open banking  |
| Brazil  | `PIX`       | Instant QR    |
| Argentina | `PCT`     | QR Transfer   |
| Colombia | `PSE`      | Bank transfer |
| Colombia | `NEQUI`    | Wallet        |
