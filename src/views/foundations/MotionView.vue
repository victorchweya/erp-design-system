<script setup lang="ts">
// A single-file documentation page; the one demo is small and owns a single boolean.
import { shallowRef } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { motionDurations, motionEasings } from '@/theme/erp-theme/foundations/motion'

type DurationName = keyof typeof motionDurations
type EasingName = keyof typeof motionEasings

const sections = [
  { id: 'motion-principles', label: 'Principles' },
  { id: 'motion-durations', label: 'Durations' },
  { id: 'motion-easing', label: 'Easing' },
  { id: 'motion-demo', label: 'Demo' },
  { id: 'motion-reduced', label: 'Reduced motion' },
  { id: 'motion-code', label: 'In code' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))

// Tailwind classes must stay literal so Tailwind can find them.
const durationGuide: Record<DurationName, { tailwind: string; use: string }> = {
  fast: {
    tailwind: 'duration-150',
    use: 'Hover, focus, and pressed feedback on custom elements; small icon changes',
  },
  base: {
    tailwind: 'duration-200',
    use: 'PrimeVue state changes, expanders, popovers, and the app shell sidebar',
  },
  slow: {
    tailwind: 'duration-300',
    use: 'Overlay masks and backdrops behind dialogs and drawers',
  },
}
const easingGuide: Record<EasingName, { tailwind: string; use: string }> = {
  standard: { tailwind: 'ease-in-out', use: 'Elements that move or resize and stay on screen' },
  enter: { tailwind: 'ease-out', use: 'Elements appearing: start quickly, then settle' },
  exit: { tailwind: 'ease-in', use: 'Elements leaving: start gently, then clear quickly' },
}

const durationRows = (Object.keys(motionDurations) as DurationName[]).map((name) => ({
  name,
  token: `motion.duration.${name}`,
  value: motionDurations[name],
  cssVar: `--p-motion-duration-${name}`,
  ...durationGuide[name],
}))
const easingRows = (Object.keys(motionEasings) as EasingName[]).map((name) => ({
  name,
  token: `motion.easing.${name}`,
  value: motionEasings[name],
  cssVar: `--p-motion-easing-${name}`,
  ...easingGuide[name],
}))

const played = shallowRef(false)
const demoGroups = [
  {
    title: 'Durations (standard easing)',
    rows: durationRows.map((row) => ({
      label: `${row.name} · ${row.value}`,
      classes: `${row.tailwind} ease-in-out`,
    })),
  },
  {
    title: `Easing (slow, ${motionDurations.slow})`,
    rows: easingRows.map((row) => ({
      label: `${row.name} · ${row.tailwind}`,
      classes: `duration-300 ${row.tailwind}`,
    })),
  },
]

const demoCode = `<ToggleButton v-model="played" onLabel="Animate" offLabel="Animate" />

<div class="h-2 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800" aria-hidden="true">
  <div
    class="h-full origin-left rounded-full bg-primary transition-transform duration-200 ease-in-out motion-reduce:transition-none"
    :class="played ? 'scale-x-100' : 'scale-x-0'"
  />
</div>`

const reducedMotionCss = `/* src/assets/styles/main.css */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`

const tailwindCode = `<button
  type="button"
  class="rounded-md transition-colors duration-150 ease-in-out hover:bg-emphasis motion-reduce:transition-none"
>
  Show filters
</button>`

const cssCode = `.order-summary {
  transition: grid-template-rows var(--p-motion-duration-base) var(--p-motion-easing-standard);
}`

const presetCode = `// src/theme/erp-theme/base/index.ts
export const primitive = {
  motion: motionTokens, // from foundations/motion.ts
  // ...
}

export const semantic = {
  transitionDuration: '{motion.duration.base}',
  mask: {
    transitionDuration: '{motion.duration.slow}',
  },
  // ...
}`
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Motion</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Use short, functional motion to show what changed. Three durations and three easing curves
          cover FTF interfaces, shared by PrimeVue and Tailwind.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="motion-principles"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-principles-title"
        >
          <h2 id="motion-principles-title" class="text-2xl font-medium">Principles</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Motion explains a state change: something opened, moved, appeared, or was removed.
            </li>
            <li>
              Keep it quick. People repeat ERP tasks all day; motion must never slow down data entry
              or review.
            </li>
            <li>
              Avoid decorative motion on data-dense screens such as tables, forms, and dashboards.
            </li>
            <li>Never rely on motion alone to communicate meaning; the end state must be clear.</li>
          </ul>
        </section>

        <section
          id="motion-durations"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-durations-title"
        >
          <h2 id="motion-durations-title" class="text-2xl font-medium">Durations</h2>
          <p class="leading-relaxed text-muted-color">
            Pick the shortest duration that makes the change readable. Larger surfaces need slightly
            more time than small controls.
          </p>
          <DataTable
            :value="durationRows"
            dataKey="name"
            size="small"
            showGridlines
            aria-label="Motion duration tokens"
          >
            <Column field="token" header="Token"
              ><template #body="{ data }"
                ><code>{{ data.token }}</code></template
              ></Column
            >
            <Column field="value" header="Value"
              ><template #body="{ data }"
                ><span class="tabular-nums">{{ data.value }}</span></template
              ></Column
            >
            <Column field="tailwind" header="Tailwind"
              ><template #body="{ data }"
                ><code>{{ data.tailwind }}</code></template
              ></Column
            >
            <Column field="cssVar" header="CSS variable"
              ><template #body="{ data }"
                ><code>{{ data.cssVar }}</code></template
              ></Column
            >
            <Column field="use" header="Use for" />
          </DataTable>
          <p class="leading-relaxed text-muted-color">
            The preset’s <code class="text-color">transitionDuration</code> uses
            <code class="text-color">base</code>, so PrimeVue colour, border, and focus changes run
            at {{ motionDurations.base }}. Overlay masks use <code class="text-color">slow</code>.
            Some PrimeVue overlay animations, such as Dialog and Drawer, keep durations from
            PrimeVue’s own component styles.
          </p>
        </section>

        <section
          id="motion-easing"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-easing-title"
        >
          <h2 id="motion-easing-title" class="text-2xl font-medium">Easing</h2>
          <p class="leading-relaxed text-muted-color">
            Use <code class="text-color">standard</code> by default. Use
            <code class="text-color">enter</code> and <code class="text-color">exit</code> when an
            element appears or leaves.
          </p>
          <DataTable
            :value="easingRows"
            dataKey="name"
            size="small"
            showGridlines
            aria-label="Motion easing tokens"
          >
            <Column field="token" header="Token"
              ><template #body="{ data }"
                ><code>{{ data.token }}</code></template
              ></Column
            >
            <Column field="value" header="Value"
              ><template #body="{ data }"
                ><code class="whitespace-nowrap">{{ data.value }}</code></template
              ></Column
            >
            <Column field="tailwind" header="Tailwind"
              ><template #body="{ data }"
                ><code>{{ data.tailwind }}</code></template
              ></Column
            >
            <Column field="cssVar" header="CSS variable"
              ><template #body="{ data }"
                ><code>{{ data.cssVar }}</code></template
              ></Column
            >
            <Column field="use" header="Use for" />
          </DataTable>
        </section>

        <section
          id="motion-demo"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-demo-title"
        >
          <h2 id="motion-demo-title" class="text-2xl font-medium">Demo</h2>
          <p class="leading-relaxed text-muted-color">
            Press Animate to compare each duration and easing. With reduced motion enabled in your
            operating system, the bars change instantly.
          </p>
          <CodeExample title="Duration and easing" :code="demoCode">
            <div class="flex flex-col gap-6">
              <ToggleButton
                v-model="played"
                onLabel="Animate"
                offLabel="Animate"
                class="self-start"
              />
              <div class="grid gap-6 md:grid-cols-2">
                <div v-for="group in demoGroups" :key="group.title" class="flex flex-col gap-3">
                  <h3 class="font-medium">{{ group.title }}</h3>
                  <div v-for="row in group.rows" :key="row.label" class="flex flex-col gap-1">
                    <span class="text-muted-color">{{ row.label }}</span>
                    <div
                      class="h-2 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800"
                      aria-hidden="true"
                    >
                      <div
                        class="h-full origin-left rounded-full bg-primary transition-transform motion-reduce:transition-none"
                        :class="[row.classes, played ? 'scale-x-100' : 'scale-x-0']"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CodeExample>
        </section>

        <section
          id="motion-reduced"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-reduced-title"
        >
          <h2 id="motion-reduced-title" class="text-2xl font-medium">Reduced motion</h2>
          <p class="leading-relaxed text-muted-color">
            When someone asks their device to reduce motion, a global rule cuts animations and
            transitions to almost zero and turns off smooth scrolling. Elements still reach their
            final state, so no information is lost.
          </p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Add <code class="text-color">motion-reduce:transition-none</code> or
              <code class="text-color">motion-reduce:animate-none</code> to custom transitions, as
              the app shell and loading spinners do.
            </li>
            <li>
              For motion started from script, such as smooth scrolling, check
              <code class="text-color">usePreferredReducedMotion()</code> from VueUse first.
            </li>
            <li>Do not use looping or auto-playing motion except for progress indicators.</li>
          </ul>
          <CodeExample title="Global rule" language="CSS" :code="reducedMotionCss" />
        </section>

        <section
          id="motion-code"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="motion-code-title"
        >
          <h2 id="motion-code-title" class="text-2xl font-medium">In code</h2>
          <p class="leading-relaxed text-muted-color">
            Use Tailwind’s default duration and easing utilities in templates; their values match
            the tokens. In ordinary CSS, use the PrimeVue variables. In preset files, reference
            tokens such as <code class="text-color">'{motion.duration.base}'</code>.
          </p>
          <CodeExample title="Tailwind classes" :code="tailwindCode" />
          <CodeExample title="CSS variables" language="CSS" :code="cssCode" />
          <CodeExample title="Preset references" language="TypeScript" :code="presetCode" />
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
