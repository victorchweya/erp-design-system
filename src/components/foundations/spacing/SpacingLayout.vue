<script setup lang="ts">
import { borderRadii, wideContainerMaxWidth } from '@/theme/erp-theme/foundations/spacing'
import CodeExample from '@/components/CodeExample.vue'
import SpacingGridExample from './examples/SpacingGridExample.vue'
import gridCode from './examples/SpacingGridExample.vue?raw'
import SpacingContainerExample from './examples/SpacingContainerExample.vue'
import containerCode from './examples/SpacingContainerExample.vue?raw'

const radii = [
  {
    utility: 'rounded-none',
    value: borderRadii.none,
    variable: '--p-border-radius-none',
    usedBy: 'Accordion headers, panel headers (0 radius)',
  },
  {
    utility: 'rounded-sm',
    value: borderRadii.xs,
    variable: '--p-border-radius-xs',
    usedBy: 'FloatLabel label backgrounds',
  },
  {
    utility: 'rounded',
    value: borderRadii.sm,
    variable: '--p-border-radius-sm',
    usedBy: 'Checkboxes, list options, menu items',
  },
  {
    utility: 'rounded-md',
    value: borderRadii.md,
    variable: '--p-border-radius-md',
    usedBy: 'Buttons, inputs, badges, tags, popovers, toasts, small DataTables',
  },
  {
    utility: 'rounded-lg',
    value: borderRadii.lg,
    variable: '--p-border-radius-lg',
    usedBy: 'Sidebar links, default DataTables',
  },
  {
    utility: 'rounded-xl',
    value: borderRadii.xl,
    variable: '--p-border-radius-xl',
    usedBy: 'Cards, dialogs, colour swatches, typography specimens',
  },
  {
    utility: 'rounded-full',
    value: '9999px',
    variable: '—',
    usedBy: 'Header avatar, colour indicators',
  },
]
const breakpoints = [
  { label: 'Small', prefix: 'sm', width: 640 },
  { label: 'Medium', prefix: 'md', width: 768 },
  { label: 'Large', prefix: 'lg', width: 1024 },
  { label: 'Extra large', prefix: 'xl', width: 1280 },
  { label: '2X large', prefix: '2xl', width: 1536 },
]
const containers = [
  { label: 'container/sm', value: '640px', utility: 'max-w-screen-sm' },
  { label: 'container/md', value: '768px', utility: 'max-w-screen-md' },
  { label: 'container/lg', value: '1024px', utility: 'max-w-screen-lg' },
  { label: 'container/xl', value: '1280px', utility: 'max-w-screen-xl' },
  {
    label: 'container/2xl',
    value: `${Number.parseFloat(wideContainerMaxWidth) * 16}px`,
    utility: 'max-w-8xl',
  },
  { label: 'grid/columns', value: '12', utility: 'grid-cols-12' },
  { label: 'grid/gutter', value: '16px', utility: 'gap-4' },
  { label: 'grid/margin', value: '16px', utility: 'px-4' },
]
</script>

<template>
  <section
    id="spacing-radius"
    aria-labelledby="spacing-radius-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-radius-title" class="text-2xl font-medium">Radius</h2>
    <p class="text-muted-color">
      Use the existing FTF radii. PrimeVue’s sm token is 4px and matches Tailwind’s rounded utility;
      rounded-sm is 2px. The md, lg, and xl names match across both systems.
    </p>
    <DataTable
      :value="radii"
      dataKey="utility"
      size="small"
      showGridlines
      scrollable
      tableClass="text-sm"
      :tableStyle="{ minWidth: '48rem' }"
      :tableProps="{ 'aria-label': 'Border radius reference' }"
    >
      <Column field="utility" header="Class">
        <template #body="{ data }"
          ><code>{{ data.utility }}</code></template
        >
      </Column>
      <Column field="variable" header="CSS variable">
        <template #body="{ data }"
          ><code>{{ data.variable }}</code></template
        >
      </Column>
      <Column field="value" header="Value" />
      <Column field="usedBy" header="Used by" />
    </DataTable>
    <p class="text-sm text-muted-color">
      Tailwind also provides rounded-2xl (16px) and rounded-3xl (24px) for larger surfaces.
    </p>
  </section>

  <section
    id="spacing-breakpoints"
    aria-labelledby="spacing-breakpoints-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-breakpoints-title" class="text-2xl font-medium">Breakpoints</h2>
    <p class="text-muted-color">
      Use Tailwind’s default breakpoints. Classes are mobile first: md:grid-cols-2 applies from
      768px and above. The rem equivalents below assume a 16px root size.
    </p>
    <DataTable
      :value="breakpoints"
      dataKey="prefix"
      size="small"
      showGridlines
      scrollable
      tableClass="text-sm"
      :tableStyle="{ minWidth: '36rem' }"
      :tableProps="{ 'aria-label': 'Responsive breakpoints' }"
    >
      <Column field="label" header="Breakpoint" />
      <Column field="prefix" header="Prefix">
        <template #body="{ data }"
          ><code>{{ data.prefix }}:</code></template
        >
      </Column>
      <Column field="width" header="Minimum width">
        <template #body="{ data }"
          ><code>{{ data.width }}px · {{ data.width / 16 }}rem</code></template
        >
      </Column>
      <Column header="CSS variable">
        <template #body><span aria-label="No CSS variable">—</span></template>
      </Column>
    </DataTable>
    <p class="text-sm text-muted-color">
      Tailwind v3 defines breakpoints in its configuration and does not publish --breakpoint-* CSS
      variables.
    </p>
    <p class="text-sm text-muted-color">
      One column on mobile, two from md, and three from xl, with a 16px gap at every size.
    </p>
    <CodeExample title="Responsive grid" :code="gridCode">
      <SpacingGridExample />
    </CodeExample>
  </section>

  <section
    id="spacing-containers"
    aria-labelledby="spacing-containers-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-containers-title" class="text-2xl font-medium">Containers & grid</h2>
    <p class="text-muted-color">
      Use these container caps and grid utilities to build page layouts. Containers fill the
      available width up to their maximum. The wide container uses FTF’s 1440px cap.
    </p>
    <DataTable
      :value="containers"
      dataKey="label"
      size="small"
      showGridlines
      scrollable
      tableClass="text-sm"
      :tableStyle="{ minWidth: '36rem' }"
      :tableProps="{ 'aria-label': 'Containers and grid reference' }"
    >
      <Column field="label" header="Reference">
        <template #body="{ data }"
          ><code>{{ data.label }}</code></template
        >
      </Column>
      <Column field="value" header="Value" />
      <Column field="utility" header="In code">
        <template #body="{ data }"
          ><code>{{ data.utility }}</code></template
        >
      </Column>
    </DataTable>
    <p class="text-sm text-muted-color">
      Foundation pages use max-w-7xl (1280px), and component pages use max-w-screen-xl (1280px).
      Container caps are separate from responsive breakpoints: 2xl: still starts at 1536px.
    </p>
    <p class="text-sm text-muted-color">
      A centred container with 16px side padding and a 16px grid gap. From lg, the content and
      delivery panel occupy eight and four columns. On mobile they stack.
    </p>
    <CodeExample title="Container and grid" :code="containerCode">
      <SpacingContainerExample />
    </CodeExample>
  </section>
</template>
