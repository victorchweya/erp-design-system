<script setup lang="ts">
import { shallowRef } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Plus from '@primeicons/vue/plus'
import Users from '@primeicons/vue/users'
import FileExport from '@primeicons/vue/file-export'
import ChartBar from '@primeicons/vue/chart-bar'

const result = shallowRef('No action selected.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

// Items with nested items render as labelled groups.
const items: MenuItem[] = [
  {
    label: 'Procurement',
    items: [
      { label: 'Purchase orders', icon: ShoppingCart, command: () => run('Purchase orders') },
      { label: 'New purchase order', icon: Plus, command: () => run('New purchase order') },
      { label: 'Suppliers', icon: Users, command: () => run('Suppliers') },
    ],
  },
  { separator: true },
  {
    label: 'Reports',
    items: [
      { label: 'Spend by supplier', icon: ChartBar, command: () => run('Spend by supplier') },
      { label: 'Export to Excel', icon: FileExport, disabled: true },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Menu :model="items" aria-label="Procurement" class="w-full md:w-64" />
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
