<script setup lang="ts">
import { shallowRef } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Wallet from '@primeicons/vue/wallet'
import Plus from '@primeicons/vue/plus'

const result = shallowRef('No action selected.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

const items: MenuItem[] = [
  {
    label: 'Procurement',
    icon: ShoppingCart,
    items: [
      { label: 'Purchase orders', command: () => run('Purchase orders') },
      { label: 'Suppliers', command: () => run('Suppliers') },
    ],
  },
  {
    label: 'Logistics',
    icon: Truck,
    items: [
      { label: 'Deliveries', command: () => run('Deliveries') },
      { label: 'Warehouses', command: () => run('Warehouses') },
    ],
  },
  {
    label: 'Finance',
    icon: Wallet,
    items: [
      { label: 'Invoices', command: () => run('Invoices') },
      { label: 'Payments', command: () => run('Payments') },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Menubar :model="items" aria-label="Main">
      <template #end>
        <Button type="button" size="small" @click="run('New order')">
          <Plus aria-hidden="true" focusable="false" />
          New order
        </Button>
      </template>
    </Menubar>
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
