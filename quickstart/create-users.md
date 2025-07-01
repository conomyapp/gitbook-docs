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

# Create Users

{% hint style="warning" %}
Within the same ClientId, multiple users can be created with the same `documentNumber` only if they have different `email` or `phone` .
{% endhint %}

After creating an **organization**, you need to create two **users** associated with it. Each user must have a unique `documentNumber` but different `email` or `phone` .

### Validations

| Field          | Format                                                                                         | Structural validation                                                  |
| -------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Email          | `RF522`                                                                                        | -                                                                      |
| Phone          | `+{country code}{number}`                                                                      | The country code must match the selected country (e.g., `CHL` ⇒ `+56`) |
| Type           | Must be one of `USER` or `ORGANIZATION`                                                        |                                                                        |
| Country        | `ISO 3166-1 alpha-3`                                                                           |                                                                        |
| DocumentType   | Check [#document-types](../home/supported-identity-document-types.md#document-types "mention") |                                                                        |
| DocumentNumber | Must follow the format related to the `documentType`                                           |                                                                        |

### Create the First User

Make the following `POST` request ([Create Identity](../api-reference/identities.md#post-identities)) to create the first user

#### **Request**

```sh
curl --location --request POST 'https://api.conomyhq.com/sandbox/identities' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'User-Agent: {YOUR_APPLICATION_NAME}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
  "type": "USER",
  "name": "Service Provider 1",
  "nickname": "SP1",
  "email": "serviceprovider1@example.com",
  "phone": "+5692111111",
  "documentType": "RUT",
  "documentNumber": "17604011-4",
  "idv": "iv-23124",
  "country": "CHL",
  "securityOptions": {
    "twoFactorEnabled": false
  },
  "children": []
}'
```

#### **Response**

```json
{
    "type": "USER",
    "name": "Service Provider 1",
    "nickname": "SP1",
    "email": "serviceprovider1@example.com",
    "phone": "+5692111111",
    "documentNumber": "17604011-4",
    "documentType": "RUT",
    "idv": "iv-23124",
    "securityOptions": {
        "twoFactorAuth": false,
        "signTrx": false,
        "signAccountsOperations": false
    },
    "country": "CHL",
    "status": "ACTIVE",
    "id": "679d29934a21df7584b38e12",
    "createdAt": "2025-01-31T19:50:43Z",
    "updatedAt": "2025-01-31T19:50:43Z"
}
```

### Create the Second User

Make the following `POST` request ([Create Identity](broken-reference)) to create the second user.

#### **Request**

```sh
curl --location --request POST 'https://api.conomyhq.com/sandbox/identities' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'User-Agent: {YOUR_APPLICATION_NAME}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
  "type": "USER",
  "name": "Service Provider 2",
  "nickname": "SP2",
  "email": "serviceprovider2@example.com",
  "phone": "+5693111111",
  "documentType": "RUT",
  "documentNumber": "18604011-4",
  "idv": "iv-23125",
  "country": "CHL",
  "securityOptions": {
    "twoFactorEnabled": false
  },
  "children": []
}'
```

#### **Response**

```json
{
    "type": "USER",
    "name": "Service Provider 2",
    "nickname": "SP2",
    "email": "serviceprovider2@example.com",
    "phone": "+5693111111",
    "documentNumber": "18604011-4",
    "documentType": "RUT",
    "idv": "iv-23125",
    "securityOptions": {
        "twoFactorAuth": false,
        "signTrx": false,
        "signAccountsOperations": false
    },
    "country": "CHL",
    "status": "ACTIVE",
    "id": "679d2a134a21df7584b38e13",
    "createdAt": "2025-01-31T19:52:51Z",
    "updatedAt": "2025-01-31T19:52:51Z"
}
```

### Link Users to the Organization

Once both users have been created, they need to be linked to the **organization**. This is done by updating the organization entity with the user IDs.

Run the following `PATCH` request to add the users as **children** of the organization, or use [add children request](broken-reference).

#### **Request**

```sh
curl --location --request PATCH 'https://api.conomyhq.com/sandbox/identities/{ORGANIZATION_ID}' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'User-Agent: {YOUR_APPLICATION_NAME}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "children": [
        {
            "id": "<USER_1_ID>",
            "name": "Service Provider 1",
            "email": "serviceprovider1@example.com"
        },
        {
            "id": "<USER_2_ID>",
            "name": "Service Provider 2",
            "email": "serviceprovider2@example.com"
        }
    ]  
}'
```

#### **Response**

```json
{
    "type": "ORGANIZATION",
    "name": "Operator 1",
    "nickname": "Op 1",
    "email": "operator1@example.com",
    "phone": "+5691111111",
    "documentNumber": "77123126-K",
    "documentType": "RUT",
    "idv": "iv-23123",
    "securityOptions": {
        "twoFactorAuth": false,
        "signTrx": false,
        "signAccountsOperations": false
    },
    "country": "CHL",
    "children": [
        {
            "id": "679d29934a21df7584b38e12",
            "name": "Service Provider 1",
            "lastName": "",
            "email": "serviceprovider1@example.com"
        },
        {
            "id": "679d2a134a21df7584b38e13",
            "name": "Service Provider 2",
            "lastName": "",
            "email": "serviceprovider2@example.com"
        }
    ],
    "status": "ACTIVE",
    "id": "679d26c44a21df7584b38e11",
    "createdAt": "2025-01-31T19:38:44Z",
    "updatedAt": "2025-01-31T20:01:59Z"
}
```

{% hint style="success" %}
Note: After this step, both users will be officially linked to the organization. Ensure that the organization ID and user IDs are correctly used in the request.
{% endhint %}
