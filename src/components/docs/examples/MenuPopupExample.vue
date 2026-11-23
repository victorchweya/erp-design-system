<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import ChevronDown from '@primeicons/vue/chevron-down'
import Pencil from '@primeicons/vue/pencil'
import Copy from '@primeicons/vue/copy'
import Print from '@primeicons/vue/print'
import Ban from '@primeicons/vue/ban'

const id = useId()
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const open = shallowRef(false)
const result = shallowRef('No action selected.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

const items: MenuItem[] = [
  { label: 'Edit order', icon: Pencil, command: () => run('Edit order') },
  { label: 'Duplicate order', icon: Copy, command: () => run('Duplicate order') },
  { label: 'Print order', icon: Print, command: () => run('Print order') },
  { separator: true },
  { label: 'Cancel order', icon: Ban, command: () => run('Cancel order') },
]
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Button
      type="button"
      severity="primary"
      outlined
      aria-haspopup="menu"
      :aria-controls="id"
      :aria-expanded="open"
      @click="menu?.toggle($event)"
    >
      More actions
      <ChevronDown aria-hidden="true" focusable="false" />
    </Button>
    <Menu
      :id="id"
      ref="menu"
      :model="items"
      popup
      aria-label="Order PO-2024-0183 actions"
      @show="open = true"
      @hide="open = false"
    />
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
