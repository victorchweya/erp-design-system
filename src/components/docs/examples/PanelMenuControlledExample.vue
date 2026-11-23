<script setup lang="ts">
import Box from '@primeicons/vue/box'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Wallet from '@primeicons/vue/wallet'
import type { PanelMenuExpandedKeys } from 'primevue/panelmenu'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref } from 'vue'

const items: MenuItem[] = [
  {
    key: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    items: [
      { key: 'orders-all', label: 'All orders' },
      { key: 'orders-returns', label: 'Returns' },
    ],
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: Box,
    items: [
      { key: 'inventory-stock', label: 'Stock levels' },
      { key: 'inventory-transfers', label: 'Warehouse transfers' },
    ],
  },
  {
    key: 'procurement',
    label: 'Procurement',
    icon: Truck,
    items: [
      { key: 'procurement-orders', label: 'Purchase orders' },
      { key: 'procurement-suppliers', label: 'Suppliers' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: Wallet,
    items: [
      { key: 'finance-invoices', label: 'Invoices' },
      { key: 'finance-payments', label: 'Payments' },
    ],
  },
]

const expandedKeys = ref<PanelMenuExpandedKeys>({ orders: true })

const openModules = computed(() =>
  items.filter((item) => item.key && expandedKeys.value[item.key]).map((item) => item.label),
)
const summary = computed(() =>
  openModules.value.length ? `Open: ${openModules.value.join(', ')}.` : 'All modules collapsed.',
)

function expandAll() {
  expandedKeys.value = Object.fromEntries(
    items.filter((item) => item.key && item.items?.length).map((item) => [item.key, true]),
  )
}

function collapseAll() {
  expandedKeys.value = {}
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <Button
        type="button"
        label="Expand all"
        severity="primary"
        outlined
        size="small"
        @click="expandAll"
      />
      <Button
        type="button"
        label="Collapse all"
        severity="primary"
        outlined
        size="small"
        @click="collapseAll"
      />
    </div>
    <PanelMenu v-model:expandedKeys="expandedKeys" :model="items" class="w-full md:w-80" />
    <p role="status" class="text-muted">{{ summary }}</p>
  </div>
</template>
