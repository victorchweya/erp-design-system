<script setup lang="ts">
import { computed, ref, shallowRef, useTemplateRef, watch } from 'vue'
import DataTable, { type DataTableExportFunctionOptions } from 'primevue/datatable'
import Download from '@primeicons/vue/download'
import FileExport from '@primeicons/vue/file-export'
import { formatApiDate, formatCurrency, formatDate } from '@/utils/format'

type InvoiceStatus = 'Paid' | 'Due' | 'Overdue'

interface Invoice {
  reference: string
  customer: string
  route: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

const invoices: Invoice[] = [
  {
    reference: 'INV-8801',
    customer: 'Green Basket Grocers',
    route: 'Westlands',
    dueDate: '2026-11-10',
    amount: 48250,
    status: 'Paid',
  },
  {
    reference: 'INV-8802',
    customer: 'Harvest Kitchen',
    route: 'Kilimani',
    dueDate: '2026-11-14',
    amount: 126400.5,
    status: 'Overdue',
  },
  {
    reference: 'INV-8803',
    customer: 'Mama Njeri Kiosk',
    route: 'Kawangware',
    dueDate: '2026-11-21',
    amount: 9800,
    status: 'Due',
  },
  {
    reference: 'INV-8804',
    customer: 'Fresh Corner, Ngong Rd',
    route: 'Ngong Road',
    dueDate: '2026-11-18',
    amount: 37100,
    status: 'Overdue',
  },
  {
    reference: 'INV-8805',
    customer: 'Market Table Restaurant',
    route: 'Westlands',
    dueDate: '2026-11-25',
    amount: 71560,
    status: 'Due',
  },
  {
    reference: 'INV-8806',
    customer: 'Kilimani "Daily" Greens',
    route: 'Kilimani',
    dueDate: '2026-11-08',
    amount: 15300,
    status: 'Paid',
  },
]

const statusSeverity: Record<InvoiceStatus, string> = {
  Paid: 'success',
  Due: 'info',
  Overdue: 'danger',
}

const table = useTemplateRef<InstanceType<typeof DataTable>>('table')
const status = shallowRef<InvoiceStatus | null>(null)
const selected = ref<Invoice[]>([])
const message = shallowRef('')
const filename = `ftf-receivables-${formatApiDate(new Date())}`

const filtered = computed(() =>
  status.value ? invoices.filter((invoice) => invoice.status === status.value) : invoices,
)

// Keep hidden rows out of a "selected rows" export.
watch(filtered, (rows) => {
  selected.value = selected.value.filter((invoice) => rows.includes(invoice))
})

// PrimeVue skips its own quote escaping when exportFunction is set, so escape here.
function exportCell({ data, field }: DataTableExportFunctionOptions) {
  if (field === 'amount') return Number(data).toFixed(2)
  const text = String(data).replace(/"/g, '""')
  // Stop spreadsheet apps from running text that starts like a formula.
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text
}

function exportRows(selectionOnly: boolean) {
  table.value?.exportCSV({ selectionOnly })
  const count = selectionOnly ? selected.value.length : filtered.value.length
  message.value = `Exported ${count} ${count === 1 ? 'invoice' : 'invoices'} to ${filename}.csv.`
}
</script>

<template>
  <DataTable
    ref="table"
    v-model:selection="selected"
    :value="filtered"
    dataKey="reference"
    size="small"
    showGridlines
    :exportFilename="filename"
    :exportFunction="exportCell"
    :tableProps="{ 'aria-label': 'Customer invoices' }"
  >
    <template #header>
      <div class="flex flex-wrap items-center gap-2">
        <Select
          v-model="status"
          :options="['Paid', 'Due', 'Overdue']"
          aria-label="Filter invoices by status"
          placeholder="All statuses"
          showClear
          size="small"
          class="w-full sm:w-44"
        />
        <div class="flex flex-wrap gap-2 sm:ml-auto">
          <Button
            type="button"
            severity="secondary"
            outlined
            size="small"
            :disabled="!selected.length"
            @click="exportRows(true)"
          >
            <Download aria-hidden="true" />
            Export selected ({{ selected.length }})
          </Button>
          <Button
            type="button"
            size="small"
            :disabled="!filtered.length"
            @click="exportRows(false)"
          >
            <FileExport aria-hidden="true" />
            Export {{ filtered.length }} rows
          </Button>
        </div>
      </div>
      <p class="mt-2 text-sm text-muted" role="status">{{ message }}</p>
    </template>
    <Column selectionMode="multiple" :exportable="false" headerStyle="width: 3rem" />
    <Column field="reference" header="Invoice" sortable />
    <Column field="customer" header="Customer" sortable />
    <Column field="route" header="Route" />
    <Column field="dueDate" header="Due" exportHeader="Due date (YYYY-MM-DD)" sortable>
      <template #body="{ data }">{{ formatDate(data.dueDate) }}</template>
    </Column>
    <Column field="amount" header="Amount" exportHeader="Amount (KES)" sortable>
      <template #body="{ data }">{{ formatCurrency(data.amount) }}</template>
    </Column>
    <Column field="status" header="Status">
      <template #body="{ data }">
        <Tag :severity="statusSeverity[data.status as InvoiceStatus]">{{ data.status }}</Tag>
      </template>
    </Column>
    <Column header="Actions" :exportable="false">
      <template #body="{ data }">
        <Button
          type="button"
          severity="secondary"
          variant="text"
          size="small"
          :aria-label="`View ${data.reference}`"
          @click="message = `${data.reference} opened in this preview. No page was loaded.`"
        >
          View
        </Button>
      </template>
    </Column>
    <template #empty>No invoices match this status.</template>
  </DataTable>
</template>
