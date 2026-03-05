---
description: Discover all payment products available for an identity, organized by currency.
---

# Available Products

The `GET /payments/available-products` endpoint returns a complete view of the payment rails enabled for a given identity, grouped by currency. Use it to dynamically build payment flows without hardcoding supported methods.

**Direction:** Both (Pay-in & Pay-out)

## Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `identityId` | `string` | No | Filter results by identity |
| `currencies` | `string` | No | Comma-separated currency codes to filter (e.g., `ARS,CLP`) |

## Response structure

| Field | Type | Description |
|---|---|---|
| `supportedPaymentCurrencies` | `string[]` | Currencies with available pay-in products |
| `supportedPayoutCurrencies` | `string[]` | Currencies with available pay-out products |
| `supportedPaymentMethods` | `string[]` | All pay-in node types across all currencies |
| `supportedWithdrawalMethods` | `string[]` | All pay-out node types across all currencies |
| `byCurrency` | `array` | Per-currency breakdown (see below) |

### byCurrency object

| Field | Type | Description |
|---|---|---|
| `currency` | `string` | ISO 4217 currency code |
| `payin.paymentMethods` | `string[]` | Pay-in node types for this currency |
| `payin.products` | `payment-node-get[]` | Full product details for each pay-in method |
| `payout.withdrawalMethods` | `string[]` | Pay-out node types for this currency |
| `payout.products` | `payment-node-get[]` | Full product details for each pay-out method |

Each product in `payin.products` and `payout.products` follows the [`payment-node-get`](origins-and-destinations/README.md) schema and includes `requiredFields`, `nodeSchema`, `requiredFieldTypes`, `minAmount`, `maxAmount`, and `validOrigins`/`validDestinations`.

## Example

```bash
GET /payments/available-products?identityId=679c482ee4420cb5b0966c9a&currencies=ARS,CLP
```

```json
{
  "supportedPaymentCurrencies": ["ARS", "CLP"],
  "supportedPayoutCurrencies": ["ARS", "CLP"],
  "supportedPaymentMethods": ["CVU", "ETPAY", "PCT", "PIX"],
  "supportedWithdrawalMethods": ["BANK_ACCOUNT"],
  "byCurrency": [
    {
      "currency": "ARS",
      "payin": {
        "paymentMethods": ["CVU", "PCT"],
        "products": [
          {
            "name": "PCT",
            "type": "PCT",
            "currency": "ARS",
            "product": "ARS:ARS",
            "minAmount": "10",
            "maxAmount": "5000000",
            "requiredFields": [
              "pct.customer.phoneNumber",
              "pct.customer.phoneNumberPrefix",
              "pct.customer.email"
            ],
            "validDestinations": ["ACCOUNT"],
            "nodeSchema": {
              "pct": {
                "customer": {
                  "email": "string",
                  "phoneNumber": "string",
                  "phoneNumberPrefix": "string"
                }
              }
            },
            "requiredFieldTypes": {
              "pct.customer.email": "string",
              "pct.customer.phoneNumber": "string",
              "pct.customer.phoneNumberPrefix": "string"
            }
          }
        ]
      },
      "payout": {
        "withdrawalMethods": ["BANK_ACCOUNT"],
        "products": [
          {
            "name": "BANK_ACCOUNT",
            "type": "BANK_ACCOUNT",
            "currency": "ARS",
            "product": "ARS:ARS",
            "minAmount": "10",
            "maxAmount": "5000000",
            "requiredFields": ["bank.accountNumber", "bank.bank"],
            "validOrigins": ["ACCOUNT"],
            "nodeSchema": {
              "bank": { "accountNumber": "string", "bank": "string" }
            },
            "requiredFieldTypes": {
              "bank.accountNumber": "string",
              "bank.bank": "string"
            }
          }
        ]
      }
    }
  ]
}
```

## Notes

- Cross-currency products appear under the **settlement** currency (e.g., a PIX pay-in that settles in CLP will appear under `byCurrency[CLP].payin`).
- Use `nodeSchema` to dynamically render input forms for each payment method.
- Use `requiredFields` with `requiredFieldTypes` to validate user input before submitting a payment.
