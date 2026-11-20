# ERP Design System

FTF design-system foundations, component documentation, and UI blocks, built with Vue 3, TypeScript, PrimeVue, and Tailwind CSS. The ERP theme is a standalone local preset.

## Getting started

```sh
npm install
npm run dev
```

Open `/` or `/components` to reach `/components/core-elements/button`. All 98 component pages are available from the sidebar. Pages include live examples, copyable Vue source, usage guidance, accessibility notes, and key props where applicable.

- **Core elements:** Button, SplitButton, SpeedDial, Avatar, Badge, Card, Chip, Divider, Tag, Toolbar, and Skeleton.
- **Forms:** text and numeric inputs, password and code entry, tags, autocomplete, selects and lists, checkboxes and radio buttons, toggles, dates, sliders, ratings, Knob, colour selection, FileUpload, Editor, Inplace, field layout, and validation.
- **Data:** DataTable, DataView, OrderList, OrganizationChart, Paginator, PickList, Timeline, Tree, TreeTable, and VirtualScroller.
- **Panels:** Accordion, DeferredContent, Fieldset, Panel, ScrollArea, Splitter, Stepper, and Tabs. Card, Divider, and Toolbar retain their existing Core elements pages.
- **Overlays:** ConfirmDialog, ConfirmPopup, Dialog, Drawer, DynamicDialog, Popover, and Tooltip.
- **Menus:** Breadcrumb, CommandMenu, ContextMenu, Dock, MegaMenu, Menu, Menubar, Sidebar, and TieredMenu.
- **Messages:** Message and Toast.
- **Media:** Carousel, Compare, and Gallery, using local content and assets.
- **Misc:** AnimateOnScroll, BlockUI, Fluid, FocusTrap, MeterGroup, ProgressBar, ProgressSpinner, Ripple, ScrollTop, StyleClass, and Terminal. Existing Avatar, Badge, Chip, Skeleton, and Tag pages remain in Core elements.

The sidebar and routes use the same [component page registry](src/data/component-pages.ts). Each page loads independently; Quill only loads when the Editor example is opened. Existing page URLs are preserved. The component called Deferred in the reference is documented under its installed name, DeferredContent. [ComponentDoc.vue](src/components/docs/ComponentDoc.vue) provides the shared documentation layout while each example owns its local state.

ToastService and DialogService are registered once in `src/main.ts`, alongside ConfirmationService. Ripple is enabled in the PrimeVue configuration. Copy these service registrations when reusing the corresponding examples in another app. New PrimeVue 5 compound components have local preset tokens in `src/theme/erp-theme/`.

Examples do not send form values, passwords, codes, or files to a backend. FileUpload uses `customUpload` to report local selections. Form validation uses `@primevue/forms` with a small custom resolver. Editor uses Quill; the installed PrimeVue 5 component is deprecated, so prefer Textarea when formatted content is unnecessary.

Tag and Badge support seven native severities: primary, secondary, success, info, warn, danger, and contrast. `help` is supported by Button, not Tag or Badge. Inputs use `invalid` for error styling rather than severity.

Open `/foundations/color` for the colour foundations, including brand colours, semantic roles, light/dark comparisons, palette ramps, default Tailwind shadows, and the token table.

Open `/foundations/typography` for Rubik specimens, recommended heading and body combinations, weights, and Tailwind classes.

Open `/foundations/spacing` for the spacing scale, padding and gap examples, PrimeVue control sizes, radii, breakpoints, and page containers.

Open `/foundations/icons` for PrimeIcons imports, sizes, semantic colours, button examples, accessibility guidance, and the full searchable icon library. All examples use the installed `@primeicons/vue` package.

General (`/general`) covers setup: the PrimeVue configuration, services, Tailwind, token sources, and project checks.

Further foundation pages: Motion (`/foundations/motion`, tokens in `motion.ts`), Elevation (`/foundations/elevation`, app-shell and overlay layers in `layers.ts`), Writing, Accessibility, and Data visualization. Formatting includes the PrimeVue locale: weeks start on Monday and typed dates use day/month/year (`src/utils/locale.ts`). PrimeVue receives the locale and overlay z-index bases in `src/main.ts`. A global reduced-motion rule in `main.css` shortens transitions and animations.

## UI blocks

Open `/ui-blocks` for the pattern library. Categories are available from the sidebar, with working examples adapted to the local ERP theme and installed PrimeVue version.

| Category | Route | Patterns |
| --- | --- | --- |
| Order entry | `/ui-blocks/order-entry` | Customer, editable produce items, delivery, totals, and credit decisions |
| Section headers | `/ui-blocks/headers` | Primary action, status and actions, record detail |
| Navigation | `/ui-blocks/navigation` | AnchorNav article, record tabs |
| Feedback | `/ui-blocks/feedback` | Alert with action, error and retry, empty state |
| Tables | `/ui-blocks/tables` | Search/filter/pagination, selection and bulk actions |
| Drawers | `/ui-blocks/drawers` | Full/half/third/quarter widths, record details, validated edit form |
| Forms | `/ui-blocks/forms` | Supplier details with validation, explicit filter form |
| Authentication | `/ui-blocks/authentication` | Sign in, sign up, forgot/reset password, email verification, two-factor authentication |
| Modals | `/ui-blocks/modals` | ConfirmDialog, assignment Dialog |
| Popups | `/ui-blocks/popups` | ConfirmPopup, customer Popover, actions Menu |

The **ERP patterns** group adds larger page-level patterns:

| Category | Route | Patterns |
| --- | --- | --- |
| Page templates | `/ui-blocks/page-templates` | List → detail → edit, dashboard, settings |
| Documents | `/ui-blocks/documents` | Invoice, purchase order, delivery note, scoped print styles |
| Workflow | `/ui-blocks/workflow` | Approval flow with history, Stepper wizard, activity feed and audit log |
| Comments & attachments | `/ui-blocks/comments-attachments` | Comment thread, attachments, record side panel |
| Import & export | `/ui-blocks/import-export` | CSV import with mapping and validation report, export dialog |
| Users & permissions | `/ui-blocks/users-permissions` | User management, role permission matrix |
| Notifications | `/ui-blocks/notifications` | Notification centre, inbox, preferences |
| Scheduling | `/ui-blocks/scheduling` | Delivery calendar, status board |
| Loading states | `/ui-blocks/loading-states` | Table, record and dashboard skeletons, partial loading |
| Error pages | `/ui-blocks/error-pages` | 404, 403, 500, offline and maintenance |

Unknown URLs render the 404 page (`src/views/NotFoundView.vue`) through the router's catch-all route. Documents print on their own: the Print button marks the document and `main.css` hides everything else for that print only.

Each block has Preview and Code views with copyable source. Examples live in `src/components/blocks/`; the galleries import their source directly so the copied code matches the preview. Actions use local state and never send data to a backend. Connect them to application navigation and data when reusing the source. Section headers default to `h2` with 20px titles on small screens and 24px from `sm` upwards; the gallery passes `headingTag="h3"` to preserve its heading hierarchy.

[BlockDoc.vue](src/components/blocks/BlockDoc.vue) provides the shared gallery layout. [CodeExample.vue](src/components/CodeExample.vue) provides Preview/Code switching through its optional `tabbed` prop; existing foundation and component examples keep their stacked layout. The [block page registry](src/data/block-pages.ts) drives both routes and sidebar entries.

Tables combine search and status filters, reset pagination when filtering, and limit bulk updates to selected rows. Drawer and modal edits commit only on Save; cancellation leaves saved values intact. Supplier validation uses the installed `@primevue/forms` package. Dialogs use native focus trapping and restoration; drawers explicitly restore trigger focus. The article-navigation example reuses `AnchorNav` and `useActiveSection`, which must also be available when copying it into another project.

The order-entry page uses the full content width and switches to two columns based on its container size. Its Source file picker exposes all five colocated files. It demonstrates KES totals, stock-limited pack quantities, delivery details, and credit decisions. Draft, payment, dispatch, and approval actions are preview feedback only; no data is persisted or sent.

Authentication patterns also use `@primevue/forms`. They validate input locally without authenticating users, sending email, changing passwords, or verifying tokens and codes. Connect them to an authentication service and replace example anchor links with product routes. New-password examples use a 12-character minimum; sign-in does not impose that policy on existing passwords.

`ConfirmDialog` and `ConfirmPopup` use `useConfirm` and the `ConfirmationService` plugin, registered once in `src/main.ts`. When copying them to another application, add the plugin before mounting:

```ts
import ConfirmationService from 'primevue/confirmationservice'
app.use(ConfirmationService)
```

Each confirmation uses a per-instance group to keep callbacks isolated. ConfirmPopup also receives its trigger as `target` for positioning. Both initially focus the reject action and update local records only after acceptance. Popover and popup Menu use template refs and do not require the service.

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

PrimeVue font sizes reference `font.size.*` tokens and weights reference `font.weight.*`. Small and default controls use `text-sm` (14px); large controls use `text-base` (16px). Body text remains 16px. Component line heights retain PrimeVue's layout; Tailwind text utilities include their default line heights. The root font size stays at the browser default so rem units respect user preferences.

## Spacing

Control density is defined once in [controls.ts](src/theme/erp-theme/foundations/controls.ts): small uses 8px horizontal / 4px vertical padding, default 10px / 6px, and large 12px / 8px. Single-line heights are approximately 31px, 35px, and 42px at a 16px root, including borders. Icon-only button widths, dropdown triggers, number steppers, OTP cells, and input-group add-ons follow the same scale. Textareas, wrapping labels, and chip fields grow with content. Checkbox, radio, and switch retain their native size hierarchy.

Tags use 12px text with 2px vertical / 6px horizontal padding (approximately 22px high at a 16px root). Small controls and chips use 14px text with 12px icons (including chip remove icons). Default and large control icons use 16px. Badge sizes retain their existing scale.

PrimeVue 5.0.5 has incomplete size support for some trigger widths and nested chip inputs. The preset's shared CSS adapts those using the same control tokens; keep these adjustments in the preset rather than page-level padding or height overrides. Review all three sizes in **Foundations → Spacing → Control spacing**, including states, grouped controls, chips, light/dark mode, and narrow screens when changing density.

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
- UI blocks: `src/views/blocks/`; copyable block examples: `src/components/blocks/`.
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
