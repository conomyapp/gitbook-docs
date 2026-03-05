# Webhooks

{% columns fullWidth="true" %}
{% column %}
Webhooks allow your application to receive real-time notifications when payment events occur on the platform.

Instead of polling the API for updates, you register an endpoint and Conomy sends HTTP `POST` requests to it whenever relevant events happen, such as a payment being received or a transaction status changing.

Use the Webhooks API to listen for payment lifecycle events and react to them in your backend systems.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /webhooks (callback)
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

{% openapi-webhook Payment API name="Client Transaction's Notification Webhook" method="post" %}
[OpenAPI conomyhq-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/6973cf44bf6a2b8e9b4a630f1233adba905b14f18b5f1b37d09328c129212333.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250904%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250904T225512Z&X-Amz-Expires=172800&X-Amz-Signature=67f8189599d205d3ac66a8a19d4b177b7a85df57d3c789e5d5a479e15ec571f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-webhook %}
