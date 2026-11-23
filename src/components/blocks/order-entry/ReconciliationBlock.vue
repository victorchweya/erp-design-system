<script setup lang="ts">
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
// GOAL: Check what arrived against what was ordered, line by line, and say why anything was rejected.
import { computed, reactive, useId } from 'vue'
import { formatNumber } from '@/utils/format'
import {
  acceptedQuantity,
  reconciliationProblems,
  reconciliationResults,
  reconciliationTotals,
  rejectionReasons,
  type ReconciliationField,
  type ReconciliationLine,
  type ReconciliationResult,
} from './reconciliation'

const lines = defineModel<ReconciliationLine[]>('lines', { required: true })
const emit = defineEmits<{ save: [results: ReconciliationResult[]] }>()
const id = useId()
const touched = reactive(new Set<string>())

const problems = computed(() => reconciliationProblems(lines.value))
const totals = computed(() => reconciliationTotals(lines.value))
const summary = computed(() => [
  { label: 'Ordered', value: totals.value.ordered },
  { label: 'Received', value: totals.value.received },
  { label: 'Rejected', value: totals.value.rejected },
  { label: 'Accepted', value: totals.value.accepted },
])
const saveHint = computed(() => {
  if (!lines.value.length) return 'There are no lines to reconcile.'
  const count = problems.value.length
  if (!count) return 'Every line checks out.'
  return `Fix ${count} ${count === 1 ? 'problem' : 'problems'} to save.`
})

function errorOf(line: ReconciliationLine, field: ReconciliationField) {
  if (!touched.has(line.id)) return undefined
  return problems.value.find((issue) => issue.lineId === line.id && issue.field === field)?.message
}
const errorId = (line: ReconciliationLine, field: ReconciliationField) =>
  `${id}-${line.id}-${field}-error`
const describedBy = (line: ReconciliationLine, field: ReconciliationField) =>
  errorOf(line, field) ? errorId(line, field) : undefined

function update(line: ReconciliationLine, patch: Partial<ReconciliationLine>) {
  touched.add(line.id)
  const next = { ...line, ...patch }
  if (!next.rejected) next.reason = null
  lines.value = lines.value.map((item) => (item.id === line.id ? next : item))
}
function save() {
  if (problems.value.length || !lines.value.length) return
  emit('save', reconciliationResults(lines.value))
}
</script>

<template>
  <section class="flex min-w-0 flex-col gap-3 text-sm" aria-label="Receiving reconciliation">
    <dl class="flex flex-wrap gap-x-4 gap-y-1" aria-label="Totals">
      <div v-for="item in summary" :key="item.label" class="flex gap-1.5">
        <dt class="text-muted">{{ item.label }}</dt>
        <dd class="font-medium tabular-nums">{{ formatNumber(item.value) }}</dd>
      </div>
    </dl>

    <div class="overflow-x-auto">
      <DataTable
        :value="lines"
        dataKey="id"
        size="small"
        :tableStyle="{ minWidth: '46rem' }"
        :tableProps="{ 'aria-label': 'Receiving reconciliation' }"
      >
        <Column header="Produce">
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="font-medium">{{ data.name }}</span>
              <span class="text-xs text-muted">{{ data.pack }}</span>
            </div>
          </template>
        </Column>
        <Column header="Ordered" bodyClass="tabular-nums">
          <template #body="{ data }">{{ formatNumber(data.ordered) }}</template>
        </Column>
        <Column header="Received">
          <template #body="{ data }">
            <div class="flex flex-col gap-1">
              <InputNumber
                :modelValue="data.received"
                :aria-label="`${data.name} received`"
                :min="0"
                :maxFractionDigits="0"
                :useGrouping="false"
                :invalid="!!errorOf(data, 'received')"
                :pt="{
                  pcInputText: { root: { 'aria-describedby': describedBy(data, 'received') } },
                }"
                size="small"
                inputClass="w-20 tabular-nums"
                @update:modelValue="update(data, { received: $event })"
                @blur="touched.add(data.id)"
              />
              <Message
                v-if="errorOf(data, 'received')"
                :id="errorId(data, 'received')"
                severity="error"
                variant="simple"
                size="small"
                >{{ errorOf(data, 'received') }}</Message
              >
            </div>
          </template>
        </Column>
        <Column header="Rejected">
          <template #body="{ data }">
            <div class="flex flex-col gap-1">
              <InputNumber
                :modelValue="data.rejected"
                :aria-label="`${data.name} rejected`"
                :min="0"
                :maxFractionDigits="0"
                :useGrouping="false"
                :invalid="!!errorOf(data, 'rejected')"
                :pt="{
                  pcInputText: { root: { 'aria-describedby': describedBy(data, 'rejected') } },
                }"
                size="small"
                inputClass="w-20 tabular-nums"
                @update:modelValue="update(data, { rejected: $event })"
                @blur="touched.add(data.id)"
              />
              <Message
                v-if="errorOf(data, 'rejected')"
                :id="errorId(data, 'rejected')"
                severity="error"
                variant="simple"
                size="small"
                >{{ errorOf(data, 'rejected') }}</Message
              >
            </div>
          </template>
        </Column>
        <Column header="Reason">
          <template #body="{ data }">
            <div class="flex flex-col gap-1">
              <Select
                :modelValue="data.reason"
                :options="rejectionReasons"
                optionLabel="label"
                optionValue="value"
                :aria-label="`${data.name} rejection reason`"
                :placeholder="data.rejected ? 'Select reason' : 'None rejected'"
                :disabled="!data.rejected"
                :invalid="!!errorOf(data, 'reason')"
                :pt="{ label: { 'aria-describedby': describedBy(data, 'reason') } }"
                size="small"
                class="w-full min-w-36"
                @update:modelValue="update(data, { reason: $event })"
                @blur="touched.add(data.id)"
              />
              <Message
                v-if="errorOf(data, 'reason')"
                :id="errorId(data, 'reason')"
                severity="error"
                variant="simple"
                size="small"
                >{{ errorOf(data, 'reason') }}</Message
              >
            </div>
          </template>
        </Column>
        <Column header="Accepted" bodyClass="tabular-nums">
          <template #body="{ data }">{{ formatNumber(acceptedQuantity(data)) }}</template>
        </Column>
        <template #empty>There are no lines to reconcile.</template>
      </DataTable>
    </div>

    <Message v-if="problems.length" severity="warn" size="small">
      <template #icon="{ class: iconClass }">
        <ExclamationTriangle :class="iconClass" aria-hidden="true" />
      </template>
      <div class="font-medium">Fix these before saving</div>
      <ul class="mt-1 list-disc pl-4">
        <li v-for="issue in problems" :key="`${issue.lineId}-${issue.field}`">
          {{ issue.problem }}
        </li>
      </ul>
    </Message>

    <div class="flex flex-wrap items-center justify-end gap-3">
      <p :id="`${id}-hint`" class="text-muted">{{ saveHint }}</p>
      <Button
        type="button"
        size="small"
        :disabled="!!problems.length || !lines.length"
        :aria-describedby="`${id}-hint`"
        @click="save"
        >Save reconciliation</Button
      >
    </div>
  </section>
</template>
