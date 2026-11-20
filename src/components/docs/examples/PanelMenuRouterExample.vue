<script setup lang="ts">
import ChevronDown from '@primeicons/vue/chevron-down'
import ChevronRight from '@primeicons/vue/chevron-right'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Wallet from '@primeicons/vue/wallet'
import type { MenuItem } from 'primevue/menuitem'
import { shallowRef } from 'vue'

const result = shallowRef('No page opened.')

const items: MenuItem[] = [
  {
    label: 'Orders',
    icon: ShoppingCart,
    items: [
      { label: 'Order entry', route: '/ui-blocks/order-entry' },
      { label: 'Product detail', route: '/ui-blocks/product-detail' },
    ],
  },
  {
    label: 'Finance',
    icon: Wallet,
    items: [
      { label: 'Revenue trend', route: '/ui-blocks/charts/area' },
      { label: 'Order status', route: '/ui-blocks/charts/doughnut-pie' },
    ],
  },
]

// Preview only: product code passes the click to RouterLink's navigate(event) instead.
function preview(event: MouseEvent, href: string) {
  event.preventDefault()
  result.value = `This link opens ${href}. Navigation is paused in this preview.`
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <PanelMenu :model="items" class="w-full md:w-80">
      <template #item="{ item, icon, label, props, root, active }">
        <RouterLink v-if="item.route" v-slot="{ href }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="preview($event, href)">
            <component :is="icon" v-if="icon" v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </RouterLink>
        <a v-else-if="root" class="p-panelmenu-header-link" tabindex="-1">
          <component
            :is="active ? ChevronDown : ChevronRight"
            class="p-panelmenu-submenu-icon"
            aria-hidden="true"
          />
          <component :is="icon" v-if="icon" v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
        </a>
      </template>
    </PanelMenu>
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
