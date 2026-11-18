<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

const id = useId()
const confirm = useConfirm()
const visible = shallowRef(false)
const archived = shallowRef(false)
function open(event: Event) {
  confirm.require({
    group: id,
    target: event.currentTarget as HTMLElement,
    message: 'Archive draft order FTF-1042?',
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    rejectProps: { label: 'Keep draft', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Archive draft', severity: 'danger' },
    accept: () => {
      archived.value = true
      visible.value = false
    },
    reject: () => (visible.value = false),
    onShow: () => (visible.value = true),
    onHide: () => (visible.value = false),
  })
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p class="text-sm text-muted">Ask for confirmation beside the action that triggered it.</p>
    <Button
      type="button"
      severity="danger"
      outlined
      aria-haspopup="dialog"
      :aria-controls="`${id}-confirmation`"
      :aria-expanded="visible"
      @click="open"
      >Archive draft</Button
    >
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !archived }">
      {{ archived ? 'Draft order archived in this preview.' : '' }}
    </p>
    <Button
      v-if="archived"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="archived = false"
      >Reset preview</Button
    >
  </div>
  <ConfirmPopup
    :id="`${id}-confirmation`"
    :group="id"
    aria-label="Archive draft order"
    class="max-w-[calc(100vw-2rem)]"
  />
</template>
