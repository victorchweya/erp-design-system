<script setup lang="ts">
type BadgeSeverity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast'

const counts: Array<{ label: string; value: number; severity?: BadgeSeverity }> = [
  { label: 'Open orders', value: 24 },
  { label: 'Drafts', value: 3, severity: 'secondary' },
  { label: 'Delivered today', value: 18, severity: 'success' },
  { label: 'In transit', value: 6, severity: 'info' },
  { label: 'Awaiting approval', value: 5, severity: 'warn' },
  { label: 'Failed deliveries', value: 2, severity: 'danger' },
  { label: 'On hold', value: 1, severity: 'contrast' },
]
</script>

<template>
  <ul class="flex flex-wrap items-center gap-x-6 gap-y-3">
    <li v-for="count in counts" :key="count.label" class="flex items-center gap-2">
      {{ count.label }}
      <Badge :value="count.value" :severity="count.severity" />
    </li>
  </ul>
</template>
