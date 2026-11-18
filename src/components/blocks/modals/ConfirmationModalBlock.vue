<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

const id = useId()
const confirm = useConfirm()
const visible = shallowRef(false)
const confirmed = shallowRef(false)
function open(event: Event) {
  confirm.require({
    group: id,
    target: event.currentTarget as HTMLElement,
    header: 'Confirm this order?',
    message:
      'Confirm order FTF-1042 for Green Basket with 12 items? Check quantities and delivery details before proceeding.',
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    blockScroll: true,
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Confirm order' },
    accept: () => {
      confirmed.value = true
      visible.value = false
    },
    reject: () => (visible.value = false),
    onShow: () => (visible.value = true),
    onHide: () => (visible.value = false),
  })
}
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Button
      type="button"
      aria-haspopup="dialog"
      :aria-controls="`${id}-confirmation`"
      :aria-expanded="visible"
      @click="open"
      >Review confirmation</Button
    >
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !confirmed }">
      {{ confirmed ? 'Order FTF-1042 confirmed in this preview.' : '' }}
    </p>
    <Button
      v-if="confirmed"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="confirmed = false"
      >Reset preview</Button
    >
  </div>
  <ConfirmDialog :id="`${id}-confirmation`" :group="id" class="w-[calc(100vw-2rem)] max-w-lg" />
</template>
