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

const typeOptions = [
  { id: "TOPUP_ACCOUNT", label: "TOPUP_ACCOUNT" },
  { id: "WITHDRAWAL_ACCOUNT", label: "WITHDRAWAL_ACCOUNT" },
  { id: "REMITTANCE", label: "REMITTANCE" },
  { id: "PURCHASE", label: "PURCHASE" },
  { id: "P2P", label: "P2P" },
  { id: "COLLECT", label: "COLLECT" },
  { id: "FEE", label: "FEE" }
];

const nodeTypeOptions = [
  "ACCOUNT",
  "BANK_ACCOUNT",
  "CRYPTO",
  "PIX",
  "PCT",
  "CVU",
  "ETPAY",
  "FINTOC",
  "WEBPAY",
  "WOMPI",
  "PSE",
  "BANCOLOMBIA",
  "DAVIVIENDA",
  "DAVIPLATA",
  "NEQUI",
  "BREB",
  "SPEI",
  "ACH",
  "WIRE",
  "FEDNOW",
  "RTP",
  "SEPA",
  "FPE",
  "SWIFT",
  "PAGO_MOVIL"
].map((value) => ({ id: value, label: value }));

const presetOptions = [
  { id: "custom", label: "Custom" },
  { id: "ars-cvu-topup", label: "ARS top-up with CVU" },
  { id: "ars-pct-topup", label: "ARS top-up with PCT" },
  { id: "pix-brl-to-clp", label: "PIX BRL to CLP account" }
];

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
  const originNodeKey = nodeKeyByType[state.originType];
  const destinationNodeKey = nodeKeyByType[state.destinationType];

  if (!originNodeKey) {
    throw new Error(`Unsupported origin type: ${state.originType}`);
  }
  if (!destinationNodeKey) {
    throw new Error(`Unsupported destination type: ${state.destinationType}`);
  }

  const originNode = parseObjectJson(state.originNodeJson, "Origin node");
  const destinationNode = parseObjectJson(state.destinationNodeJson, "Destination node");

  const origin: Record<string, unknown> = {
    type: state.originType,
    currency: state.originCurrency || state.purchaseCurrency,
    [originNodeKey]: originNode
  };
  const destination: Record<string, unknown> = {
    type: state.destinationType,
    currency: state.destinationCurrency || state.currency,
    [destinationNodeKey]: destinationNode
  };

  if (state.originAmount) origin.amount = state.originAmount;
  if (state.destinationAmount) destination.amount = state.destinationAmount;

  return {
    identityId: state.identityId || "<IDENTITY_ID>",
    accountNumber: state.accountNumber || "<ACCOUNT_NUMBER>",
    type: state.type,
    product: `${state.purchaseCurrency}:${state.currency}`,
    purchaseAmount: state.purchaseAmount,
    purchaseCurrency: state.purchaseCurrency,
    currency: state.currency,
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
        <markdown content="### Conomy Transaction Builder (Generate only)" />
        <markdown content="Select values, click **Generate JSON and cURL**, then copy the output. This block does not execute payments." />

        <card title="Flow">
          <vstack>
            <select state="preset" options={presetOptions} placeholder="Choose preset" />
            <button label="Apply preset" onPress={{ action: "apply-preset" }} />
            <divider />
            <select state="type" options={typeOptions} placeholder="Payment type" />
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
            <select state="originType" options={nodeTypeOptions} placeholder="Origin type" />
            <textinput state="originCurrency" placeholder="Origin currency" />
            <textinput state="originAmount" placeholder="Origin amount (optional)" />
            <codeblock content={state.originNodeJson} state="originNodeJson" syntax="json" />
          </vstack>
        </card>

        <card title="Destination">
          <vstack>
            <select state="destinationType" options={nodeTypeOptions} placeholder="Destination type" />
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
