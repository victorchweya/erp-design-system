<script setup lang="ts">
// GOAL: Allocate one payment across open invoices and see what is still unallocated before saving.
import { computed, shallowRef, useId, watch } from 'vue'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  autoAllocate,
  buildSave,
  clearAllocations,
  setAllocation,
  validateAllocation,
  type Allocations,
  type AllocationSave,
  type OpenInvoice,
} from './allocation'

const props = withDefaults(
  defineProps<{
    /** Invoices that still have a balance, for one customer. */
    invoices: OpenInvoice[]
    /** The payment received, in Ksh. */
    paymentAmount: number
    /** True while the allocation is being saved. */
    busy?: boolean
  }>(),
  { busy: false },
)
const emit = defineEmits<{
  save: [payload: AllocationSave]
}>()
/** Invoice id to the amount allocated. */
const allocations = defineModel<Allocations>('allocations', { default: () => ({}) })

const id = useId()
const noteId = `${id}-note`
const leaveUnapplied = shallowRef(false)

const check = computed(() =>
  validateAllocation(props.invoices, allocations.value, props.paymentAmount, {
    leaveUnapplied: leaveUnapplied.value,
  }),
)
const stillLabel = computed(() =>
  check.value.overBy > 0 ? 'Over-allocated by' : 'Still to allocate',
)
const stillAmount = computed(() =>
  check.value.overBy > 0 ? check.value.overBy : check.value.remainder,
)
const note = computed(() => {
  if (!check.value.canSave) return check.value.blockedReason
  if (check.value.creditAmount > 0)
    return `${formatCurrency(check.value.creditAmount)} will be added to the customer's credit balance.`
  return ''
})
const rowErrorId = (invoiceId: string) => `${id}-error-${invoiceId}`

// Leaving the payment unapplied drops any allocations, as the backoffice does.
watch(leaveUnapplied, (on) => {
  if (on) allocations.value = clearAllocations()
})

function runAutoAllocate() {
  allocations.value = autoAllocate(props.invoices, props.paymentAmount)
}
function clear() {
  allocations.value = clearAllocations()
}
function update(invoiceId: string, value: number | null) {
  allocations.value = setAllocation(allocations.value, invoiceId, value)
}
function save() {
  if (!check.value.canSave || props.busy) return
  emit('save', buildSave(props.invoices, allocations.value, check.value, leaveUnapplied.value))
}
</script>

<template>
  <div class="flex flex-col gap-3 text-sm">
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <p class="flex min-w-0 flex-wrap gap-x-4 gap-y-1 tabular-nums">
        <span>
          <span class="text-muted">Payment</span>
          <span class="ml-1.5 font-semibold">{{ formatCurrency(paymentAmount) }}</span>
        </span>
        <span>
          <span class="text-muted">Allocated</span>
          <span class="ml-1.5 font-semibold">{{ formatCurrency(check.allocated) }}</span>
        </span>
        <span>
          <span class="text-muted">{{ stillLabel }}</span>
          <span class="ml-1.5 font-semibold">{{ formatCurrency(stillAmount) }}</span>
        </span>
      </p>
      <div class="flex shrink-0 gap-2">
        <Button
          type="button"
          size="small"
          severity="secondary"
          label="Auto-allocate"
          :disabled="leaveUnapplied || busy || paymentAmount <= 0"
          @click="runAutoAllocate"
        />
        <Button
          type="button"
          size="small"
          severity="secondary"
          label="Clear"
          :disabled="leaveUnapplied || busy || !Object.keys(allocations).length"
          @click="clear"
        />
      </div>
    </div>

    <Message v-for="problem in check.problems" :key="problem" severity="error">{{
      problem
    }}</Message>

    <DataTable :value="invoices" dataKey="id" size="small" scrollable>
      <Column field="number" header="Invoice" />
      <Column header="Due date">
        <template #body="{ data }">{{ data.dueDate ? formatDate(data.dueDate) : '—' }}</template>
      </Column>
      <Column header="Balance">
        <template #body="{ data }"
          ><span class="tabular-nums">{{ formatCurrency(data.balance) }}</span></template
        >
      </Column>
      <Column header="Allocate">
        <template #body="{ data }">
          <div class="flex min-w-44 flex-col gap-1">
            <InputNumber
              :modelValue="allocations[data.id] ?? null"
              mode="currency"
              currency="KES"
              locale="en-KE"
              placeholder="Ksh 0"
              size="small"
              :min="0"
              :max="data.balance"
              :disabled="leaveUnapplied || busy"
              :invalid="!!check.rowErrors[data.id]"
              :aria-label="`Allocate to ${data.number}`"
              :pt="{
                pcInputText: {
                  root: {
                    'aria-describedby': check.rowErrors[data.id] ? rowErrorId(data.id) : undefined,
                    'aria-invalid': check.rowErrors[data.id] ? true : undefined,
                  },
                },
              }"
              fluid
              @update:modelValue="(value: number | null) => update(data.id, value)"
            />
            <Message
              v-if="check.rowErrors[data.id]"
              :id="rowErrorId(data.id)"
              severity="error"
              variant="simple"
              size="small"
              >{{ check.rowErrors[data.id] }}</Message
            >
          </div>
        </template>
      </Column>
      <template #empty>There are no open invoices for this customer.</template>
    </DataTable>

    <div class="flex items-center gap-2">
      <Checkbox
        v-model="leaveUnapplied"
        :inputId="`${id}-unapplied`"
        binary
        :disabled="busy || paymentAmount <= 0"
      />
      <label :for="`${id}-unapplied`">Leave the payment unapplied, as customer credit</label>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <p :id="noteId" role="status" class="min-w-0 text-muted">{{ note }}</p>
      <Button
        type="button"
        size="small"
        label="Save allocation"
        class="shrink-0"
        :loading="busy"
        :disabled="!check.canSave || busy"
        :aria-describedby="note ? noteId : undefined"
        @click="save"
      />
    </div>
  </div>
</template>
