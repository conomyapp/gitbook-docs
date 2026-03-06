---
title: bankAccount
---


| Field | Type | Description |
| --- | --- | --- |
| id | `string` | Unique identifier (UUID). |
| accountNumber | `string` | Bank account number. |
| country | `string` | Country where the bank account is held (ISO 3166 code). |
| currency | `string` | Currency associated with the account (ISO 4217 code). |
| accountHolder | `string` | Full legal name of the person or entity holding the account. |
| type | `string` | Type of bank account (`CASH_ACCOUNT`, `CURRENT_ACCOUNT`, etc.). |
| iban | `string` | IBAN for international transactions. |
| sortCode | `string` | Sort code for UK bank branches. |

