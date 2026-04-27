---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: How to register, verify, and process webhook deliveries from conomy_hq.
---

# Handling webhooks

Webhooks are the platform's primary mechanism to push state changes to your integration. Every payment lifecycle event, refund update, review decision, and customer change is delivered as a signed `POST` to a single URL you register per tenant.

For the catalog of events and payload shapes, see [Webhooks API reference](../api-reference/payments/webhooks.md).

---

## Register your endpoint

Configure a single webhook URL per environment through the dashboard. The platform will `POST` every event to that URL.

When you register the endpoint, also configure a `secretKey`. The platform uses it to sign every delivery with HMAC-SHA256, so your handler can verify the request came from `conomy_hq` and not from a third party.

---

## Verify the signature

Every signed delivery includes an `X-Webhook-Signature` header containing the HMAC-SHA256 of the raw request body, computed with your `secretKey`.

Pseudocode:

```
expected = hmac_sha256(rawBody, secretKey).hex()
received = request.headers["X-Webhook-Signature"]
if not constant_time_equals(expected, received):
    return 401
```

Always compare in constant time. Always verify before parsing the body.

---

## Respond fast

The platform expects a `2xx` response within **10 seconds**. Your handler should:

1. Verify the signature.
2. Enqueue the payload for asynchronous processing.
3. Return `2xx`.

Heavy work — database writes, external API calls, settlement reconciliation — belongs on a worker behind a queue, not inline in the webhook handler.

---

## Be idempotent

Webhook deliveries are **at-least-once**. The same `(eventType, transaction.id)` (or `(eventType, customer.id)`) tuple may arrive twice — most often when your handler took too long on the first delivery and the platform retried.

Use that tuple as your idempotency key. Skip processing if you have already handled it.

```
key = eventType + ":" + transaction.id
if already_processed(key):
    return 200
mark_processing(key)
process(payload)
mark_processed(key)
```

---

## Retry behaviour

When your endpoint returns a non-2xx response or times out, the platform retries with exponential backoff for up to **24 hours**. After that, the event is dropped and surfaces in your delivery log.

Specifically:

* First retry after 30 seconds.
* Each subsequent retry doubles the delay, capped at 1 hour.
* After 24 hours total, the delivery is marked as failed.

If you discover a backlog of failed deliveries, fix the root cause first, then request a replay from `conomy_hq` so you do not lose state.

---

## Forward compatibility

Treat the webhook contract as additive:

* New `eventType` values may appear at any time. Unknown event types should be logged and ignored, never errored.
* New fields may appear on existing payloads. Unknown fields should be ignored, never errored.
* The legacy `transaction.status_changed` event continues to fire for every status transition. New consumers should subscribe to the specific events for richer payloads, but existing handlers that only listen for the legacy event keep working.

---

## Local testing

In sandbox, you can simulate webhook deliveries by triggering the underlying lifecycle events through the API. See the curl examples in [Create your first topup](../quickstart/create-your-first-top-up.md).

---

## Related

* [Webhooks API reference](../api-reference/payments/webhooks.md) — full event catalog.
* [Going live](../quickstart/going-live.md) — production readiness checklist.
* [Errors](../api-reference/errors.md) — error response format and retry guidance.
