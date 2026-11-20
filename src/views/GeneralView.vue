<script setup lang="ts">
// A single-file documentation page: each section is static copy, so splitting adds no behaviour.
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import mainCode from '@/main.ts?raw'

const sections = [
  { id: 'general-contents', label: 'What’s included' },
  { id: 'general-install', label: 'Install & run' },
  { id: 'general-preset', label: 'Use the preset' },
  { id: 'general-services', label: 'Services' },
  { id: 'general-tailwind', label: 'Tailwind' },
  { id: 'general-tokens', label: 'Where tokens live' },
  { id: 'general-dark-mode', label: 'Dark mode' },
  { id: 'general-contributing', label: 'Contributing' },
  { id: 'general-versioning', label: 'Versioning' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
const linkClass =
  'rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const areas = [
  {
    title: 'Foundations',
    description:
      'Colour, typography, spacing, motion, and the other tokens and rules every screen shares.',
    to: '/foundations/color',
    link: 'Open foundations',
  },
  {
    title: 'Components',
    description:
      'PrimeVue components with the ERP preset, live examples, copyable source, and accessibility notes.',
    to: '/components',
    link: 'Open components',
  },
  {
    title: 'UI blocks',
    description:
      'Working ERP patterns such as order entry, tables, drawers, forms, and authentication.',
    to: '/ui-blocks',
    link: 'Open UI blocks',
  },
]

const installCode = `npm install
npm run dev`

const serviceRows = [
  {
    service: 'ConfirmationService',
    components: 'ConfirmDialog, ConfirmPopup',
    api: 'useConfirm()',
  },
  { service: 'DialogService', components: 'DynamicDialog', api: 'useDialog()' },
  { service: 'ToastService', components: 'Toast', api: 'useToast()' },
]

const tailwindCode = `// tailwind.config.js (abridged)
import PrimeUI from 'tailwindcss-primeui'
import { primitives } from './src/theme/erp-theme/foundations/palette.ts'
import { semanticColors } from './src/theme/erp-theme/foundations/color-tokens.ts'

export default {
  darkMode: ['selector', '.app-dark'],
  theme: {
    extend: {
      // Colours resolve to the preset's CSS variables, e.g. var(--p-ftf-green-500).
      colors: { /* built from primitives and semanticColors */ },
    },
  },
  plugins: [PrimeUI],
}`

const layerCode = `/* src/assets/styles/main.css */
@layer tailwind-base, primevue, tailwind-utilities;

@layer tailwind-base {
  @tailwind base;
}

@layer tailwind-utilities {
  @tailwind components;
  @tailwind utilities;
}`

const tokenFiles = [
  { file: 'foundations/palette.ts', purpose: 'Raw FTF colour ramps and brand aliases' },
  {
    file: 'foundations/color-tokens.ts',
    purpose: 'Semantic colour roles, foreground/background pairs, documentation data',
  },
  {
    file: 'foundations/theme.ts',
    purpose: 'Maps colour roles to PrimeVue semantic and component tokens',
  },
  { file: 'foundations/typography.ts', purpose: 'Rubik, type scale, and UI font weights' },
  { file: 'foundations/spacing.ts', purpose: 'Spacing scale, radii, and the wide container width' },
  { file: 'foundations/controls.ts', purpose: 'Small, default, and large control density' },
  { file: 'foundations/motion.ts', purpose: 'Transition durations and easing curves' },
  { file: 'foundations/layers.ts', purpose: 'App shell layers and PrimeVue overlay z-index bases' },
]

const checkRows = [
  { command: 'npm run type-check', when: 'Vue and TypeScript changes' },
  { command: 'npm run test:unit -- --run', when: 'Behaviour covered by unit tests' },
  { command: 'npm run build-only', when: 'Build, theme, or integration changes' },
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Getting started</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">General</h1>
        <p class="text-base leading-relaxed text-muted-color">
          The FTF ERP design system combines PrimeVue components, a local ERP theme preset, and
          Tailwind utilities that share the same tokens. Start here to run the documentation site
          and set up the preset in an application.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="general-contents"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-contents-title"
        >
          <h2 id="general-contents-title" class="text-2xl font-medium">What’s included</h2>
          <div class="grid gap-4 md:grid-cols-3">
            <Card v-for="area in areas" :key="area.title">
              <template #title
                ><h3 class="text-lg font-medium">{{ area.title }}</h3></template
              >
              <template #content>
                <p class="leading-relaxed text-muted-color">{{ area.description }}</p>
              </template>
              <template #footer>
                <RouterLink :to="area.to" :class="linkClass">{{ area.link }}</RouterLink>
              </template>
            </Card>
          </div>
        </section>

        <section
          id="general-install"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-install-title"
        >
          <h2 id="general-install-title" class="text-2xl font-medium">Install &amp; run</h2>
          <p class="leading-relaxed text-muted-color">
            Use Node.js 22.18 or later (or 24.12 or later). Install the dependencies, then start the
            Vite development server.
          </p>
          <CodeExample title="Terminal" :code="installCode" />
        </section>

        <section
          id="general-preset"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-preset-title"
        >
          <h2 id="general-preset-title" class="text-2xl font-medium">Use the ERP preset</h2>
          <p class="leading-relaxed text-muted-color">
            Install PrimeVue with the
            <Tag severity="secondary" class="align-baseline"><code>ErpTheme</code></Tag> preset.
            This site’s entry file is shown below; reuse its PrimeVue options in your application.
          </p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              <code class="text-color">darkModeSelector: '.app-dark'</code> matches Tailwind’s dark
              variant.
            </li>
            <li>
              <code class="text-color">cssLayer</code> places PrimeVue between Tailwind’s base and
              utilities, so utility classes can adjust components without
              <code class="text-color">!important</code>.
            </li>
            <li><code class="text-color">ripple: true</code> enables the press effect.</li>
            <li>
              <code class="text-color">locale</code> uses
              <code class="text-color">primeVueLocale</code> from
              <code class="text-color">src/utils/locale.ts</code>: weeks start on Monday and dates
              use <code class="text-color">dd/mm/yy</code>.
            </li>
            <li>
              <code class="text-color">zIndex</code> uses
              <code class="text-color">overlayZIndex</code> from
              <code class="text-color">layers.ts</code>, keeping overlays above the app shell.
            </li>
          </ul>
          <CodeExample title="src/main.ts" language="TypeScript" :code="mainCode" />
        </section>

        <section
          id="general-services"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-services-title"
        >
          <h2 id="general-services-title" class="text-2xl font-medium">Register services</h2>
          <p class="leading-relaxed text-muted-color">
            Register each service once with <code class="text-color">app.use()</code> before
            mounting. The matching components and composables do not work without them. Render the
            component, such as <code class="text-color">&lt;Toast /&gt;</code>, where its messages
            should appear.
          </p>
          <DataTable
            :value="serviceRows"
            size="small"
            showGridlines
            aria-label="PrimeVue services and dependent components"
          >
            <Column field="service" header="Service"
              ><template #body="{ data }"
                ><code>{{ data.service }}</code></template
              ></Column
            >
            <Column field="components" header="Required by" />
            <Column field="api" header="Composable"
              ><template #body="{ data }"
                ><code>{{ data.api }}</code></template
              ></Column
            >
          </DataTable>
        </section>

        <section
          id="general-tailwind"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-tailwind-title"
        >
          <h2 id="general-tailwind-title" class="text-2xl font-medium">Tailwind</h2>
          <p class="leading-relaxed text-muted-color">
            The project uses Tailwind CSS v3. Its config imports the shared palette and colour roles
            from the preset, so utilities such as
            <Tag severity="secondary" class="align-baseline"><code>bg-kale</code></Tag> and
            <Tag severity="secondary" class="align-baseline"><code>text-danger</code></Tag>
            resolve to the same CSS variables as PrimeVue. The
            <code class="text-color">tailwindcss-primeui</code> plugin adds theme utilities such as
            <code class="text-color">bg-primary</code> and
            <code class="text-color">text-muted-color</code>.
          </p>
          <CodeExample title="Tailwind config" language="TypeScript" :code="tailwindCode" />
          <CodeExample title="Cascade layers" language="CSS" :code="layerCode" />
        </section>

        <section
          id="general-tokens"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-tokens-title"
        >
          <h2 id="general-tokens-title" class="text-2xl font-medium">Where tokens live</h2>
          <p class="leading-relaxed text-muted-color">
            Design-system customisation lives in
            <code class="text-color">src/theme/erp-theme/</code>. Change a value at its source;
            Tailwind, the preset, and these pages read from the same files.
          </p>
          <DataTable :value="tokenFiles" size="small" showGridlines aria-label="Token source files">
            <Column field="file" header="File in src/theme/erp-theme/"
              ><template #body="{ data }"
                ><code>{{ data.file }}</code></template
              ></Column
            >
            <Column field="purpose" header="Purpose" />
          </DataTable>
          <p class="leading-relaxed text-muted-color">
            Component tokens live in one folder per component, for example
            <code class="text-color">erp-theme/button/</code>.
            <code class="text-color">src/theme/aura-reference/</code> is reference material only.
          </p>
        </section>

        <section
          id="general-dark-mode"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-dark-mode-title"
        >
          <h2 id="general-dark-mode-title" class="text-2xl font-medium">Dark mode</h2>
          <p class="leading-relaxed text-muted-color">
            Light mode is the default. Adding <code class="text-color">.app-dark</code> to the
            <code class="text-color">html</code> element switches PrimeVue tokens and Tailwind
            <code class="text-color">dark:</code> utilities together.
          </p>
          <p class="leading-relaxed text-muted-color">
            <code class="text-color">src/theme/color-mode.ts</code> toggles the class and remembers
            the choice in this browser. <code class="text-color">ColorModeToggle</code> provides the
            header’s sun/moon button. Semantic utilities adapt automatically; check new screens in
            both modes.
          </p>
        </section>

        <section
          id="general-contributing"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-contributing-title"
        >
          <h2 id="general-contributing-title" class="text-2xl font-medium">Contributing</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Use the default PrimeVue component when one fits. Add a wrapper or custom component
              only when it provides needed behaviour.
            </li>
            <li>
              Prefer theme tokens over hard-coded values and CSS overrides of PrimeVue internals.
              Keep customisation in <code class="text-color">src/theme/erp-theme/</code>.
            </li>
            <li>
              Preserve accessibility: labels, keyboard operation, focus behaviour, and colour
              contrast.
            </li>
            <li>
              Reuse existing components, composables, and dependencies before adding new ones.
            </li>
            <li>
              Follow <code class="text-color">AGENTS.md</code> for testing guidance and choose
              checks that match the change.
            </li>
          </ul>
          <DataTable
            :value="checkRows"
            size="small"
            showGridlines
            aria-label="Verification commands"
          >
            <Column field="command" header="Command"
              ><template #body="{ data }"
                ><code>{{ data.command }}</code></template
              ></Column
            >
            <Column field="when" header="Run for" />
          </DataTable>
        </section>

        <section
          id="general-versioning"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="general-versioning-title"
        >
          <h2 id="general-versioning-title" class="text-2xl font-medium">Versioning</h2>
          <Message severity="info"
            >The package is private at version 0.0.0 and is not published.</Message
          >
          <p class="leading-relaxed text-muted-color">
            To use the preset in another application, copy
            <code class="text-color">src/theme/erp-theme/</code> and apply the PrimeVue options
            above. Copy <code class="text-color">src/utils/locale.ts</code>, the Tailwind config,
            and the cascade layers if you need them too. The preset depends only on
            <code class="text-color">@primeuix/styled</code>, which PrimeVue already installs.
          </p>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
