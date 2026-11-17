<script setup lang="ts">
import { ref } from 'vue'
const selected = ref<Record<string, boolean>>({})
const nodes = [
  {
    key: 'vegetables',
    label: 'Vegetables',
    selectable: false,
    children: [
      { key: 'kale', label: 'Kale' },
      { key: 'carrot', label: 'Carrot' },
    ],
  },
  { key: 'fruit', label: 'Fruit', selectable: false, children: [{ key: 'lime', label: 'Lime' }] },
]
</script>

<template>
  <div class="flex max-w-sm flex-col gap-2">
    <label for="produce-tree" class="font-medium">Produce groups</label
    ><TreeSelect
      inputId="produce-tree"
      v-model="selected"
      :options="nodes"
      selectionMode="multiple"
      :metaKeySelection="false"
      filter
      display="chip"
      placeholder="Choose produce"
      fluid
    />
    <p class="text-muted-color">{{ Object.keys(selected || {}).length }} selected.</p>
  </div>
</template>
