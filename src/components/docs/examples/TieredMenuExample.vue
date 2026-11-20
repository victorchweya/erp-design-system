<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type TieredMenu from 'primevue/tieredmenu'
import type { MenuItem } from 'primevue/menuitem'
import ChevronDown from '@primeicons/vue/chevron-down'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Receipt from '@primeicons/vue/receipt'

const id = useId()
const menu = useTemplateRef<InstanceType<typeof TieredMenu>>('menu')
const open = shallowRef(false)
const result = shallowRef('Nothing created yet.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

// Keep to two levels. Deeper submenus are hard to reach with a pointer or the keyboard.
const items: MenuItem[] = [
  { label: 'Purchase order', icon: ShoppingCart, command: () => run('Purchase order') },
  { label: 'Delivery', icon: Truck, command: () => run('Delivery') },
  {
    label: 'Invoice',
    icon: Receipt,
    items: [
      { label: 'Customer invoice', command: () => run('Customer invoice') },
      { label: 'Credit note', command: () => run('Credit note') },
      { label: 'Supplier bill', command: () => run('Supplier bill') },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Button
      type="button"
      aria-haspopup="menu"
      :aria-controls="id"
      :aria-expanded="open"
      @click="menu?.toggle($event)"
    >
      Create
      <ChevronDown aria-hidden="true" focusable="false" />
    </Button>
    <TieredMenu
      :id="id"
      ref="menu"
      :model="items"
      popup
      aria-label="Create"
      @show="open = true"
      @hide="open = false"
    />
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
