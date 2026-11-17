<script setup lang="ts">
import ColorBrand from '@/components/foundations/color/ColorBrand.vue'
import ColorExamples from '@/components/foundations/color/ColorExamples.vue'
import ColorPalette from '@/components/foundations/color/ColorPalette.vue'
import ColorRoleList from '@/components/foundations/color/ColorRoleList.vue'
import ColorTokenTable from '@/components/foundations/color/ColorTokenTable.vue'
import {
  colorRoles,
  colorValue,
  contrastRatio,
  cream,
  referenceSource,
  tokenGaps,
} from '@/theme/erp-theme/foundations/color-tokens'

const sections = [
  { id: 'how-to-use', label: 'How to use' },
  { id: 'brand', label: 'Brand' },
  { id: 'surface', label: 'Surface' },
  { id: 'text', label: 'Text' },
  { id: 'inputs', label: 'Borders & Inputs' },
  { id: 'status', label: 'Status' },
  { id: 'tints', label: 'Tints' },
  { id: 'palette', label: 'Palette' },
  { id: 'token-table', label: 'Token table' },
]
const roleSections = (
  [
    {
      id: 'surface',
      label: 'Surface',
      description: 'Verified content and overlay pairs, shown in both modes.',
    },
    {
      id: 'text',
      label: 'Text',
      description: 'Use text colors with their intended surface, not as free-standing accents.',
    },
    {
      id: 'inputs',
      label: 'Borders & Inputs',
      description:
        'Existing boundary tokens are shown with measured contrast. Verified does not mean every use is accessible.',
    },
    {
      id: 'status',
      label: 'Status',
      description:
        'FTF defines status color families. These explicit foreground/background assignments are proposals, with no invented dark equivalents.',
    },
    {
      id: 'tints',
      label: 'Tints',
      description:
        'Selection highlights are verified. Additional soft accent pairs are marked as proposals.',
    },
  ] as const
).map((section) => ({
  ...section,
  roles: colorRoles.filter((role) => role.group === section.id),
}))
const brandRoles = colorRoles.filter((role) => role.group === 'brand')
const carrotContrast = contrastRatio(colorValue('orange.500').value, cream.value)
const usage = `import { roleByName } from '@/theme/erp-theme/foundations/color-tokens'

const primary = roleByName('primary.color').light
// Use primary.foreground.value with primary.background.value.
// Keep role assignments separate from raw palette values.`
</script>

<template>
  <div
    class="mx-auto grid max-w-screen-2xl gap-10 px-4 py-8 text-sm sm:px-6 xl:grid-cols-[minmax(0,1fr)_10rem] xl:px-8"
  >
    <div class="min-w-0">
      <header class="mb-8 flex flex-col gap-3">
        <p class="text-muted-color">Foundations / Color</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Color</h1>
        <p class="max-w-3xl text-base leading-relaxed text-muted-color">
          The FTF palette, its intended pairings, and the evidence behind each token. Start with a
          role, then choose a color.
        </p>
        <p class="text-xs text-muted-color">
          Verified FTF snapshot · {{ referenceSource.commit.slice(0, 7) }} · proposals are labeled
          separately
        </p>
      </header>

      <nav
        aria-label="On this page"
        class="mb-8 flex flex-col gap-3 rounded-lg border border-surface p-4 xl:hidden"
      >
        <p class="font-medium">On this page</p>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#color-${section.id}`"
            class="underline-offset-4 hover:underline"
            >{{ section.label }}</a
          >
        </div>
      </nav>

      <div class="flex flex-col gap-12">
        <section
          id="color-how-to-use"
          aria-labelledby="color-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-usage-title" class="text-2xl font-medium">How to use</h2>
          <ul class="list-disc space-y-2 pl-5 leading-relaxed text-muted-color">
            <li>
              Use the local token source for both swatches and component previews. These FTF
              references are scoped to this foundation; they do not replace the existing app-shell
              preset.
            </li>
            <li>
              Pair foreground and background roles together. A palette color alone does not
              establish a light or dark UI mapping.
            </li>
            <li>
              Normal text needs 4.5:1; essential icons and identifying boundaries need 3:1. Swatch
              labels choose black or white for legibility, not as a new semantic role.
            </li>
            <li>
              “Verified” means the value or pair is present in the source. “Proposal” means a new
              role assignment that still needs approval. “Not defined” is intentionally left
              unmapped.
            </li>
          </ul>
          <pre
            class="overflow-x-auto rounded-lg border border-surface bg-surface-0 p-4 text-xs leading-relaxed dark:bg-surface-950"
          ><code>{{ usage }}</code></pre>
          <p class="leading-relaxed">
            <strong>Carrot on cream: {{ carrotContrast.toFixed(2) }}:1.</strong>
            <code>{{ colorValue('orange.500').value }}</code> on
            <code>{{ cream.value }}</code> fails normal-text and essential-icon contrast. Keep
            Carrot decorative there; use a tested darker foreground, such as the proposed Soil/cream
            pair below.
          </p>
          <p class="text-xs text-muted-color">
            Thresholds:
            <a
              href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              >WCAG text contrast</a
            >
            and
            <a
              href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              >non-text contrast</a
            >. Ratios use unrounded sRGB values for pass/fail.
          </p>
        </section>

        <section
          id="color-brand"
          aria-labelledby="color-brand-title"
          class="flex scroll-mt-24 flex-col gap-5"
        >
          <h2 id="color-brand-title" class="text-2xl font-medium">Brand</h2>
          <p class="text-muted-color">
            Forest, Lime, Carrot, and Soil are the core FTF colors. Their values are verified in the
            old palette; the names follow this brief.
          </p>
          <ColorBrand />
          <ColorRoleList :roles="brandRoles" />
          <ColorExamples />
        </section>

        <section
          v-for="section in roleSections"
          :id="`color-${section.id}`"
          :key="section.id"
          :aria-labelledby="`color-${section.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`color-${section.id}-title`" class="text-2xl font-medium">
            {{ section.label }}
          </h2>
          <p class="text-muted-color">{{ section.description }}</p>
          <ColorRoleList :roles="section.roles" />
        </section>

        <section
          id="color-palette"
          aria-labelledby="color-palette-title"
          class="flex scroll-mt-24 flex-col gap-5"
        >
          <h2 id="color-palette-title" class="text-2xl font-medium">Palette</h2>
          <p class="text-muted-color">
            Verified ramps from base.css and ColorsDoc.vue, with only the additional endpoints
            explicitly present in the preset. Existing 950 aliases repeat 900. Purple has no
            verified named 950.
          </p>
          <ColorPalette />
        </section>

        <section
          id="color-token-table"
          aria-labelledby="color-token-table-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="color-token-table-title" class="text-2xl font-medium">Token table</h2>
          <ColorTokenTable />
          <h3 class="mt-4 text-base font-medium">Gaps in the source</h3>
          <ul class="list-disc space-y-3 pl-5 leading-relaxed text-muted-color">
            <li v-for="gap in tokenGaps" :key="gap">{{ gap }}</li>
          </ul>
          <h3 class="mt-4 text-base font-medium">References</h3>
          <ul class="flex flex-col gap-2 text-xs">
            <li v-for="file in referenceSource.files" :key="file">
              <a
                :href="`${referenceSource.repository}/blob/${referenceSource.commit}/${file}`"
                target="_blank"
                rel="noopener noreferrer"
                class="break-all underline underline-offset-4"
                >FTF · {{ file }}</a
              >
            </li>
            <li>
              <a
                href="https://wunderui.com/foundations/color"
                target="_blank"
                rel="noopener noreferrer"
                class="underline underline-offset-4"
                >WunderUI Color · documentation structure reference</a
              >
            </li>
          </ul>
        </section>
      </div>
    </div>

    <aside class="hidden xl:block">
      <nav
        aria-label="On this page"
        class="sticky top-24 flex flex-col gap-3 border-l border-surface pl-4"
      >
        <p class="font-medium">On this page</p>
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#color-${section.id}`"
          class="text-muted-color underline-offset-4 hover:text-color hover:underline"
          >{{ section.label }}</a
        >
      </nav>
    </aside>
  </div>
</template>
