import { createComponent, createIntegration } from "@gitbook/runtime";

type BuilderState = {
  preset: string;
  baseUrl: string;
  type: string;
  identityId: string;
  accountNumber: string;
  purchaseAmount: string;
  purchaseCurrency: string;
  currency: string;
  originType: string;
  originCurrency: string;
  originAmount: string;
  originNodeJson: string;
  destinationType: string;
  destinationCurrency: string;
  destinationAmount: string;
  destinationNodeJson: string;
  generatedJson: string;
  generatedCurl: string;
  error: string;
};

const nodeKeyByType: Record<string, string> = {
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

const supportedPaymentTypes = [
  "TOPUP_ACCOUNT",
  "WITHDRAWAL_ACCOUNT",
  "REMITTANCE",
  "PURCHASE",
  "P2P",
  "COLLECT",
  "FEE"
];

const supportedNodeTypes = Object.keys(nodeKeyByType);

const baseState: BuilderState = {
  preset: "custom",
  baseUrl: "https://api.conomyhq.com/sandbox",
  type: "TOPUP_ACCOUNT",
  identityId: "",
  accountNumber: "",
  purchaseAmount: "100",
  purchaseCurrency: "ARS",
  currency: "ARS",
  originType: "CVU",
  originCurrency: "ARS",
  originAmount: "",
  originNodeJson:
    '{\n  "customer": {\n    "firstName": "Juan",\n    "lastName": "Perez",\n    "email": "juan@example.com"\n  }\n}',
  destinationType: "ACCOUNT",
  destinationCurrency: "ARS",
  destinationAmount: "",
  destinationNodeJson: '{\n  "accountNumber": "<ACCOUNT_NUMBER>"\n}',
  generatedJson: "",
  generatedCurl: "",
  error: ""
};

function parseObjectJson(text: string, label: string): Record<string, unknown> {
  const value = JSON.parse(text);
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a valid JSON object.`);
  }
  return value as Record<string, unknown>;
}

function withPreset(previous: BuilderState): BuilderState {
  switch (previous.preset) {
    case "ars-cvu-topup":
      return {
        ...previous,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "ARS",
        currency: "ARS",
        originType: "CVU",
        originCurrency: "ARS",
        destinationType: "ACCOUNT",
        destinationCurrency: "ARS",
        originNodeJson:
          '{\n  "customer": {\n    "firstName": "Juan",\n    "lastName": "Perez",\n    "email": "juan@example.com"\n  }\n}',
        destinationNodeJson: '{\n  "accountNumber": "<ACCOUNT_NUMBER>"\n}',
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    case "ars-pct-topup":
      return {
        ...previous,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "ARS",
        currency: "ARS",
        originType: "PCT",
        originCurrency: "ARS",
        destinationType: "ACCOUNT",
        destinationCurrency: "ARS",
        originNodeJson:
          '{\n  "customer": {\n    "email": "juan@example.com",\n    "phoneNumber": "1123456789",\n    "phoneNumberPrefix": "+54"\n  }\n}',
        destinationNodeJson: '{\n  "accountNumber": "<ACCOUNT_NUMBER>"\n}',
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    case "pix-brl-to-clp":
      return {
        ...previous,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "BRL",
        currency: "CLP",
        originType: "PIX",
        originCurrency: "BRL",
        destinationType: "ACCOUNT",
        destinationCurrency: "CLP",
        originNodeJson:
          '{\n  "successUrl": "https://yourapp.com/success",\n  "failedUrl": "https://yourapp.com/failed",\n  "customer": {\n    "firstName": "Maria",\n    "lastName": "Silva",\n    "email": "maria@example.com",\n    "documentNumber": "12345678901"\n  }\n}',
        destinationNodeJson: '{\n  "accountNumber": "<ACCOUNT_NUMBER_CLP>"\n}',
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    default:
      return {
        ...previous,
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
  }
}

function buildPayload(state: BuilderState): Record<string, unknown> {
  const type = (state.type || "").trim().toUpperCase();
  const purchaseCurrency = (state.purchaseCurrency || "").trim().toUpperCase();
  const currency = (state.currency || "").trim().toUpperCase();
  const originType = (state.originType || "").trim().toUpperCase();
  const destinationType = (state.destinationType || "").trim().toUpperCase();
  const originCurrency = (state.originCurrency || purchaseCurrency).trim().toUpperCase();
  const destinationCurrency = (state.destinationCurrency || currency).trim().toUpperCase();

  if (!supportedPaymentTypes.includes(type)) {
    throw new Error(
      `Unsupported payment type: ${type}. Use one of: ${supportedPaymentTypes.join(", ")}.`
    );
  }

  const originNodeKey = nodeKeyByType[originType];
  const destinationNodeKey = nodeKeyByType[destinationType];

  if (!originNodeKey) {
    throw new Error(
      `Unsupported origin type: ${originType}. Use one of: ${supportedNodeTypes.join(", ")}.`
    );
  }
  if (!destinationNodeKey) {
    throw new Error(
      `Unsupported destination type: ${destinationType}. Use one of: ${supportedNodeTypes.join(", ")}.`
    );
  }

  const originNode = parseObjectJson(state.originNodeJson, "Origin node");
  const destinationNode = parseObjectJson(state.destinationNodeJson, "Destination node");

  const origin: Record<string, unknown> = {
    type: originType,
    currency: originCurrency,
    [originNodeKey]: originNode
  };
  const destination: Record<string, unknown> = {
    type: destinationType,
    currency: destinationCurrency,
    [destinationNodeKey]: destinationNode
  };

  if (state.originAmount) origin.amount = state.originAmount;
  if (state.destinationAmount) destination.amount = state.destinationAmount;

  return {
    identityId: state.identityId || "<IDENTITY_ID>",
    accountNumber: state.accountNumber || "<ACCOUNT_NUMBER>",
    type,
    product: `${purchaseCurrency}:${currency}`,
    purchaseAmount: state.purchaseAmount,
    purchaseCurrency,
    currency,
    origins: [origin],
    destinations: [destination]
  };
}

function buildCurl(baseUrl: string, payload: Record<string, unknown>): string {
  const normalizedBase = (baseUrl || "https://api.conomyhq.com/sandbox").replace(/\/+$/, "");
  const body = JSON.stringify(payload);
  const escapedBody = body.replace(/'/g, "'\\''");

  return [
    "curl --request POST \\",
    `  --url '${normalizedBase}/payments' \\`,
    "  --header 'Authorization: Bearer <TOKEN>' \\",
    "  --header 'x-api-key: <API_KEY>' \\",
    "  --header 'Content-Type: application/json' \\",
    `  --data '${escapedBody}'`
  ].join("\n");
}

const transactionBuilderBlock = createComponent({
  componentId: "transaction-builder-block",
  initialState: baseState,
  action: async (previous: any, action: any) => {
    const state = previous.state as BuilderState;

    if (action.action === "apply-preset") {
      return { state: withPreset(state) };
    }

    if (action.action === "set-field") {
      const field = action.field as keyof BuilderState | undefined;
      const value = String(action.value ?? "");
      if (!field) return { state };

      return {
        state: {
          ...state,
          [field]: value,
          error: "",
          generatedJson: "",
          generatedCurl: ""
        }
      };
    }

    if (action.action === "generate") {
      try {
        const payload = buildPayload(state);
        const json = JSON.stringify(payload, null, 2);
        const curl = buildCurl(state.baseUrl, payload);
        return {
          state: {
            ...state,
            generatedJson: json,
            generatedCurl: curl,
            error: ""
          }
        };
      } catch (err) {
        return {
          state: {
            ...state,
            error: err instanceof Error ? err.message : "Unable to generate payload."
          }
        };
      }
    }

    return {};
  },
  render: async ({ state }) => (
    <block>
      <vstack>
        <markdown content="### Conomy Transaction Builder" />
        <markdown content="Generate-only block. Build request payloads and cURL for `POST /payments` without executing transactions." />

        <card title="Quick presets">
          <vstack>
            <markdown content="Use one click to preload common routes." />
            <button
              label="ARS top-up with CVU"
              onPress={{ action: "set-field", field: "preset", value: "ars-cvu-topup" }}
            />
            <button
              label="ARS top-up with PCT"
              onPress={{ action: "set-field", field: "preset", value: "ars-pct-topup" }}
            />
            <button
              label="PIX BRL to CLP account"
              onPress={{ action: "set-field", field: "preset", value: "pix-brl-to-clp" }}
            />
            <button label="Apply selected preset" onPress={{ action: "apply-preset" }} />
          </vstack>
        </card>

        <card title="Transaction setup">
          <vstack>
            <markdown content="**Payment type**" />
            <button
              label="TOPUP_ACCOUNT"
              onPress={{ action: "set-field", field: "type", value: "TOPUP_ACCOUNT" }}
            />
            <button
              label="WITHDRAWAL_ACCOUNT"
              onPress={{ action: "set-field", field: "type", value: "WITHDRAWAL_ACCOUNT" }}
            />
            <button
              label="REMITTANCE"
              onPress={{ action: "set-field", field: "type", value: "REMITTANCE" }}
            />
            <button
              label="PURCHASE"
              onPress={{ action: "set-field", field: "type", value: "PURCHASE" }}
            />
            <textinput state="type" placeholder="Type (e.g. TOPUP_ACCOUNT)" />
            <divider />
            <textinput state="identityId" placeholder="Identity ID" />
            <textinput state="accountNumber" placeholder="Internal account number" />
            <textinput state="purchaseAmount" placeholder="Amount (purchaseAmount)" />
            <textinput state="purchaseCurrency" placeholder="Source currency (e.g. ARS)" />
            <textinput state="currency" placeholder="Settlement currency (e.g. CLP)" />
            <textinput state="baseUrl" placeholder="API base URL" />
          </vstack>
        </card>

        <card title="Origin">
          <vstack>
            <markdown content="**Quick origin types**" />
            <button label="CVU" onPress={{ action: "set-field", field: "originType", value: "CVU" }} />
            <button label="PCT" onPress={{ action: "set-field", field: "originType", value: "PCT" }} />
            <button label="PIX" onPress={{ action: "set-field", field: "originType", value: "PIX" }} />
            <button
              label="ACCOUNT"
              onPress={{ action: "set-field", field: "originType", value: "ACCOUNT" }}
            />
            <button
              label="CRYPTO"
              onPress={{ action: "set-field", field: "originType", value: "CRYPTO" }}
            />
            <textinput
              state="originType"
              placeholder="Origin type (e.g. CVU, PIX, CRYPTO, ACCOUNT)"
            />
            <textinput state="originCurrency" placeholder="Origin currency" />
            <textinput state="originAmount" placeholder="Origin amount (optional)" />
            <codeblock content={state.originNodeJson} state="originNodeJson" syntax="json" />
          </vstack>
        </card>

        <card title="Destination">
          <vstack>
            <markdown content="**Quick destination types**" />
            <button
              label="ACCOUNT"
              onPress={{ action: "set-field", field: "destinationType", value: "ACCOUNT" }}
            />
            <button
              label="BANK_ACCOUNT"
              onPress={{ action: "set-field", field: "destinationType", value: "BANK_ACCOUNT" }}
            />
            <button
              label="CRYPTO"
              onPress={{ action: "set-field", field: "destinationType", value: "CRYPTO" }}
            />
            <button
              label="PIX"
              onPress={{ action: "set-field", field: "destinationType", value: "PIX" }}
            />
            <textinput
              state="destinationType"
              placeholder="Destination type (e.g. ACCOUNT, BANK_ACCOUNT, CRYPTO)"
            />
            <textinput state="destinationCurrency" placeholder="Destination currency" />
            <textinput state="destinationAmount" placeholder="Destination amount (optional)" />
            <codeblock
              content={state.destinationNodeJson}
              state="destinationNodeJson"
              syntax="json"
            />
          </vstack>
        </card>

        <button label="Generate JSON and cURL" onPress={{ action: "generate" }} />

        {state.error ? <markdown content={`**Validation error:** ${state.error}`} /> : null}

        <card title="Supported values">
          <vstack>
            <markdown content={`**Payment types**: \`${supportedPaymentTypes.join("`, `")}\``} />
            <markdown content={`**Node types**: \`${supportedNodeTypes.join("`, `")}\``} />
          </vstack>
        </card>

        <card title="Generated JSON">
          <codeblock content={state.generatedJson || "{}"} syntax="json" />
        </card>

        <card title="Generated cURL">
          <codeblock content={state.generatedCurl || "# Generate first"} syntax="bash" />
        </card>
      </vstack>
    </block>
  )
});

export default createIntegration({
  events: {
    installation_setup: async () => {},
    space_installation_setup: async () => {}
  },
  components: [transactionBuilderBlock]
});
