<script setup lang="ts">
import { shallowRef } from 'vue'
const selected = shallowRef<{ label: string; code: string } | null>(null)
const categories = [
  {
    label: 'Vegetables',
    items: [
      {
        label: 'Leafy',
        produce: [
          { label: 'Kale', code: 'kale' },
          { label: 'Spinach', code: 'spinach' },
        ],
      },
      { label: 'Root', produce: [{ label: 'Carrot', code: 'carrot' }] },
    ],
  },
  { label: 'Fruit', items: [{ label: 'Citrus', produce: [{ label: 'Lime', code: 'lime' }] }] },
]
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <label for="produce-cascade" class="font-medium">Produce category</label
    ><CascadeSelect
      inputId="produce-cascade"
      v-model="selected"
      :options="categories"
      optionLabel="label"
      optionGroupLabel="label"
      :optionGroupChildren="['items', 'produce']"
      placeholder="Choose produce"
      showClear
      fluid
    />
    <p class="text-muted-color">Selected: {{ selected?.label || 'None' }}</p>
  </div>
</template>
