<script setup lang="ts">
import Home from '@primeicons/vue/home'
import Truck from '@primeicons/vue/truck'
import { shallowRef } from 'vue'
const result = shallowRef('No action selected.')
const items = [
  {
    label: 'View orders',
    icon: Home,
    command: () => (result.value = 'View orders selected in this preview.'),
  },
  {
    label: 'View suppliers',
    icon: Truck,
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
    <div class="relative h-40 rounded-lg border border-surface">
      <Dock :model="items" position="bottom" aria-label="Quick actions"
        ><template #itemicon="{ item }"
          ><component :is="item.icon ?? Home" class="size-6" aria-hidden="true" /></template
      ></Dock>
    </div>
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
