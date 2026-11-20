<script setup lang="ts">
import Home from '@primeicons/vue/home'
import type { MenuItem } from 'primevue/menuitem'
import { shallowRef } from 'vue'

const result = shallowRef('')
const home: MenuItem = { label: 'Dashboard', icon: Home, route: '/' }
// The last item is the current page, so it has no route.
const items: MenuItem[] = [
  { label: 'Procurement', route: '/procurement' },
  { label: 'Purchase orders', route: '/procurement/purchase-orders' },
  { label: 'PO-2024-0183' },
]

// Preview only: product code passes the click to RouterLink's navigate(event) instead.
function preview(event: MouseEvent, href: string) {
  event.preventDefault()
  result.value = `This link opens ${href}. Navigation is paused in this preview.`
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Breadcrumb :home="home" :model="items" aria-label="Breadcrumb">
      <template #item="{ item, icon, label, props }">
        <RouterLink v-if="item.route" v-slot="{ href }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="preview($event, href)">
            <component :is="icon" v-if="icon" v-bind="props.icon" aria-hidden="true" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </RouterLink>
        <span v-else v-bind="props.action" aria-current="page">
          <span v-bind="props.label">{{ label }}</span>
        </span>
      </template>
    </Breadcrumb>
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
