<script setup lang="ts">
import { onBeforeUnmount, shallowRef, useId } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { ToastMessageOptions } from 'primevue/toast'
import Download from '@primeicons/vue/download'

const group = useId()
const toast = useToast()
const exporting = shallowRef(false)
let timer: ReturnType<typeof setTimeout> | undefined

function exportInvoices() {
  if (exporting.value) return
  exporting.value = true
  // No life: the progress toast stays until the task finishes.
  const progress: ToastMessageOptions = {
    group,
    severity: 'info',
    summary: 'Exporting invoices',
    detail: 'Preparing 128 invoices for March. You can keep working.',
  }
  toast.add(progress)
  timer = setTimeout(() => {
    toast.remove(progress)
    toast.add({
      group,
      severity: 'success',
      summary: 'Export ready',
      detail: 'invoices-march.csv is in your downloads list.',
      life: 5000,
    })
    exporting.value = false
    timer = undefined
  }, 2000)
}

onBeforeUnmount(() => {
  if (timer !== undefined) clearTimeout(timer)
  toast.removeGroup(group)
})
</script>

<template>
  <Toast :group="group" />
  <div class="flex flex-wrap gap-2">
    <Button type="button" :disabled="exporting" @click="exportInvoices"><Download aria-hidden="true" />Export invoices</Button>
    <Button type="button" severity="secondary" outlined @click="toast.removeGroup(group)">
      Dismiss all
    </Button>
  </div>
</template>
