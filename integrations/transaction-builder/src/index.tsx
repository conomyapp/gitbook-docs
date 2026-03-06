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
        --brand: #111111;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 20px;
        background: var(--bg);
        color: var(--fg);
        font-family: Geist, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
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
      .grid {
        margin-top: 14px;
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(220px, 1fr));
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .field label {
        font-size: 12px;
        color: #374151;
        font-weight: 500;
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
      textarea { min-height: 160px; resize: vertical; }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .actions {
        margin-top: 12px;
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
      }
      button.primary {
        background: var(--brand);
        color: #fff;
        border-color: var(--brand);
      }
      .route {
        margin-top: 10px;
        font-size: 12px;
        color: #374151;
      }
      .hidden { display: none; }
      .error {
        margin-top: 10px;
        color: #b42318;
        font-size: 12px;
        white-space: pre-wrap;
      }
      @media (max-width: 900px) {
        .grid, .row { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h3 class="title">Transaction Builder</h3>
        <p class="sub">Generate JSON and cURL for <code>POST /payments</code>. No execution.</p>

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
          </div>
          <div class="field">
            <label>Destination rail</label>
            <select id="destinationType"></select>
          </div>

          <div class="field">
            <label>Amount</label>
            <input id="purchaseAmount" value="100" />
          </div>
          <div class="field row">
            <div class="field">
              <label>Source currency</label>
              <input id="purchaseCurrency" value="ARS" />
            </div>
            <div class="field">
              <label>Settlement currency</label>
              <input id="currency" value="ARS" />
            </div>
          </div>
        </div>

        <div class="actions">
          <button id="applyPreset">Apply preset</button>
          <button id="defaults">Use defaults for selected rails</button>
          <button id="toggleAdvanced">Show advanced</button>
          <button class="primary" id="generate">Generate JSON and cURL</button>
        </div>

        <div id="route" class="route"></div>
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
        <div class="card field">
          <label>Generated JSON</label>
          <textarea id="generatedJson" readonly>{}</textarea>
        </div>
        <div class="card field">
          <label>Generated cURL</label>
          <textarea id="generatedCurl" readonly># Generate first</textarea>
        </div>
      </div>
    </div>

    <script>
      const paymentTypeOptions = [
        ["TOPUP_ACCOUNT", "Top up account"],
        ["WITHDRAWAL_ACCOUNT", "Withdrawal account"],
        ["REMITTANCE", "Remittance"],
        ["PURCHASE", "Purchase"],
        ["P2P", "P2P"],
        ["COLLECT", "Collect"],
        ["FEE", "Fee"]
      ];

      const originRailOptions = ["CVU", "PCT", "PIX", "WEBPAY", "PSE", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO", "ACCOUNT"];
      const destinationRailOptions = ["ACCOUNT", "BANK_ACCOUNT", "CVU", "PIX", "SPEI", "ACH", "WIRE", "SWIFT", "CRYPTO", "PSE"];

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
      const state = {
        showAdvanced: false
      };

      function fillSelect(select, options) {
        select.innerHTML = "";
        options.forEach((entry) => {
          const value = Array.isArray(entry) ? entry[0] : entry;
          const label = Array.isArray(entry) ? entry[1] : entry;
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          select.appendChild(option);
        });
      }

      function defaultNodeJson(type, direction) {
        if (type === "ACCOUNT") return JSON.stringify({ accountNumber: "<ACCOUNT_NUMBER>" }, null, 2);
        if (type === "BANK_ACCOUNT") return JSON.stringify({ accountNumber: "<ACCOUNT_NUMBER>", bankCode: "<BANK_CODE>" }, null, 2);
        if (type === "CVU") return JSON.stringify({ customer: { firstName: "Juan", lastName: "Perez", email: "juan@example.com" } }, null, 2);
        if (type === "PCT") return JSON.stringify({ customer: { email: "juan@example.com", phoneNumber: "1123456789", phoneNumberPrefix: "+54" } }, null, 2);
        if (type === "PIX") {
          if (direction === "origin") {
            return JSON.stringify({ successUrl: "https://yourapp.com/success", failedUrl: "https://yourapp.com/failed", customer: { firstName: "Maria", lastName: "Silva", email: "maria@example.com", documentNumber: "12345678901" } }, null, 2);
          }
          return JSON.stringify({ keyType: "email", key: "maria@example.com" }, null, 2);
        }
        if (type === "CRYPTO") return JSON.stringify({ address: "<WALLET_ADDRESS>", network: "<NETWORK>", asset: "<ASSET>" }, null, 2);
        if (type === "WEBPAY") return JSON.stringify({ successUrl: "https://yourapp.com/success", failedUrl: "https://yourapp.com/failed" }, null, 2);
        return "{}";
      }

      function normalizeRails() {
        const originType = $("originType").value.toUpperCase();
        const destinationType = $("destinationType").value.toUpperCase();
        $("originNodeJson").value = defaultNodeJson(originType, "origin");
        $("destinationNodeJson").value = defaultNodeJson(destinationType, "destination");
        renderRoute();
      }

      function applyPreset() {
        const preset = $("preset").value;
        if (preset === "ars-cvu-topup") {
          $("type").value = "TOPUP_ACCOUNT";
          $("purchaseCurrency").value = "ARS";
          $("currency").value = "ARS";
          $("originType").value = "CVU";
          $("destinationType").value = "ACCOUNT";
        } else if (preset === "ars-pct-topup") {
          $("type").value = "TOPUP_ACCOUNT";
          $("purchaseCurrency").value = "ARS";
          $("currency").value = "ARS";
          $("originType").value = "PCT";
          $("destinationType").value = "ACCOUNT";
        } else if (preset === "pix-brl-to-clp") {
          $("type").value = "TOPUP_ACCOUNT";
          $("purchaseCurrency").value = "BRL";
          $("currency").value = "CLP";
          $("originType").value = "PIX";
          $("destinationType").value = "ACCOUNT";
        }
        normalizeRails();
      }

      function renderRoute() {
        const source = ($("purchaseCurrency").value || "").toUpperCase();
        const target = ($("currency").value || "").toUpperCase();
        const origin = $("originType").value;
        const destination = $("destinationType").value;
        $("route").textContent = "Route preview: " + source + " " + origin + " -> " + destination + " -> " + target;
      }

      function buildPayload() {
        const type = ($("type").value || "").trim().toUpperCase();
        const purchaseCurrency = ($("purchaseCurrency").value || "").trim().toUpperCase();
        const currency = ($("currency").value || "").trim().toUpperCase();
        const originType = ($("originType").value || "").trim().toUpperCase();
        const destinationType = ($("destinationType").value || "").trim().toUpperCase();

        const originNodeKey = nodeKeyByType[originType];
        const destinationNodeKey = nodeKeyByType[destinationType];

        if (!originNodeKey) throw new Error("Unsupported origin type: " + originType);
        if (!destinationNodeKey) throw new Error("Unsupported destination type: " + destinationType);

        const originNode = JSON.parse(($("originNodeJson").value || defaultNodeJson(originType, "origin")).trim() || "{}");
        const destinationNode = JSON.parse(($("destinationNodeJson").value || defaultNodeJson(destinationType, "destination")).trim() || "{}");

        const origin = {
          type: originType,
          currency: (($("originCurrency").value || purchaseCurrency).trim() || purchaseCurrency).toUpperCase(),
          [originNodeKey]: originNode
        };

        const destination = {
          type: destinationType,
          currency: (($("destinationCurrency").value || currency).trim() || currency).toUpperCase(),
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
        const base = (($("baseUrl").value || "https://api.conomyhq.com/sandbox").trim() || "https://api.conomyhq.com/sandbox").replace(/\/+$/, "");
        const body = JSON.stringify(payload).replace(/'/g, "'\\\\''");
        return [
          "curl --request POST \\",
          "  --url '" + base + "/payments' \\",
          "  --header 'Authorization: Bearer <TOKEN>' \\",
          "  --header 'x-api-key: <API_KEY>' \\",
          "  --header 'Content-Type: application/json' \\",
          "  --data '" + body + "'"
        ].join("\\n");
      }

      $("toggleAdvanced").addEventListener("click", () => {
        state.showAdvanced = !state.showAdvanced;
        $("advanced").classList.toggle("hidden", !state.showAdvanced);
        $("toggleAdvanced").textContent = state.showAdvanced ? "Hide advanced" : "Show advanced";
      });

      $("applyPreset").addEventListener("click", applyPreset);
      $("defaults").addEventListener("click", normalizeRails);
      $("purchaseCurrency").addEventListener("input", renderRoute);
      $("currency").addEventListener("input", renderRoute);
      $("originType").addEventListener("change", renderRoute);
      $("destinationType").addEventListener("change", renderRoute);

      $("generate").addEventListener("click", () => {
        try {
          $("error").textContent = "";
          const payload = buildPayload();
          $("generatedJson").value = JSON.stringify(payload, null, 2);
          $("generatedCurl").value = buildCurl(payload);
        } catch (error) {
          $("error").textContent = error instanceof Error ? error.message : "Unable to generate payload.";
        }
      });

      fillSelect($("type"), paymentTypeOptions);
      fillSelect($("originType"), originRailOptions);
      fillSelect($("destinationType"), destinationRailOptions);
      applyPreset();
      renderRoute();
    </script>
  </body>
</html>`;

const transactionBuilderBlock = createComponent({
  componentId: "transaction-builder-block",
  initialState: {},
  action: async () => ({}),
  render: async () => (
    <block>
      <vstack>
        <markdown content="### Transaction Builder" />
        <markdown content="Interactive builder with dropdown UX to generate `JSON` and `cURL` for `POST /payments` (no execution)." />
        <webframe aspectRatio={1.45} source={{ url: `${PUBLIC_ENDPOINT}/builder` }} />
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

    return new Response("Not found", { status: 404 });
  },
  events: {
    installation_setup: async () => {},
    space_installation_setup: async () => {}
  },
  components: [transactionBuilderBlock]
});
