# Balances & pending deposits

{% columns fullWidth="true" %}
{% column %}
When a CVU deposit arrives without a destination account (for example, a transfer to one of the merchant's collecting CVUs), the money is parked in the client's **unassigned balance** until an operator assigns the deposit to a specific account.

These endpoints expose the unassigned balance widget + the paginated list of pending deposits so your dashboard can render both views without scraping `/payments`.

Assignment happens via [`POST /payments/{id}/assign`](payments/payments.md#assignment-cvu-deposits).
{% endcolumn %}

{% column %}
{% code title="Endpoints" overflow="wrap" %}
```http
GET /balances/unassigned
GET /deposits/pending
```
{% endcode %}
{% endcolumn %}
{% endcolumns %}

***

## `GET /balances/unassigned`

Compact widget-shaped response: current unassigned balance and a small list of urgent pending deposits (those approaching their expiry).

**Query parameters**

| Name       | Type   | Required | Description    |
| ---------- | ------ | :------: | -------------- |
| `clientId` | string |    ✓     | Tenant scope.  |

**Response** `200 OK`

```json
{
  "clientId": "your-client-id",
  "totalAmount": "15000.00",
  "currency": "ARS",
  "count": 3,
  "urgent": [
    {
      "paymentId": "69e25246baa9fd9b463d6baf",
      "amount": "7500.00",
      "currency": "ARS",
      "expiresAt": "2026-04-18T15:31:16Z",
      "hoursRemaining": 2
    }
  ]
}
```

`urgent` only contains deposits whose `expiresAt` is within the configured warning window (typically 6 hours). The full list lives in `/deposits/pending`.

***

## `GET /deposits/pending`

Paginated list of pending-assignment deposits.

**Query parameters**

| Name            | Type   | Required | Description                                                                          |
| --------------- | ------ | :------: | ------------------------------------------------------------------------------------ |
| `clientId`      | string |    ✓     | Tenant scope.                                                                        |
| `expiresWithin` | string |          | `6h` \| `24h` \| `48h` \| `""` (all). Filters by time-to-expiry.                     |
| `amountMin`     | string |          | Inclusive lower bound on `totalAmount`.                                              |
| `amountMax`     | string |          | Inclusive upper bound on `totalAmount`.                                              |
| `search`        | string |          | Free-text match against originante (first/last name, documentNumber).                 |
| `limit`         | int    |          | Page size. Default 50, max 500.                                                      |
| `offset`        | int    |          | Pagination offset.                                                                   |

**Response** `200 OK`

```json
{
  "total": 12,
  "totalAmount": "52300.50",
  "currency": "ARS",
  "deposits": [
    {
      "paymentId": "69e25246baa9fd9b463d6baf",
      "providerReference": "vitawallet:abc-123",
      "amount": "7500.00",
      "currency": "ARS",
      "depositedAt": "2026-04-17T15:31:16Z",
      "expiresAt": "2026-04-18T15:31:16Z",
      "originante": {
        "firstName": "Carlos",
        "lastName": "Nuevo",
        "documentNumber": "23111222331",
        "bankAccount": ""
      },
      "customerId": "69e25243baa9fd9b463d6bac"
    }
  ]
}
```

### Deposit lifecycle

1. Vita (or the configured CVU provider) reports a new deposit → the platform creates a `CREATED` payment with no `accountNumber`, `type=LOCAL_DEPOSIT`, and an `expiresAt` 24 hours in the future.
2. The deposit shows up here until one of:
   * An operator calls `POST /payments/{id}/assign` — payment transitions to `SETTLED` on the chosen account.
   * The expiry window elapses — the payment transitions to `EXPIRED` and the escrow is released to the provider.

### Webhook events

| Event                         | Fires when…                                               |
| ----------------------------- | --------------------------------------------------------- |
| `purchase.attempted`          | A new pending deposit was registered.                     |
| `purchase.pendingAssignment`  | A deposit could not be auto-matched and awaits assignment. |
| `purchase.underpaid`          | On assign, the received amount was below expected.        |
| `purchase.overpaid`           | On assign, the received amount was above expected.        |
| `payment.settled`             | Deposit assigned and reconciled.                          |
| `payment.expired`             | Deposit window elapsed without assignment.                |
