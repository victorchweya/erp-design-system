<script setup lang="ts">
import { useId } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'

defineProps<{ companyName: string }>()
const deactivated = defineModel<boolean>('deactivated', { default: false })
const id = useId()
const confirm = useConfirm()

function requestDeactivate() {
  confirm.require({
    group: id,
    header: 'Deactivate company account?',
    message:
      'Users will lose access, open orders will be cancelled, and scheduled deliveries will stop. You can reactivate within 30 days.',
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    blockScroll: true,
    rejectProps: { label: 'Keep account active', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Deactivate account', severity: 'danger' },
    accept: () => (deactivated.value = true),
  })
}
</script>

<template>
  <div class="flex flex-col gap-4 text-sm">
    <div
      class="flex flex-wrap items-start justify-between gap-4 rounded-border border border-surface p-4"
    >
      <div class="flex min-w-0 flex-1 basis-64 flex-col gap-1">
        <p class="font-medium">Deactivate {{ companyName }}</p>
        <p class="text-muted">
          Stops ordering and deliveries for every user in this company. Invoices remain available
          for 7 years.
        </p>
      </div>
      <Button
        v-if="!deactivated"
        type="button"
        severity="danger"
        outlined
        aria-haspopup="dialog"
        @click="requestDeactivate"
        >Deactivate account</Button
      >
      <Button v-else type="button" severity="primary" outlined @click="deactivated = false"
        >Reactivate account</Button
      >
    </div>
    <div role="status">
      <Message v-if="deactivated" severity="warn" size="small"
        >Account deactivated in this preview.</Message
      >
    </div>
  </div>
  <ConfirmDialog :group="id" class="w-[calc(100vw-2rem)] max-w-lg" />
</template>
