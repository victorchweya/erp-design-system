<script setup lang="ts">
import { shallowRef } from 'vue'
const result = shallowRef('No action selected.')
const items = [
  {
    label: 'Orders',
    items: [
      {
        label: 'View orders',
        command: () => (result.value = 'View orders selected in this preview.'),
      },
      {
        label: 'Create order',
        command: () => (result.value = 'Create order selected in this preview.'),
      },
    ],
  },
  {
    label: 'Suppliers',
    items: [
      {
        label: 'View suppliers',
        command: () => (result.value = 'View suppliers selected in this preview.'),
      },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <TieredMenu :model="items" />
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
