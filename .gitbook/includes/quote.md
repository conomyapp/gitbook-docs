---
title: Quote
---


| Field | Type | Description |
| --- | --- | --- |
| id | `string` | Unique identifier for the exchange quote. |
| product | `string` | Currency pair being exchanged (e.g., `USD:EUR`). |
| status | `string` | Status of the quote (e.g., `CREATED`, `PENDING`, `COMPLETED`). |
| exchangeRate | `string` | Exchange rate provided for the transaction. |
| fee | `string` | Fee charged by the provider for executing the quote. |
| executable | `boolean` | Whether the quote is executable (i.e., ready for the transaction to proceed). |
| provider | `string` | Provider responsible for offering the exchange quote. |
| createdAt | `string` | Timestamp when the quote was created. |
| updatedAt | `string` | Timestamp when the quote was last updated. |

