<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type ContextMenu from 'primevue/contextmenu'
import type Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Eye from '@primeicons/vue/eye'
import Copy from '@primeicons/vue/copy'
import Print from '@primeicons/vue/print'
import Trash from '@primeicons/vue/trash'

interface Order {
  id: string
  supplier: string
  status: string
}

const id = useId()
const orders: Order[] = [
  { id: 'PO-2024-0183', supplier: 'Kilimo Fresh Ltd', status: 'Sent' },
  { id: 'PO-2024-0184', supplier: 'Rift Valley Growers', status: 'Draft' },
  { id: 'PO-2024-0185', supplier: 'Mwea Rice Co-op', status: 'Received' },
]
const contextMenu = useTemplateRef<InstanceType<typeof ContextMenu>>('contextMenu')
const actionsMenu = useTemplateRef<InstanceType<typeof Menu>>('actionsMenu')
const selected = shallowRef<Order>(orders[0]!)
const openFor = shallowRef<string | null>(null)
const result = shallowRef('No action selected.')

function run(action: string) {
  result.value = `${action} ${selected.value.id} selected in this preview.`
}

// One model serves both menus, so pointer and keyboard users get the same actions.
const items: MenuItem[] = [
  { label: 'View order', icon: Eye, command: () => run('View') },
  { label: 'Duplicate order', icon: Copy, command: () => run('Duplicate') },
  { label: 'Print order', icon: Print, command: () => run('Print') },
  { separator: true },
  {
    label: 'Delete draft',
    icon: Trash,
    disabled: () => selected.value.status !== 'Draft',
    command: () => run('Delete'),
  },
]

function onContextMenu(event: MouseEvent, order: Order) {
  selected.value = order
  contextMenu.value?.show(event)
}

function onActions(event: MouseEvent, order: Order) {
  selected.value = order
  actionsMenu.value?.toggle(event)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-sm text-muted-color">Right-click an order, or use its actions button.</p>
    <ul class="rounded-lg border border-surface">
      <li
        v-for="order in orders"
        :key="order.id"
        class="flex items-center justify-between gap-4 border-b border-surface px-4 py-3 text-sm last:border-b-0"
        @contextmenu.prevent="onContextMenu($event, order)"
      >
        <div class="min-w-0">
          <p class="font-medium">{{ order.id }}</p>
          <p class="truncate text-muted-color">{{ order.supplier }} · {{ order.status }}</p>
        </div>
        <Button
          type="button"
          severity="secondary"
          text
          iconOnly
          :aria-label="`Actions for ${order.id}`"
          aria-haspopup="menu"
          :aria-controls="`${id}-actions`"
          :aria-expanded="openFor === order.id"
          @click="onActions($event, order)"
        >
          <EllipsisV aria-hidden="true" focusable="false" />
        </Button>
      </li>
    </ul>
    <ContextMenu ref="contextMenu" :model="items" aria-label="Order actions" />
    <Menu
      :id="`${id}-actions`"
      ref="actionsMenu"
      :model="items"
      popup
      aria-label="Order actions"
      @show="openFor = selected.id"
      @hide="openFor = null"
    />
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
