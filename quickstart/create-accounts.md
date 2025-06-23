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

# Create Accounts

{% hint style="warning" %}
Allows account types: `CHECKING`, `ASSET` & `SAVINGS`&#x20;
{% endhint %}

### **Create the Organization's Account**

To [create an account](broken-reference) for the **organization**, make the following `POST` request:

#### **Request**

```sh
curl --location --request POST 'https://api.conomyhq.com/sandbox/accounts' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "identityId": "<ORGANIZATION_ID>",
    "externalId": "lybkpay-2",
    "type": "CHECKING",
    "currency": "CLP",
    "name": "CLP account",
    "custody": "BANK_ACCOUNT"
}'
```

#### **Response**

```json
{
    "id": "679d2e934bc4149871723cef",
    "identityId": "679d26c44a21df7584b38e11",
    "externalId": "lybkpay-2",
    "type": "CHECKING",
    "custody": "BANK_ACCOUNT",
    "balance": "0",
    "availableFunds": "0",
    "currency": "CLP",
    "accountHolder": "OPERATOR 1",
    "status": "ACTIVE",
    "accountNumber": "173835432305679d26c44a21df7584b38e11",
    "name": "CLP account",
    "parentId": "",
    "accruedYield": "",
    "monthlyYield": "",
    "createdAt": "0001-01-01T00:00:00Z",
    "updatedAt": "0001-01-01T00:00:00Z"
}
```

### Create Users's Account

To [create an account](broken-reference) for the **first user**, make the following `POST` request:

#### **Request**

```sh
curl --location --request POST 'https://api.conomyhq.com/sandbox/accounts' \
--header 'x-api-key: <YOUR_API_KEY>' \
--header 'User-Agent: <YOUR_APPLICATION_NAME>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "identityId": "<USER_1_ID>",
    "externalId": "lybkpay-3",
    "type": "CHECKING",
    "currency": "CLP",
    "name": "CLP account",
    "custody": "BANK_ACCOUNT",
    "parentId": "<PARENT_ACCOUNT_ID>"
}'
```

#### **Response**

```json
{
    "id": "679d2e934bc43678898aap",
    "identityId": "681b9512a490a37d1d795409",
    "externalId": "lybkpay-3",
    "type": "CHECKING",
    "custody": "BANK_ACCOUNT",
    "balance": "0",
    "availableFunds": "0",
    "currency": "CLP",
    "accountHolder": "Service Provider 1",
    "status": "ACTIVE",
    "accountNumber": "173835432305681b9512a490a37d1d795409",
    "name": "CLP account",
    "parentId": "679d2e934bc4149871723cef",
    "accruedYield": "",
    "monthlyYield": "",
    "createdAt": "0001-01-01T00:00:00Z",
    "updatedAt": "0001-01-01T00:00:00Z"
}
```
