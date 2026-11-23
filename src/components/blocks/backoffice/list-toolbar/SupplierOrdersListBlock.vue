<script setup lang="ts">
import { computed, nextTick, onScopeDispose, shallowRef, useId, useTemplateRef } from 'vue'
import { formatCurrency, formatDate } from '@/utils/format'
import ListToolbarBlock, { type ListToolbarAppliedFilter } from './ListToolbarBlock.vue'
import {
  sourcingTypes,
  supplierOrderColumns,
  supplierOrders,
  supplierOrderStatuses,
  supplierSegments,
  type SupplierOrderStatus,
} from './supplier-orders'

const id = useId()
const toolbar = useTemplateRef<InstanceType<typeof ListToolbarBlock>>('toolbar')

const search = shallowRef('')
const statuses = shallowRef<string[]>([])
const dates = shallowRef<(Date | null)[] | null>(null)
const sourcingType = shallowRef<string | null>(null)
const segments = shallowRef<string[]>([])
const visibleColumns = shallowRef(supplierOrderColumns.map((column) => column.key))

const loading = shallowRef(false)
const loadFailed = shallowRef(false)
const failNextRefresh = shallowRef(false)
const exportNote = shallowRef('')

/** Local calendar day as YYYY-MM-DD, matching the date-only sourcing dates. */
const isoDay = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const rows = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  const [start, end] = dates.value ?? []
  const from = start ? isoDay(start) : null
  const to = end ? isoDay(end) : from
  return supplierOrders.filter(
    (order) =>
      (!keyword || `${order.reference} ${order.supplier}`.toLowerCase().includes(keyword)) &&
      (!statuses.value.length || statuses.value.includes(order.status)) &&
      (!from || (order.sourcingDate >= from && order.sourcingDate <= (to ?? from))) &&
      (!sourcingType.value || order.sourcingType === sourcingType.value) &&
      (!segments.value.length || segments.value.includes(order.segment)),
  )
})
const shownRows = computed(() => (loadFailed.value ? [] : rows.value))

const appliedFilters = computed(() => {
  const applied: ListToolbarAppliedFilter[] = []
  if (search.value.trim())
    applied.push({ key: 'search', label: 'Search', value: search.value.trim() })
  if (statuses.value.length)
    applied.push({ key: 'status', label: 'Status', value: statuses.value.join(', ') })
  const [start, end] = dates.value ?? []
  if (start) {
    const range = end ? `${formatDate(start)} to ${formatDate(end)}` : formatDate(start)
    applied.push({ key: 'dates', label: 'Sourcing date', value: range })
  }
  if (sourcingType.value)
    applied.push({ key: 'type', label: 'Sourcing type', value: sourcingType.value, more: true })
  if (segments.value.length)
    applied.push({ key: 'segment', label: 'Segment', value: segments.value.join(', '), more: true })
  return applied
})

function removeFilter(key: string) {
  if (key === 'search') search.value = ''
  else if (key === 'status') statuses.value = []
  else if (key === 'dates') dates.value = null
  else if (key === 'type') sourcingType.value = null
  else if (key === 'segment') segments.value = []
}
function clearFilters() {
  search.value = ''
  statuses.value = []
  dates.value = null
  sourcingType.value = null
  segments.value = []
}
function clearFromEmptyState() {
  clearFilters()
  // The empty state disappears, so send focus back to the start of the toolbar.
  void nextTick(() => toolbar.value?.focusSearch())
}

let timer: ReturnType<typeof setTimeout> | undefined
function refresh() {
  loading.value = true
  loadFailed.value = false
  clearTimeout(timer)
  timer = setTimeout(() => {
    loadFailed.value = failNextRefresh.value
    failNextRefresh.value = false
    loading.value = false
  }, 700)
}
onScopeDispose(() => clearTimeout(timer))

function exportCsv() {
  exportNote.value = `Exported ${rows.value.length} ${rows.value.length === 1 ? 'order' : 'orders'} to CSV in this preview.`
}

const statusSeverity: Record<
  SupplierOrderStatus,
  'success' | 'info' | 'warn' | 'danger' | 'secondary'
> = {
  'New order': 'warn',
  Accepted: 'secondary',
  Dispatched: 'info',
  Received: 'success',
  Completed: 'success',
  Cancelled: 'danger',
}
const isVisible = (key: string) => visibleColumns.value.includes(key)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ListToolbarBlock
      ref="toolbar"
      v-model:search="search"
      v-model:visibleColumns="visibleColumns"
      search-label="Search orders"
      search-placeholder="Order number or supplier"
      :applied-filters="appliedFilters"
      :columns="supplierOrderColumns"
      :loading="loading"
      :total="loadFailed ? undefined : rows.length"
      :noun="{ one: 'supplier order', other: 'supplier orders' }"
      exportable
      refreshable
      @remove-filter="removeFilter"
      @clear="clearFilters"
      @export="exportCsv"
      @refresh="refresh"
    >
      <template #filters="{ size }">
        <div class="sm:w-36">
          <label :for="`${id}-status`" class="sr-only">Status</label>
          <MultiSelect
            v-model="statuses"
            :inputId="`${id}-status`"
            :options="supplierOrderStatuses"
            :size="size"
            placeholder="Status"
            fluid
          />
        </div>
        <div class="sm:w-52">
          <label :for="`${id}-dates`" class="sr-only">Sourcing date</label>
          <DatePicker
            v-model="dates"
            :inputId="`${id}-dates`"
            :size="size"
            selectionMode="range"
            placeholder="Sourcing date"
            showClear
            fluid
          />
        </div>
      </template>
      <template #more-filters>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-type`" class="text-sm font-medium">Sourcing type</label>
          <Select
            v-model="sourcingType"
            :inputId="`${id}-type`"
            :options="sourcingTypes"
            size="small"
            placeholder="Any type"
            showClear
            fluid
          />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-segment`" class="text-sm font-medium">Supplier segment</label>
          <MultiSelect
            v-model="segments"
            :inputId="`${id}-segment`"
            :options="supplierSegments"
            size="small"
            placeholder="Any segment"
            fluid
          />
        </div>
      </template>
    </ListToolbarBlock>

    <DataTable
      :value="shownRows"
      dataKey="reference"
      size="small"
      scrollable
      class="whitespace-nowrap"
      tableStyle="min-width: 48rem"
      :tableProps="{ 'aria-label': 'Supplier orders' }"
    >
      <Column v-if="isVisible('reference')" field="reference" header="Order" />
      <Column v-if="isVisible('supplier')" field="supplier" header="Supplier" />
      <Column v-if="isVisible('segment')" field="segment" header="Supplier segment" />
      <Column v-if="isVisible('sourcingDate')" field="sourcingDate" header="Sourcing date">
        <template #body="{ data }">{{ formatDate(data.sourcingDate) }}</template>
      </Column>
      <Column v-if="isVisible('sourcingType')" field="sourcingType" header="Sourcing type" />
      <Column v-if="isVisible('amountKes')" field="amountKes" header="Amount">
        <template #body="{ data }"
          ><span class="tabular-nums">{{ formatCurrency(data.amountKes) }}</span></template
        >
      </Column>
      <Column v-if="isVisible('status')" field="status" header="Status">
        <template #body="{ data }"
          ><Tag :severity="statusSeverity[data.status as SupplierOrderStatus]">{{
            data.status
          }}</Tag></template
        >
      </Column>
      <template #empty>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <template v-if="loadFailed">
            <Message severity="error" size="small"
              >Supplier orders could not be loaded. Your filters are kept.</Message
            >
            <Button type="button" size="small" :disabled="loading" @click="refresh">Retry</Button>
          </template>
          <template v-else-if="appliedFilters.length">
            <p>No supplier orders match these filters.</p>
            <Button
              type="button"
              size="small"
              severity="secondary"
              outlined
              @click="clearFromEmptyState"
              >Clear filters</Button
            >
          </template>
          <p v-else>No supplier orders yet.</p>
        </div>
      </template>
    </DataTable>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <p role="status">{{ exportNote }}</p>
      <div class="flex items-center gap-2">
        <Checkbox v-model="failNextRefresh" binary :inputId="`${id}-fail`" />
        <label :for="`${id}-fail`">Preview: make the next refresh fail</label>
      </div>
    </div>
  </div>
</template>
