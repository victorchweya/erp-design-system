# ERP Design System

FTF design-system foundations and component documentation, built with Vue 3, TypeScript, PrimeVue, and Tailwind CSS. The ERP theme is a standalone local preset.

## Getting started

```sh
npm install
npm run dev
```

Open `/` or `/components` to reach `/components/core-elements/button`. All 38 pages in Core elements and Forms are available from the sidebar. Pages include live examples, copyable Vue source, usage guidance, accessibility notes, and key props where applicable.

- **Core elements:** Button, SplitButton, SpeedDial, Avatar, Badge, Card, Chip, Divider, Tag, Toolbar, and Skeleton.
- **Forms:** text and numeric inputs, password and code entry, tags, autocomplete, selects and lists, checkboxes and radio buttons, toggles, dates, sliders, ratings, Knob, colour selection, FileUpload, Editor, Inplace, field layout, and validation.

The sidebar and routes use the same [component page registry](src/data/component-pages.ts). Each page loads independently; Quill only loads when the Editor example is opened. [ComponentDoc.vue](src/components/docs/ComponentDoc.vue) provides the shared documentation layout while each example owns its local state.

Examples do not send form values, passwords, codes, or files to a backend. FileUpload uses `customUpload` to report local selections. Form validation uses `@primevue/forms` with a small custom resolver. Editor uses Quill; the installed PrimeVue 5 component is deprecated, so prefer Textarea when formatted content is unnecessary.

Tag and Badge support seven native severities: primary, secondary, success, info, warn, danger, and contrast. `help` is supported by Button, not Tag or Badge. Inputs use `invalid` for error styling rather than severity.

Open `/foundations/color` for the colour foundations, including brand colours, semantic roles, light/dark comparisons, palette ramps, default Tailwind shadows, and the token table.

Open `/foundations/typography` for Rubik specimens, recommended heading and body combinations, weights, and Tailwind classes.

Open `/foundations/spacing` for the spacing scale, padding and gap examples, PrimeVue control sizes, radii, breakpoints, and page containers.

Open `/foundations/icons` for PrimeIcons imports, sizes, semantic colours, button examples, accessibility guidance, and the full searchable icon library. All examples use the installed `@primeicons/vue` package.

General (`/general`) and the Motion foundation page are still placeholders.

Light mode is the default. The header's sun/moon button switches modes and remembers the selection in this browser. PrimeVue and Tailwind share the `.app-dark` selector.

## Colour system

FTF colour values live in one shared palette. The documentation, Tailwind utilities, and PrimeVue mappings consume these sources:

| File | Purpose |
| --- | --- |
| [palette.ts](src/theme/erp-theme/foundations/palette.ts) | Raw FTF ramps and brand aliases |
| [color-tokens.ts](src/theme/erp-theme/foundations/color-tokens.ts) | Semantic roles, foreground/background pairs, and documentation data |
| [theme.ts](src/theme/erp-theme/foundations/theme.ts) | Maps the colour roles to PrimeVue semantic and component tokens |
| [tailwind.config.js](tailwind.config.js) | Exposes the shared theme values as Tailwind utilities |

The four core brand colours are:

| Name | Palette token | Hex | Brand utility |
| --- | --- | --- | --- |
| Kale | `green.500` | `#1E4A35` | `bg-kale` |
| Lime | `olive.300` | `#C2CE86` | `bg-lime` |
| Carrot | `orange.500` | `#D78228` | `bg-carrot` |
| Tamarind | `brown.800` | `#4C352B` | `bg-tamarind` |

The eight secondary brand accents follow the brand guideline's order. Cream remains `yellow.100` (`#FFF5DF`). Neutrals and feedback colours belong to the wider UI palette.

Use semantic utilities for interface roles:

```html
<div class="bg-surface text-color">Body content</div>
<p class="text-muted">Supporting text</p>
<div class="bg-primary text-primary-contrast">Primary fill</div>
<div class="bg-warn text-warn-contrast">Warning fill</div>
<div class="bg-danger text-danger-contrast">Danger fill</div>
```

Semantic utilities adapt to light and dark mode. Success shares the primary colours; warning uses the orange ramp. Pair coloured backgrounds with their matching contrast text. Carrot uses dark contrast text on filled controls; use `text-warn` for warning text on the content background.

Fixed brand colours and raw FTF ramps keep their values across modes. Raw ramp utilities use the `ftf` namespace, for example `bg-ftf-green-500` and `bg-ftf-yellow-100`. The corresponding PrimeVue palette token is `ftf.green.500`, exposed as `--p-ftf-green-500`.

## Typography

Typography uses Rubik and Tailwind's default type scale without custom size utilities. [typography.ts](src/theme/erp-theme/foundations/typography.ts) keeps a local copy of the default sizes, line heights, and the four UI weights for the standalone PrimeVue preset and documentation. The integration check verifies these against Tailwind's installed defaults and resolved configuration.

PrimeVue font sizes reference `font.size.*` tokens and weights reference `font.weight.*`. Default controls use `text-base` (16px), small controls use `text-sm` (14px), and large controls use `text-lg` (18px). Component line heights retain PrimeVue's layout; Tailwind text utilities include their default line heights. The root font size stays at the browser default so rem units respect user preferences.

## Spacing

Spacing uses Tailwind v3's default scale. [spacing.ts](src/theme/erp-theme/foundations/spacing.ts) keeps the matching values local for the standalone preset and documentation; the integration check verifies them against the installed Tailwind defaults. Shared form fields, lists, navigation, overlays, buttons, cards, tags, tables, and dialogs reference `spacing.*` tokens. Existing component-specific 18px padding and the Stepper's 26px alignment margin remain unchanged.

Use Tailwind utilities such as `p-6` and `gap-4`. In ordinary CSS, the matching PrimeVue variables are `var(--p-spacing-6)` and `var(--p-spacing-4)`. In CSS processed by Tailwind v3, use `theme('spacing.6')`. Breakpoints and existing page gutters are unchanged.

The existing radius mapping is documented on the page: PrimeVue `border.radius.xs` matches `rounded-sm` (2px), and `border.radius.sm` matches `rounded` (4px). The `md`, `lg`, and `xl` names match across both systems.

DataTables have a rounded outer frame in the shared preset: 6px (`border.radius.md`) for small tables and 8px (`border.radius.lg`) for default and large tables. The frame includes headers, footers, and pagination; inner cell borders stay square.

The shared wide container is `max-w-8xl`, capped at 90rem (1440px at a 16px root), matching FTF ecommerce. Its value lives in `spacing.ts`. Foundation pages use `max-w-7xl` and component pages use `max-w-screen-xl` (1280px). Container widths are separate from responsive breakpoints.

## Shared page navigation

[AnchorNav.vue](src/components/AnchorNav.vue) renders the “On this page” links. Pass an `items` array of `{ id, label }` and an `activeId` from [useActiveSection](src/composables/useActiveSection.ts). Each item ID must match a section's HTML ID.

Use the default vertical layout in the right sidebar and the `inline` prop for the mobile layout. Keep one scroll tracker per page and share its active ID between both instances. [ColorView.vue](src/views/foundations/ColorView.vue) shows the integration.

Smooth scrolling is set on `html` and respects reduced-motion preferences. Section `scroll-margin-top` controls the anchor offset beneath the fixed header.

## Project structure

- Theme tokens: `src/theme/erp-theme/`.
- Default font: Rubik, loaded from Google Fonts and set by the theme typography token.
- Brand assets: `src/assets/brand/logo.svg` (wordmark) and `src/assets/brand/symbol.svg` (symbol).
- Favicon: `public/favicon.svg`, a copy of the brand symbol.
- Global styles: `src/assets/styles/main.css`.
- Component pages: `src/views/components/`; examples and their copyable source: `src/components/docs/`.
- App shell: `src/layouts/`, adapted from the FTF sidebar and top app navigation.
- PrimeVue components are auto-imported in templates; `src/components.d.ts` is generated.
- PrimeIcons are SVG components from `@primeicons/vue`; import individual icons as needed.
- `src/theme/aura-reference/` is reference material, excluded from application compilation.

The preset uses `@primeuix/styled`; it does not depend on `@primeuix/themes` or import a packaged preset.

## Verification

Choose checks appropriate to the change:

- `npm run type-check` for Vue and TypeScript changes.
- `npm run test:unit -- --run` for unit tests; append a test path to target an affected suite.
- `npm run build-only` for a production build, or `npm run build` to include type-checking.

Follow [AGENTS.md](AGENTS.md) for testing guidance. Documentation-only changes do not require application tests. Run Playwright only when explicitly requested.
