<script setup lang="ts">
import { shallowRef } from 'vue'
const selected = shallowRef<string | null>(null)
const options = [
  { label: 'Kale', value: 'kale' },
  { label: 'Carrot', value: 'carrot' },
  { label: 'Spinach', value: 'spinach' },
]
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <label for="produce-select" class="font-medium">Produce</label
    ><Select
      inputId="produce-select"
      v-model="selected"
      :options="options"
      optionLabel="label"
      optionValue="value"
      placeholder="Choose produce"
      filter
      showClear
      fluid
    />
    <p class="text-muted-color">Selected value: {{ selected || 'None' }}</p>
  </div>
</template>
