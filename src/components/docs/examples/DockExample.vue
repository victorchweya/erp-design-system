<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef } from 'vue'
import Plus from '@primeicons/vue/plus'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Users from '@primeicons/vue/users'
import ChartBar from '@primeicons/vue/chart-bar'

const result = shallowRef('No action selected.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

// Every item needs a label: it becomes the accessible name and the tooltip.
const items: { label: string; icon: Component; command: () => void }[] = [
  { label: 'New order', icon: Plus, command: () => run('New order') },
  { label: 'Orders', icon: ShoppingCart, command: () => run('Orders') },
  { label: 'Deliveries', icon: Truck, command: () => run('Deliveries') },
  { label: 'Suppliers', icon: Users, command: () => run('Suppliers') },
  { label: 'Reports', icon: ChartBar, command: () => run('Reports') },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="relative h-40 rounded-lg border border-surface">
      <Dock
        :model="items"
        position="bottom"
        aria-label="Quick actions"
        :tooltipOptions="{ position: 'top', event: 'hover' }"
      >
        <template #itemicon="{ item }">
          <component :is="item.icon" class="size-6" aria-hidden="true" />
        </template>
      </Dock>
    </div>
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
