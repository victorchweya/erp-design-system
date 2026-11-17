<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import ColorBrand from '@/components/foundations/color/ColorBrand.vue'
import ColorInputs from '@/components/foundations/color/ColorInputs.vue'
import ColorPalette from '@/components/foundations/color/ColorPalette.vue'
import ColorRoleList from '@/components/foundations/color/ColorRoleList.vue'
import ColorShadows from '@/components/foundations/color/ColorShadows.vue'
import ColorStatus from '@/components/foundations/color/ColorStatus.vue'
import ColorTokenTable from '@/components/foundations/color/ColorTokenTable.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { colorRoles } from '@/theme/erp-theme/foundations/color-tokens'

const sections = [
  { id: 'color-how-to-use', label: 'How to use' },
  { id: 'color-brand', label: 'Brand' },
  { id: 'color-background', label: 'Background' },
  { id: 'color-text', label: 'Text' },
  { id: 'color-inputs', label: 'Borders & Inputs' },
  { id: 'color-status', label: 'Status' },
  { id: 'color-palette', label: 'Palette' },
  { id: 'color-shadows', label: 'Shadows' },
  { id: 'color-token-table', label: 'Token table' },
]
const activeSection = useActiveSection(sections.map((section) => section.id))
const roleSections = (
  [
    {
      id: 'background',
      label: 'Background',
      description:
        'Use bg-surface for content backgrounds. Pair coloured backgrounds with their matching contrast text, such as bg-primary with text-primary-contrast.',
    },
    {
      id: 'text',
      label: 'Text',
      description:
        'Use text-color for body text and semantic utilities for emphasis and feedback. Use text-surface on bg-contrast.',
    },
    {
      id: 'inputs',
      label: 'Borders & Inputs',
      description:
        'Inputs use neutral borders, green for hover and focus, and red for invalid values. Disabled fields use neutral backgrounds and text. These colours come from PrimeVue’s shared form.field tokens.',
    },
    {
      id: 'status',
      label: 'Status',
      description:
        'Tag and Badge use these seven severities. Pair each colour with its contrast text. Help is available for buttons.',
    },
  ] as const
).map((section) => ({
  ...section,
  roles: colorRoles.filter((role) => {
    if (section.id === 'background') {
      return role.group === 'surface' && role.label.startsWith('bg-')
    }
    return (
      role.group === section.id &&
      !['text.hover.muted.color', 'primary.contrast.color'].includes(role.name)
    )
  }),
}))
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-6 py-10 text-base">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="text-sm font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Colour</h1>
        <p class="text-lg text-muted-color">
          Use the FTF palette and semantic colour roles across Tailwind and PrimeVue. Light and dark
          values share one token source, keeping text, backgrounds, borders, and feedback
          consistent.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="color-how-to-use"
          aria-labelledby="color-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-usage-title" class="text-3xl font-medium">How to use</h2>
          <p class="text-muted-color">
            Use shared tokens through Tailwind utilities such as
            <Tag severity="secondary" class="align-baseline"><code>bg-primary</code></Tag
            >, <Tag severity="secondary" class="align-baseline"><code>text-color</code></Tag
            >, and <Tag severity="secondary" class="align-baseline"><code>border-surface</code></Tag
            >, or CSS variables such as
            <Tag severity="secondary" class="align-baseline"
              ><code>var(--p-primary-color)</code></Tag
            >.
          </p>
          <p class="text-muted-color">
            Use <Tag severity="secondary" class="align-baseline"><code>text-color</code></Tag>
            for body copy, and
            <Tag severity="secondary" class="align-baseline"><code>text-muted</code></Tag>
            for supporting text.
          </p>
          <p class="text-muted-color">
            Semantic colours adapt to light and dark mode automatically. Fixed palette utilities
            such as <Tag severity="secondary" class="align-baseline"><code>bg-kale</code></Tag>
            keep the same colour.
          </p>
          <p class="text-muted-color">
            Pair coloured backgrounds with their matching contrast text:
            <Tag severity="secondary" class="align-baseline"><code>bg-primary</code></Tag> with
            <Tag severity="secondary" class="align-baseline"><code>text-primary-contrast</code></Tag
            >, or <Tag severity="secondary" class="align-baseline"><code>bg-warn</code></Tag>
            with
            <Tag severity="secondary" class="align-baseline"><code>text-warn-contrast</code></Tag
            >.
          </p>
        </section>

        <section
          id="color-brand"
          aria-labelledby="color-brand-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-brand-title" class="text-3xl font-medium">Brand</h2>
          <p class="text-muted-color">Kale, Lime, Carrot, and Tamarind are the core FTF colours.</p>
          <ColorBrand />
        </section>

        <section
          v-for="section in roleSections"
          :id="`color-${section.id}`"
          :key="section.id"
          :aria-labelledby="`color-${section.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`color-${section.id}-title`" class="text-3xl font-medium">
            {{ section.label }}
          </h2>
          <p class="text-muted-color">{{ section.description }}</p>
          <ColorInputs v-if="section.id === 'inputs'" />
          <ColorStatus v-else-if="section.id === 'status'" />
          <ColorRoleList v-else :roles="section.roles" />
        </section>

        <section
          id="color-palette"
          aria-labelledby="color-palette-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-palette-title" class="text-3xl font-medium">Palette</h2>
          <p class="text-muted-color">
            Color ramps for brand accents, feedback, surfaces, and text.
          </p>
          <ColorPalette />
        </section>

        <section
          id="color-shadows"
          aria-labelledby="color-shadows-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-shadows-title" class="text-3xl font-medium">Shadows</h2>
          <p class="text-muted-color">
            Tailwind’s default shadows, from subtle separation to raised surfaces.
          </p>
          <ColorShadows />
        </section>

        <section
          id="color-token-table"
          aria-labelledby="color-token-table-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-token-table-title" class="text-3xl font-medium">Token table</h2>
          <ColorTokenTable />
        </section>
      </div>
    </div>

    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
