<script setup lang="ts">
import { computed, useId } from 'vue'

const labelId = useId()
const capacityKg = 12000
const values = [
  { label: 'Received today', value: 4800, color: 'var(--p-chart-kale)' },
  { label: 'Held for dispatch', value: 2650, color: 'var(--p-chart-carrot)' },
]
const kg = new Intl.NumberFormat('en-KE')
const usedKg = computed(() => values.reduce((total, item) => total + item.value, 0))
// MeterGroup reports a percentage as aria-valuenow but max in kg, so give a readable value.
const valueText = computed(() => `${kg.format(usedKg.value)} of ${kg.format(capacityKg)} kg used`)
</script>

<template>
  <MeterGroup
    :value="values"
    :max="capacityKg"
    :aria-labelledby="labelId"
    :aria-valuetext="valueText"
    class="max-w-lg"
  >
    <template #start>
      <div class="flex justify-between gap-4">
        <span :id="labelId" class="font-medium">Cold room 2</span>
        <span class="text-muted-color">{{ valueText }}</span>
      </div>
    </template>
    <template #label="{ value }">
      <ul class="flex flex-wrap gap-x-6 gap-y-2">
        <li v-for="item in value" :key="item.label" class="flex items-center gap-2">
          <span
            class="size-2 shrink-0 rounded-full"
            :style="{ backgroundColor: item.color }"
            aria-hidden="true"
          />
          {{ item.label }}: {{ kg.format(item.value) }} kg
        </li>
      </ul>
    </template>
  </MeterGroup>
</template>
