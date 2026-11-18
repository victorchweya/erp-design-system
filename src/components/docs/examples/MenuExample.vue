<script setup lang="ts">
import { shallowRef } from 'vue'
const result = shallowRef('No action selected.')
const items = [
  { label: 'View orders', command: () => (result.value = 'View orders selected in this preview.') },
  {
    label: 'View suppliers',
    command: () => (result.value = 'View suppliers selected in this preview.'),
  },
  {
    label: 'Export report',
    command: () => (result.value = 'Export selected in this preview. No file was created.'),
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Menu :model="items" />
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
