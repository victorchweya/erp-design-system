<script setup lang="ts">
import { nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import Trash from '@primeicons/vue/trash'

const id = useId()
const confirm = useConfirm()
const visible = shallowRef(false)
const removed = shallowRef(false)
const resetButton = useTemplateRef<{ $el: HTMLElement }>('reset')

// The trigger is removed after a delete, so move focus to the next useful control.
function remove() {
  removed.value = true
  void nextTick(() => resetButton.value?.$el.focus())
}

function requestDelete() {
  confirm.require({
    group: id,
    header: 'Delete supplier?',
    message:
      'Kilimo Fresh Ltd will be removed from supplier lists. Purchase orders already sent to them are kept.',
    icon: Trash,
    defaultFocus: 'reject',
    rejectProps: { label: 'Keep supplier', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Delete supplier', severity: 'danger' },
    accept: remove,
    onShow: () => (visible.value = true),
    onHide: () => (visible.value = false),
  })
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p role="status" class="text-sm text-muted-color">
      {{ removed ? 'Kilimo Fresh Ltd deleted in this preview.' : 'Supplier: Kilimo Fresh Ltd' }}
    </p>
    <Button
      v-if="!removed"
      type="button"
      severity="danger"
      outlined
      aria-haspopup="dialog"
      :aria-controls="`${id}-confirm`"
      :aria-expanded="visible"
      @click="requestDelete"
      ><Trash aria-hidden="true" />Delete supplier</Button
    >
    <Button
      v-else
      ref="reset"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="removed = false"
      >Reset preview</Button
    >
  </div>
  <ConfirmDialog :id="`${id}-confirm`" :group="id" class="w-[calc(100vw-2rem)] max-w-md" />
</template>
