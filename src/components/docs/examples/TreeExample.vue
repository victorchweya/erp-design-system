<script setup lang="ts">
import { shallowRef } from 'vue'
const selected = shallowRef({})
const nodes = [
  {
    key: '0',
    label: 'Produce',
    children: [
      { key: '0-0', label: 'Vegetables', children: [{ key: '0-0-0', label: 'Carrots' }] },
      { key: '0-1', label: 'Fruit', children: [{ key: '0-1-0', label: 'Limes' }] },
    ],
  },
]
</script>

<template>
  <Tree
    v-model:selectionKeys="selected"
    :value="nodes"
    selectionMode="single"
    filter
    filterPlaceholder="Find a category"
    aria-label="Produce categories"
  />
</template>
