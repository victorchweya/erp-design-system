<script setup lang="ts">
import { shallowRef } from 'vue'
import { formatCurrency } from '@/utils/format'
import PaymentAllocationBlock from './PaymentAllocationBlock.vue'
import type { Allocations, AllocationSave, OpenInvoice } from './allocation'

const props = defineProps<{
  invoices: OpenInvoice[]
  paymentAmount: number
  /** Allocations to start from, for example to show an error state. */
  initialAllocations?: Allocations
}>()

const allocations = shallowRef<Allocations>({ ...props.initialAllocations })
const saved = shallowRef<AllocationSave | null>(null)
const busy = shallowRef(false)

// Replace with your API call.
function save(payload: AllocationSave) {
  busy.value = true
  setTimeout(() => {
    saved.value = payload
    busy.value = false
  }, 600)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <PaymentAllocationBlock
      v-model:allocations="allocations"
      :invoices="invoices"
      :paymentAmount="paymentAmount"
      :busy="busy"
      @save="save"
    />
    <p v-if="saved" role="status" class="text-sm text-muted">
      Saved {{ saved.allocations.length }}
      {{ saved.allocations.length === 1 ? 'allocation' : 'allocations' }} in this preview<template
        v-if="saved.creditAmount > 0"
        >, and {{ formatCurrency(saved.creditAmount) }} as customer credit</template
      >.
    </p>
  </div>
</template>
