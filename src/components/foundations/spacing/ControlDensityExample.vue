<script setup lang="ts">
import { controlSizes } from '@/theme/erp-theme/foundations/controls'
import { spacing } from '@/theme/erp-theme/foundations/spacing'
import { fontSizes } from '@/theme/erp-theme/foundations/typography'
import ControlDensityActions from './ControlDensityActions.vue'
import ControlDensityFields from './ControlDensityFields.vue'

const sizes = controlSizes.map((control) => ({
  ...control,
  font: `${parseFloat(fontSizes[control.font][0]) * 16}px`,
  horizontal: `${parseFloat(spacing[control.x]) * 16}px`,
  vertical: `${parseFloat(spacing[control.y]) * 16}px`,
}))
</script>

<template>
  <DataTable :value="sizes" size="small" showGridlines aria-label="Compact control sizes">
    <Column field="label" header="Size" /><Column field="font" header="Text" /><Column
      field="horizontal"
      header="Horizontal padding"
    /><Column field="vertical" header="Vertical padding" />
  </DataTable>
  <div class="grid items-start gap-4 lg:grid-cols-3">
    <Card
      v-for="control in controlSizes"
      :id="`control-${control.key}`"
      :key="control.key"
      class="min-w-0"
    >
      <template #title
        ><h3 class="text-xl font-medium">{{ control.label }}</h3></template
      >
      <template #subtitle
        ><code>{{ control.size ? `size="${control.size}"` : 'Default size' }}</code></template
      >
      <template #content>
        <div class="flex min-w-0 flex-col gap-6">
          <ControlDensityActions :size="control.size" />
          <ControlDensityFields :size="control.size" />
        </div>
      </template>
    </Card>
  </div>
</template>
