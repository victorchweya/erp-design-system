<script setup lang="ts">
import { shallowRef } from 'vue'
import Plus from '@primeicons/vue/plus'
import Pencil from '@primeicons/vue/pencil'
import Copy from '@primeicons/vue/copy'
const result = shallowRef('Open the action menu.')
const items = [
  { label: 'Add produce', icon: Plus, command: () => (result.value = 'Add produce selected.') },
  { label: 'Edit order', icon: Pencil, command: () => (result.value = 'Edit order selected.') },
  {
    label: 'Duplicate order',
    icon: Copy,
    command: () => (result.value = 'Duplicate order selected.'),
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="relative h-64">
      <SpeedDial
        :model="items"
        direction="up"
        class="absolute bottom-0 left-0"
        :buttonProps="{
          type: 'button',
          'aria-label': 'Order actions',
          iconOnly: true,
          rounded: true,
        }"
      />
    </div>
    <p role="status" class="text-muted-color">{{ result }}</p>
  </div>
</template>
