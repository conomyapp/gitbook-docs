---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
---

# Nodes

In `conomy_hq`, each payment type supports specific combinations of `origin` and `destination` node types.
This structure is essential for validating inputs and processing transactions correctly across different payment flows.

***

### Available Node Types

Each `origin` and `destination` must include a `type` field that defines how the funds move. Only the field matching the selected `type` must be included.

| Node                 | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `ACCOUNT`            | A conomy\_hq internal account                               |
| `BANK_ACCOUNT`       | An external bank account                                    |
| `CARD`               | A card-based payment method (e.g. credit or debit card)     |
| `WALLET`             | A cryptocurrency wallet (e.g. USDT, BTC, ETH)               |
| `PAYMENT_INITIATION` | A third-party payment initiator (e.g. ETPAY, FINTOC)        |
| `PAYMENT_LINK`       | A payment provider like Wompi or MercadoPago                |
| `EXTERNAL_CHECKOUT`  | An embedded/hosted checkout (external frontend integration) |

{% hint style="danger" %}
&#x20;Only the matching field for the selected `type` should be populated. Others must be omitted.
{% endhint %}

***

### Valid Origin and Destination Combinations

| Transaction Type     | Valid Origin Types                          | Valid Destination Types                     |
| -------------------- | ------------------------------------------- | ------------------------------------------- |
| `P2P`                | `ACCOUNT`, `WALLET`                         | `ACCOUNT`, `WALLET`                         |
| `TOPUP_ACCOUNT`      | `PAYMENT_LINK`, `EXTERNAL_CHECKOUT`         | `ACCOUNT`, `WALLET` _(can use one or both)_ |
| `REMITTANCE`         | `ACCOUNT`, `WALLET` _(can use one or both)_ | `BANK_ACCOUNT`                              |
| `WITHDRAWAL_ACCOUNT` | `ACCOUNT`, `WALLET`                         | `BANK_ACCOUNT`                              |
| `PURCHASE`           | `PAYMENT_LINK`, `EXTERNAL_CHECKOUT`         | `ACCOUNT`, `WALLET` _(can use one or both)_ |
| `COLLECT`            | `ACCOUNT`, `WALLET` _(can use one or both)_ | `ACCOUNT`, `WALLET` _(can use one or both)_ |

***

### Example: PURCHASE

```json
"origins": [
  {
    "type": "PAYMENT_LINK",
    "paymentLink": {
      "provider": "WOMPI",
      "payer": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "paymentMethods": ["WOMPI"],
      "expiredAt": "2025-12-31T23:59:59Z"
    }
  }
],
"destinations": [
  {
    "type": "ACCOUNT",
    "account": {
      "accountNumber": "1234567890"
    },
    "identity": {
      "identityId": "abc123"
    }
  },
  {
    "type": "WALLET",
    "wallet": {
      "provider": "BINANCE",
      "address": "0x123...456"
    }
  }
]
```

***

### Notes

* If a transaction has **multiple origins or destinations**, each node must comply with allowed types for that transaction type.
* When both `ACCOUNT` and `WALLET` are allowed, you can use **either or both simultaneously**.
* The `amount` field is required when splitting the transaction across multiple nodes.
* Using invalid type combinations will return a validation error.

### Complete Transaction examples by type

#### TOPUP\_ACCOUNT by PAYMENT\_LINK

```
{
  "_id": "681d5c6e815380066024f81d",
  "externalId": "test_V9Wlzz",
  "identityId": "67a0307eaddea901a60144ec",
  "identityExternalId": "",
  "accountNumber": "174127721505166050317",
  "totalAmount": "45000",
  "currency": "COP",
  "description": "Pago de 45000 COP por Wompi",
  "product": "COP:COP",
  "timestamp": "",
  "status": "RECEIVED",
  "type": "TOPUP_ACCOUNT",
  "purchaseAmount": "45000",
  "purchaseCurrency": "COP",
  "fees": [],
  "exchanges": [],
  "createdAt": "2025-05-09T01:37:50Z",
  "updatedAt": "2025-05-09T01:39:06Z",
  "origins": [
    {
      "name": "WOMPI",
      "type": "PAYMENT_LINK",
      "currency": "COP",
      "paymentLink": {
        "url": "https://checkout.wompi.co/l/test_V9Wlzz",
        "token": "test_V9Wlzz",
        "expiredAt": "2025-12-31T23:59:59Z",
        "name": "STATIC",
        "metadata": {
          "description": "Pago con Wompi"
        },
        "paymentMethods": [
          "WOMPI"
        ],
        "payer": {
          "email": "jane.doe@example.com",
          "name": "Jane Doe"
        },
        "provider": "WOMPI",
        "paymentMethod": {
          "type": "CARD",
          "card": {
            "holder": "John Doe",
            "expiryMonth": "04",
            "expiryYear": "29",
            "brand": "VISA",
            "cardType": "CREDIT",
            "last4": "4242"
          }
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "amount": "40000",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "Carlos",
        "lastname": "Perez",
        "nickname": "Carlitos",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174127721505166050317",
        "accountHolder": "Carlos Perez ",
        "currency": "COP"
      }
    },
    {
      "type": "ACCOUNT",
      "amount": "5000",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "Julia",
        "lastname": "Rodriguez",
        "nickname": "Julita",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174127721505166050317",
        "accountHolder": "Julia Rodriguez",
        "currency": "COP"
      }
    }
  ]
}
```

#### TOPUP\_ACCOUNT by EXTERNAL\_CHECKOUT

```
{
  "_id": "68195975815380066024f800",
  "externalId": "",
  "identityId": "67a0307eaddea901a60144ec",
  "identityExternalId": "",
  "accountNumber": "174254176305166050317",
  "totalAmount": "3000",
  "currency": "COP",
  "description": "Pago embebido de Wompi",
  "product": "COP:COP",
  "timestamp": "",
  "status": "RECEIVED",
  "type": "TOPUP_ACCOUNT",
  "purchaseAmount": "3000",
  "purchaseCurrency": "COP",
  "fees": [],
  "exchanges": [],
  "createdAt": "2025-05-06T00:36:05Z",
  "updatedAt": "2025-05-06T00:36:35Z",
  "category": "",
  "origins": [
    {
      "name": "WOMPI",
      "type": "CHECKOUT_EMBEDDED",
      "amount": "3000",
      "currency": "COP",
      "externalCheckout": {
        "provider": "WOMPI",
        "configuration": {
          "currency": "COP",
          "amount": 300000,
          "reference": "68195975815380066024f800",
          "redirectURL": "https://sandbox.wompi.co/checkout/l/pub_test_66f066f066f066f066f066f066f066f0/success",
          "expirationTime": "2025-05-07T00:36:05.332Z"
        },
        "customer": {
          "email": "johnd@example.com",
          "fullName": "John Doe",
          "phoneNumber": "+56911111111",
          "phoneNumberPrefix": "+56",
          "legalId": "123456789",
          "legalIdType": "CC"
        },
        "authentication": {
          "publicKey": "pub_test_M0PRrZHftEza23yDHgDUK"
        },
        "providerResponse": {
          "sessionCode": "1153757-1746491788-80436",
          "status": "APPROVED"
        },
        "paymentMethod": {
          "type": "CARD",
          "card": {
            "holder": "John Dow",
            "expiryMonth": "02",
            "expiryYear": "26",
            "brand": "VISA",
            "cardType": "CREDIT",
            "last4": "4242"
          }
        }
      },
      "metadata": {
        "description": ""
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "amount": "3000",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "Juan",
        "lastname": "Carlos",
        "nickname": "Bodoque",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174254176305166050317",
        "accountHolder": "Juan Carlos B",
        "currency": "COP"
      }
    }
  ]
}
```

#### WITHDRAWAL\_ACCOUNT

```
{
  "_id":"681d234f815380066024f81c",
  "externalId": "withdrawal-123",
  "identityId": "67a0307eaddea901a60144ec",
  "identityExternalId": "",
  "accountNumber": "174127721505166050317",
  "totalAmount": "2222",
  "currency": "COP",
  "description": "",
  "product": "COP:COP",
  "timestamp": "",
  "status": "CREATED",
  "type": "WITHDRAWAL_ACCOUNT",
  "purchaseAmount": "2222",
  "purchaseCurrency": "COP",
  "fees": [],
  "exchanges": [],
  "createdAt": "2025-05-08T21:34:07Z",
  "updatedAt": "2025-05-08T21:34:07Z",
  "origins": [
    {
      "type": "ACCOUNT",
      "amount": "2222",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "John",
        "lastname": "Doe",
        "nickname": "Juan",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174127721505166050317",
        "accountHolder": "John Doe",
        "currency": "COP"
      }
    }
  ],
  "destinations": [
    {
      "type": "BANK_ACCOUNT",
      "bank": {
        "bankContactId": "",
        "bankAccountNumber": "11111111",
        "bankNickname": "Cuenta bancaria",
        "bankBank": "Banco Finandina",
        "bankCurrency": "COP",
        "bankUserDni": "",
        "bankAccountHolder": "John Doe",
        "bankAccountHolderDni": "162115031-7",
        "bankUserId": ""
      }
    }
  ]
}
```

#### P2P

```
{
  "_id":"68188dbe9c9886844225e397",
  "externalId": "1234-ext",
  "identityId": "67f13d2ad6d09fcbb4e84630",
  "identityExternalId": "",
  "accountNumber": "17438630830520250405132726365",
  "totalAmount": "7.84",
  "currency": "COP",
  "description": "",
  "product": "COP:COP",
  "timestamp": "",
  "status": "RECEIVED",
  "type": "P2P",
  "purchaseAmount": "7.84",
  "purchaseCurrency": "COP",
  "fees": [],
  "exchanges": [],
  "createdAt": "2025-05-05T10:06:54Z",
  "updatedAt": "2025-05-05T10:06:56Z",
  "origins": [
    {
      "type": "ACCOUNT",
      "currency": "COP",
      "identity": {
        "identityId": "67f13d2ad6d09fcbb4e84630",
        "name": "John Doe",
        "nickname": "Juan",
        "entityType": "USER"
      },
      "account": {
        "type": "SP",
        "externalId": "123",
        "accountNumber": "17438630830520250405132726365",
        "accountHolder": "John Doe",
        "currency": "COP"
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "amount": "4.84",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "Julio",
        "lastname": "Iglesias",
        "nickname": "Julito",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174127721505166050317",
        "accountHolder": "Julio Iglesias",
        "currency": "COP"
      }
    },
    {
      "type": "ACCOUNT",
      "amount": "3.00",
      "currency": "COP",
      "identity": {
        "identityId": "67f12e4dd6d09fcbb4e8462f",
        "name": "Juana",
        "nickname": "de Arcos",
        "entityType": "ORGANIZATION"
      },
      "account": {
        "type": "OPERATOR",
        "externalId": "",
        "accountNumber": "1743859278051743856019350",
        "accountHolder": "Juana de Arcos ",
        "currency": "COP"
      }
    }
  ]
}
```

#### PURCHASE

```
{
  "_id": "681219b59c9886844225e370",
  "externalId": "test_123",
  "identityId": "67a0307eaddea901a60144ec",
  "identityExternalId": "",
  "accountNumber": "174127721505166050317",
  "totalAmount": "1890.50",
  "currency": "COP",
  "description": "Customer payment",
  "product": "COP:COP",
  "timestamp": "",
  "status": "RECEIVED",
  "type": "PURCHASE",
  "purchaseAmount": "1900.00",
  "purchaseCurrency": "COP",
  "fees": [
    {
      "feeName": "Conomy",
      "feeType": "PERCENTAGE",
      "feeValue": "0.5"
    }
  ],
  "exchanges": [],
  "createdAt": "2025-04-30T12:38:13Z",
  "updatedAt": "2025-04-30T12:38:43Z",
  "category": "",
  "origins": [
    {
      "name": "WOMPI",
      "type": "PAYMENT_LINK",
      "currency": "COP",
      "paymentLink": {
        "url": "https://checkout.wompi.co/l/test_UlNdzM",
        "token": "test_UlNdzM",
        "expiredAt": "2025-04-30T13:08:12.534Z",
        "name": "STATIC",
        "metadata": {
          "description": "Customer payment"
        },
        "paymentMethods": [
          "WOMPI"
        ],
        "payer": {
          "email": "johnd@gmail.com",
          "name": "John"
        },
        "provider": "WOMPI",
        "paymentMethod": {
          "type": "CARD",
          "card": {
            "holder": "John Doe",
            "expiryMonth": "04",
            "expiryYear": "29",
            "brand": "VISA",
            "cardType": "CREDIT",
            "last4": "4242"
          }
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "amount": "1890.50",
      "currency": "COP",
      "identity": {
        "identityId": "67a0307eaddea901a60144ec",
        "name": "Roberta",
        "lastname": "Flores",
        "nickname": "Robertita",
        "entityType": "USER"
      },
      "account": {
        "type": "CHECKING_ACCOUNT",
        "externalId": "",
        "accountNumber": "174127721505166050317",
        "accountHolder": "Roberta Flores",
        "currency": "COP"
      }
    }
  ]
}
```
