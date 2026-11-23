<script setup lang="ts">
import { nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import vFocustrap from 'primevue/focustrap'
import Pencil from '@primeicons/vue/pencil'

const id = useId()
const active = shallowRef(false)
const trigger = useTemplateRef<{ $el: HTMLElement }>('trigger')

function open() {
  active.value = true
}

// FocusTrap does not restore focus. Send it back to the button that opened the region.
async function close() {
  active.value = false
  await nextTick()
  trigger.value?.$el.focus()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button
      ref="trigger"
      type="button"
      class="self-start"
      :aria-expanded="active"
      :aria-controls="id"
      @click="open"
      ><Pencil aria-hidden="true" />Edit collection note</Button
    >
    <!-- The trap is set up when the element mounts, so render it only while it is active. -->
    <div
      v-if="active"
      :id="id"
      v-focustrap="{ autoFocus: true }"
      class="flex max-w-md flex-col gap-3 rounded-lg border border-surface p-4"
      @keydown.esc.stop="close"
    >
      <p>Tab stays in this region. Press Escape or choose Done to leave.</p>
      <label :for="`${id}-note`">Collection note</label>
      <InputText :id="`${id}-note`" />
      <Button type="button" severity="secondary" outlined class="self-start" @click="close"
        >Done</Button
      >
    </div>
  </div>
</template>
