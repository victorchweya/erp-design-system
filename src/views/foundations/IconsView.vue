<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import IconExamples from '@/components/foundations/icons/IconExamples.vue'
import IconGallery from '@/components/foundations/icons/IconGallery.vue'
import IconUsageExample from '@/components/foundations/icons/examples/IconUsageExample.vue'
import usageCode from '@/components/foundations/icons/examples/IconUsageExample.vue?raw'
import IconButtonExample from '@/components/foundations/icons/examples/IconButtonExample.vue'
import buttonCode from '@/components/foundations/icons/examples/IconButtonExample.vue?raw'
import { useActiveSection } from '@/composables/useActiveSection'

const sections = [
  { id: 'icons-how-to-use', label: 'How to use' },
  { id: 'icons-sizes', label: 'Sizes' },
  { id: 'icons-colours', label: 'Colours' },
  { id: 'icons-buttons', label: 'With buttons' },
  { id: 'icons-accessibility', label: 'Accessibility' },
  { id: 'icons-gallery', label: 'Icon library' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-6 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="text-sm font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Icons</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Use PrimeIcons for navigation, actions, and feedback. Our single icon package,
          @primeicons/vue, provides SVG components that share the theme’s colours.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="icons-how-to-use"
          aria-labelledby="icons-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="icons-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Import each icon explicitly from
            <Tag severity="secondary" class="align-baseline"><code>@primeicons/vue</code></Tag
            >, using its individual path, such as
            <Tag severity="secondary" class="align-baseline"
              ><code>@primeicons/vue/search</code></Tag
            >. PrimeVue components are auto-imported; icons use explicit imports.
          </p>
          <p class="leading-relaxed text-muted-color">
            Set the
            <Tag severity="secondary" class="align-baseline"><code>size</code></Tag>
            property and use semantic text utilities such as
            <Tag severity="secondary" class="align-baseline"><code>text-primary</code></Tag
            >. Icons inherit their colour through
            <Tag severity="secondary" class="align-baseline"><code>currentColor</code></Tag
            >.
          </p>
          <CodeExample title="Using PrimeIcons" :code="usageCode">
            <IconUsageExample />
          </CodeExample>
        </section>
        <IconExamples />
        <section
          id="icons-buttons"
          aria-labelledby="icons-buttons-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="icons-buttons-title" class="text-2xl font-medium">With buttons</h2>
          <p class="text-muted-color">
            Use 16px icons in small buttons and 20px icons in default buttons. Let the icon inherit
            the button’s colour. Give icon-only buttons a label that describes the action.
          </p>
          <CodeExample title="Button icons" :code="buttonCode">
            <IconButtonExample />
          </CodeExample>
        </section>
        <section
          id="icons-accessibility"
          aria-labelledby="icons-accessibility-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="icons-accessibility-title" class="text-2xl font-medium">Accessibility</h2>
          <p class="text-muted-color">
            When an icon accompanies text, keep it decorative with
            <Tag severity="secondary" class="align-baseline"><code>aria-hidden="true"</code></Tag>
            and
            <Tag severity="secondary" class="align-baseline"><code>focusable="false"</code></Tag
            >. The text provides its meaning.
          </p>
          <p class="text-muted-color">
            For an icon-only action, put
            <Tag severity="secondary" class="align-baseline"><code>aria-label</code></Tag>
            on the button. Keep keyboard focus on the button rather than the SVG.
          </p>
          <p class="text-muted-color">
            Pair status icons with a visible label. Colour and shape should support the message,
            rather than carry it alone.
          </p>
        </section>
        <IconGallery />
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
