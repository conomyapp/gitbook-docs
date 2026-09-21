# Design Spec — conomy-docs (Astro + Starlight migration)

**Spec ID:** 2026-05-14-conomy-docs-astro-starlight
**Status:** PROPOSED
**Author:** elvira-hancock (UX/UI design agent)
**Date:** 2026-05-14
**Scope:** New public documentation site — full visual design, component definitions, and Starlight theming. Replaces GitBook. No changes to `src/` of any Next.js app.
**Handoff target:** tony-montana

---

## 0. Brief summary

Migrate the Conomy developer documentation from GitBook to Astro + Starlight. The result must look like a Conomy product — not a generic Starlight default — by mapping the `@conomyhq/ui-kit` token system onto Starlight's CSS custom property layer. The site covers five content sections (Home, Quickstart, Payments, Compliance, API Reference) and embeds Scalar for the OpenAPI explorer. Custom MDX components replace every GitBook block tag (`{% hint %}`, `{% tabs %}`, `{% columns %}`, `{% content-ref %}`).

This spec covers:
1. Global token + theme mapping (Starlight CSS vars → ui-kit tokens)
2. Landing page (`/`) visual layout
3. Global docs layout (topbar, sidebar, content area, right TOC, pagination)
4. API Reference page with Scalar integration
5. Five custom MDX components
6. Typography, spacing, and accent-indigo usage rules
7. Accessibility annotations
8. UX Laws applied
9. Open questions
10. Developer handoff brief

---

## 1. Context reader findings

### Existing content structure (from SUMMARY.md)

```
/                          → Landing (README.md)
/home/concepts             → Entity map (Mermaid diagram)
/home/countries            → Table
/home/currencies           → Table
/home/supported-identity-document-types
/home/financial-institutions
/home/glossary             → Multi-table reference
/quickstart/introduction   → Step list (6 steps)
/quickstart/going-live     → Checklist
/payments/payment-structure → Fields table + lifecycle table
/payments/payment-types/*  → 7 sub-pages
/payments/origins-and-destinations/* → 24 sub-pages
/payments/transaction-status
/payments/creating-payments
/payments/handling-webhooks
/compliance/*              → 5 sub-pages
/api-reference/            → Scalar embed (Payment API.yaml)
```

### GitBook custom tags in use (must be replaced with MDX components)

- `{% hint style="info|warning|danger" %}` — callout box
- `{% tabs %}` / `{% tab title="..." %}` — horizontal tab set
- `{% columns %}` / `{% column %}` — multi-column grid
- `{% content-ref url label %}` — link card
- Code fences with titles (standard Starlight syntax, but needs title-bar styling)
- Mermaid diagrams (Starlight supports natively via `@astrojs/mermaid`)

### Design system tokens (from ui-kit brief)

```
--color-bg-light:       #FCFCFC
--color-fg:             #0D0D0D
--color-fg-secondary:   #6E6E80
--color-fg-disabled:    #BDBDBD
--color-stroke:         #E5E5E5
--color-primary:        #0D0D0D
--color-primary-hover:  #1F1F1F
--color-accent:         #4F46E5   ← indigo, very sparse
--color-success:        #22C55E
--color-warning:        #F59E0B
--color-error:          #EF4444
--font-family:          'Clash Grotesk Variable', system-ui, sans-serif
```

---

## 2. Starlight CSS variable mapping

Starlight uses a set of `--sl-*` custom properties. Every property MUST be overridden to match the ui-kit palette. Do NOT use hardcoded hex values in component CSS — reference the ui-kit tokens below and re-expose them as `--sl-*` overrides in `src/styles/custom.css`.

### Full mapping table

| Starlight variable | Light value | Dark value | Notes |
|---|---|---|---|
| `--sl-color-white` | `#FCFCFC` | `#0D0D0D` | Swapped in dark mode |
| `--sl-color-black` | `#0D0D0D` | `#FCFCFC` | |
| `--sl-color-gray-1` | `#1F1F1F` | `#E5E5E5` | Headings |
| `--sl-color-gray-2` | `#3D3D3D` | `#BDBDBD` | Body text |
| `--sl-color-gray-3` | `#6E6E80` | `#9E9E9E` | Secondary text |
| `--sl-color-gray-4` | `#BDBDBD` | `#6E6E80` | Disabled, placeholders |
| `--sl-color-gray-5` | `#E5E5E5` | `#3D3D3D` | Borders, strokes |
| `--sl-color-gray-6` | `#F5F5F5` | `#1F1F1F` | Sidebar bg, code bg |
| `--sl-color-gray-7` | `#FCFCFC` | `#0D0D0D` | Page bg |
| `--sl-color-accent-low` | `#EEF2FF` | `#1E1B4B` | Accent bg tint |
| `--sl-color-accent` | `#4F46E5` | `#818CF8` | Primary accent (indigo) |
| `--sl-color-accent-high` | `#312E81` | `#C7D2FE` | Accent on dark |
| `--sl-color-text` | `#0D0D0D` | `#FCFCFC` | Body text |
| `--sl-color-text-invert` | `#FCFCFC` | `#0D0D0D` | |
| `--sl-color-text-accent` | `#4F46E5` | `#818CF8` | Active nav links |
| `--sl-color-bg` | `#FCFCFC` | `#0D0D0D` | Page background |
| `--sl-color-bg-nav` | `#FCFCFC` | `#0D0D0D` | Topbar background |
| `--sl-color-bg-sidebar` | `#F5F5F5` | `#111111` | Sidebar background |
| `--sl-color-bg-inline-code` | `#F0F0F0` | `#1A1A1A` | `inline code` bg |
| `--sl-color-bg-accent` | `#4F46E5` | `#4F46E5` | Active badge, selected item |
| `--sl-color-hairline-light` | `#E5E5E5` | `#2A2A2A` | Dividers |
| `--sl-color-hairline-dark` | `#BDBDBD` | `#3D3D3D` | |

### Typography overrides

```css
/* src/styles/custom.css */
:root {
  --sl-font: 'Clash Grotesk Variable', system-ui, -apple-system, sans-serif;
  --sl-font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --sl-text-xs:   0.75rem;   /* 12px */
  --sl-text-sm:   0.875rem;  /* 14px */
  --sl-text-base: 1rem;      /* 16px */
  --sl-text-lg:   1.125rem;  /* 18px */
  --sl-text-xl:   1.25rem;   /* 20px */
  --sl-text-2xl:  1.5rem;    /* 24px */
  --sl-text-3xl:  1.875rem;  /* 30px */
  --sl-text-4xl:  2.25rem;   /* 36px */
  --sl-text-5xl:  3rem;      /* 48px */
}
```

### Accent-indigo usage rules (STRICT)

The indigo accent `#4F46E5` is used in EXACTLY five contexts and NOWHERE else:

1. Sidebar active item — left border indicator (3px solid) + text weight 600
2. Tab underline — 2px solid on the active tab label
3. Interactive focus ring — `outline: 2px solid var(--sl-color-accent)` at 2px offset
4. Inline hyperlinks — color only (no underline at rest; underline on hover)
5. "Active badge" / version pill background

Everything else uses the black-to-gray scale. Status (success / warning / error) uses the semantic tokens only in callout components.

---

## 3. Landing page (`/`)

### 3.1 Layout wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR (sticky, 56px tall)                                       │
│ [Conomy logo]          [Search]     [GitHub ↗]  [API Ref ↗]    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ HERO (full-width, 480px tall on desktop, 320px on mobile)        │
│                                                                  │
│  conomy_hq                          ← display/5xl, weight 700    │
│  Build and operate account and      ← text/xl, --color-fg-sec    │
│  payment flows with a single API.                                │
│                                                                  │
│  [Get started  →]   [API Reference  ↗]                          │
│  (primary btn)      (ghost btn)                                  │
│                                                                  │
│  subtle grid lines bg (CSS only, 1px #E5E5E5, 40px spacing)     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FEATURE CARDS — 3-column grid (1-col on mobile, 3-col ≥ 1024px) │
│                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │ ph:identification │ │ ph:currency-eth  │ │ ph:shield-check  ││
│  │ (24px, fg-sec)   │ │                  │ │                  ││
│  │                  │ │                  │ │                  ││
│  │ Identity &       │ │ Multi-rail       │ │ Compliance       ││
│  │ Onboarding       │ │ Payments         │ │ Controls         ││
│  │                  │ │                  │ │                  ││
│  │ Manage orgs,     │ │ PIX, CVU, SPEI,  │ │ Review gate,     ││
│  │ operators, and   │ │ SWIFT, ACH, and  │ │ KYC tiers, and   ││
│  │ per-identity     │ │ 20+ more rails   │ │ document upload  ││
│  │ permission scopes│ │ in one API.      │ │ built in.        ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SECTION DIVIDER — hairline + "Start here" label (fg-secondary)   │
│                                                                  │
│ START HERE — 3-column grid of ContentRef cards                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │ ph:rocket        │ │ ph:key           │ │ ph:graph         ││
│  │ Quickstart       │ │ Authentication   │ │ Payment structure││
│  │ Complete sandbox │ │ Get credentials  │ │ Fields, types,   ││
│  │ flow in < 1 hr   │ │ and call your    │ │ and lifecycle    ││
│  │                  │ │ first endpoint.  │ │ in one diagram.  ││
│  │ → /quickstart    │ │ → /api-ref/auth  │ │ → /payments/...  ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COMMON FLOWS — Tab set (3 tabs)                                  │
│                                                                  │
│  [Collect funds]  [Send funds]  [Charge customers]              │
│   ─────────────                                                 │
│   (active: 2px indigo underline, weight 600)                    │
│                                                                  │
│  Tab content area (min-height 140px):                           │
│  Short description paragraph + 1 ContentRef link card           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ EXPLORE — 3-column grid of ContentRef cards                     │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │ Payment rails    │ │ Compliance       │ │ API Reference    ││
│  │ /payments/o-d    │ │ /compliance      │ │ /api-reference   ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (simple, no mega-nav)                                     │
│ © 2026 Conomy HQ · Questions? hola@conomyhq.com                 │
│ Left: Conomy wordmark (sm, fg-secondary)                         │
│ Right: [Docs] [API Reference] [Status ↗]                        │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Hero detail

- Background: `--sl-color-bg` (`#FCFCFC` light, `#0D0D0D` dark)
- Decorative grid: CSS `background-image: repeating-linear-gradient(...)` using `--sl-color-hairline-light` at 1px, 40px grid. Opacity 0.4 so it is a subtle texture, not a dominant element.
- Headline: Clash Grotesk Variable, weight 700, size `clamp(2rem, 5vw, 3.5rem)`, color `--sl-color-text`
- Subline: size `--sl-text-xl`, color `--sl-color-gray-3`, max-width 540px
- Primary button: bg `#0D0D0D`, text `#FCFCFC`, radius 6px, height 40px, padding 0 20px. Hover: bg `#1F1F1F`. No indigo — this is a product action, not a decoration.
- Ghost button: border 1px `--sl-color-gray-5`, text `--sl-color-text`, radius 6px. Hover: bg `--sl-color-gray-6`.
- Both buttons: font Clash Grotesk, weight 500, size `--sl-text-sm`

### 3.3 Feature cards

- Container: `border: 1px solid var(--sl-color-hairline-light)`, border-radius 8px, padding 24px, bg `var(--sl-color-bg)`
- No shadow. No colored accent borders — this is monochrome.
- Icon: Phosphor icon at 24px, color `var(--sl-color-gray-3)`
- Title: weight 600, size `--sl-text-base`, color `--sl-color-text`, margin-top 16px
- Body: size `--sl-text-sm`, color `--sl-color-gray-3`, line-height 1.6

### 3.4 Start here and Explore grids

Reuse the same `<ContentRef>` component (defined in Section 5.4). On the landing page these are rendered in a 3-column CSS grid without the sidebar present.

---

## 4. Global docs layout

### 4.1 Layout wireframe (docs pages, desktop ≥ 1280px)

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR (sticky, z-index 50, 56px)                               │
│ ┌───────────┬──────────────────────────────┬───────────────────┐│
│ │ Logo 20px │   Search bar (Pagefind)       │ Dark toggle  API ↗││
│ └───────────┴──────────────────────────────┴───────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌────────────┬──────────────────────────────┬───────────────────┐
│ SIDEBAR    │ CONTENT AREA                 │ RIGHT TOC         │
│ 260px      │ max-width 720px, centered    │ 220px             │
│ fixed left │ padding 0 32px              │ sticky top 80px   │
│            │                              │                   │
│ Section    │ # Page title                 │ On this page      │
│ headers    │                              │ ──────────────    │
│ (weight 5, │ Prose content                │ · Section 1       │
│ uppercase, │                              │ · Section 2       │
│ size xs,   │ Tables, code blocks,         │ · Section 3       │
│ fg-sec)    │ callouts, diagrams           │                   │
│            │                              │ (active item:     │
│ Nav items  │                              │ indigo left-bar   │
│ (size sm,  │ ─────────────────────────── │ + weight 600)     │
│ weight 4)  │ PAGINATION                   │                   │
│            │ [← Prev page] [Next page →]  │                   │
│ Active:    │                              │                   │
│ indigo     │                              │                   │
│ 3px left   │                              │                   │
│ border +   │                              │                   │
│ weight 600 │                              │                   │
│            │                              │                   │
└────────────┴──────────────────────────────┴───────────────────┘
```

### 4.2 Topbar spec

- Height: 56px
- Background: `var(--sl-color-bg-nav)`, `border-bottom: 1px solid var(--sl-color-hairline-light)`
- Logo: Conomy wordmark SVG (provided by brand). Height 20px. Links to `/`.
- Search: Starlight's built-in Pagefind search. Style the button to match: bg `var(--sl-color-gray-6)`, border `var(--sl-color-gray-5)`, placeholder text `var(--sl-color-gray-3)`, radius 6px, size sm.
- Dark mode toggle: Phosphor `ph:moon` / `ph:sun`, 18px, color `var(--sl-color-gray-3)`. No label.
- "API Reference" link: plain text link, size sm, weight 500, color `var(--sl-color-gray-2)`. Arrow icon `ph:arrow-up-right` at 14px inline. Opens `/api-reference` (same-site, but distinct layout).
- GitHub link (optional): `ph:github-logo` icon only, 20px, color `var(--sl-color-gray-3)`.

### 4.3 Sidebar spec

- Width: 260px on desktop (≥ 1024px); collapses to hamburger drawer on mobile (<1024px)
- Background: `var(--sl-color-bg-sidebar)` — `#F5F5F5` light, `#111111` dark
- Border-right: `1px solid var(--sl-color-hairline-light)`
- Padding: 24px 16px
- Vertical scroll with custom scrollbar (thin, 4px, `var(--sl-color-gray-5)` thumb)

**Section groups** (Home, Quickstart, Payments, Compliance, API Reference):
- Label: uppercase, weight 600, size `--sl-text-xs`, color `var(--sl-color-gray-4)`, letter-spacing 0.08em
- Top margin between groups: 24px
- Collapsible via Starlight's `collapsed` prop. Default open for the current section.

**Nav items**:
- Size: `--sl-text-sm` (14px)
- Weight: 400 by default
- Color: `var(--sl-color-gray-2)`
- Hover: color `var(--sl-color-text)`, bg `var(--sl-color-gray-6)`, radius 4px
- Active (current page):
  - `border-left: 3px solid var(--sl-color-accent)` — this is one of the five permitted indigo uses
  - `font-weight: 600`
  - `color: var(--sl-color-text)`
  - `padding-left: calc(original - 3px)` to compensate for border-left width
- Nested items (sub-pages): indent 16px, size `--sl-text-xs`, same hover/active rules

**Mobile drawer**:
- Opens on hamburger (`ph:list`, 20px) in topbar
- Full-height overlay from left, width min(280px, 85vw)
- Background same as sidebar
- Close button: `ph:x` top-right

### 4.4 Content area spec

- Max-width: 720px
- Padding: 48px 32px (desktop), 24px 16px (mobile)
- Centered within the available space between sidebar and right TOC

**Prose typography**:

| Element | Size | Weight | Color | Line-height |
|---|---|---|---|---|
| H1 | `--sl-text-4xl` | 700 | `--sl-color-text` | 1.1 |
| H2 | `--sl-text-2xl` | 600 | `--sl-color-text` | 1.2 |
| H3 | `--sl-text-xl` | 600 | `--sl-color-text` | 1.3 |
| H4 | `--sl-text-lg` | 600 | `--sl-color-gray-2` | 1.3 |
| Body | `--sl-text-base` | 400 | `--sl-color-gray-2` | 1.7 |
| Caption | `--sl-text-sm` | 400 | `--sl-color-gray-3` | 1.5 |
| `code` | `--sl-text-sm` | 400 | `--sl-color-gray-1` | — |

**Tables**:
- `border: 1px solid var(--sl-color-hairline-light)`, border-radius 6px
- `th`: bg `var(--sl-color-gray-6)`, weight 600, size sm
- Row hover: bg `var(--sl-color-gray-6)` at 50% opacity
- Striping: NO striping — use hover only. Striping adds visual noise on dense tables (Occam's Razor applied).

**Code blocks** (standard Starlight Shiki):
- Theme light: `github-light` → tokens mapped to ui-kit grays
- Theme dark: `github-dark`
- Custom override: bg `var(--sl-color-gray-6)`, radius 8px
- Line numbers: off by default
- Copy button: top-right, `ph:copy` icon, 14px

### 4.5 Right TOC spec

- Width: 220px, sticky top 80px (below topbar)
- Only visible ≥ 1280px
- Label: "On this page" — uppercase, weight 600, size xs, fg-secondary
- Items: size xs (12px), weight 400, color `var(--sl-color-gray-3)`
- Active item (intersection-observer driven): indigo left-bar 2px + weight 500 — this is the second permitted indigo use (same axis as sidebar, both are navigation position indicators)
- Hover: color `var(--sl-color-text)`

### 4.6 Pagination

- Rendered below content, above footer
- Two cards side by side (`flex justify-between`)
- Each card: border 1px `var(--sl-color-hairline-light)`, radius 6px, padding 16px 20px
- Label: "Previous" / "Next" in xs, fg-secondary
- Page title: weight 600, size base
- Arrow icon: `ph:arrow-left` / `ph:arrow-right`, 16px, fg-secondary
- Hover: border-color `var(--sl-color-gray-4)`

---

## 5. API Reference page (Scalar integration)

### 5.1 Layout wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR (same sticky topbar as docs, 56px)                       │
│ [Conomy logo]     [← Back to docs]     [Dark toggle]            │
│                   (replaces search on this page)                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SCALAR CONTAINER (height: calc(100vh - 56px), width: 100%)      │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │  Scalar's native layout (sidebar + content + try-it panel) │  │
│ │  No Starlight sidebar overlaid on this route               │  │
│ │  Scalar sidebar: left (240px), Scalar content: flex-1      │  │
│ │  Scalar theme: customized via CSS vars (see 5.2)           │  │
│ └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Scalar theme overrides

Scalar exposes its own CSS custom properties. Override them to match the ui-kit palette. These go in `/api-reference/scalar.css`:

```css
/* Scalar light mode */
.light-mode {
  --scalar-color-1: #0D0D0D;
  --scalar-color-2: #3D3D3D;
  --scalar-color-3: #6E6E80;
  --scalar-background-1: #FCFCFC;
  --scalar-background-2: #F5F5F5;
  --scalar-background-3: #EBEBEB;
  --scalar-border-color: #E5E5E5;
  --scalar-color-accent: #4F46E5;
  --scalar-font: 'Clash Grotesk Variable', system-ui, sans-serif;
  --scalar-font-code: 'JetBrains Mono', ui-monospace, monospace;
}

/* Scalar dark mode */
.dark-mode {
  --scalar-color-1: #FCFCFC;
  --scalar-color-2: #BDBDBD;
  --scalar-color-3: #6E6E80;
  --scalar-background-1: #0D0D0D;
  --scalar-background-2: #111111;
  --scalar-background-3: #1F1F1F;
  --scalar-border-color: #2A2A2A;
  --scalar-color-accent: #818CF8;
  --scalar-font: 'Clash Grotesk Variable', system-ui, sans-serif;
  --scalar-font-code: 'JetBrains Mono', ui-monospace, monospace;
}
```

### 5.3 Starlight layout for `/api-reference`

- Use Starlight's `template: splash` or a custom `layout` that suppresses the sidebar and right TOC.
- The Scalar component fills `height: calc(100vh - 56px)` so it is fully viewport-filling below the topbar.
- Route: `/api-reference` → renders `src/pages/api-reference.astro` (not a `.md` content file).
- The OpenAPI spec file is served as a static asset from `public/Payment-API.yaml` (copied from `.gitbook/assets/Payment API.yaml`).
- "Back to docs" link in topbar (replaces search on this single page) uses `ph:arrow-left` icon + "Docs" text.

---

## 6. Custom MDX components

All five components must be authored as Astro/React components inside `src/components/docs/`. They accept no external data — they are pure presentational. They use CSS custom properties from the Starlight token layer (which are in turn mapped to ui-kit tokens per Section 2).

### 6.1 `<Hint type="info|warning|danger|tip">`

**Purpose:** Replaces `{% hint style="..." %}` GitBook blocks.

**Visual spec:**

```
┌─────────────────────────────────────────────────────────────┐
│  [icon] Title (optional)                                    │
│                                                             │
│  Body content (slot)                                        │
└─────────────────────────────────────────────────────────────┘
```

| Type | Left border color | Icon | Icon color | Bg |
|---|---|---|---|---|
| `info` | `#4F46E5` | `ph:info` | `#4F46E5` | `#EEF2FF` light / `#1E1B4B` dark |
| `warning` | `#F59E0B` | `ph:warning` | `#F59E0B` | `#FFFBEB` light / `#1C1400` dark |
| `danger` | `#EF4444` | `ph:warning-octagon` | `#EF4444` | `#FEF2F2` light / `#1F0000` dark |
| `tip` | `#22C55E` | `ph:lightbulb` | `#22C55E` | `#F0FDF4` light / `#001F0A` dark |

Note: The `info` type uses indigo — this IS one of the five permitted accent uses only insofar as it is a semantic/system signal (not a decoration). The border is the semantic anchor, not arbitrary indigo color use.

**Structure:**
```
border-left: 4px solid <type-color>
border-radius: 0 6px 6px 0
padding: 12px 16px
background: <type-bg>
display: flex
gap: 12px

Icon: 20px, top-aligned
Body: size sm, line-height 1.6, color --sl-color-text
```

**Props:**
```typescript
interface HintProps {
  type: 'info' | 'warning' | 'danger' | 'tip';
  title?: string; // optional bold label above body
}
```

### 6.2 `<Tabs>` / `<TabItem label="...">`

**Purpose:** Replaces `{% tabs %}` / `{% tab title="..." %}` GitBook blocks.

**Visual spec:**

```
┌────────────────────────────────────────────────────────────────┐
│ [Tab A]  [Tab B]  [Tab C]                                      │
│ ────────                                                       │
│ (active: 2px indigo underline, weight 600, color --sl-text)    │
│ (inactive: no underline, weight 400, color --sl-gray-3)        │
├────────────────────────────────────────────────────────────────┤
│ border-top: 1px solid --sl-color-hairline-light                │
│                                                                │
│ Tab panel content (slot, padding: 16px 0)                      │
└────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Only the active panel is rendered (not just hidden). This avoids layout shift and is correct for non-React Astro content.
- Tabs are keyboard navigable: Left/Right arrows move between tabs, Enter/Space activates.
- `role="tablist"`, `role="tab"`, `role="tabpanel"` applied.
- No scroll on tab row — if tabs overflow, the row scrolls horizontally on mobile (overflow-x: auto).

**Props:**
```typescript
interface TabsProps {
  children: TabItemProps[];
}
interface TabItemProps {
  label: string;
  children: ReactNode;
}
```

**Indigo usage:** The 2px tab underline on the active item is the second permitted indigo use. Weight change from 400 to 600 provides redundant non-color differentiation (Accessibility Law).

### 6.3 `<Columns>` / `<Column>`

**Purpose:** Replaces `{% columns %}` / `{% column %}` GitBook blocks.

**Visual spec:**

```
┌───────────────────┬───────────────────┬───────────────────┐
│ Column 1 content  │ Column 2 content  │ Column 3 content  │
│ (slot)            │ (slot)            │ (slot)            │
└───────────────────┴───────────────────┴───────────────────┘
```

**Layout rules:**
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px`
- No border, no shadow — pure layout primitive
- On mobile (< 640px): single column (the `minmax` handles this automatically)
- Columns do NOT have equal-height forced — natural content height

**Props:**
```typescript
interface ColumnsProps {
  fullWidth?: boolean; // default false — if true, column spans full content area without max-width cap
}
```

The `fullWidth` prop mirrors the GitBook `{% columns fullWidth="true" %}` usage found in `README.md` and `payment-structure.md`.

### 6.4 `<ContentRef href label icon?>`

**Purpose:** Replaces `{% content-ref url %}` GitBook link cards.

**Visual spec:**

```
┌──────────────────────────────────────────────────────────────┐
│  [ph:file-text or custom icon]  Label text         [ph:arrow-right]│
└──────────────────────────────────────────────────────────────┘
```

Exact styling:
```
border: 1px solid var(--sl-color-hairline-light)
border-radius: 6px
padding: 12px 16px
display: flex
align-items: center
gap: 12px
text-decoration: none
color: var(--sl-color-text)
font-weight: 500
font-size: --sl-text-sm
transition: border-color 150ms ease, background 150ms ease

hover:
  border-color: var(--sl-color-gray-4)
  background: var(--sl-color-gray-6)

Left icon: 18px, color var(--sl-color-gray-3)
Right arrow (ph:arrow-right): 14px, color var(--sl-color-gray-3), margin-left: auto
```

**Props:**
```typescript
interface ContentRefProps {
  href: string;
  label: string;
  icon?: string; // Phosphor icon name, default: 'ph:file-text'
  description?: string; // optional second line, size xs, fg-secondary
}
```

When `description` is present, the card grows to two lines and the right arrow aligns to center.

### 6.5 `<CodeBlock title?>`

**Purpose:** Wraps Shiki-rendered code blocks with an optional title bar. Starlight's built-in code blocks already support `title` via the `title` meta attribute on fenced blocks (e.g., ` ```bash title="Install" `). This component is only needed for MDX usage where the title needs to be passed as a prop.

**Visual spec:**

```
┌──────────────────────────────────────────────────────────────┐
│ TITLE BAR (only if title prop provided)                      │
│ bg: var(--sl-color-gray-5), padding: 8px 16px               │
│ text: size xs, weight 500, fg-secondary                      │
│ border-radius: 8px 8px 0 0                                   │
├──────────────────────────────────────────────────────────────┤
│ CODE AREA (Shiki slot)                                       │
│ border-radius: 0 0 8px 8px (if title) or 8px (if no title)  │
│ bg: var(--sl-color-gray-6)                                   │
│ padding: 16px                                                │
│ overflow-x: auto                                             │
└──────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface CodeBlockProps {
  title?: string;
  language?: string; // hint for Shiki, default 'text'
}
```

Note: In most Starlight/MDX usage the developer should prefer the native fenced block with `title=""` meta attribute (which Starlight handles natively) over this component. Reserve this component for programmatic MDX contexts.

---

## 7. Responsive breakpoints

| Breakpoint | Width | Layout changes |
|---|---|---|
| Mobile | < 640px | Full-width content, no sidebar, no right TOC. Hamburger opens sidebar drawer. |
| Tablet | 640px – 1023px | Full-width content (no sidebar), no right TOC. Hamburger for sidebar. |
| Desktop-sm | 1024px – 1279px | Sidebar visible (260px), content flexible, no right TOC |
| Desktop | ≥ 1280px | Full 3-column: sidebar (260px) + content (max 720px) + right TOC (220px) |

Landing page grid breakpoints:
- Feature cards: 1-col (< 640px), 2-col (640px–1023px), 3-col (≥ 1024px)
- Start Here / Explore grids: same breakpoints

---

## 8. Quickstart page — step indicator component

The `/quickstart/introduction` page lists 6 ordered steps. Design a step progress indicator at the top of the page (above the prose content) to give the reader a sense of where they are in the sequence.

### Wireframe

```
──●──────────●──────────●──────────●──────────●──────────●──
  1          2          3          4          5          6
  Auth       Org        Users      Accounts   Top-up     Withdraw
```

**Spec:**
- Horizontal line connector: 1px `var(--sl-color-hairline-light)`
- Step circle: 24px, border 1px `var(--sl-color-gray-4)`, bg `var(--sl-color-bg)`, number in xs weight 500
- Active step: bg `#0D0D0D`, text `#FCFCFC`, no border
- Completed step: bg `var(--sl-color-bg)`, border `var(--sl-color-gray-5)`, checkmark `ph:check` 12px in `var(--sl-color-gray-3)`
- Label: xs, fg-secondary, max-width 64px, text-align center, margin-top 4px
- Mobile: compress to icon-only dots (no labels, no numbers), 8px circles

This component is ONLY used on the quickstart introduction page — it is NOT a global navigation element. It communicates sequence, not current global location.

---

## 9. Mermaid diagram styling

Starlight supports Mermaid via `@astrojs/mermaid`. Override Mermaid theme variables to match the ui-kit palette.

```javascript
// astro.config.mjs — mermaid config
mermaid({
  theme: 'base',
  themeVariables: {
    primaryColor: '#F5F5F5',
    primaryTextColor: '#0D0D0D',
    primaryBorderColor: '#E5E5E5',
    lineColor: '#6E6E80',
    secondaryColor: '#EBEBEB',
    tertiaryColor: '#F5F5F5',
    fontFamily: "'Clash Grotesk Variable', system-ui, sans-serif",
    fontSize: '14px',
  }
})
```

Diagrams in dark mode use the `dark` Mermaid theme — Starlight applies this automatically when `data-theme="dark"` is set on `html`.

---

## 10. Accessibility annotations

### Focus management

- All interactive elements (nav items, tabs, buttons, links) have a visible focus ring: `outline: 2px solid var(--sl-color-accent); outline-offset: 2px`. This is the third permitted indigo use.
- Focus ring is NEVER suppressed with `outline: none` without a replacement.
- Mobile drawer focus: When the sidebar drawer opens, focus moves to the first nav item inside it. When it closes, focus returns to the hamburger trigger.

### Keyboard navigation

| Component | Keyboard behavior |
|---|---|
| Sidebar nav | Tab to navigate items; Enter to follow link |
| Tabs component | Tab to reach tab list; Left/Right arrows to switch tabs; Enter/Space to activate |
| ContentRef cards | Tab to reach; Enter to follow link |
| Hint callouts | Non-interactive (no keyboard interaction needed) |
| Scalar embed | Scalar handles its own keyboard navigation internally |

### ARIA roles

| Element | Role / attribute |
|---|---|
| Sidebar `<nav>` | `role="navigation" aria-label="Docs navigation"` |
| Right TOC `<nav>` | `role="navigation" aria-label="On this page"` |
| Tab set | `role="tablist"` → `role="tab" aria-selected aria-controls` → `role="tabpanel" aria-labelledby` |
| Hint callout | `role="note"` (info/tip) or `role="alert"` (warning/danger) |
| Scalar iframe | `title="API Reference"` |
| Mobile hamburger | `aria-label="Open navigation"`, `aria-expanded` |
| Search | `aria-label="Search documentation"` |

### Color contrast

All text/background combinations must meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text and UI components):

| Pairing | Ratio estimate | Status |
|---|---|---|
| `#0D0D0D` on `#FCFCFC` | ~19:1 | PASS |
| `#6E6E80` on `#FCFCFC` | ~5.4:1 | PASS (AA) |
| `#6E6E80` on `#F5F5F5` | ~5.0:1 | PASS (AA) |
| `#BDBDBD` on `#FCFCFC` | ~2.0:1 | FAIL — do NOT use `--color-fg-disabled` as body text; use only for decorative placeholders |
| `#4F46E5` on `#FCFCFC` | ~5.0:1 | PASS (AA) |
| `#FCFCFC` on `#4F46E5` | ~5.0:1 | PASS (AA, for button text on indigo bg) |
| `#F59E0B` on `#FCFCFC` | ~2.8:1 | FAIL for small text — use only as border/icon accent beside body text |

Hint callout text: Use `var(--sl-color-text)` (not the semantic border color) for body text inside all callouts. The border/bg conveys the type; the text does not need to be colored.

### Skip link

A "Skip to content" link as the first focusable element in the DOM:
```html
<a href="#main-content" class="skip-link">Skip to content</a>
```
Visually hidden until focused. On focus: appears at top-center, bg `#0D0D0D`, text `#FCFCFC`, padding 8px 16px, z-index 100.

### Screen reader hints for Scalar

The Scalar embed is an embedded application that manages its own accessibility. Add a `<p>` visually-hidden above the iframe:

```
"Interactive API reference. Use the embedded application to explore endpoints and make test requests."
```

---

## 11. Laws of UX applied

Five laws drive the key design decisions in this spec:

### Law 1 — Jakob's Law

> Users spend most of their time on other sites, so they expect your site to work the same way as the sites they already know.

**Application:** The 3-column docs layout (sidebar + content + TOC) matches the mental model established by Stripe Docs, ReadMe, and Tailwind CSS docs — all dominant references in the developer documentation genre. Deviating from this pattern would impose a learning cost on every developer who visits. We use it as-is with Conomy visual tokens applied on top.

### Law 2 — Aesthetic-Usability Effect

> Users often perceive aesthetically pleasing design as design that's more usable.

**Application:** The monochrome palette with Clash Grotesk Variable and the restrained indigo accent creates a refined first impression. A beautiful docs site signals that the underlying API is well-engineered. The grid decoration in the hero and the generous whitespace in content pages communicate craft without requiring color noise.

### Law 3 — Miller's Law

> The average person can only keep 7 (±2) items in working memory at a time.

**Application:** The sidebar groups items into 5 sections (Home, Quickstart, Payments, Compliance, API Reference) — well within the cognitive limit. Within each section, items are grouped with clear headers. The Payments section's 24 sub-pages (origins/destinations) are nested one level deep under a collapsible group so they do not overwhelm the initial view.

### Law 4 — Serial Position Effect

> Users have a propensity to best remember the first and last items in a series.

**Application:** The quickstart step indicator places "Auth" (step 1) and "Withdraw" (step 6) at the anchors. The Getting started grid on the landing page leads with "Quickstart" (the desired first action) and closes with "API Reference" (the power user endpoint). Both the first and last slots carry high-value navigational weight.

### Law 5 — Occam's Razor

> Among competing hypotheses, the one with the fewest assumptions should be selected.

**Application:** Zero box shadows, zero gradients, zero illustrations in the initial layout. Every decorative element must justify its cognitive cost. The CSS grid in the hero is the single decorative gesture — it grounds the page without adding conceptual complexity. Tables have no row striping — hover-only interaction is sufficient. Feature cards have no colored borders — the icon carries sufficient typological distinction.

---

## 12. Open questions (require human input)

| ID | Question | Urgency | Default if no answer |
|---|---|---|---|
| OQ-1 | Does the Conomy wordmark SVG exist as a light + dark variant? The topbar needs both. | HIGH | Use text fallback "Conomy" in Clash Grotesk weight 700 |
| OQ-2 | Should the `/api-reference` route live within the Starlight layout or as a fully separate Astro page? Affects how the topbar is shared. | HIGH | Separate Astro page with manually replicated topbar |
| OQ-3 | Is `@astrojs/mermaid` approved for production, or should diagrams be pre-rendered as SVG? The Mermaid JS bundle is ~200KB. | MEDIUM | Use `@astrojs/mermaid` (lazy-loaded) and revisit if Lighthouse score drops below 85 |
| OQ-4 | Should the site support English (`en`) in addition to Spanish content? The current GitBook content is English. | MEDIUM | No i18n for now — single language (English), next-intl not required for a static docs site |
| OQ-5 | Is there a paid Scalar plan or are we using open-source? Some Scalar features (auth, analytics) require a paid plan. | MEDIUM | Use Scalar open-source (`@scalar/api-reference`) |
| OQ-6 | Copy approval: "Build and operate account and payment flows with a single API" — approved for hero? | LOW | Proceed with this copy; flag for brand review |
| OQ-7 | What is the canonical support email for the docs footer? `README.md` has `hola@conomyhq.com`. | LOW | Use `hola@conomyhq.com` |
| OQ-8 | Should the search (Pagefind) index the API Reference page? Scalar content is client-rendered and will not be indexed by Pagefind's static crawl. | LOW | Exclude `/api-reference` from Pagefind index |
| OQ-9 | Dark mode: should it default to OS preference (`prefers-color-scheme`) or always default to light? | LOW | Follow OS preference |

---

## 13. Developer handoff brief (for tony-montana)

### Build order (dependency graph)

Build in this exact order to minimize blocking:

#### Phase 1 — Foundation (no UI dependencies)

1. **Astro + Starlight scaffold** — `npm create astro@latest` with Starlight, configure `astro.config.mjs` with content collections matching SUMMARY.md structure.
2. **Font loading** — Load Clash Grotesk Variable from `public/fonts/` (not CDN — self-hosted for privacy and performance). Add `@font-face` in `src/styles/global.css`.
3. **Token layer** — Create `src/styles/custom.css` with the full `--sl-*` mapping from Section 2 of this spec. Import it in `astro.config.mjs` as `customCss`.
4. **Static asset migration** — Copy `.gitbook/assets/Payment API.yaml` to `public/Payment-API.yaml`.

#### Phase 2 — Layout components

5. **Topbar override** — Override Starlight's `Header` component via `components.Header` in the Starlight config. Implement per Section 4.2.
6. **Sidebar config** — Define `sidebar` array in `astro.config.mjs` matching the SUMMARY.md structure exactly. Use `collapsed: true` on sub-groups (payment types, origins/destinations) by default.
7. **Skip link** — Add as first child of `<body>` in the custom `Head` component.

#### Phase 3 — MDX components (all parallel)

8. **`<Hint>`** — `src/components/docs/Hint.astro`
9. **`<Tabs>` / `<TabItem>`** — `src/components/docs/Tabs.astro` + `TabItem.astro`. Use Preact or Vanilla JS for tab switching state (avoid React dependency for a static site).
10. **`<Columns>` / `<Column>`** — `src/components/docs/Columns.astro` + `Column.astro`
11. **`<ContentRef>`** — `src/components/docs/ContentRef.astro`
12. **`<CodeBlock>`** — `src/components/docs/CodeBlock.astro`
13. Register all components in `src/content.config.ts` (or MDX global components config) so they are available without importing in every `.md` file.

#### Phase 4 — Content migration

14. **Convert GitBook `.md` files** — Run a script to replace `{% hint %}`, `{% tabs %}`, `{% columns %}`, `{% content-ref %}` tags with the MDX component equivalents. Script lives in `scripts/migrate-gitbook.ts`.
15. **SUMMARY.md → sidebar config** — The sidebar in `astro.config.mjs` must mirror SUMMARY.md exactly. Manual sync required after migration.
16. **Mermaid diagrams** — Install `@astrojs/mermaid`, add to integrations, apply theme config from Section 9.

#### Phase 5 — Special pages

17. **Landing page** (`src/pages/index.astro`) — Custom Astro page using no Starlight layout. Uses the `<Columns>`, `<ContentRef>`, `<Tabs>` components. Full layout per Section 3.
18. **API Reference page** (`src/pages/api-reference.astro`) — Astro page with no Starlight sidebar. Loads `@scalar/api-reference` client-side with spec from `/Payment-API.yaml`. Applies Scalar CSS overrides from Section 5.2.
19. **Quickstart step indicator** — `src/components/docs/StepIndicator.astro`, used only in `/quickstart/introduction.mdx`.

#### Phase 6 — Polish + QA

20. **Dark mode** — Verify all `--sl-*` mappings render correctly in dark mode. Test via OS preference and the manual toggle.
21. **Mobile audit** — Test sidebar drawer, tab overflow, column collapse at 375px viewport.
22. **Pagefind** — Run build to generate search index. Verify `/api-reference` is excluded.
23. **Accessibility** — Run `axe` against landing page, one docs page, and the API reference page.

### BFF / API endpoints needed

None. This is a static documentation site. The only external dependency is `public/Payment-API.yaml` (static file, no runtime fetch required — Scalar loads it as a local asset).

### Test scenarios for luca-brasi (QA)

| Scenario | Expected |
|---|---|
| Navigate to `/` | Landing page renders without sidebar; hero, feature cards, tabs, and footer all visible |
| Click "Get started" button | Navigates to `/quickstart/introduction` |
| Open sidebar on mobile (375px) | Drawer slides in from left, focus moves to first nav item |
| Tab through topbar | Logo → Search → Dark toggle → API Reference; all reachable, all have focus ring |
| Navigate to a quickstart step page | Active item in sidebar has 3px indigo left-border |
| Activate tabs via keyboard | Left/Right arrows switch tabs; panel content updates |
| View a page with `{% hint style="warning" %}` | Amber left border, warning icon, body text in `--sl-color-text` (not amber) |
| View a page with `{% columns %}` | 3-column grid on desktop; single column on 375px |
| Navigate to `/api-reference` | Topbar shows "← Docs" instead of search; Scalar loads and fills viewport |
| Switch to dark mode | All elements update; no hardcoded hex colors remain; Scalar sidebar matches dark theme |
| Pagefind search | Results appear; API reference page does NOT appear in results |
| Mermaid diagram renders | `home/concepts` page shows entity-map flowchart in Conomy palette |
| Keyboard only navigation through Hint callout | Callout is non-interactive; no focus traps |
| Scalar "Try it" panel | Can send a test request to `api.conomyhq.com/sandbox` with a bearer token |

---

## Appendix A — File structure for the new site

```
conomy-docs/
├── astro.config.mjs           # Starlight config, sidebar, integrations
├── src/
│   ├── styles/
│   │   ├── custom.css         # --sl-* token mapping (Section 2)
│   │   └── global.css         # @font-face for Clash Grotesk Variable
│   ├── components/
│   │   └── docs/
│   │       ├── Hint.astro
│   │       ├── Tabs.astro
│   │       ├── TabItem.astro
│   │       ├── Columns.astro
│   │       ├── Column.astro
│   │       ├── ContentRef.astro
│   │       ├── CodeBlock.astro
│   │       └── StepIndicator.astro
│   ├── pages/
│   │   ├── index.astro        # Landing page (no Starlight layout)
│   │   └── api-reference.astro # Scalar embed (no Starlight sidebar)
│   └── content/
│       └── docs/
│           ├── home/          # concepts, countries, currencies, glossary…
│           ├── quickstart/    # introduction, steps 1-6, going-live
│           ├── payments/      # payment-structure, types/*, origins-and-destinations/*
│           └── compliance/    # README, operation-levels, limits, docs, review-flow
├── public/
│   ├── fonts/
│   │   └── ClashGrotesk-Variable.woff2
│   └── Payment-API.yaml       # copied from .gitbook/assets/
└── scripts/
    └── migrate-gitbook.ts     # one-time migration script
```

---

## Appendix B — Accent indigo usage inventory (complete)

To prevent indigo-creep, here is the exhaustive list of every location where `#4F46E5` (or `var(--sl-color-accent)`) may appear:

1. Sidebar active nav item — left border 3px
2. Right TOC active item — left border 2px
3. Tabs active tab — bottom underline 2px
4. Focus ring — outline 2px on all interactive elements
5. Hint[type="info"] — left border 4px and icon color
6. Inline hyperlinks — text color (no underline at rest)

That is exactly 6 contexts. Any other use of indigo not listed here is a spec violation. The developer should treat any additional indigo use as a bug.

Note: In dark mode, `--sl-color-accent` resolves to `#818CF8` (a lighter indigo) for sufficient contrast on dark backgrounds. This is still the accent — just the dark-mode variant.
