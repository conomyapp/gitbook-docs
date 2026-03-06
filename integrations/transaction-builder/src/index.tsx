import { createComponent, createIntegration } from "@gitbook/runtime";

const PUBLIC_ENDPOINT =
  "https://integrations.gitbook.com/v1/integrations/conomyhq-transaction-builder/integration";

const BUILDER_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conomy Transaction Builder</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #ffffff;
        --fg: #111111;
        --muted: #6b7280;
        --line: #e5e7eb;
        --card: #fafafa;
        --soft: #f3f4f6;
        --brand: #111111;
        --code-bg: #f5f5f5;
        --code-fg: #111827;
        --code-border: #e5e7eb;
      }
      html, body {
        width: 100%;
        height: 100%;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        background: var(--bg);
        color: var(--fg);
        font-family: Geist, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow: hidden;
      }
      .scroll-root {
        width: 100%;
        height: 100vh;
        padding: 16px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .wrap {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .card {
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 16px;
        background: var(--card);
      }
      .title {
        margin: 0 0 6px 0;
        font-size: 14px;
        font-weight: 600;
      }
      .sub {
        margin: 0;
        color: var(--muted);
        font-size: 12px;
      }
      .sub a {
        color: #111827;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .grid {
        margin-top: 14px;
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .field label {
        font-size: 12px;
        color: #374151;
        font-weight: 600;
      }
      .hint {
        font-size: 11px;
        color: var(--muted);
      }
      select, input, textarea, button {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: #fff;
        color: var(--fg);
        padding: 10px 12px;
        font: inherit;
      }
      select, input, textarea { font-size: 13px; }
      input[type="number"] { appearance: textfield; }
      textarea { min-height: 160px; resize: vertical; }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .actions {
        margin-top: 14px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      button {
        width: auto;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        background: #fff;
        transition: all .15s ease;
      }
      button:hover { border-color: #d1d5db; background: var(--soft); }
      button.primary {
        background: var(--brand);
        color: #fff;
        border-color: var(--brand);
      }
      button.primary:hover { opacity: .92; background: #000; }
      .route {
        margin-top: 12px;
        font-size: 12px;
        color: #111827;
        padding: 10px 12px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: #fff;
      }
      .chips {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .meta {
        margin-top: 10px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: #fff;
        padding: 8px 10px;
      }
      .meta summary {
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        color: #374151;
      }
      .chip {
        font-size: 11px;
        line-height: 1;
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 8px 10px;
        background: #fff;
        color: #374151;
      }
      .hidden { display: none; }
      .error {
        margin-top: 10px;
        color: #b42318;
        font-size: 12px;
        white-space: pre-wrap;
      }
      .output {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .output-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .output-title {
        font-size: 12px;
        font-weight: 600;
        color: #374151;
      }
      .copy-btn {
        width: auto;
        font-size: 11px;
        padding: 7px 10px;
      }
      .code {
        margin: 0;
        min-height: 190px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid var(--code-border);
        background: var(--code-bg);
        color: var(--code-fg);
        padding: 12px;
        font-size: 12px;
        line-height: 1.55;
      }
      .code code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .toast {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background: #111827;
        color: #fff;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 12px;
        border: 1px solid #111827;
      }
      @media (max-width: 900px) {
        .grid, .row { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="scroll-root" id="scrollRoot">
      <div class="wrap" id="wrap">
      <div class="card">
        <h3 class="title">Transaction Builder</h3>
        <p class="sub">Generate JSON and cURL for <code>POST /payments</code>. No execution. <a href="${PUBLIC_ENDPOINT}/builder" target="_blank" rel="noreferrer">Open standalone</a>.</p>

        <div class="grid">
          <div class="field">
            <label>Preset</label>
            <select id="preset">
              <option value="ars-cvu-topup">ARS top-up with CVU</option>
              <option value="ars-pct-topup">ARS top-up with PCT</option>
              <option value="pix-brl-to-clp">PIX BRL to CLP account</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div class="field">
            <label>Transaction type</label>
            <select id="type"></select>
          </div>

          <div class="field">
            <label>Origin rail</label>
            <select id="originType"></select>
            <span class="hint">Filtered by selected source currency.</span>
          </div>
          <div class="field">
            <label>Source currency</label>
            <select id="purchaseCurrency"></select>
            <span class="hint">Filtered by selected origin rail.</span>
          </div>

          <div class="field">
            <label>Destination rail</label>
            <select id="destinationType"></select>
            <span class="hint">Filtered by settlement currency.</span>
          </div>
          <div class="field">
            <label>Settlement currency</label>
            <select id="currency"></select>
            <span class="hint">Filtered by selected destination rail.</span>
          </div>

          <div class="field">
            <label>Amount</label>
            <input id="purchaseAmount" type="number" min="0" step="0.01" value="100" />
          </div>
        </div>

        <div class="actions">
          <button id="applyPreset">Apply preset</button>
          <button id="defaults">Reset node examples</button>
          <button id="toggleAdvanced">Show advanced</button>
          <button class="primary" id="generate">Generate JSON and cURL</button>
        </div>

        <div id="route" class="route"></div>
        <details class="meta">
          <summary>Compatibility details</summary>
          <div id="compatibility" class="chips"></div>
        </details>
        <div id="error" class="error"></div>
      </div>

      <div id="advanced" class="card hidden">
        <h3 class="title">Advanced (optional)</h3>
        <div class="grid">
          <div class="field"><label>Identity ID</label><input id="identityId" /></div>
          <div class="field"><label>Account number</label><input id="accountNumber" /></div>
          <div class="field"><label>Base URL</label><input id="baseUrl" value="https://api.conomyhq.com/sandbox" /></div>
          <div class="field row">
            <div class="field"><label>Origin currency override</label><input id="originCurrency" /></div>
            <div class="field"><label>Destination currency override</label><input id="destinationCurrency" /></div>
          </div>
          <div class="field row">
            <div class="field"><label>Origin amount override</label><input id="originAmount" /></div>
            <div class="field"><label>Destination amount override</label><input id="destinationAmount" /></div>
          </div>
        </div>

        <div class="row" style="margin-top:12px;">
          <div class="field">
            <label>Origin node JSON</label>
            <textarea id="originNodeJson"></textarea>
          </div>
          <div class="field">
            <label>Destination node JSON</label>
            <textarea id="destinationNodeJson"></textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="card output">
          <div class="output-head">
            <span class="output-title">Generated JSON payload</span>
            <button class="copy-btn" id="copyJson">Copy JSON</button>
          </div>
          <pre class="code"><code id="generatedJsonCode">{}</code></pre>
        </div>
        <div class="card output">
          <div class="output-head">
            <span class="output-title">Generated cURL</span>
            <button class="copy-btn" id="copyCurl">Copy cURL</button>
          </div>
          <pre class="code"><code id="generatedCurlCode"># Generate first</code></pre>
        </div>
      </div>
      </div>
    </div>

    <div id="toast" class="toast hidden">Copied to clipboard</div>

    <script src="${PUBLIC_ENDPOINT}/builder.js"></script>
  </body>
</html>`;

const BUILDER_JS = String.raw`(function () {
  const paymentTypeOptions = [
    ["TOPUP_ACCOUNT", "Top up account"],
    ["WITHDRAWAL_ACCOUNT", "Withdrawal account"],
    ["REMITTANCE", "Remittance"],
    ["PURCHASE", "Purchase"],
    ["P2P", "P2P"],
    ["COLLECT", "Collect"],
    ["FEE", "Fee"]
  ];

  const originRailOptions = [
    "CVU",
    "PCT",
    "PIX",
    "WEBPAY",
    "PSE",
    "SPEI",
    "ACH",
    "WIRE",
    "SWIFT",
    "CRYPTO",
    "ACCOUNT"
  ];

  const destinationRailOptions = [
    "ACCOUNT",
    "BANK_ACCOUNT",
    "CVU",
    "PIX",
    "SPEI",
    "ACH",
    "WIRE",
    "SWIFT",
    "CRYPTO",
    "PSE"
  ];

  const ORIGIN_CURRENCIES_BY_RAIL = {
    CVU: ["ARS"],
    PCT: ["ARS"],
    PIX: ["BRL"],
    WEBPAY: ["CLP"],
    PSE: ["COP"],
    SPEI: ["MXN"],
    ACH: ["USD"],
    WIRE: ["USD"],
    SWIFT: ["USD", "EUR", "GBP"],
    CRYPTO: ["USDT", "USDC", "BTC", "ETH"],
    ACCOUNT: ["ARS", "BRL", "CLP", "COP", "MXN", "PEN", "UYU", "USD", "EUR", "GBP"]
  };

  const DESTINATION_CURRENCIES_BY_RAIL = {
    ACCOUNT: ["ARS", "BRL", "CLP", "COP", "MXN", "PEN", "UYU", "USD", "EUR", "GBP"],
    BANK_ACCOUNT: ["ARS", "BRL", "CLP", "COP", "MXN", "PEN", "UYU", "USD", "EUR", "GBP"],
    CVU: ["ARS"],
    PIX: ["BRL"],
    SPEI: ["MXN"],
    ACH: ["USD"],
    WIRE: ["USD"],
    SWIFT: ["USD", "EUR", "GBP"],
    CRYPTO: ["USDT", "USDC", "BTC", "ETH"],
    PSE: ["COP"]
  };

  const TYPE_RULES = {
    TOPUP_ACCOUNT: {
      origin: ["CVU", "PCT", "PIX", "WEBPAY", "PSE", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO"],
      destination: ["ACCOUNT"]
    },
    WITHDRAWAL_ACCOUNT: {
      origin: ["ACCOUNT"],
      destination: ["BANK_ACCOUNT", "CVU", "PIX", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO", "PSE", "ACCOUNT"]
    },
    REMITTANCE: {
      origin: ["ACCOUNT", "CVU", "PCT", "PIX", "WEBPAY", "PSE", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO"],
      destination: destinationRailOptions
    },
    PURCHASE: {
      origin: ["CVU", "PCT", "PIX", "WEBPAY", "PSE", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO"],
      destination: ["ACCOUNT"]
    },
    P2P: {
      origin: ["ACCOUNT"],
      destination: ["ACCOUNT"]
    },
    COLLECT: {
      origin: ["CVU", "PCT", "PIX", "WEBPAY", "PSE", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO"],
      destination: ["ACCOUNT"]
    },
    FEE: {
      origin: ["ACCOUNT"],
      destination: ["ACCOUNT"]
    },
    DEFAULT: {
      origin: originRailOptions,
      destination: destinationRailOptions
    }
  };

  const PRESETS = {
    "ars-cvu-topup": {
      type: "TOPUP_ACCOUNT",
      purchaseCurrency: "ARS",
      currency: "ARS",
      originType: "CVU",
      destinationType: "ACCOUNT"
    },
    "ars-pct-topup": {
      type: "TOPUP_ACCOUNT",
      purchaseCurrency: "ARS",
      currency: "ARS",
      originType: "PCT",
      destinationType: "ACCOUNT"
    },
    "pix-brl-to-clp": {
      type: "TOPUP_ACCOUNT",
      purchaseCurrency: "BRL",
      currency: "CLP",
      originType: "PIX",
      destinationType: "ACCOUNT"
    }
  };

  const nodeKeyByType = {
    ACCOUNT: "account",
    BANK_ACCOUNT: "bank",
    CRYPTO: "wallet",
    PIX: "pix",
    PCT: "pct",
    CVU: "cvu",
    ETPAY: "etpay",
    FINTOC: "fintoc",
    WEBPAY: "webpay",
    WOMPI: "wompi",
    PSE: "pse",
    BANCOLOMBIA: "bancolombia",
    DAVIVIENDA: "davivienda",
    DAVIPLATA: "daviplata",
    NEQUI: "nequi",
    BREB: "breb",
    SPEI: "spei",
    ACH: "ach",
    WIRE: "wire",
    FEDNOW: "fednow",
    RTP: "rtp",
    SEPA: "sepa",
    FPE: "fpe",
    SWIFT: "swift",
    PAGO_MOVIL: "pagoMovil"
  };

  const $ = (id) => document.getElementById(id);
  const state = { showAdvanced: false, toastTimer: null };

  const allOriginCurrencies = unique(Object.values(ORIGIN_CURRENCIES_BY_RAIL).flat());
  const allDestinationCurrencies = unique(Object.values(DESTINATION_CURRENCIES_BY_RAIL).flat());

  function unique(values) {
    return Array.from(new Set(values));
  }

  function toUpper(value) {
    return String(value || "").trim().toUpperCase();
  }

  function normalizeOption(entry) {
    if (Array.isArray(entry)) {
      return { value: String(entry[0]), label: String(entry[1]) };
    }
    const value = String(entry);
    return { value, label: value };
  }

  function setSelectOptions(el, options, preferredValue) {
    const normalized = options.map(normalizeOption);
    el.innerHTML = "";

    if (!normalized.length) {
      const fallbackOption = document.createElement("option");
      fallbackOption.value = "";
      fallbackOption.textContent = "No options";
      el.appendChild(fallbackOption);
      el.value = "";
      return "";
    }

    normalized.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.value;
      option.textContent = entry.label;
      el.appendChild(option);
    });

    const preferredUpper = toUpper(preferredValue);
    const matched = normalized.find((entry) => toUpper(entry.value) === preferredUpper);
    el.value = matched ? matched.value : normalized[0].value;
    return el.value;
  }

  function getTypeRules() {
    const selectedType = toUpper($("type").value);
    return TYPE_RULES[selectedType] || TYPE_RULES.DEFAULT;
  }

  function currenciesForRail(map, rail, fallback) {
    return map[rail] || fallback;
  }

  function defaultNodeJson(type, direction) {
    if (type === "ACCOUNT") {
      return JSON.stringify({ accountNumber: "<ACCOUNT_NUMBER>" }, null, 2);
    }

    if (type === "BANK_ACCOUNT") {
      return JSON.stringify({ accountNumber: "<ACCOUNT_NUMBER>", bankCode: "<BANK_CODE>" }, null, 2);
    }

    if (type === "CVU") {
      return JSON.stringify(
        {
          customer: {
            firstName: "Juan",
            lastName: "Perez",
            email: "juan@example.com"
          }
        },
        null,
        2
      );
    }

    if (type === "PCT") {
      return JSON.stringify(
        {
          customer: {
            email: "juan@example.com",
            phoneNumber: "1123456789",
            phoneNumberPrefix: "+54"
          }
        },
        null,
        2
      );
    }

    if (type === "PIX") {
      if (direction === "origin") {
        return JSON.stringify(
          {
            successUrl: "https://yourapp.com/success",
            failedUrl: "https://yourapp.com/failed",
            customer: {
              firstName: "Maria",
              lastName: "Silva",
              email: "maria@example.com",
              documentNumber: "12345678901"
            }
          },
          null,
          2
        );
      }
      return JSON.stringify({ keyType: "email", key: "maria@example.com" }, null, 2);
    }

    if (type === "CRYPTO") {
      return JSON.stringify({ address: "<WALLET_ADDRESS>", network: "<NETWORK>", asset: "<ASSET>" }, null, 2);
    }

    if (type === "WEBPAY") {
      return JSON.stringify({ successUrl: "https://yourapp.com/success", failedUrl: "https://yourapp.com/failed" }, null, 2);
    }

    return "{}";
  }

  function syncOrigin(driver) {
    const rules = getTypeRules();
    const allowedRails = rules.origin.slice();
    const currentRail = toUpper($("originType").value);
    const currentCurrency = toUpper($("purchaseCurrency").value);
    const railCurrencies = (rail) => currenciesForRail(ORIGIN_CURRENCIES_BY_RAIL, rail, allOriginCurrencies);

    let selectedRail = currentRail;
    let selectedCurrency = currentCurrency;

    if (driver === "currency") {
      let railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(currentCurrency));
      if (!railsForCurrency.length) railsForCurrency = allowedRails;
      selectedRail = setSelectOptions($("originType"), railsForCurrency, currentRail);
      selectedCurrency = setSelectOptions($("purchaseCurrency"), railCurrencies(selectedRail), currentCurrency);

      railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(selectedCurrency));
      if (railsForCurrency.length) {
        selectedRail = setSelectOptions($("originType"), railsForCurrency, selectedRail);
      }
    } else {
      selectedRail = setSelectOptions($("originType"), allowedRails, currentRail);
      selectedCurrency = setSelectOptions($("purchaseCurrency"), railCurrencies(selectedRail), currentCurrency);

      const railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(selectedCurrency));
      if (railsForCurrency.length) {
        selectedRail = setSelectOptions($("originType"), railsForCurrency, selectedRail);
      }
    }

    return {
      rail: selectedRail,
      currency: selectedCurrency,
      allowedRails,
      allowedCurrencies: railCurrencies(selectedRail)
    };
  }

  function syncDestination(driver) {
    const rules = getTypeRules();
    const allowedRails = rules.destination.slice();
    const currentRail = toUpper($("destinationType").value);
    const currentCurrency = toUpper($("currency").value);
    const railCurrencies = (rail) => currenciesForRail(DESTINATION_CURRENCIES_BY_RAIL, rail, allDestinationCurrencies);

    let selectedRail = currentRail;
    let selectedCurrency = currentCurrency;

    if (driver === "currency") {
      let railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(currentCurrency));
      if (!railsForCurrency.length) railsForCurrency = allowedRails;
      selectedRail = setSelectOptions($("destinationType"), railsForCurrency, currentRail);
      selectedCurrency = setSelectOptions($("currency"), railCurrencies(selectedRail), currentCurrency);

      railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(selectedCurrency));
      if (railsForCurrency.length) {
        selectedRail = setSelectOptions($("destinationType"), railsForCurrency, selectedRail);
      }
    } else {
      selectedRail = setSelectOptions($("destinationType"), allowedRails, currentRail);
      selectedCurrency = setSelectOptions($("currency"), railCurrencies(selectedRail), currentCurrency);

      const railsForCurrency = allowedRails.filter((rail) => railCurrencies(rail).includes(selectedCurrency));
      if (railsForCurrency.length) {
        selectedRail = setSelectOptions($("destinationType"), railsForCurrency, selectedRail);
      }
    }

    return {
      rail: selectedRail,
      currency: selectedCurrency,
      allowedRails,
      allowedCurrencies: railCurrencies(selectedRail)
    };
  }

  function parseNodeJson(raw, fallback, label) {
    const value = String(raw || "").trim();
    const source = value || fallback;

    try {
      return JSON.parse(source);
    } catch (error) {
      throw new Error(label + " must be valid JSON.");
    }
  }

  function setNodeDefaults() {
    const originType = toUpper($("originType").value);
    const destinationType = toUpper($("destinationType").value);
    $("originNodeJson").value = defaultNodeJson(originType, "origin");
    $("destinationNodeJson").value = defaultNodeJson(destinationType, "destination");
  }

  function postResizeMessage(height) {
    const payloads = [
      { type: "gitbook:webframe:resize", height },
      { type: "resize", height },
      { name: "setHeight", height }
    ];

    payloads.forEach((payload) => {
      try {
        window.parent.postMessage(payload, "*");
      } catch (error) {
        // Ignore postMessage errors and keep builder usable.
      }
    });
  }

  function scheduleResize() {
    const run = () => {
      const wrap = $("wrap") || document.querySelector(".wrap");
      const scrollRoot = $("scrollRoot");
      const bodyHeight = document.body ? document.body.scrollHeight : 0;
      const docHeight = document.documentElement ? document.documentElement.scrollHeight : 0;
      const wrapHeight = wrap && wrap.scrollHeight ? wrap.scrollHeight : 0;
      const rootHeight = scrollRoot && scrollRoot.clientHeight ? scrollRoot.clientHeight : 0;
      const height = Math.max(bodyHeight, docHeight, wrapHeight + 16, rootHeight, 1020);

      postResizeMessage(height + 16);
    };

    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(() => window.requestAnimationFrame(run));
    } else {
      setTimeout(run, 30);
    }
  }

  function renderRoute(originState, destinationState) {
    const source = toUpper($("purchaseCurrency").value);
    const target = toUpper($("currency").value);
    const origin = toUpper($("originType").value);
    const destination = toUpper($("destinationType").value);
    const type = toUpper($("type").value);

    $("route").textContent =
      "Route preview: " + source + " " + origin + " -> " + destination + " -> " + target + " (" + type + ")";

    const chips = [
      "Origin " + origin + ": " + originState.allowedCurrencies.join(", "),
      "Destination " + destination + ": " + destinationState.allowedCurrencies.join(", "),
      "Type " + type + ": origins " + originState.allowedRails.join(", "),
      "Type " + type + ": destinations " + destinationState.allowedRails.join(", ")
    ];

    const container = $("compatibility");
    container.innerHTML = "";
    chips.forEach((chipText) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = chipText;
      container.appendChild(chip);
    });
  }

  function syncForm(driver) {
    const originDriver = driver === "purchaseCurrency" ? "currency" : "rail";
    const destinationDriver = driver === "currency" ? "currency" : "rail";

    const originState = syncOrigin(originDriver);
    const destinationState = syncDestination(destinationDriver);

    if (
      driver === "init" ||
      driver === "preset" ||
      driver === "type" ||
      driver === "defaults" ||
      driver === "originType" ||
      driver === "destinationType"
    ) {
      setNodeDefaults();
    }

    renderRoute(originState, destinationState);
    scheduleResize();
  }

  function applyPreset() {
    const preset = $("preset").value;
    const config = PRESETS[preset];

    if (config) {
      $("type").value = config.type;
      $("purchaseCurrency").value = config.purchaseCurrency;
      $("currency").value = config.currency;
      $("originType").value = config.originType;
      $("destinationType").value = config.destinationType;
    }

    syncForm("preset");
  }

  function buildPayload() {
    const type = toUpper($("type").value);
    const purchaseCurrency = toUpper($("purchaseCurrency").value);
    const currency = toUpper($("currency").value);
    const originType = toUpper($("originType").value);
    const destinationType = toUpper($("destinationType").value);

    const originNodeKey = nodeKeyByType[originType];
    const destinationNodeKey = nodeKeyByType[destinationType];

    if (!originNodeKey) throw new Error("Unsupported origin type: " + originType);
    if (!destinationNodeKey) throw new Error("Unsupported destination type: " + destinationType);

    const originNode = parseNodeJson(
      $("originNodeJson").value,
      defaultNodeJson(originType, "origin"),
      "Origin node JSON"
    );
    const destinationNode = parseNodeJson(
      $("destinationNodeJson").value,
      defaultNodeJson(destinationType, "destination"),
      "Destination node JSON"
    );

    const origin = {
      type: originType,
      currency: toUpper($("originCurrency").value) || purchaseCurrency,
      [originNodeKey]: originNode
    };

    const destination = {
      type: destinationType,
      currency: toUpper($("destinationCurrency").value) || currency,
      [destinationNodeKey]: destinationNode
    };

    if ($("originAmount").value) origin.amount = $("originAmount").value;
    if ($("destinationAmount").value) destination.amount = $("destinationAmount").value;

    return {
      identityId: $("identityId").value || "<IDENTITY_ID>",
      accountNumber: $("accountNumber").value || "<ACCOUNT_NUMBER>",
      type,
      product: purchaseCurrency + ":" + currency,
      purchaseAmount: $("purchaseAmount").value,
      purchaseCurrency,
      currency,
      origins: [origin],
      destinations: [destination]
    };
  }

  function buildCurl(payload) {
    const base =
      (($("baseUrl").value || "https://api.conomyhq.com/sandbox").trim() ||
        "https://api.conomyhq.com/sandbox")
        .replace(/\/+$/, "");

    const body = JSON.stringify(payload).replace(/'/g, "'\\''");

    return [
      "curl --request POST \\",
      "  --url '" + base + "/payments' \\",
      "  --header 'Authorization: Bearer <TOKEN>' \\",
      "  --header 'x-api-key: <API_KEY>' \\",
      "  --header 'Content-Type: application/json' \\",
      "  --data '" + body + "'"
    ].join("\n");
  }

  function setOutputCode(id, value) {
    $(id).textContent = value;
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");

    if (state.toastTimer) {
      clearTimeout(state.toastTimer);
    }

    state.toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 1400);
  }

  function setupCopy(buttonId, sourceId) {
    const button = $(buttonId);
    button.addEventListener("click", async () => {
      try {
        await copyText($(sourceId).textContent || "");
        showToast("Copied to clipboard");
      } catch (error) {
        showToast("Unable to copy");
      }
    });
  }

  function init() {
    setSelectOptions($("type"), paymentTypeOptions, "TOPUP_ACCOUNT");
    setSelectOptions($("originType"), originRailOptions, "CVU");
    setSelectOptions($("destinationType"), destinationRailOptions, "ACCOUNT");
    setSelectOptions($("purchaseCurrency"), allOriginCurrencies, "ARS");
    setSelectOptions($("currency"), allDestinationCurrencies, "ARS");

    $("toggleAdvanced").addEventListener("click", () => {
      state.showAdvanced = !state.showAdvanced;
      $("advanced").classList.toggle("hidden", !state.showAdvanced);
      $("toggleAdvanced").textContent = state.showAdvanced ? "Hide advanced" : "Show advanced";
      scheduleResize();
    });

    $("applyPreset").addEventListener("click", applyPreset);
    $("defaults").addEventListener("click", () => syncForm("defaults"));

    $("type").addEventListener("change", () => syncForm("type"));
    $("originType").addEventListener("change", () => syncForm("originType"));
    $("purchaseCurrency").addEventListener("change", () => syncForm("purchaseCurrency"));
    $("destinationType").addEventListener("change", () => syncForm("destinationType"));
    $("currency").addEventListener("change", () => syncForm("currency"));

    setupCopy("copyJson", "generatedJsonCode");
    setupCopy("copyCurl", "generatedCurlCode");

    $("generate").addEventListener("click", () => {
      try {
        $("error").textContent = "";
        const payload = buildPayload();
        setOutputCode("generatedJsonCode", JSON.stringify(payload, null, 2));
        setOutputCode("generatedCurlCode", buildCurl(payload));
        scheduleResize();
      } catch (error) {
        $("error").textContent = error instanceof Error ? error.message : "Unable to generate payload.";
        scheduleResize();
      }
    });

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => scheduleResize());
      resizeObserver.observe(document.body);
      resizeObserver.observe(document.documentElement);
    }

    window.addEventListener("load", () => scheduleResize());
    window.addEventListener("resize", () => scheduleResize());

    applyPreset();
    syncForm("init");
    scheduleResize();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();`;

const transactionBuilderBlock = createComponent({
  componentId: "transaction-builder-block",
  initialState: {},
  action: async () => ({}),
  render: async () => (
    <block>
      <vstack>
        <markdown content="### Transaction Builder" />
        <markdown content="Build and validate `POST /payments` payloads, then copy generated `JSON` or `cURL` (no execution)." />
        <webframe aspectRatio={0.6} source={{ url: `${PUBLIC_ENDPOINT}/builder` }} />
      </vstack>
    </block>
  )
});

export default createIntegration({
  fetch: async (request) => {
    const url = new URL(request.url);

    if (url.pathname.endsWith("/builder")) {
      return new Response(BUILDER_HTML, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300"
        }
      });
    }

    if (url.pathname.endsWith("/builder.js")) {
      return new Response(BUILDER_JS, {
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "public, max-age=300"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  },
  events: {
    installation_setup: async () => {},
    space_installation_setup: async () => {}
  },
  components: [transactionBuilderBlock]
});
