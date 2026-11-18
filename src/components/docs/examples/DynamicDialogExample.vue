<script setup lang="ts">
import { useDialog } from 'primevue/usedialog'
import DeliveryDetailsContent from './DeliveryDetailsContent.vue'
const dialog = useDialog()
function open() {
  dialog.open(DeliveryDetailsContent, {
    props: {
      header: 'Delivery details',
      modal: true,
      style: { width: '32rem', maxWidth: 'calc(100vw - 2rem)' },
    },
  })
}
</script>

<template>
  <Button type="button" @click="open">Open delivery details</Button><DynamicDialog />
</template>
