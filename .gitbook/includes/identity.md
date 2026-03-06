---
title: Identity
---


| Field | Type | Description |
| --- | --- | --- |
| id | `string` | Unique identifier (UUID). |
| identityExternalId | `string` | External ID representing the identity in external systems. |
| type | `string` | Specifies the identity type (`USER`, `COMPANY`). |
| status | `string` | Current status (`ACTIVE`, `PENDING`, `BLOCKED`, etc.). |
| contract | `string` | Contract related to the identity. |
| image | `string` | URL to the identity's avatar or image. |
| session | [`Session`](broken-reference) | Information about the current session. |
| bankAccounts | `array[`[`bankAccount`](broken-reference)`]` | List of bank accounts linked to the identity. |
| user | `user` | User details (if the type is `USER`). |
| company | `company` | Company details (if the type is `COMPANY`). |
| extendedData | `array[extendedData]` | Additional custom key-value pairs for flexibility. |
| createdAt | `string` | Timestamp when the identity was created (ISO 8601). |
| updatedAt | `string` | Timestamp when the identity was last updated (ISO 8601). |

