<script setup lang="ts">
const values = [
  { label: 'Allocated', value: 45, color: 'var(--p-primary-color)' },
  { label: 'Available', value: 30, color: 'var(--p-orange-500)' },
]
</script>

<template>
  <MeterGroup :value="values" :max="100" aria-label="Warehouse capacity" />
</template>
