---
description: Every payment needs at least one origin and one destination. This page explains what nodes are, how they work, and which rail to use for each country.
layout:
  width: full
---

# Nodes

A **node** represents a payment endpoint — either where money comes from (origin) or where it goes (destination). Each node has a `type` that identifies the payment rail, and a matching sub-object with the details specific to that rail.

## How nodes work

Every payment you create includes an `origins` array and a `destinations` array. Each element in those arrays is a node:

```json
{
  "origins": [
    {
      "type": "PIX",
      "currency": "BRL",
      "pix": {
        "customer": {
          "firstName": "João",
          "lastName": "Silva",
          "email": "joao@example.com",
          "documentNumber": "12345678901"
        }
      }
    }
  ],
  "destinations": [
    {
      "type": "ACCOUNT",
      "currency": "BRL",
      "account": {
        "accountNumber": "acc_123"
      }
    }
  ]
}
```

The rule is simple: the `type` field must always be in uppercase, and there must be a matching camelCase sub-object with the same name. For example, `"type": "SPEI"` requires a `spei: {}` object.

## Node structure

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td><code>string</code></td>
      <td>The rail identifier in uppercase (e.g., <code>&quot;PIX&quot;</code>, <code>&quot;ACH&quot;</code>, <code>&quot;SEPA&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>currency</code></td>
      <td><code>string</code></td>
      <td><code>ISO 4217</code> currency code (e.g., <code>&quot;BRL&quot;</code>, <code>&quot;USD&quot;</code>, <code>&quot;EUR&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>amount</code></td>
      <td><code>string</code></td>
      <td>Amount in the smallest currency unit (e.g., cents)</td>
    </tr>
    <tr>
      <td><code>&lt;rail&gt;</code></td>
      <td><code>object</code></td>
      <td>Rail-specific data object — name matches <code>type</code> in camelCase</td>
    </tr>
  </tbody>
</table>

## Rail summary

Choose your rail based on country and direction:

<table data-full-width="true">
  <thead>
    <tr>
      <th>Rail</th>
      <th>Country</th>
      <th>Currency</th>
      <th>Direction</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="pix.md">PIX</a></td>
      <td>Brazil</td>
      <td>BRL</td>
      <td>Pay-in / Pay-out</td>
      <td>Redirect / QR</td>
    </tr>
    <tr>
      <td><a href="pct.md">PCT</a></td>
      <td>Argentina</td>
      <td>ARS</td>
      <td>Pay-in</td>
      <td>QR</td>
    </tr>
    <tr>
      <td><a href="cvu.md">CVU</a></td>
      <td>Argentina</td>
      <td>ARS</td>
      <td>Pay-in</td>
      <td>Bank transfer</td>
    </tr>
    <tr>
      <td><a href="etpay.md">ETPAY</a></td>
      <td>Chile</td>
      <td>CLP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="fintoc.md">FINTOC</a></td>
      <td>Chile</td>
      <td>CLP</td>
      <td>Pay-in</td>
      <td>Open banking</td>
    </tr>
    <tr>
      <td><a href="webpay.md">WEBPAY</a></td>
      <td>Chile</td>
      <td>CLP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="spei.md">SPEI</a></td>
      <td>Mexico</td>
      <td>MXN</td>
      <td>Pay-in / Pay-out</td>
      <td>Bank transfer</td>
    </tr>
    <tr>
      <td><a href="pse.md">PSE</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="bancolombia.md">BANCOLOMBIA</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="davivienda.md">DAVIVIENDA</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="daviplata.md">DAVIPLATA</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in / Pay-out</td>
      <td>Wallet</td>
    </tr>
    <tr>
      <td><a href="nequi.md">NEQUI</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in / Pay-out</td>
      <td>Wallet</td>
    </tr>
    <tr>
      <td><a href="breb.md">BREB</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-out</td>
      <td>Bank transfer</td>
    </tr>
    <tr>
      <td><a href="wompi.md">WOMPI</a></td>
      <td>Colombia</td>
      <td>COP</td>
      <td>Pay-in</td>
      <td>Redirect</td>
    </tr>
    <tr>
      <td><a href="pago-movil.md">PAGO\_MOVIL</a></td>
      <td>Venezuela</td>
      <td>VES</td>
      <td>Pay-in</td>
      <td>Mobile payment</td>
    </tr>
    <tr>
      <td><a href="ach.md">ACH</a></td>
      <td>USA</td>
      <td>USD</td>
      <td>Pay-in / Pay-out</td>
      <td>Bank transfer</td>
    </tr>
    <tr>
      <td><a href="wire.md">WIRE</a></td>
      <td>USA</td>
      <td>USD</td>
      <td>Pay-out</td>
      <td>Wire transfer</td>
    </tr>
    <tr>
      <td><a href="fednow.md">FEDNOW</a></td>
      <td>USA</td>
      <td>USD</td>
      <td>Pay-in / Pay-out</td>
      <td>Instant payment</td>
    </tr>
    <tr>
      <td><a href="rtp.md">RTP</a></td>
      <td>USA</td>
      <td>USD</td>
      <td>Pay-in</td>
      <td>Instant payment</td>
    </tr>
    <tr>
      <td><a href="sepa.md">SEPA</a></td>
      <td>Europe</td>
      <td>EUR</td>
      <td>Pay-out</td>
      <td>Bank transfer</td>
    </tr>
    <tr>
      <td><a href="swift.md">SWIFT</a></td>
      <td>International</td>
      <td>Multi</td>
      <td>Pay-out</td>
      <td>Wire transfer</td>
    </tr>
    <tr>
      <td><a href="fpe.md">FPE</a></td>
      <td>UK</td>
      <td>GBP</td>
      <td>Pay-out</td>
      <td>Faster Payments</td>
    </tr>
    <tr>
      <td><a href="account.md">ACCOUNT</a></td>
      <td>Any</td>
      <td>Multi</td>
      <td>Pay-in / Pay-out</td>
      <td>Platform account</td>
    </tr>
    <tr>
      <td><a href="bank-account.md">BANK\_ACCOUNT</a></td>
      <td>Any</td>
      <td>Multi</td>
      <td>Pay-out</td>
      <td>Generic bank</td>
    </tr>
  </tbody>
</table>

## The customer object

Most rails require a `customer` object nested inside the rail sub-object. It carries the end-user's identity for compliance and routing:

<table data-full-width="true">
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>firstName</code></td>
      <td><code>string</code></td>
      <td>First name</td>
    </tr>
    <tr>
      <td><code>lastName</code></td>
      <td><code>string</code></td>
      <td>Last name</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td><code>string</code></td>
      <td>Email address</td>
    </tr>
    <tr>
      <td><code>phoneNumber</code></td>
      <td><code>string</code></td>
      <td>Phone number (digits only, no prefix)</td>
    </tr>
    <tr>
      <td><code>phoneNumberPrefix</code></td>
      <td><code>string</code></td>
      <td>Country calling code (e.g., <code>&quot;54&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>documentNumber</code></td>
      <td><code>string</code></td>
      <td>National ID or tax number</td>
    </tr>
    <tr>
      <td><code>documentType</code></td>
      <td><code>string</code></td>
      <td>Document type (e.g., <code>&quot;CPF&quot;</code>, <code>&quot;DNI&quot;</code>, <code>&quot;CC&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>country</code></td>
      <td><code>string</code></td>
      <td><code>ISO 3166-1 alpha-2</code> country code (e.g., <code>&quot;BR&quot;</code>, <code>&quot;MX&quot;</code>)</td>
    </tr>
    <tr>
      <td><code>address</code></td>
      <td><code>object</code></td>
      <td>Address object — required by some rails</td>
    </tr>
  </tbody>
</table>

## What happens after you submit

For **redirect-based rails** (PIX, PCT, ETPAY, WEBPAY, WOMPI, PSE, BANCOLOMBIA, DAVIVIENDA), the API response includes a `url` or `qrCode` in the node's response object. You redirect your user there to complete the payment.

For **direct rails** (ACH, SEPA, SPEI pay-out, FPE, WIRE, SWIFT), funds move directly to the destination account without user interaction.

The payment status transitions from `CREATED` → `PENDING` → `COMPLETED` (or `FAILED`). You can track this via the [payment status page](../../transaction-status.md) or via [webhooks](../../../api-reference/payments/webhooks.md).
