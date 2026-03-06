---
title: Financial institution
---


| Field | Type | Description |
| --- | --- | --- |
| financialInstitutionName | `string` | Human-readable name of the financial institution (e.g., "Banco de Chile"). |
| name | `string` | Technical identifier used in requests (e.g., "BANCO_CHILE"). |
| country | `string` | ISO 3166-1 alpha-3 code of the country where the institution operates. |
| network | `array[string]` | List of supported networks for transactions (e.g., ["SPEI", "ACH_US", "SOLANA"]). |
| currencies | `array[string]` | Supported currencies for the institution, in ISO 4217 or token_network format for crypto (e.g., ["CLP", "USD", "USDC_SOLANA"]). |

