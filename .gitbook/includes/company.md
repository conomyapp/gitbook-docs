---
title: company
---


| Field | Type | Description |
| --- | --- | --- |
| name | `string` | Full legal name of the company. |
| nickname | `string` | Optional alias or short name for the company. |
| taxCondition | `string` | Company's tax classification. |
| registrationNumber | `string` | Official registration number of the company. |
| companyLegalStructure | `string` | Tax status influencing tax calculations and compliance. |
| email | `string` | Official email address of the company. |
| country | `string` | Country where the company is registered. |
| activity | `string` | Industry or sector of the company (e.g., Finance). |
| legalRepresentative | [`legalRepresentative`](broken-reference) | Information about the company's legal representative. |
| beneficialOwners | `array[`[`beneficialOwner`](broken-reference)`]` | List of direct shareholders and/or beneficial owners. |
| individualShareholders | `array[`[`individualShareholder`](broken-reference)`]` | List of individual shareholders owning 10% or more. |
| AML | [`AML`](broken-reference) | Anti-Money Laundering (AML) compliance information. |
| documents | [`documents`](broken-reference) | Uploaded documents for verification or compliance. |

