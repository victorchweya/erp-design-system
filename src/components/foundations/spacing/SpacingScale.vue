<script setup lang="ts">
import { spacing } from '@/theme/erp-theme/foundations/spacing'

const steps = [0, 'px', 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const
const rows = steps.map((step) => ({
  step,
  value: spacing[step],
  pixels: Number.parseFloat(spacing[step]) * (spacing[step].endsWith('rem') ? 16 : 1),
}))
</script>

<template>
  <section
    id="spacing-scale"
    aria-labelledby="spacing-scale-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-scale-title" class="text-2xl font-medium">Spacing scale</h2>
    <p class="text-muted-color">
      Common steps for padding, margin, gaps, and sizes. Tailwind also provides intermediate and
      larger steps. Values in pixels assume a 16px root size; rem values respect font preferences.
    </p>
    <DataTable
      :value="rows"
      dataKey="step"
      size="small"
      showGridlines
      scrollable
      tableClass="text-sm"
      :tableStyle="{ minWidth: '28rem' }"
      :tableProps="{ 'aria-label': 'Spacing scale' }"
    >
      <Column header="Utility">
        <template #body="{ data }"
          ><code>p-{{ data.step }}</code></template
        >
      </Column>
      <Column field="value" header="Value" />
      <Column header="Pixels">
        <template #body="{ data }">{{ data.pixels }}px</template>
      </Column>
      <Column header="Size">
        <template #body="{ data }">
          <div
            class="h-3 rounded bg-primary"
            :style="{ width: data.value, maxWidth: '100%' }"
            aria-hidden="true"
          />
        </template>
      </Column>
    </DataTable>
  </section>
</template>
