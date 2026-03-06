import { createComponent, createIntegration } from "@gitbook/runtime";

type MenuKey = "showPresetMenu" | "showTypeMenu" | "showOriginMenu" | "showDestinationMenu";

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
  showPresetMenu: boolean;
  showTypeMenu: boolean;
  showOriginMenu: boolean;
  showDestinationMenu: boolean;
  showAdvanced: boolean;
  generatedJson: string;
  generatedCurl: string;
  error: string;
};

const presetOptions = [
  { id: "ars-cvu-topup", label: "ARS top-up with CVU" },
  { id: "ars-pct-topup", label: "ARS top-up with PCT" },
  { id: "pix-brl-to-clp", label: "PIX BRL to CLP account" },
  { id: "custom", label: "Custom" }
];

const paymentTypeOptions = [
  { id: "TOPUP_ACCOUNT", label: "Top up account" },
  { id: "WITHDRAWAL_ACCOUNT", label: "Withdrawal account" },
  { id: "REMITTANCE", label: "Remittance" },
  { id: "PURCHASE", label: "Purchase" },
  { id: "P2P", label: "P2P" },
  { id: "COLLECT", label: "Collect" },
  { id: "FEE", label: "Fee" }
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

const supportedPaymentTypes = paymentTypeOptions.map((option) => option.id);
const supportedNodeTypes = Object.keys(nodeKeyByType);

const baseState: BuilderState = {
  preset: "ars-cvu-topup",
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
  showPresetMenu: false,
  showTypeMenu: false,
  showOriginMenu: false,
  showDestinationMenu: false,
  showAdvanced: false,
  generatedJson: "",
  generatedCurl: "",
  error: ""
};

function getPresetLabel(preset: string): string {
  return presetOptions.find((option) => option.id === preset)?.label || preset;
}

function getPaymentTypeLabel(type: string): string {
  return paymentTypeOptions.find((option) => option.id === type)?.label || type;
}

function resetMenus(state: BuilderState): BuilderState {
  return {
    ...state,
    showPresetMenu: false,
    showTypeMenu: false,
    showOriginMenu: false,
    showDestinationMenu: false
  };
}

function defaultNodeJson(type: string, direction: "origin" | "destination"): string {
  switch (type) {
    case "ACCOUNT":
      return '{\n  "accountNumber": "<ACCOUNT_NUMBER>"\n}';
    case "BANK_ACCOUNT":
      return '{\n  "accountNumber": "<ACCOUNT_NUMBER>",\n  "bankCode": "<BANK_CODE>"\n}';
    case "CVU":
      return '{\n  "customer": {\n    "firstName": "Juan",\n    "lastName": "Perez",\n    "email": "juan@example.com"\n  }\n}';
    case "PCT":
      return '{\n  "customer": {\n    "email": "juan@example.com",\n    "phoneNumber": "1123456789",\n    "phoneNumberPrefix": "+54"\n  }\n}';
    case "PIX":
      return direction === "origin"
        ? '{\n  "successUrl": "https://yourapp.com/success",\n  "failedUrl": "https://yourapp.com/failed",\n  "customer": {\n    "firstName": "Maria",\n    "lastName": "Silva",\n    "email": "maria@example.com",\n    "documentNumber": "12345678901"\n  }\n}'
        : '{\n  "keyType": "email",\n  "key": "maria@example.com"\n}';
    case "CRYPTO":
      return '{\n  "address": "<WALLET_ADDRESS>",\n  "network": "<NETWORK>",\n  "asset": "<ASSET>"\n}';
    case "WEBPAY":
      return '{\n  "successUrl": "https://yourapp.com/success",\n  "failedUrl": "https://yourapp.com/failed"\n}';
    default:
      return "{}";
  }
}

function withPreset(previous: BuilderState, preset: string): BuilderState {
  switch (preset) {
    case "ars-cvu-topup":
      return {
        ...previous,
        preset,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "ARS",
        currency: "ARS",
        originType: "CVU",
        originCurrency: "ARS",
        destinationType: "ACCOUNT",
        destinationCurrency: "ARS",
        originNodeJson: defaultNodeJson("CVU", "origin"),
        destinationNodeJson: defaultNodeJson("ACCOUNT", "destination"),
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    case "ars-pct-topup":
      return {
        ...previous,
        preset,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "ARS",
        currency: "ARS",
        originType: "PCT",
        originCurrency: "ARS",
        destinationType: "ACCOUNT",
        destinationCurrency: "ARS",
        originNodeJson: defaultNodeJson("PCT", "origin"),
        destinationNodeJson: defaultNodeJson("ACCOUNT", "destination"),
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    case "pix-brl-to-clp":
      return {
        ...previous,
        preset,
        type: "TOPUP_ACCOUNT",
        purchaseCurrency: "BRL",
        currency: "CLP",
        originType: "PIX",
        originCurrency: "BRL",
        destinationType: "ACCOUNT",
        destinationCurrency: "CLP",
        originNodeJson: defaultNodeJson("PIX", "origin"),
        destinationNodeJson: '{\n  "accountNumber": "<ACCOUNT_NUMBER_CLP>"\n}',
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
    default:
      return {
        ...previous,
        preset,
        error: "",
        generatedJson: "",
        generatedCurl: ""
      };
  }
}

function parseObjectJson(text: string, label: string): Record<string, unknown> {
  const value = JSON.parse(text);
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a valid JSON object.`);
  }
  return value as Record<string, unknown>;
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

  if (state.originAmount) {
    origin.amount = state.originAmount;
  }

  if (state.destinationAmount) {
    destination.amount = state.destinationAmount;
  }

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

    if (action.action === "toggle-menu") {
      const menu = action.menu as MenuKey | undefined;
      if (!menu) {
        return { state };
      }

      const closed = resetMenus(state);
      return {
        state: {
          ...closed,
          [menu]: !state[menu]
        }
      };
    }

    if (action.action === "choose-option") {
      const field = action.field as keyof BuilderState | undefined;
      const value = String(action.value ?? "");

      if (!field) {
        return { state };
      }

      let nextState: BuilderState = {
        ...resetMenus(state),
        [field]: value,
        error: "",
        generatedJson: "",
        generatedCurl: ""
      } as BuilderState;

      if (field === "preset") {
        nextState = resetMenus(withPreset(nextState, value));
      }

      if (field === "type") {
        nextState.preset = "custom";
      }

      if (field === "originType") {
        const normalized = value.trim().toUpperCase();
        nextState.preset = "custom";
        nextState.originType = normalized;
        nextState.originNodeJson = defaultNodeJson(normalized, "origin");
      }

      if (field === "destinationType") {
        const normalized = value.trim().toUpperCase();
        nextState.preset = "custom";
        nextState.destinationType = normalized;
        nextState.destinationNodeJson = defaultNodeJson(normalized, "destination");
      }

      return { state: nextState };
    }

    if (action.action === "toggle-advanced") {
      return {
        state: {
          ...state,
          showAdvanced: !state.showAdvanced
        }
      };
    }

    if (action.action === "set-field") {
      const field = action.field as keyof BuilderState | undefined;
      const value = String(action.value ?? "");
      if (!field) return { state };

      return {
        state: {
          ...state,
          [field]: value,
          preset: ["type", "originType", "destinationType"].includes(field) ? "custom" : state.preset,
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
        <markdown content="### Transaction Builder" />
        <markdown content="Simple builder to generate `JSON` + `cURL` for `POST /payments` (no execution)." />

        <card title="1) Route setup">
          <vstack>
            <button
              label={`Preset: ${getPresetLabel(state.preset)} v`}
              onPress={{ action: "toggle-menu", menu: "showPresetMenu" }}
            />
            {state.showPresetMenu ? (
              <vstack>
                {presetOptions.map((option) => (
                  <button
                    label={option.label}
                    onPress={{ action: "choose-option", field: "preset", value: option.id }}
                  />
                ))}
              </vstack>
            ) : null}

            <button
              label={`Payment type: ${getPaymentTypeLabel(state.type)} v`}
              onPress={{ action: "toggle-menu", menu: "showTypeMenu" }}
            />
            {state.showTypeMenu ? (
              <vstack>
                {paymentTypeOptions.map((option) => (
                  <button
                    label={option.label}
                    onPress={{ action: "choose-option", field: "type", value: option.id }}
                  />
                ))}
              </vstack>
            ) : null}

            <textinput state="purchaseAmount" placeholder="Amount (purchaseAmount)" />
            <textinput state="purchaseCurrency" placeholder="Source currency (e.g. ARS)" />
            <textinput state="currency" placeholder="Settlement currency (e.g. CLP)" />
          </vstack>
        </card>

        <card title="2) Rails">
          <vstack>
            <button
              label={`Origin rail: ${state.originType} v`}
              onPress={{ action: "toggle-menu", menu: "showOriginMenu" }}
            />
            {state.showOriginMenu ? (
              <vstack>
                {originRailOptions.map((option) => (
                  <button
                    label={option}
                    onPress={{ action: "choose-option", field: "originType", value: option }}
                  />
                ))}
              </vstack>
            ) : null}

            <button
              label={`Destination rail: ${state.destinationType} v`}
              onPress={{ action: "toggle-menu", menu: "showDestinationMenu" }}
            />
            {state.showDestinationMenu ? (
              <vstack>
                {destinationRailOptions.map((option) => (
                  <button
                    label={option}
                    onPress={{ action: "choose-option", field: "destinationType", value: option }}
                  />
                ))}
              </vstack>
            ) : null}

            <markdown
              content={`Route preview: **${state.purchaseCurrency.toUpperCase()}** ${state.originType} -> ${state.destinationType} -> **${state.currency.toUpperCase()}**`}
            />
          </vstack>
        </card>

        <card title="3) Node payloads">
          <vstack>
            <markdown content={`**Origin node (${state.originType})**`} />
            <codeblock content={state.originNodeJson} state="originNodeJson" syntax="json" />
            <markdown content={`**Destination node (${state.destinationType})**`} />
            <codeblock content={state.destinationNodeJson} state="destinationNodeJson" syntax="json" />
          </vstack>
        </card>

        <button
          label={state.showAdvanced ? "Hide advanced fields" : "Show advanced fields"}
          onPress={{ action: "toggle-advanced" }}
        />

        {state.showAdvanced ? (
          <card title="Advanced (optional)">
            <vstack>
              <textinput state="identityId" placeholder="Identity ID" />
              <textinput state="accountNumber" placeholder="Internal account number" />
              <textinput state="baseUrl" placeholder="API base URL" />
              <textinput state="originCurrency" placeholder="Origin currency override" />
              <textinput state="destinationCurrency" placeholder="Destination currency override" />
              <textinput state="originAmount" placeholder="Origin amount override" />
              <textinput state="destinationAmount" placeholder="Destination amount override" />
              <textinput state="originType" placeholder="Origin type override (for rails not in menu)" />
              <textinput
                state="destinationType"
                placeholder="Destination type override (for rails not in menu)"
              />
            </vstack>
          </card>
        ) : null}

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
