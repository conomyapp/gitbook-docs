# Nodes

Each payment node has a `type` that defines which payment rail or account type is used. The `type` determines which sub-object you must include in the node — the sub-object key is the `type` name in camelCase.

{% hint style="info" %}
**Pattern:** `"type": "PIX"` → include a `"pix": { ... }` object. `"type": "BANK_ACCOUNT"` → include a `"bank": { ... }` object.
{% endhint %}

---

## Internal Nodes

### ACCOUNT

An internal conomy\_hq account — used as origin or destination for internal transfers.

**Required fields**

| Field                   | Description                           |
| ----------------------- | ------------------------------------- |
| `identity.identityId`   | The identity ID linked to the account |
| `account.accountNumber` | The internal account number           |

**Example**

```json
{
  "type": "ACCOUNT",
  "currency": "CLP",
  "identity": {
    "identityId": "679fd871addea901a60144e3"
  },
  "account": {
    "accountNumber": "173854531105176050117"
  }
}
```

---

### BANK\_ACCOUNT

An external bank account — used for payouts and remittances.

**Required fields**

| Field                     | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `bank.accountNumber`      | Bank account number                                     |
| `bank.bank`               | Bank identifier (e.g., `BANCO_SANTANDER`, `BANCO_CMF`)  |
| `bank.currency`           | Currency of the bank account                            |
| `bank.typeAccount`        | Account type: `CHECKING` or `SAVINGS`                   |
| `bank.accountHolder`      | Full name of the account holder                         |
| `bank.accountHolderDni`   | National ID or tax ID of the account holder             |
| `bank.country`            | 2-letter ISO country code (e.g., `AR`, `CL`, `MX`)     |
| `customer.firstName`      | Customer first name                                     |
| `customer.lastName`       | Customer last name                                      |
| `customer.documentNumber` | Customer document number                                |
| `customer.email`          | Customer email                                          |

**Example**

```json
{
  "type": "BANK_ACCOUNT",
  "currency": "ARS",
  "bank": {
    "accountNumber": "0000267900000001588730",
    "bank": "BANCO_CMF",
    "currency": "ARS",
    "typeAccount": "CHECKING",
    "accountHolder": "Fernando Domínguez",
    "accountHolderDni": "20219636890",
    "country": "AR"
  },
  "customer": {
    "firstName": "Fernando",
    "lastName": "Domínguez",
    "documentNumber": "20219636890",
    "country": "ARG",
    "email": "usuario@example.com"
  }
}
```

---

### CRYPTO

A crypto wallet for sending or receiving digital assets.

**Required fields**

| Field            | Description    |
| ---------------- | -------------- |
| `wallet.address` | Wallet address |

**Example**

```json
{
  "type": "CRYPTO",
  "currency": "USDC_SOLANA",
  "wallet": {
    "address": "0x123...456"
  }
}
```

---

## Payment Rails

Payment rails are the external methods used to move money in or out of the platform. Specify the rail `type` in uppercase and include its corresponding sub-object in camelCase.

---

## Brazil

### PIX

Brazil's instant payment system. Supports pay-in (QR code) and payout (PIX key).

**Required fields (pay-in)**

| Field                         | Description             |
| ----------------------------- | ----------------------- |
| `pix.customer.firstName`      | Customer first name     |
| `pix.customer.lastName`       | Customer last name      |
| `pix.customer.email`          | Customer email          |
| `pix.customer.documentNumber` | CPF or CNPJ             |

**Required fields (payout)**

| Field            | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pix.pixKeyType` | PIX key type: `CPF`, `CNPJ`, `EMAIL`, `PHONE`, `EVP` |
| `pix.pixKey`     | The PIX key value                                     |

**Pay-in example (TOPUP)**

```json
{
  "type": "PIX",
  "currency": "BRL",
  "pix": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "Ana",
      "lastName": "Silva",
      "email": "ana@example.com",
      "documentNumber": "123.456.789-00"
    }
  }
}
```

**Payout example (WITHDRAWAL)**

```json
{
  "type": "PIX",
  "currency": "BRL",
  "pix": {
    "pixKeyType": "CPF",
    "pixKey": "123.456.789-00",
    "customer": {
      "firstName": "Ana",
      "lastName": "Silva",
      "email": "ana@example.com",
      "documentNumber": "123.456.789-00"
    }
  }
}
```

{% hint style="info" %}
The response includes `pix.qrCode` and `pix.data` (EMV copy-paste string) for the customer to complete the payment.
{% endhint %}

---

## Argentina

### PCT

Argentina's interoperable QR-based transfer standard (BCRA). Used for pay-ins.

**Required fields**

| Field                            | Description                |
| -------------------------------- | -------------------------- |
| `pct.customer.phoneNumber`       | Customer phone number      |
| `pct.customer.phoneNumberPrefix` | Phone prefix (e.g., `+54`) |
| `pct.customer.email`             | Customer email             |

**Pay-in example**

```json
{
  "type": "PCT",
  "currency": "ARS",
  "pct": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "phoneNumber": "1155556666",
      "phoneNumberPrefix": "+54",
      "email": "usuario@example.com"
    }
  }
}
```

{% hint style="info" %}
The response includes `pct.qrCode` for the customer to scan with any BCRA-compatible banking app.
{% endhint %}

---

### CVU

Argentina's virtual account system for bank transfers (CVU/CBU). Used for payouts.

**Required fields**

| Field                    | Description          |
| ------------------------ | -------------------- |
| `cvu.code`               | CVU or CBU code      |
| `cvu.customer.firstName` | Customer first name  |
| `cvu.customer.lastName`  | Customer last name   |
| `cvu.customer.email`     | Customer email       |

**Payout example**

```json
{
  "type": "CVU",
  "currency": "ARS",
  "cvu": {
    "code": "0000003100025127000001",
    "customer": {
      "firstName": "Carlos",
      "lastName": "García",
      "email": "carlos@example.com"
    }
  }
}
```

---

## Mexico

### SPEI

Mexico's Electronic Interbank Payment System. Transfers via CLABE. Used for payouts.

**Required fields**

| Field                     | Description           |
| ------------------------- | --------------------- |
| `spei.clabe`              | 18-digit CLABE number |
| `spei.customer.firstName` | Customer first name   |
| `spei.customer.lastName`  | Customer last name    |

**Payout example**

```json
{
  "type": "SPEI",
  "currency": "MXN",
  "spei": {
    "clabe": "646180157062180423",
    "bankId": "90646",
    "customer": {
      "firstName": "María",
      "lastName": "López",
      "email": "maria@example.com"
    }
  }
}
```

---

## Chile

### ETPAY

Open banking pay-in for Chile. Redirects the customer to their bank to authorize.

**Required fields**

| Field                      | Description                   |
| -------------------------- | ----------------------------- |
| `etpay.successUrl`         | Redirect URL after success    |
| `etpay.failedUrl`          | Redirect URL after failure    |
| `etpay.customer.firstName` | Customer first name           |
| `etpay.customer.email`     | Customer email                |

**Pay-in example**

```json
{
  "type": "ETPAY",
  "currency": "CLP",
  "etpay": {
    "successUrl": "https://yourapp.com/success",
    "failedUrl": "https://yourapp.com/failed",
    "customer": {
      "firstName": "Diego",
      "email": "diego@example.com"
    }
  }
}
```

{% hint style="info" %}
The response includes `etpay.url` — redirect the customer there to authorize the bank payment.
{% endhint %}

---

### FINTOC

Open banking pay-in for Chile via the Fintoc widget.

**Required fields**

No required fields — all customer data is collected within the Fintoc widget.

**Pay-in example**

```json
{
  "type": "FINTOC",
  "currency": "CLP",
  "fintoc": {
    "customer": {
      "email": "diego@example.com"
    }
  }
}
```

{% hint style="info" %}
The response includes `fintoc.url` — use it to open the Fintoc widget.
{% endhint %}

---

### WEBPAY

Card payment gateway for Chile (Transbank).

**Required fields**

| Field                       | Description          |
| --------------------------- | -------------------- |
| `webpay.customer.firstName` | Customer first name  |
| `webpay.customer.lastName`  | Customer last name   |
| `webpay.customer.email`     | Customer email       |

**Pay-in example**

```json
{
  "type": "WEBPAY",
  "currency": "CLP",
  "webpay": {
    "customer": {
      "firstName": "Diego",
      "lastName": "Muñoz",
      "email": "diego@example.com"
    }
  }
}
```

---

## Colombia

### PSE

Colombia's online secure payment system. Customer selects their bank and authorizes.

**Required fields**

| Field                         | Description                             |
| ----------------------------- | --------------------------------------- |
| `pse.bankId`                  | Bank identifier from PSE's list         |
| `pse.customer.documentNumber` | Customer document number                |
| `pse.customer.documentType`   | Document type (`CC`, `NIT`, `CE`, etc.) |
| `pse.customer.firstName`      | Customer first name                     |
| `pse.customer.lastName`       | Customer last name                      |
| `pse.customer.phoneNumber`    | Customer phone number                   |
| `pse.customer.email`          | Customer email                          |

**Pay-in example**

```json
{
  "type": "PSE",
  "currency": "COP",
  "pse": {
    "bankId": "1007",
    "customer": {
      "firstName": "Valentina",
      "lastName": "Torres",
      "documentNumber": "1023456789",
      "documentType": "CC",
      "phoneNumber": "3001234567",
      "email": "valentina@example.com"
    }
  }
}
```

---

### BANCOLOMBIA

Direct pay-in via Bancolombia's payment button.

**Required fields**

| Field                        | Description    |
| ---------------------------- | -------------- |
| `bancolombia.customer.email` | Customer email |

**Pay-in example**

```json
{
  "type": "BANCOLOMBIA",
  "currency": "COP",
  "bancolombia": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

{% hint style="info" %}
The response includes `bancolombia.url` — redirect the customer to complete the payment.
{% endhint %}

---

### DAVIVIENDA

Direct pay-in via Davivienda.

**Required fields**

| Field                       | Description    |
| --------------------------- | -------------- |
| `davivienda.customer.email` | Customer email |

**Pay-in example**

```json
{
  "type": "DAVIVIENDA",
  "currency": "COP",
  "davivienda": {
    "customer": {
      "email": "usuario@example.com"
    }
  }
}
```

---

### DAVIPLATA

Pay-in via Daviplata mobile wallet.

**Required fields**

| Field                               | Description                      |
| ----------------------------------- | -------------------------------- |
| `daviplata.customer.documentType`   | Document type (`CC`, `CE`, etc.) |
| `daviplata.customer.documentNumber` | Customer document number         |
| `daviplata.customer.email`          | Customer email                   |

**Pay-in example**

```json
{
  "type": "DAVIPLATA",
  "currency": "COP",
  "daviplata": {
    "customer": {
      "documentType": "CC",
      "documentNumber": "1023456789",
      "email": "usuario@example.com"
    }
  }
}
```

---

### NEQUI

Pay-in via Nequi digital wallet.

**Required fields**

| Field                        | Description           |
| ---------------------------- | --------------------- |
| `nequi.customer.phoneNumber` | Customer phone number |
| `nequi.customer.email`       | Customer email        |

**Pay-in example**

```json
{
  "type": "NEQUI",
  "currency": "COP",
  "nequi": {
    "customer": {
      "phoneNumber": "3001234567",
      "email": "usuario@example.com"
    }
  }
}
```

---

## United States

### ACH

US Automated Clearing House — standard bank-to-bank transfers. Used for payouts.

**Required fields**

| Field                         | Description                         |
| ----------------------------- | ----------------------------------- |
| `ach.bank.accountNumber`      | Bank account number                 |
| `ach.routingNumber`           | ABA routing number (9 digits)       |
| `ach.customer.firstName`      | Customer first name                 |
| `ach.customer.lastName`       | Customer last name                  |
| `ach.customer.email`          | Customer email                      |
| `ach.customer.documentNumber` | SSN or tax ID                       |
| `ach.customer.documentType`   | Document type (e.g., `SSN`, `ITIN`) |

**Payout example**

```json
{
  "type": "ACH",
  "currency": "USD",
  "ach": {
    "routingNumber": "021000021",
    "accountType": "CHECKING",
    "accountHolderType": "INDIVIDUAL",
    "bank": {
      "accountNumber": "123456789"
    },
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "documentNumber": "123-45-6789",
      "documentType": "SSN"
    }
  }
}
```

---

## Europe

### SEPA

Single Euro Payments Area — bank transfers across the eurozone. Used for payouts.

**Required fields**

| Field                          | Description               |
| ------------------------------ | ------------------------- |
| `sepa.iban`                    | IBAN of the recipient     |
| `sepa.customer.firstName`      | Customer first name       |
| `sepa.customer.lastName`       | Customer last name        |
| `sepa.customer.email`          | Customer email            |
| `sepa.customer.documentNumber` | Tax ID or passport number |
| `sepa.customer.documentType`   | Document type             |

**Payout example**

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
      "documentNumber": "DE123456789",
      "documentType": "PASSPORT"
    }
  }
}
```

---

## United Kingdom

### FPE (Faster Payments)

UK's Faster Payments scheme for near-instant bank transfers. Used for payouts.

**Required fields**

| Field                    | Description            |
| ------------------------ | ---------------------- |
| `fpe.accountNumber`      | UK bank account number |
| `fpe.sortCode`           | 6-digit sort code      |
| `fpe.customer.firstName` | Customer first name    |
| `fpe.customer.lastName`  | Customer last name     |
| `fpe.customer.email`     | Customer email         |

**Payout example**

```json
{
  "type": "FPE",
  "currency": "GBP",
  "fpe": {
    "accountNumber": "12345678",
    "sortCode": "20-00-00",
    "customer": {
      "firstName": "James",
      "lastName": "Smith",
      "email": "james@example.com"
    }
  }
}
```

---

## Customer Object

Most rail nodes require a `customer` object. All available fields:

| Field               | Type   | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `firstName`         | string | Customer's first name                          |
| `lastName`          | string | Customer's last name                           |
| `email`             | string | Customer's email address                       |
| `phoneNumber`       | string | Phone number without prefix                    |
| `phoneNumberPrefix` | string | Phone prefix (e.g., `+54`, `+57`)              |
| `documentNumber`    | string | ID or tax document number                      |
| `documentType`      | string | Document type (e.g., `CPF`, `CC`, `SSN`)       |
| `country`           | string | ISO 3-letter country code (e.g., `BRA`, `ARG`) |
| `address.administrativeAreaLevel1` | string | Street address or city        |

---

## Rail Summary

| Type          | Region          | Direction | Sub-object    |
| ------------- | --------------- | --------- | ------------- |
| `ACCOUNT`     | Global          | In / Out  | `account`     |
| `BANK_ACCOUNT`| Global          | Out       | `bank`        |
| `CRYPTO`      | Global          | In / Out  | `wallet`      |
| `PIX`         | Brazil        | In / Out  | `pix`         |
| `PCT`         | Argentina     | In        | `pct`         |
| `CVU`         | Argentina     | Out       | `cvu`         |
| `SPEI`        | Mexico        | Out       | `spei`        |
| `ETPAY`       | Chile         | In        | `etpay`       |
| `FINTOC`      | Chile         | In        | `fintoc`      |
| `WEBPAY`      | Chile         | In        | `webpay`      |
| `PSE`         | Colombia      | In        | `pse`         |
| `BANCOLOMBIA` | Colombia      | In        | `bancolombia` |
| `DAVIVIENDA`  | Colombia      | In        | `davivienda`  |
| `DAVIPLATA`   | Colombia      | In        | `daviplata`   |
| `NEQUI`       | Colombia      | In        | `nequi`       |
| `ACH`         | USA           | Out       | `ach`         |
| `SEPA`        | Europe        | Out       | `sepa`        |
| `FPE`         | UK            | Out       | `fpe`         |
