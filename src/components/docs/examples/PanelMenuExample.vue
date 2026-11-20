<script setup lang="ts">
import Box from '@primeicons/vue/box'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Wallet from '@primeicons/vue/wallet'
import type { MenuItem } from 'primevue/menuitem'
import { shallowRef } from 'vue'

const result = shallowRef('No page selected.')
const select = (page: string) => () => (result.value = `${page} selected in this preview.`)

const items: MenuItem[] = [
  {
    label: 'Orders',
    icon: ShoppingCart,
    items: [
      { label: 'All orders', command: select('All orders') },
      { label: 'Create order', command: select('Create order') },
      { label: 'Returns', command: select('Returns') },
    ],
  },
  {
    label: 'Inventory',
    icon: Box,
    items: [
      { label: 'Stock levels', command: select('Stock levels') },
      { label: 'Warehouse transfers', command: select('Warehouse transfers') },
    ],
  },
  {
    label: 'Procurement',
    icon: Truck,
    items: [
      { label: 'Purchase orders', command: select('Purchase orders') },
      { label: 'Suppliers', command: select('Suppliers') },
      { label: 'Goods received', command: select('Goods received') },
    ],
  },
  {
    label: 'Finance',
    icon: Wallet,
    items: [
      { label: 'Invoices', command: select('Invoices') },
      { label: 'Payments', command: select('Payments') },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <PanelMenu :model="items" class="w-full md:w-80" />
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
