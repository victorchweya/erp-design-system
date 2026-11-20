<script setup lang="ts">
import { computed, ref, shallowRef, useId } from 'vue'
import { useToast } from 'primevue/usetoast'
import Download from '@primeicons/vue/download'
import { formatApiDate } from '@/utils/format'
import { downloadCsv, toCsv } from './csv'

type Order = {
  reference: string
  customer: string
  deliveryDate: string
  status: 'Pending' | 'Confirmed' | 'Delivered'
  totalKes: number
}
type Scope = 'all' | 'filtered' | 'selected'
type ColumnKey = keyof Order

const orders: Order[] = [
  {
    reference: 'SO-3101',
    customer: 'Green Basket',
    deliveryDate: '2026-11-18',
    status: 'Delivered',
    totalKes: 18400,
  },
  {
    reference: 'SO-3102',
    customer: 'Naivas Kilimani',
    deliveryDate: '2026-11-19',
    status: 'Delivered',
    totalKes: 42150,
  },
  {
    reference: 'SO-3103',
    customer: 'Java House Westlands',
    deliveryDate: '2026-11-21',
    status: 'Confirmed',
    totalKes: 9600,
  },
  {
    reference: 'SO-3104',
    customer: 'Mama Oliech Restaurant',
    deliveryDate: '2026-11-22',
    status: 'Pending',
    totalKes: 12300,
  },
  {
    reference: 'SO-3105',
    customer: 'Zucchini Greengrocers',
    deliveryDate: '2026-11-23',
    status: 'Pending',
    totalKes: 27800,
  },
  {
    reference: 'SO-3106',
    customer: 'Green Basket',
    deliveryDate: '2026-11-24',
    status: 'Pending',
    totalKes: 15250,
  },
]
// Stand-ins for the state of the table the dialog is opened from.
const filterLabel = 'Status: Pending'
const filteredOrders = orders.filter((order) => order.status === 'Pending')
const selectedOrders = orders.filter((order) => ['SO-3103', 'SO-3105'].includes(order.reference))

const columnOptions: { key: ColumnKey; label: string }[] = [
  { key: 'reference', label: 'Order' },
  { key: 'customer', label: 'Customer' },
  { key: 'deliveryDate', label: 'Delivery date' },
  { key: 'status', label: 'Status' },
  { key: 'totalKes', label: 'Total (KES)' },
]
const scopeOptions = computed(() => [
  { value: 'all' as const, label: `All orders (${orders.length})` },
  {
    value: 'filtered' as const,
    label: `Filtered view – ${filterLabel} (${filteredOrders.length})`,
  },
  { value: 'selected' as const, label: `Selected orders (${selectedOrders.length})` },
])

const id = useId()
const toast = useToast()
const visible = shallowRef(false)
const scope = shallowRef<Scope>('filtered')
const columns = ref<ColumnKey[]>(columnOptions.map(({ key }) => key))
const dateRange = ref<(Date | null)[] | null>(null)
const submitted = shallowRef(false)

function localDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const exportRows = computed(() => {
  const source = { all: orders, filtered: filteredOrders, selected: selectedOrders }[scope.value]
  const [start, end] = dateRange.value ?? []
  if (!start) return source
  const from = localDate(start)
  const to = localDate(end ?? start)
  return source.filter((order) => order.deliveryDate >= from && order.deliveryDate <= to)
})
const columnError = computed(() => (columns.value.length ? '' : 'Choose at least one column.'))
const rowError = computed(() =>
  exportRows.value.length ? '' : 'No orders match this scope and date range.',
)

function open() {
  submitted.value = false
  visible.value = true
}

function exportCsv() {
  submitted.value = true
  if (columnError.value || rowError.value) return
  const chosen = columnOptions.filter(({ key }) => columns.value.includes(key))
  const csv = toCsv(
    chosen.map(({ label }) => label),
    exportRows.value.map((order) => chosen.map(({ key }) => order[key])),
  )
  const filename = `ftf-orders-${formatApiDate(new Date())}.csv`
  downloadCsv(filename, csv)
  toast.add({
    group: id,
    severity: 'success',
    summary: 'Export ready',
    detail: `Downloaded ${exportRows.value.length} orders as ${filename}.`,
    life: 4000,
  })
  visible.value = false
}
</script>

<template>
  <Toast
    :group="id"
    :breakpoints="{ '640px': { width: 'calc(100vw - 2rem)', right: '1rem', left: '1rem' } }"
  />
  <div class="flex flex-col items-start gap-3 text-sm">
    <p class="text-muted">
      Sales orders table: {{ orders.length }} orders, filtered by {{ filterLabel }}, with
      {{ selectedOrders.length }} rows selected.
    </p>
    <Button
      type="button"
      severity="secondary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="`${id}-dialog`"
      :aria-expanded="visible"
      @click="open"
    >
      <Download aria-hidden="true" />
      Export orders
    </Button>
  </div>
  <Dialog
    :id="`${id}-dialog`"
    v-model:visible="visible"
    modal
    blockScroll
    header="Export orders"
    class="w-[calc(100vw-2rem)] max-w-lg"
  >
    <form
      :id="`${id}-form`"
      novalidate
      class="flex flex-col gap-6 text-sm"
      @submit.prevent="exportCsv"
    >
      <div class="flex flex-col gap-1">
        <p class="font-medium">Format</p>
        <p>CSV (UTF-8, comma-separated)</p>
        <p class="text-muted">Excel and PDF exports are not available yet.</p>
      </div>
      <fieldset class="flex flex-col gap-2">
        <legend class="mb-2 font-medium">Rows to export</legend>
        <div v-for="option in scopeOptions" :key="option.value" class="flex items-center gap-2">
          <RadioButton
            v-model="scope"
            :inputId="`${id}-scope-${option.value}`"
            :name="`${id}-scope`"
            :value="option.value"
          />
          <label :for="`${id}-scope-${option.value}`">{{ option.label }}</label>
        </div>
      </fieldset>
      <fieldset class="flex flex-col gap-2" :aria-describedby="`${id}-columns-error`">
        <legend class="mb-2 font-medium">Columns</legend>
        <div class="grid gap-2 sm:grid-cols-2">
          <div v-for="column in columnOptions" :key="column.key" class="flex items-center gap-2">
            <Checkbox
              v-model="columns"
              :inputId="`${id}-column-${column.key}`"
              :name="`${id}-columns`"
              :value="column.key"
              :invalid="submitted && !!columnError"
            />
            <label :for="`${id}-column-${column.key}`">{{ column.label }}</label>
          </div>
        </div>
        <Message
          v-if="submitted && columnError"
          :id="`${id}-columns-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ columnError }}</Message
        >
      </fieldset>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-dates`" class="font-medium"
          >Delivery dates <span class="font-normal text-muted">(optional)</span></label
        >
        <DatePicker
          v-model="dateRange"
          :inputId="`${id}-dates`"
          selectionMode="range"
          :manualInput="false"
          dateFormat="d M yy"
          placeholder="Any date"
          showButtonBar
          :aria-describedby="`${id}-dates-help`"
          fluid
        />
        <p :id="`${id}-dates-help`" class="text-muted">Leave empty to include every date.</p>
      </div>
      <p role="status" :class="rowError ? 'text-danger' : 'text-muted'">
        {{ rowError || `${exportRows.length} orders will be exported.` }}
      </p>
    </form>
    <template #footer>
      <Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button>
      <Button type="submit" :form="`${id}-form`" :disabled="!!rowError">
        <Download aria-hidden="true" />
        Download CSV
      </Button>
    </template>
  </Dialog>
</template>
