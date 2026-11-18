<script setup lang="ts">
const teams = [
  {
    key: '0',
    label: 'Operations',
    children: [
      { key: '1', label: 'Sourcing' },
      { key: '2', label: 'Delivery' },
    ],
  },
]
</script>

<template>
  <div class="overflow-x-auto">
    <OrganizationChart :value="teams" aria-label="Operations teams" />
  </div>
</template>
