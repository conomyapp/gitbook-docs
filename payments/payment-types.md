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
    visible: false
---

# Payment types

#### **TOPUP\_ACCOUNT**

Used to fund an account within **conomy\_hq**. This payment type enables users to add funds to their accounts for future payments.

#### **WITHDRAWAL\_ACCOUNT**

Used to withdraw funds from an account within **conomy\_hq**. This allows users to transfer money from their **conomy\_hq** account to an external destination (e.g. a bank account).

#### **PURCHASE**

Represents a sale payment where the client receives payment from a third party in exchange for goods or services. Typically initiated using a payment link or payment initiation method.

#### **FEE**

Automatically generated fee payments based on the predefined business rules set by each client. These fees are deducted as part of the payment processing and should not be created manually.

#### **COLLECT**

Used to collect funds from multiple origin accounts into a single destination account. This bulk payment type is useful for pooling payments from different users or consolidating balances.

#### **P2P**

Used for peer-to-peer payments between service providers or organizations. This type is intended for direct transfers between two known entities, and should not be confused with COLLECT or PURCHASE flows.

***

#### Bulk Payments

* To perform a **bulk payment for disbursement**, depending on the use, it can be used one of these types:
  * `P2P` or `WITHDRAWAL_ACCOUNT`
  * Structure: **one origin and multiple destinations**
* To perform a **bulk payment for collection**, use:
  * `COLLECT`
  * Structure: **multiple origins and one destination**

***

#### Payment types summary

| Type                | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| TOPUP\_ACCOUNT      | Funds an account in **conomy\_hq**                             |
| WITHDRAWAL\_ACCOUNT | Withdraws funds from a **conomy\_hq** account                  |
| PURCHASE            | Sale payment between client and third party                    |
| FEE                 | Automatically generated fees per business rules                |
| COLLECT             | Collects funds from multiple origins into a single destination |
| P2P                 | Transfers between service providers or organizations           |
