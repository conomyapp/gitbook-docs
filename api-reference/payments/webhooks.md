# Webhooks

{% columns fullWidth="true" %}
{% column %}
Webhooks allow your application to receive real-time notifications when payment and customer events occur on the platform.

Instead of polling the API for updates, you register an endpoint and Conomy sends HTTP `POST` requests to it whenever relevant events happen, such as a payment being received or a transaction status changing.

Use the Webhooks API to listen for payment lifecycle events, refund updates, review outcomes and customer-level changes, and react to them in your backend systems.
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
POST /webhooks (callback)
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## Event types

Every webhook delivery includes an `eventType` field so consumers can subscribe selectively. The set is grouped by domain below.

{% tabs %}
{% tab title="Payments" %}
| Event                        | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `transaction.status_changed` | Default, legacy event fired on any status change. Retained for backwards compatibility.         |
| `payment.expired`            | Payment reached terminal `EXPIRED` (quote TTL elapsed or unassigned pay-in expired without reconciliation). |
| `payment.settled`            | Payment reached terminal `SETTLED` and has been reconciled.                                     |
| `payment.unsettled`          | Payment reached `RECEIVED` but could not be reconciled. Terminal.                               |
| `payment.requiresReview`     | Payment flipped into `REQUIRES_REVIEW` — operator / customer must act.                          |
| `payment.reviewApproved`     | Operator approved the review; payment resumed its lifecycle.                                    |
| `payment.reviewRejected`     | Operator rejected the review; payment is now `FAILED`.                                          |
| `payment.reviewResolved`     | Umbrella event fired alongside `reviewApproved` / `reviewRejected` for consumers that don't branch on the decision. |

**Payload shape**

```json
{
  "eventType": "payment.settled",
  "timestamp": "2026-04-17T15:30:00Z",
  "transaction": {
    "id": "69e0df45b604159c5b8ba5a9",
    "externalId": "bm_abc-123",
    "status": "SETTLED",
    "totalAmount": "2000.00",
    "currency": "ARS",
    "type": "TOPUP_ACCOUNT",
    "parentPaymentId": null,
    "relatedPaymentId": null,
    "customerId": "69e25243baa9fd9b463d6bac",
    "settledAt": "2026-04-17T15:30:00Z",
    "expiredAt": null,
    "unsettledAt": null,
    "unsettledReason": null,
    "settlementBatchId": "settlement-ARS-1744889400",
    "documentationStatus": null
  },
  "identity": {
    "id": "...",
    "email": "..."
  }
}
```

Fields that are not applicable for a given event are `null` (omitted when the event was emitted before the field existed, for legacy transactions).
{% endtab %}

{% tab title="Refunds" %}
Refunds are modelled as **child transactions** — the parent stays `SETTLED`. These events track the child's lifecycle.

| Event                      | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `payment.refund.created`   | Refund child registered and delivered to the provider.          |
| `payment.refund.settled`   | Provider confirmed the reversal; child is terminal `SETTLED`.   |
| `payment.refund.failed`    | Provider rejected the refund request.                           |

**Payload shape** — identical to payments, with `transaction.parentPaymentId` populated and `transaction.type == "REFUND"`.
{% endtab %}

{% tab title="Pay-in matching" %}
Fires on rails where the payer completes the transfer asynchronously and the platform reconciles the funds against an account.

| Event | Description |
| --- | --- |
| `purchase.attempted` | A new payment attempt was registered. |
| `purchase.pendingAssignment` | A pay-in could not be auto-matched and is awaiting reconciliation against an account. |
| `purchase.underpaid` | On `POST /payments/{id}/assign`, the received amount was below the expected amount. |
| `purchase.overpaid` | On `POST /payments/{id}/assign`, the received amount was above the expected amount. |

`purchase.underpaid` and `purchase.overpaid` fire **alongside** `payment.settled`, not instead of it. The payload includes `transaction.relatedPaymentId` pointing at the companion child that captures the difference.
{% endtab %}

{% tab title="Customers" %}
| Event                    | Description                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `customer.levelChanged`  | A customer flipped from "not documented" to "documented" (first approved document) or had their operationLevel changed. |

**Payload shape** — customer-scoped (no `transaction` field).

```json
{
  "eventType": "customer.levelChanged",
  "timestamp": "2026-04-17T15:42:10Z",
  "customer": {
    "id": "69e25243baa9fd9b463d6bac",
    "clientId": "your-client-id",
    "firstName": "Carlos",
    "lastName": "Nuevo",
    "email": "carlos@example.com",
    "documentNumber": "23111222331",
    "operationLevel": "BASIC",
    "autoCreated": true,
    "documentsCount": 1
  }
}
```

Document URLs are deliberately excluded from the webhook payload; only the count is exposed.
{% endtab %}
{% endtabs %}

***

## Delivery guarantees

* All webhook deliveries are **at-least-once**. Your endpoint should be idempotent.
* Every delivery includes a unique `eventType` + `transaction.id` (or `customer.id`) combination your backend can use as the idempotency key.
* On non-2xx responses, delivery is retried with exponential backoff for up to 24 hours before the event is dropped. Check delivery logs through your operator dashboard.
* Payloads are signed when you register a `secretKey` on your webhook — the HMAC-SHA256 signature is sent in the `X-Webhook-Signature` header.

## Versioning & new event types

New event types are added without breaking existing integrations:

* The legacy `transaction.status_changed` event continues to fire for every status transition, so consumers that only listen for it keep working.
* New consumers should subscribe to the specific events above for better filtering and richer payloads.

{% openapi-webhook Payment API name="Client Transaction's Notification Webhook" method="post" %}
[OpenAPI conomyhq-api](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
{% endopenapi-webhook %}
