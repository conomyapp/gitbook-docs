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

# Obtain an Access Token

To obtain an access token, make the following `POST` request to the [Auth endpoint](../api-reference/authentication.md#post-auth).

{% hint style="success" %}
Use the returned `accessToken` in the `Authorization` header for subsequent API requests.
{% endhint %}

{% hint style="warning" %}
Never expose `clientSecret` in frontend code. Exchange credentials only from trusted backend services.
{% endhint %}

### Request and Response

{% tabs %}
{% tab title="cURL request" %}
```bash
curl --location --request POST 'https://api.conomyhq.com/sandbox/auth' \
--header 'x-api-key: {YOUR_API_KEY}' \
--header 'User-Agent: {YOUR_CLIENT_APPLICATION}' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: api.conomyhq.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "clientId": {YOUR_CLIENT_ID},
    "clientSecret": {YOUR_CLIENT_SECRET}
}'
```
{% endtab %}

{% tab title="Sample response" %}
```json
{
    "accessToken": {YOUR_ACCESS_TOKEN},
    "tokenType": "Bearer",
    "expiresIn": 3600
}
```
{% endtab %}
{% endtabs %}
