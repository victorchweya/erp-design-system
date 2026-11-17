<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import ButtonBasicExample from '@/components/docs/button/examples/ButtonBasicExample.vue'
import basicCode from '@/components/docs/button/examples/ButtonBasicExample.vue?raw'
import ButtonVariantsExample from '@/components/docs/button/examples/ButtonVariantsExample.vue'
import variantsCode from '@/components/docs/button/examples/ButtonVariantsExample.vue?raw'
import ButtonSeverityExample from '@/components/docs/button/examples/ButtonSeverityExample.vue'
import severityCode from '@/components/docs/button/examples/ButtonSeverityExample.vue?raw'
import ButtonSizesExample from '@/components/docs/button/examples/ButtonSizesExample.vue'
import sizesCode from '@/components/docs/button/examples/ButtonSizesExample.vue?raw'
import ButtonIconsExample from '@/components/docs/button/examples/ButtonIconsExample.vue'
import iconsCode from '@/components/docs/button/examples/ButtonIconsExample.vue?raw'
import ButtonStatesExample from '@/components/docs/button/examples/ButtonStatesExample.vue'
import statesCode from '@/components/docs/button/examples/ButtonStatesExample.vue?raw'
import ButtonGroupExample from '@/components/docs/button/examples/ButtonGroupExample.vue'
import groupCode from '@/components/docs/button/examples/ButtonGroupExample.vue?raw'

const examples = [
  {
    id: 'button-variants',
    title: 'Variants',
    component: ButtonVariantsExample,
    code: variantsCode,
    description:
      'Use filled for the main action, outlined for supporting actions, and text for quieter actions. Rounded and raised are optional shapes and elevation.',
  },
  {
    id: 'button-severity',
    title: 'Severities',
    component: ButtonSeverityExample,
    code: severityCode,
    description:
      'Use primary for the main action. Success shares the primary green; warn uses orange. Choose severity for meaning rather than decoration.',
  },
  {
    id: 'button-sizes',
    title: 'Sizes',
    component: ButtonSizesExample,
    code: sizesCode,
    description:
      'Small, default, and large buttons use 14, 16, and 18px text. Padding, icon-only width, and spacing come from the theme.',
  },
  {
    id: 'button-icons',
    title: 'Icons',
    component: ButtonIconsExample,
    code: iconsCode,
    description:
      'Place PrimeIcons in the default slot. Slot order sets the position. Use iconOnly for a square footprint and give the button an accessible action label.',
  },
  {
    id: 'button-states',
    title: 'States',
    component: ButtonStatesExample,
    code: statesCode,
    description:
      'Disabled buttons cannot be activated. During loading, show a spinner, disable the action, and announce progress. This preview completes locally after a short delay.',
  },
  {
    id: 'button-group',
    title: 'Button group',
    component: ButtonGroupExample,
    code: groupCode,
    description:
      'Use PrimeVue ButtonGroup to join related actions. Keep each button’s label clear and give the group a descriptive name.',
  },
]
const sections = [
  { id: 'button-how-to-use', label: 'How to use' },
  ...examples.map(({ id, title }) => ({ id, label: title })),
  { id: 'button-accessibility', label: 'Accessibility' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-6 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Core elements</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Button</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Trigger an action with PrimeVue Button. Use the shared theme for consistent colours,
          sizes, icons, and interaction states.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="button-how-to-use"
          aria-labelledby="button-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="button-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Use <Tag severity="secondary" class="align-baseline"><code>Button</code></Tag>
            directly and put its label in the default slot. PrimeVue components are auto-imported in
            this project.
          </p>
          <p class="leading-relaxed text-muted-color">
            Set <Tag severity="secondary" class="align-baseline"><code>type="button"</code></Tag>
            for ordinary actions, or
            <Tag severity="secondary" class="align-baseline"><code>type="submit"</code></Tag>
            when submitting a form. Use
            <Tag severity="secondary" class="align-baseline"><code>severity</code></Tag> and
            <Tag severity="secondary" class="align-baseline"><code>size</code></Tag>
            for supported variations.
          </p>
          <CodeExample title="Basic button" :code="basicCode"><ButtonBasicExample /></CodeExample>
        </section>
        <section
          v-for="example in examples"
          :id="example.id"
          :key="example.id"
          :aria-labelledby="`${example.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`${example.id}-title`" class="text-2xl font-medium">{{ example.title }}</h2>
          <p class="text-muted-color">{{ example.description }}</p>
          <CodeExample :title="example.title" :code="example.code">
            <component :is="example.component" />
          </CodeExample>
        </section>
        <section
          id="button-accessibility"
          aria-labelledby="button-accessibility-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="button-accessibility-title" class="text-2xl font-medium">Accessibility</h2>
          <p class="text-muted-color">
            Tab moves focus to the button; Enter and Space activate it. Keep the theme’s visible
            focus ring. Use a link when the purpose is navigation.
          </p>
          <p class="text-muted-color">
            Give icon-only actions an
            <Tag severity="secondary" class="align-baseline"><code>aria-label</code></Tag
            >. Keep decorative SVGs hidden from assistive technology. Pair loading states with
            <Tag severity="secondary" class="align-baseline"><code>aria-busy</code></Tag>
            and a status message.
          </p>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
