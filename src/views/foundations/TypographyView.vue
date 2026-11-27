<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import TypographySpecimen from '@/components/foundations/TypographySpecimen.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { fontWeights, type fontSizes } from '@/theme/erp-theme/foundations/typography'

const specimens = [
  {
    id: 'typography-display',
    label: 'Display',
    size: '5xl',
    weight: 'medium',
    description: 'Short feature headlines. Use sparingly in product screens.',
  },
  {
    id: 'typography-h1',
    label: 'H1',
    size: '4xl',
    weight: 'medium',
    description: 'The main page title. Use one h1 per page.',
  },
  {
    id: 'typography-h2',
    label: 'H2',
    size: '3xl',
    weight: 'medium',
    description: 'Major sections within a page.',
  },
  {
    id: 'typography-h3',
    label: 'H3',
    size: '2xl',
    weight: 'medium',
    description: 'Subsections within a major section.',
  },
  {
    id: 'typography-h4',
    label: 'H4',
    size: 'xl',
    weight: 'medium',
    description: 'Smaller section and card headings.',
  },
  {
    id: 'typography-h5',
    label: 'H5',
    size: 'lg',
    weight: 'medium',
    description: 'Table titles and compact panel headings.',
  },
  {
    id: 'typography-h6',
    label: 'H6',
    size: 'base',
    weight: 'medium',
    description: 'The smallest heading for grouped content and dense interfaces.',
  },
  {
    id: 'typography-body-large',
    label: 'Body large',
    size: 'lg',
    weight: 'normal',
    description: 'Introductory text and short supporting paragraphs.',
  },
  {
    id: 'typography-body',
    label: 'Body',
    size: 'base',
    weight: 'normal',
    description: 'Body copy and large controls.',
  },
  {
    id: 'typography-body-small',
    label: 'Body small',
    size: 'sm',
    weight: 'normal',
    description: 'Navigation, tables, supporting copy, small/default controls, and chips.',
  },
  {
    id: 'typography-caption',
    label: 'Caption',
    size: 'xs',
    weight: 'medium',
    description: 'Short captions and compact metadata.',
  },
] satisfies {
  id: string
  label: string
  size: keyof typeof fontSizes
  weight: keyof typeof fontWeights
  description: string
}[]

const sections = [
  { id: 'typography-how-to-use', label: 'How to use' },
  ...specimens.map(({ id, label }) => ({ id, label })),
  { id: 'typography-weights', label: 'Weights' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
const weights = [
  { label: 'Regular', value: fontWeights.normal, class: 'font-normal' },
  { label: 'Medium', value: fontWeights.medium, class: 'font-medium' },
  { label: 'Semibold', value: fontWeights.semibold, class: 'font-semibold' },
  { label: 'Bold', value: fontWeights.bold, class: 'font-bold' },
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Typography</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Rubik gives FTF a clear, friendly voice. Use Tailwind’s default type scale for consistent
          headings, body copy, and interface text across Tailwind and PrimeVue.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="typography-how-to-use"
          aria-labelledby="typography-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="typography-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Use <Tag severity="secondary" class="align-baseline"><code>font-sans</code></Tag>
            for Rubik and pair a size such as
            <Tag severity="secondary" class="align-baseline"><code>text-base</code></Tag>
            with a weight such as
            <Tag severity="secondary" class="align-baseline"><code>font-normal</code></Tag
            >. Each size includes Tailwind’s default line height. The examples below are recommended
            combinations.
          </p>
          <p class="leading-relaxed text-muted-color">
            Choose heading levels for the document structure, then apply the appropriate size. On
            smaller screens, use responsive classes such as
            <Tag severity="secondary" class="align-baseline"><code>text-3xl sm:text-4xl</code></Tag>
            for page titles. Use
            <Tag severity="secondary" class="align-baseline"><code>text-color</code></Tag>
            for body copy and
            <Tag severity="secondary" class="align-baseline"><code>text-muted</code></Tag>
            for supporting text.
          </p>
          <p class="leading-relaxed text-muted-color">
            PrimeVue uses the same sizes and weights. Small and default controls use 14px; large
            controls use 16px. Body text stays at 16px. Measurements below assume the browser’s
            default 16px root size; rem units respect font preferences.
          </p>
          <p class="leading-relaxed text-muted-color">
            Typography defines the text scale. Navigation styling and behaviour are documented in
            <RouterLink
              to="/components/core-elements/links"
              class="rounded-xs text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >Links</RouterLink
            >.
          </p>
        </section>

        <TypographySpecimen v-for="specimen in specimens" :key="specimen.id" v-bind="specimen" />

        <section
          id="typography-weights"
          aria-labelledby="typography-weights-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="typography-weights-title" class="text-2xl font-medium">Weights</h2>
          <p class="text-muted-color">
            Use regular for body text and card labels. Use medium for headings, form labels, and
            card values. Keep badges at their theme-defined weight.
          </p>
          <div class="grid gap-4 sm:grid-cols-2">
            <Card v-for="weight in weights" :key="weight.value" class="min-w-0">
              <template #content>
                <p class="text-2xl" :class="weight.class">Shaping the Future of Food</p>
              </template>
              <template #footer>
                <div class="flex flex-col gap-1">
                  <p>{{ weight.label }} · {{ weight.value }}</p>
                  <code class="font-mono text-sm text-muted-color">{{ weight.class }}</code>
                </div>
              </template>
            </Card>
          </div>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
