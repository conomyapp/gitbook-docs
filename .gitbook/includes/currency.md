---
title: Currency
---


| Field | Type | Description |
| --- | --- | --- |
| name | `string` | Full name of the currency (e.g., US Dollar, Euro). |
| currency | `string` | ISO code representing the currency (e.g., USD, EUR). |
| symbol | `string` | Currency symbol (e.g., $, €, ¥). |
| decimals | `integer` | Number of decimal places for the currency (e.g., 2 for USD). |
| country | `string` | Country of origin for the currency (ISO 3166 code). |
| supportedCountries | `array[string]` | List of countries where the currency can be legally operated. |
| supportedCurrencies | `array[`[`currency`](broken-reference)`]` | List of currencies supported for exchanges. |

