<script setup lang="ts">
import { shallowRef } from 'vue'
const selected = shallowRef<string | null>(null)
const suppliers = [
  { label: 'Kinangop Greens', value: 'SUP-0142' },
  { label: 'Limuru Fresh Farms', value: 'SUP-0087' },
  { label: 'Meru Highland Produce', value: 'SUP-0203' },
  { label: 'Naivasha Growers Co-op', value: 'SUP-0119' },
]
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <span id="supplier-select-label" class="font-medium">Supplier</span
    ><Select
      v-model="selected"
      :options="suppliers"
      optionLabel="label"
      optionValue="value"
      placeholder="Choose a supplier"
      aria-labelledby="supplier-select-label"
      filter
      showClear
      fluid
    />
    <p class="text-muted-color">Stored value: {{ selected ?? 'None' }}</p>
  </div>
</template>
