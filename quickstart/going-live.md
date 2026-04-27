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
description: Production readiness checklist before switching from sandbox to production credentials.
---

# Going live

Before switching from sandbox to production credentials, work through this checklist. Every item exists because we have seen it cause an incident.

---

## Authentication

* Production credentials are scoped to your tenant. Never share them across environments.
* Rotate the `clientSecret` immediately if it leaks. Token refresh continues to work for in-flight tokens until they expire.
* Validate that your access token caching honours `expiresIn` and refreshes ahead of expiry, not after.

See [Authentication](../api-reference/authentication.md).

---

## Webhooks

* Register your production webhook URL through the dashboard before the first production transaction. Sandbox URLs are not auto-promoted.
* Configure a `secretKey` on the webhook so deliveries arrive signed. Verify the `X-Webhook-Signature` header on every request.
* Make your endpoint **idempotent**: a single `(eventType, transaction.id)` may be delivered more than once.
* Respond `2xx` within 10 seconds. Defer heavy work to a queue.
* Handle unknown `eventType` values defensively — the platform adds new events without major version bumps.

See [Webhooks](../api-reference/payments/webhooks.md).

---

## Error handling

* Branch on the response `code` (or `type`), not on `detail`. The `detail` wording can change.
* On `5xx` responses: retry with exponential backoff. Start at 1 second, double on each attempt, cap at 32 seconds, give up after 5 attempts.
* On `429 tooManyRequests`: respect any rate-limit headers and back off.
* Capture the `traceId` on every error response and surface it in your support tooling.

See [Errors](../api-reference/errors.md).

---

## Compliance

* Maintain a `Customer` record per end user. Auto-created customers default to `BASIC` and need to be promoted as documentation is approved.
* Subscribe to `payment.requiresReview` and surface the required document upload to your operator dashboard within minutes — every blocked payment delays settlement.
* Subscribe to `customer.levelChanged` so your dashboard reflects when a customer transitions to "documented" and the review gate stops applying.
* Document review thresholds and minimum amounts before launch. Confirm the configured values for your account by emailing [hola@conomyhq.com](mailto:hola@conomyhq.com).

See [Compliance](../compliance/README.md).

---

## Observability

* Log the `traceId` from every API response.
* Log the full webhook payload before processing — invaluable when reconstructing incidents.
* Monitor your settlement webhook backlog; an unhealthy consumer surfaces here first.

---

## Switching environments

```diff
- https://api.conomyhq.com/sandbox
+ https://api.conomyhq.com
```

Keep sandbox running in parallel for at least one full settlement cycle so you can compare behaviour side by side.

---

## Final checks

* [ ] Production credentials provisioned and rotated post-issuance.
* [ ] Webhook URL registered with `secretKey` configured.
* [ ] Webhook handler is idempotent and responds within 10 seconds.
* [ ] Error handler retries `5xx` with exponential backoff and surfaces `traceId`.
* [ ] Customer + document flow tested in sandbox end to end.
* [ ] `payment.requiresReview` reaches your operator dashboard.
* [ ] Settlement and refund flows tested in sandbox.
* [ ] Observability dashboards include the production tenant.
