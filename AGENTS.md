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
- PrimeVue components are auto-imported in templates by Vite. Keep service and composable imports explicit; `src/components.d.ts` is generated.
- Keep design-system customization in `src/theme/erp-theme/`; use `src/theme/aura-reference/` as a reference.
- `erp-theme` is a standalone preset. Keep its tokens local; do not add `@primeuix/themes` or import packaged presets. The Aura reference snapshot is excluded from application compilation.
- Prefer theme tokens over repeated hard-coded styles or CSS overrides of PrimeVue internals.
- Check the PrimeVue MCP documentation version against the installed version before applying its guidance; verify any version differences with official documentation.
- Preserve accessibility, including labels, keyboard operation, and focus behavior.
- Keep changes focused on the requested outcome; avoid unrelated refactors and new dependencies.

## Verification

- Check affected callers, exports, and tests when changing shared behavior.
- For code changes, run `npm run type-check` and the relevant checks:
  - `npm run test:unit -- --run` for unit tests.
  - `npm run build-only` for build or integration changes.
- Add or update a focused test for new non-trivial behavior and bug fixes.
- For visual changes, inspect the result in a browser when available.
- State what was checked and any remaining limitations. Documentation-only changes do not require application tests.
