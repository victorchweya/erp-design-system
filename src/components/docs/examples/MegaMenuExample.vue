<script setup lang="ts">
import { shallowRef } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'

const result = shallowRef('No page selected.')

function go(label: string) {
  return () => (result.value = `${label} selected in this preview.`)
}

// Each top-level item holds columns (outer array). Each column holds labelled groups.
const items: MenuItem[] = [
  {
    label: 'Procurement',
    icon: ShoppingCart,
    items: [
      [
        {
          label: 'Purchasing',
          items: [
            { label: 'Purchase orders', command: go('Purchase orders') },
            { label: 'Requisitions', command: go('Requisitions') },
            { label: 'Goods received', command: go('Goods received') },
          ],
        },
      ],
      [
        {
          label: 'Suppliers',
          items: [
            { label: 'Supplier list', command: go('Supplier list') },
            { label: 'Price lists', command: go('Price lists') },
          ],
        },
      ],
    ],
  },
  {
    label: 'Logistics',
    icon: Truck,
    items: [
      [
        {
          label: 'Deliveries',
          items: [
            { label: 'Delivery schedule', command: go('Delivery schedule') },
            { label: 'Routes', command: go('Routes') },
          ],
        },
      ],
      [
        {
          label: 'Warehouses',
          items: [
            { label: 'Stock levels', command: go('Stock levels') },
            { label: 'Transfers', command: go('Transfers') },
          ],
        },
      ],
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <MegaMenu :model="items" aria-label="Main" />
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
