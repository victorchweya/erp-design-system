# Agent instructions

This repository builds a PrimeVue design system with Vue 3, TypeScript, and Vite.

## Required skills and MCP

- Before Vue work, load and follow `vue-best-practices`, including its required references.
- Load these additional skills when relevant:
  - `vue-router-best-practices` for routing.
  - `vue-pinia-best-practices` for Pinia stores.
  - `vue-testing-best-practices` for Vue tests.
  - `vue-debug-guides` for Vue debugging.
  - `create-adaptable-composable` for reusable composables.
- For PrimeVue work, load `primevue:primevue-router` first, then the focused skill it selects.
- Use the PrimeVue MCP before implementing or changing PrimeVue components, setup, or theming. Query the relevant component APIs, examples, or guides; skills alone do not replace MCP lookup.
- Use the MCP's `validate_usage` tool to check changed PrimeVue component usage where supported. If the MCP is unavailable or lacks the needed information, state the limitation and consult official documentation without inventing APIs or tokens.
- Vue skills are installed globally under `~/.agents/skills/<skill-name>/SKILL.md`. PrimeVue skills come from the globally installed PrimeVue plugin; resolve their locations through the current session's skill catalog.
- Read the actual skill instructions rather than relying on their names or summaries. If a required skill is unavailable, report that and use the project's existing patterns and official documentation; do not claim to have loaded it.

## Implementation

- Use Composition API with `<script setup lang="ts">` for new Vue components.
- Reuse existing components, composables, and installed dependencies before adding code.
- Prefer PrimeVue components and shared design tokens. Add wrappers only when they provide needed behavior or a reusable project contract.
- Use the default PrimeVue component when one fits, including in foundation examples. Create a custom component only when PrimeVue has no suitable component.
- PrimeVue components are auto-imported in templates by Vite. Keep service and composable imports explicit; `src/components.d.ts` is generated.
- Keep design-system customization in `src/theme/erp-theme/`; use `src/theme/aura-reference/` as a reference.
- Keep FTF colour values and brand aliases in `src/theme/erp-theme/foundations/palette.ts`, semantic roles in `color-tokens.ts`, and PrimeVue mappings in `theme.ts`. Reuse these sources in Tailwind and documentation rather than defining another palette.
- `erp-theme` is a standalone preset. Keep its tokens local; do not add `@primeuix/themes` or import packaged presets. The Aura reference snapshot is excluded from application compilation.
- Prefer theme tokens over repeated hard-coded styles or CSS overrides of PrimeVue internals.
- Check the PrimeVue MCP documentation version against the installed version before applying its guidance; verify any version differences with official documentation.
- Preserve accessibility, including labels, keyboard operation, and focus behavior.
- Button severity communicates meaning; variant controls emphasis. Use primary filled for main actions, primary outlined for supporting/toolbar actions, and primary text for quiet inline actions. Reserve secondary outlined/text for cancellation, dismissal, neutral navigation, and embedded field controls; use danger for destructive actions (filled for final confirmation). Use success/warn/info only for semantic actions. Keep icon-only actions consistent with their group; explicit severity demos and preview resets are exceptions. See the Button documentation for examples.
- Keep changes focused on the requested outcome; avoid unrelated refactors and new dependencies.

## Tests and verification

- Before adding or expanding a test, identify the concrete user-facing failure or business-rule violation it would catch that existing tests do not. If there is no meaningful failure to protect against, do not add the test. A changed line or new conditional alone is not a reason to add coverage.
- Copy, labels, typos, and purely visual changes do not need new tests or assertions. Review the wording or rendered result. Add coverage only if the change also affects behavior, accessibility, or an explicit legal or safety requirement.
- Test observable outcomes and public contracts. Avoid assertions that merely duplicate exact UI wording, source text, CSS classes, internal structure, or call order unless that detail is itself a required contract. Existing tests should normally survive refactoring that preserves behavior.
- For meaningful changes to validation, navigation, calculations, authentication, payments, or data integrity, extend the nearest existing suite with focused regression coverage. Exercise the real behavior under test rather than only asserting what mocks were told to do.
- Reuse existing test files and fixtures. Do not create a standalone self-check for each fix or introduce a test framework or runner for a small change. Add a test file only when the coverage does not fit an existing suite.
- Running existing checks and writing new tests are separate decisions. Keep verification proportional to risk; do not automatically run the full suite or production build for a copy-only change.
- Keep one-off debugging and verification scripts in `/tmp`; do not leave them in the repository.
- Check affected callers, exports, and tests when changing shared behavior.
- Choose relevant existing checks based on the change:
  - `npm run type-check` for Vue and TypeScript changes.
  - `npm run test:unit -- --run` for affected unit tests.
  - `npm run build-only` for build or integration changes.
- For visual changes, inspect the result in a browser when available.
- Run Playwright only when explicitly requested by the user.
- State what was checked and any remaining limitations. Documentation-only changes do not require application tests.
