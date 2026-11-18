<script setup lang="ts">
import { shallowRef } from 'vue'
const result = shallowRef('')
const items = [
  { label: 'Orders', command: () => (result.value = 'Orders selected in this preview.') },
  { label: 'FTF-1042' },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Breadcrumb :model="items" aria-label="Order breadcrumb" />
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
