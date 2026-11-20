<script setup lang="ts">
import Box from '@primeicons/vue/box'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Wallet from '@primeicons/vue/wallet'
import type { MenuItem } from 'primevue/menuitem'

const items: MenuItem[] = [
  {
    label: 'Orders',
    icon: ShoppingCart,
    items: [{ label: 'All orders' }, { label: 'Create order' }, { label: 'Returns' }],
  },
  {
    label: 'Inventory',
    icon: Box,
    items: [{ label: 'Stock levels' }, { label: 'Warehouse transfers' }],
  },
  {
    label: 'Procurement',
    icon: Truck,
    items: [{ label: 'Purchase orders' }, { label: 'Suppliers' }, { label: 'Goods received' }],
  },
  {
    label: 'Finance',
    icon: Wallet,
    items: [{ label: 'Invoices' }, { label: 'Payments' }],
  },
]
</script>

<template>
  <PanelMenu :model="items" multiple class="w-full md:w-80" />
</template>
