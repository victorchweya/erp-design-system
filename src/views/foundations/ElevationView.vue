<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import ElevationLevels from '@/components/foundations/elevation/ElevationLevels.vue'
import ElevationOverlays from '@/components/foundations/elevation/ElevationOverlays.vue'
import ElevationStack from '@/components/foundations/elevation/ElevationStack.vue'
import ElevationNestedExample from '@/components/foundations/elevation/examples/ElevationNestedExample.vue'
import nestedCode from '@/components/foundations/elevation/examples/ElevationNestedExample.vue?raw'
import { useActiveSection } from '@/composables/useActiveSection'
import { appShellLayers, overlayZIndex } from '@/theme/erp-theme/foundations/layers'

const sections = [
  { id: 'elevation-how-to-use', label: 'How to use' },
  { id: 'elevation-levels', label: 'Shadow levels' },
  { id: 'elevation-stacking', label: 'Stacking order' },
  { id: 'elevation-overlays', label: 'PrimeVue overlays' },
  { id: 'elevation-toast', label: 'Toast' },
  { id: 'elevation-rules', label: 'Rules' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
const configCode = `import { overlayZIndex } from './theme/erp-theme/foundations/layers'

app.use(PrimeVue, {
  zIndex: overlayZIndex,
  // theme, locale, ...
})`
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Elevation</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Elevation shows what sits above what. FTF uses four shadow levels and one shared stacking
          order for the app shell and PrimeVue overlays.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="elevation-how-to-use"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-usage-title"
        >
          <h2 id="elevation-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Keep page content flat and separate it with borders. Shadows belong to surfaces that
            float above the page. PrimeVue applies overlay and modal shadows through the theme, so
            most screens need no shadow utilities at all.
          </p>
          <p class="leading-relaxed text-muted-color">
            Stacking values live in
            <Tag severity="secondary" class="align-baseline"
              ><code>src/theme/erp-theme/foundations/layers.ts</code></Tag
            >. The app shell uses
            <Tag severity="secondary" class="align-baseline"
              ><code>z-{{ appShellLayers.topbar }}</code></Tag
            >
            and
            <Tag severity="secondary" class="align-baseline"
              ><code>z-{{ appShellLayers.sidebar }}</code></Tag
            >; PrimeVue overlays start at {{ overlayZIndex.overlay }}.
          </p>
        </section>

        <section
          id="elevation-levels"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-levels-title"
        >
          <h2 id="elevation-levels-title" class="text-2xl font-medium">Shadow levels</h2>
          <p class="leading-relaxed text-muted-color">
            Overlay and modal shadows match Tailwind’s
            <code class="text-color">shadow-md</code> and <code class="text-color">shadow-xl</code>.
            Overlays also keep a 1px border, which carries the edge in dark mode where shadows are
            faint. See the full scale in
            <RouterLink
              :to="{ path: '/foundations/color', hash: '#color-shadows' }"
              class="font-medium text-primary underline-offset-4 hover:underline"
              >Colour › Shadows</RouterLink
            >.
          </p>
          <ElevationLevels />
        </section>

        <section
          id="elevation-stacking"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-stacking-title"
        >
          <h2 id="elevation-stacking-title" class="text-2xl font-medium">Stacking order</h2>
          <p class="leading-relaxed text-muted-color">
            Sticky content stays below the app shell. PrimeVue overlays are appended to the document
            body, outside the isolated app root, so they always appear above the shell.
          </p>
          <ElevationStack />
        </section>

        <section
          id="elevation-overlays"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-overlays-title"
        >
          <h2 id="elevation-overlays-title" class="text-2xl font-medium">PrimeVue overlays</h2>
          <p class="leading-relaxed text-muted-color">
            PrimeVue’s <code class="text-color">zIndex</code> option sets a base for each component
            category. FTF passes the values from <code class="text-color">layers.ts</code> in
            <code class="text-color">main.ts</code>.
          </p>
          <CodeExample
            title="PrimeVue zIndex configuration"
            language="TypeScript"
            :code="configCode"
          />
          <ElevationOverlays />
          <CodeExample title="Dialog opened from a Drawer" :code="nestedCode" tabbed>
            <ElevationNestedExample />
          </CodeExample>
        </section>

        <section
          id="elevation-toast"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-toast-title"
        >
          <h2 id="elevation-toast-title" class="text-2xl font-medium">Toast</h2>
          <p class="leading-relaxed text-muted-color">
            Toast uses the modal category, so it appears above the app shell, overlays, and any
            dialog that is already open. Its default position is
            <code class="text-color">top-right</code>; PrimeVue also supports
            <code class="text-color">top-left</code>, <code class="text-color">top-center</code>,
            <code class="text-color">bottom-left</code>,
            <code class="text-color">bottom-center</code>,
            <code class="text-color">bottom-right</code>, and
            <code class="text-color">center</code>.
          </p>
          <p class="leading-relaxed text-muted-color">
            Use one position across a product. A top position overlaps the topbar while visible, so
            keep toasts brief and never place the only route to an action inside one.
          </p>
        </section>

        <section
          id="elevation-rules"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="elevation-rules-title"
        >
          <h2 id="elevation-rules-title" class="text-2xl font-medium">Rules</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Never hand-set a z-index of {{ overlayZIndex.overlay }} or more in page code. Let
              PrimeVue manage overlay layers.
            </li>
            <li>
              Keep sticky table headers and toolbars at
              <code class="text-color">z-10</code> or lower, below the topbar at
              <code class="text-color">z-{{ appShellLayers.topbar }}</code
              >.
            </li>
            <li>
              Do not set <code class="text-color">baseZIndex</code> or turn off
              <code class="text-color">autoZIndex</code> on PrimeVue overlays; nested overlays rely
              on automatic layering.
            </li>
            <li>
              Open a Dialog from a Drawer when needed. It stacks above the Drawer automatically.
            </li>
            <li>
              Do not add shadows to flat content to create hierarchy. Use spacing, borders, and
              surface colour.
            </li>
            <li>
              Make sure sticky elements never cover the focused element when users tab through a
              page.
            </li>
          </ul>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
