---
title: Financial institution
---

<table><thead><tr><th width="235">Field</th><th width="168">Type</th><th>Description</th></tr></thead><tbody><tr><td>financialInstitutionName</td><td><code>string</code></td><td>Human-readable name of the financial institution (e.g., "Banco de Chile").</td></tr><tr><td>name</td><td><code>string</code></td><td>Technical identifier used in requests (e.g., "BANCO_CHILE").</td></tr><tr><td>country</td><td><code>string</code></td><td>ISO 3166-1 alpha-3 code of the country where the institution operates.</td></tr><tr><td>network</td><td><code>array[string]</code></td><td>List of supported networks for transactions (e.g., ["SPEI", "ACH_US", "SOLANA"]).</td></tr><tr><td>currencies</td><td><code>array[string]</code></td><td>Supported currencies for the institution, in ISO 4217 or token_network format for crypto (e.g., ["CLP", "USD", "USDC_SOLANA"]).</td></tr></tbody></table>
