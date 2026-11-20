<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDialog } from 'primevue/usedialog'
import DynamicDialogRescheduleContent from './DynamicDialogRescheduleContent.vue'

const dialog = useDialog()
const deliveryWindow = shallowRef('Friday, 08:00–12:00')

function open() {
  dialog.open(DynamicDialogRescheduleContent, {
    props: {
      header: 'Reschedule delivery',
      modal: true,
      draggable: false,
      style: { width: '28rem', maxWidth: 'calc(100vw - 2rem)' },
    },
    data: { delivery: 'DLV-2291', customer: 'Green Basket', window: deliveryWindow.value },
    onClose: (options) => {
      const result = options?.data as { window: string } | undefined
      if (result) deliveryWindow.value = result.window
    },
  })
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p role="status" class="text-sm text-muted-color">
      Delivery DLV-2291 is booked for {{ deliveryWindow }}.
    </p>
    <Button type="button" aria-haspopup="dialog" @click="open">Reschedule delivery</Button>
  </div>
  <!-- Render one DynamicDialog per app, usually in App.vue. It is here so the example runs. -->
  <DynamicDialog />
</template>
