# Table of contents

## home

* [👋 Welcome to conomy\_hq](README.md)
* [Countries](home/countries.md)
* [Currencies](home/currencies.md)
* [Supported Identity document types](home/supported-identity-document-types.md)
* [Financial institutions](home/financial-institutions.md)

## Accounts\_old

* [Overview](accounts_old/page-2.md)
* [Account types](accounts_old/account-types.md)

## Payments\_old

* [Overview](payments_old/page-1.md)
* [Quickstart](payments_old/quickstart.md)
* [Transaction types](payments_old/transaction-types.md)

## Whitelabel\_old

* [Overview](whitelabel_old/overview.md)

## Quickstart

* [Introduction](quickstart/introduction.md)
* [Obtain an Access Token](quickstart/obtain-an-access-token.md)
* [Create an Organization](quickstart/create-an-organization.md)
* [Create Users](quickstart/create-users.md)
* [Create Accounts](quickstart/create-accounts.md)
* [Create your first Top-up](quickstart/create-your-first-top-up.md)
* [Create your first withdrawal](quickstart/create-your-first-withdrawal.md)

## Payments

* [Transaction types](payments/transaction-types.md)
* [Origins and Destinations](payments/origins-and-destinations.md)
* [Transaction nodes](payments/transaction-nodes.md)
* [Transaction status](payments/transaction-status.md)
* [Creating payments](payments/creating-payments.md)
* [Add & remove fees](payments/add-and-remove-fees.md)
* [Peer to peer payment - P2P](payments/peer-to-peer-payment-p2p.md)
* [Collect](payments/collect.md)

## API REFERENCE

* ```yaml
  type: builtin:openapi
  props:
    models: false
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: conomyhq-api
  ```
* [Authentication](api-reference/authentication.md)
* [Identity](api-reference/identity.md)
* [Payments](api-reference/payments/README.md)
  * [Payment methods](api-reference/payments/payment-methods.md)
  * [Payment-attempts](api-reference/payments/payment-attempts.md)
  * [Payments](api-reference/payments/payments.md)
  * [Webhooks](api-reference/payments/webhooks.md)
