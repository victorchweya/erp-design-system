<script setup lang="ts">
import { nextTick, shallowRef, useId } from 'vue'
import vFocustrap from 'primevue/focustrap'
const id = useId()
const active = shallowRef(false)
let trigger: HTMLElement | null = null
async function start(event: Event) {
  trigger = event.currentTarget as HTMLElement
  active.value = true
  await nextTick()
  document.getElementById(id)?.focus()
}
async function release() {
  active.value = false
  await nextTick()
  trigger?.focus()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button type="button" :disabled="active" class="self-start" @click="start"
      >Try focus trap</Button
    >
    <div
      v-focustrap="{ disabled: !active, autoFocus: false }"
      class="flex flex-col gap-3 rounded-lg border border-surface p-4"
      @keydown.esc.stop="release"
    >
      <p>When active, Tab stays in this region. Press Escape or release focus to leave.</p>
      <label :for="id">Supplier name</label><InputText :id="id" /><Button
        type="button"
        severity="secondary"
        outlined
        class="self-start"
        @click="release"
        >Release focus</Button
      >
    </div>
    <p role="status">{{ active ? 'Focus trap active.' : 'Focus trap inactive.' }}</p>
  </div>
</template>
