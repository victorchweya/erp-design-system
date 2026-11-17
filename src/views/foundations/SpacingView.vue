<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import SpacingCardExample from '@/components/foundations/spacing/examples/SpacingCardExample.vue'
import cardCode from '@/components/foundations/spacing/examples/SpacingCardExample.vue?raw'
import SpacingScale from '@/components/foundations/spacing/SpacingScale.vue'
import SpacingExamples from '@/components/foundations/spacing/SpacingExamples.vue'
import SpacingLayout from '@/components/foundations/spacing/SpacingLayout.vue'
import { useActiveSection } from '@/composables/useActiveSection'

const sections = [
  { id: 'spacing-how-to-use', label: 'How to use' },
  { id: 'spacing-scale', label: 'Spacing scale' },
  { id: 'spacing-examples', label: 'Padding & gaps' },
  { id: 'spacing-controls', label: 'Control spacing' },
  { id: 'spacing-radius', label: 'Radius' },
  { id: 'spacing-breakpoints', label: 'Breakpoints' },
  { id: 'spacing-containers', label: 'Containers & grid' },
  { id: 'spacing-css', label: 'In CSS' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
const tailwindCss = `.panel {
  display: flex;
  flex-direction: column;
  padding: theme('spacing.6');
  gap: theme('spacing.4');
}`
const tokenCss = `.panel {
  display: flex;
  flex-direction: column;
  padding: var(--p-spacing-6);
  gap: var(--p-spacing-4);
}`
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-6 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="text-sm font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Spacing</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Use Tailwind’s default spacing scale to give FTF layouts a consistent rhythm. Shared
          PrimeVue padding and gap tokens use the same values.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="spacing-how-to-use"
          aria-labelledby="spacing-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="spacing-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Use <Tag severity="secondary" class="align-baseline"><code>p-4</code></Tag> for 16px
            padding, <Tag severity="secondary" class="align-baseline"><code>gap-4</code></Tag> for
            16px between items, and
            <Tag severity="secondary" class="align-baseline"><code>px-4</code></Tag> for 16px
            horizontal padding. Prefer gap for sibling spacing in flex and grid layouts.
          </p>
          <p class="leading-relaxed text-muted-color">
            The scale is based on 0.25rem steps, with smaller half steps for dense controls. Use 4,
            8, 12, 16, 20, 24, 32, 40, and 48px for most layouts; 2, 6, 10, and 14px are available
            when needed.
          </p>
          <p class="text-sm text-muted-color">
            PrimeVue Card uses the theme’s defaults: 20px padding, an 8px body gap, and 12px
            corners. Use
            <Tag severity="secondary" class="align-baseline"><code>gap-2</code></Tag> for 8px
            between actions. PrimeVue components are auto-imported in this project.
          </p>
          <CodeExample title="Card spacing" :code="cardCode">
            <SpacingCardExample />
          </CodeExample>
        </section>
        <SpacingScale />
        <SpacingExamples />
        <SpacingLayout />
        <section
          id="spacing-css"
          aria-labelledby="spacing-css-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="spacing-css-title" class="text-2xl font-medium">In CSS</h2>
          <p class="text-muted-color">
            Use theme() in CSS processed by Tailwind v3, or use the shared PrimeVue variables in
            ordinary CSS.
          </p>
          <CodeExample title="Tailwind-processed CSS" language="CSS" :code="tailwindCss" />
          <CodeExample title="PrimeVue token CSS" language="CSS" :code="tokenCss" />
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
