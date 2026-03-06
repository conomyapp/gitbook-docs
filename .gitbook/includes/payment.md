---
title: Payment
---


| Field | Type | Description |
| --- | --- | --- |
| name | `string` | Unique identifier of the payment method. |
| type | `string` | Payment method type (e.g., WIRE, CARD, CRYPTO). |
| currency | `string` | Currency associated with the payment method. |
| processing | `string` | Processing time of the payment method. `INSTANT_PAYMENT` applies to methods processed immediately. Other methods have delays of 1 to 3 business days. |
| fee | [`feeInfo`](broken-reference) | Fees applied to the payment method, as defined in the `feeInfo`. |
| limits | [`limits`](broken-reference) | Transaction limits for the payment method, including min and max amounts. |
| metaData | [`metaData`](broken-reference) | Metadata about the payment method, including title, image, and description. |

