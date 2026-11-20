<script setup lang="ts">
import { shallowRef, useId } from 'vue'

type Position = 'left' | 'right' | 'top' | 'bottom'

const id = useId()
const positions: { value: Position; label: string; use: string; classes: string }[] = [
  {
    value: 'right',
    label: 'Right',
    use: 'Record details and edit forms.',
    classes: 'w-full sm:w-96',
  },
  { value: 'left', label: 'Left', use: 'Filters and navigation.', classes: 'w-full sm:w-80' },
  {
    value: 'top',
    label: 'Top',
    use: 'Short notices that apply to the whole page.',
    classes: 'h-auto',
  },
  {
    value: 'bottom',
    label: 'Bottom',
    use: 'Actions on small screens, where it sits near the thumb.',
    classes: 'h-auto',
  },
]
const active = shallowRef(positions[0]!)
const visible = shallowRef(false)
let trigger: HTMLElement | null = null

function open(event: Event, position: (typeof positions)[number]) {
  trigger = event.currentTarget as HTMLElement
  active.value = position
  visible.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button
      v-for="position in positions"
      :key="position.value"
      type="button"
      severity="secondary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible && active.value === position.value"
      @click="open($event, position)"
      >{{ position.label }}</Button
    >
  </div>
  <Drawer
    :id="id"
    v-model:visible="visible"
    :position="active.value"
    header="Delivery DLV-2291"
    aria-label="Delivery DLV-2291"
    :class="active.classes"
    @after-hide="trigger?.focus()"
  >
    <div class="flex flex-col gap-4 text-sm">
      <p class="text-muted-color">{{ active.label }} drawer. {{ active.use }}</p>
      <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt class="text-muted-color">Customer</dt>
        <dd>Green Basket, Westlands</dd>
        <dt class="text-muted-color">Window</dt>
        <dd>Friday, 08:00–12:00</dd>
        <dt class="text-muted-color">Load</dt>
        <dd>12 crates</dd>
      </dl>
    </div>
  </Drawer>
</template>
