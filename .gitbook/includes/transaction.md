---
title: Transaction
---


| Field | Type | Description |
| --- | --- | --- |
| id | `string` | Unique identifier for the transaction. |
| externalId | `string` | External reference ID linking the transaction to an external system. |
| identityId | `string` | Unique identifier for the user or entity performing the transaction. |
| origins | `array[`[`payment`](broken-reference)`]` | Source of funds. |
| originAmount | [`amount`](broken-reference) | The amount and currency at the transaction's origin. |
| destinations | `array[`[`payment`](broken-reference)`]` | Destination of funds. |
| destinationAmount | [`amount`](broken-reference) | The amount and currency at the transaction's destination. |
| type | `string` | Type of transaction (e.g., `PAY_IN`, `PAY_OUT`). |
| status | `string` | Current status of the transaction (e.g., `PENDING`, `CAPTURED`, `FAILED`). |
| settlement | `string` | Specifies how often settlements occur for this transaction. |
| fees | `array` | Array of fees applied to the transaction. |
| exchange | [`quote`](broken-reference) | Details of any currency exchange related to the transaction. |
| metaData | [`object`](broken-reference) | Additional metadata, such as transaction description and category. |
| createdAt | `string` | Timestamp when the transaction was created. |
| updatedAt | `string` | Timestamp when the transaction was last updated. |

