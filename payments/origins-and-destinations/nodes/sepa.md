---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
description: European bank transfer standard. Used for pay-out across the eurozone.
---

# SEPA

SEPA (Single Euro Payments Area) is the European standard for bank transfers in euros. It covers 36 countries including the EU, Switzerland, Norway, and Iceland. Use it as a destination for payouts to European bank accounts.

**Countries:** Eurozone + SEPA area | **Currency:** EUR | **Direction:** Pay-out

## Required fields


| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `"SEPA"` |
| `currency` | `string` | Must be `"EUR"` |
| `sepa.iban` | `string` | Recipient's IBAN |
| `sepa.customer.firstName` | `string` | Recipient's first name |
| `sepa.customer.lastName` | `string` | Recipient's last name |
| `sepa.customer.email` | `string` | Recipient's email |
| `sepa.customer.documentNumber` | `string` | National ID or tax number |
| `sepa.customer.documentType` | `string` | Document type |
| `sepa.bic` | `string` | BIC/SWIFT code of the bank |


## Example

```json
{
  "type": "SEPA",
  "currency": "EUR",
  "sepa": {
    "iban": "DE89370400440532013000",
    "bic": "COBADEFFXXX",
    "customer": {
      "firstName": "Hans",
      "lastName": "Müller",
      "email": "hans@example.com",
      "documentType": "DNI",
      "documentNumber": "X1234567A"
    }
  }
}
```

## OpenAPI reference

- Spec: `conomyhq-api`
- Component: `sepa`
- Source: [Payment API.yaml](https://raw.githubusercontent.com/conomyapp/gitbook-docs/main/.gitbook/assets/Payment%20API.yaml)
