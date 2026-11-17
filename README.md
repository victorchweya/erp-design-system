# ERP Design System

Vue 3 and PrimeVue component playground with a standalone ERP theme and Tailwind CSS.

```sh
npm install
npm run dev
```

Open `/` to try buttons, status messages, form controls, and a sortable table.
Light mode is the default. Use the sun/moon button in the header to switch modes. Your selection is remembered in this browser.

- Theme tokens: `src/theme/erp-theme/`.
- Default font: Rubik, loaded from Google Fonts and set by the theme typography token.
- Brand assets: `src/assets/brand/logo.svg` (wordmark) and `src/assets/brand/symbol.svg` (symbol).
- Favicon: `public/favicon.svg`, a copy of the brand symbol.
- Global styles: `src/assets/styles/main.css`.
- Component previews: `src/components/playground/`.
- PrimeVue components are auto-imported in templates; `src/components.d.ts` is generated.
- PrimeIcons are SVG components from `@primeicons/vue`; import individual icons as needed.
- `src/theme/aura-reference/` is reference material, excluded from application compilation.

Run `npm run build` for type-checking and a production build, or `npm run test:unit -- --run` for tests.
