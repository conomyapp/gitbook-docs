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

# Create an Organization

{% hint style="warning" %}
Each organization under the same Client must have a unique `documentNumber`. If an entity with the same values already exists, the request will fail.
{% endhint %}

Once you have obtained an access token, you can create an organization using ([Create Identy](../api-reference/identities.md#post-identities)) the following `POST` request:

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
  "type": "ORGANIZATION",
  "name": "Operator 1",
  "nickname": "Op 1",
  "email": "operator1@example.com",
  "phone": "+5691111111",
  "documentType": "RUT",
  "documentNumber": "77123126-K",
  "idv": "iv-23123",
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
    "children": null,
    "status": "ACTIVE",
    "nationality": "",
    "dni": "",
    "externalId": "",
    "userExternalId": "",
    "lastname": "",
    "career": "",
    "birthDate": "",
    "bankAccount": null,
    "accountHolderId": "",
    "accountConduitId": "",
    "contract": "",
    "rules": null,
    "contractId": "",
    "rulesId": null,
    "image": "",
    "gender": "",
    "kyc": null,
    "watchList": null,
    "deviceToken": "",
    "logginAttempts": 0,
    "emailStatus": "",
    "extendedData": [],
    "metadata": {},
    "id": "679d26c44a21df7584b38e11",
    "createdAt": "2025-01-31T19:38:44Z",
    "updatedAt": "2025-01-31T19:38:44Z",
    "address": {
        "administrativeAreaLevel1": "",
        "administrativeAreaLevel2": "",
        "administrativeAreaLevel3": "",
        "street": "",
        "streetNumber": "",
        "optionalAddress": "",
        "country": ""
    }
}
```
