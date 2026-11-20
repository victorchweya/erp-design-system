<script setup lang="ts">
import { useId } from 'vue'

const labelId = useId()
// Colours follow the shared chart series tokens so meters match dashboards in both themes.
const values = [
  { label: 'Leafy greens', value: 32, color: 'var(--p-chart-kale)' },
  { label: 'Root vegetables', value: 21, color: 'var(--p-chart-carrot)' },
  { label: 'Fruit', value: 12, color: 'var(--p-chart-lime)' },
]
</script>

<template>
  <MeterGroup :value="values" :aria-labelledby="labelId" class="max-w-lg">
    <template #start="{ totalPercent }">
      <div class="flex justify-between gap-4">
        <span :id="labelId" class="font-medium">Nairobi warehouse capacity</span>
        <span class="text-muted-color">{{ totalPercent }}% used</span>
      </div>
    </template>
  </MeterGroup>
</template>
