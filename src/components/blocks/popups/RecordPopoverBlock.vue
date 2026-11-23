<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type Popover from 'primevue/popover'
const id = useId()
const popover = useTemplateRef<InstanceType<typeof Popover>>('popover')
const visible = shallowRef(false)
let trigger: HTMLElement | null = null
function toggle(event: Event) {
  trigger = event.currentTarget as HTMLElement
  popover.value?.toggle(event)
}
function close() {
  popover.value?.hide()
  trigger?.focus()
}
</script>

<template>
  <Button
    type="button"
    severity="primary"
    outlined
    aria-haspopup="dialog"
    :aria-controls="`${id}-popover`"
    :aria-expanded="visible"
    @click="toggle"
    >Quick view customer</Button
  >
  <Popover
    :id="`${id}-popover`"
    ref="popover"
    :aria-labelledby="`${id}-title`"
    class="max-w-[calc(100vw-2rem)]"
    @show="visible = true"
    @hide="visible = false"
  >
    <div class="flex w-64 max-w-full flex-col gap-4 text-sm">
      <div class="space-y-2">
        <h3 :id="`${id}-title`" class="text-lg font-medium">Green Basket</h3>
        <Tag severity="success">Active customer</Tag>
      </div>
      <dl class="space-y-3">
        <div class="space-y-1">
          <dt class="text-muted">Contact</dt>
          <dd>Amina Hassan</dd>
        </div>
        <div class="space-y-1">
          <dt class="text-muted">Location</dt>
          <dd>Nairobi</dd>
        </div>
        <div class="space-y-1">
          <dt class="text-muted">Delivery instructions</dt>
          <dd>Use the loading entrance on Market Road.</dd>
        </div>
      </dl>
      <div class="flex justify-end">
        <Button type="button" severity="secondary" outlined size="small" autofocus @click="close"
          >Close quick view</Button
        >
      </div>
    </div>
  </Popover>
</template>
