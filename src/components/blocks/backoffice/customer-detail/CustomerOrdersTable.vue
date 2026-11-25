<script setup lang="ts">
import Times from '@primeicons/vue/times'
import { computed, shallowRef, useTemplateRef } from 'vue'
import type DataTable from 'primevue/datatable'
import type Popover from 'primevue/popover'
import Search from '@primeicons/vue/search'
import SlidersH from '@primeicons/vue/sliders-h'
import StatusTagBlock from '@/components/blocks/backoffice/status-tag/StatusTagBlock.vue'
import TableHeaderActionsBlock, {
  type TableColumnOption,
} from '@/components/blocks/tables/TableHeaderActionsBlock.vue'
import { formatCurrency, formatDate, formatDateTime } from '@/utils/format'

type OrderStatus = 'new' | 'completed'

const orders = [
  {
    orderNumber: 'CO-2026-07-014',
    orderDate: '2026-07-07T11:23:00+03:00',
    status: 'new' as OrderStatus,
    items: 2,
    amount: 36,
    deliveryLocation: 'Spurs Two Rivers Mall',
    deliveryType: 'Delivery',
    deliveryDate: '2026-07-07',
    deliverySlot: '12:00–14:00',
    payment: 'pending' as const,
  },
  {
    orderNumber: 'CO-2025-08-528',
    orderDate: '2025-08-21T19:09:00+03:00',
    status: 'completed' as OrderStatus,
    items: 2,
    amount: 1160,
    deliveryLocation: 'Roco Mama Village Market',
    deliveryType: 'Delivery',
    deliveryDate: '2025-08-22',
    deliverySlot: '08:00–10:00',
    payment: 'overdue' as const,
  },
]

const columns = [
  { key: 'orderNumber', label: 'Order number', required: true },
  { key: 'orderDate', label: 'Order date' },
  { key: 'status', label: 'Status' },
  { key: 'items', label: 'Items' },
  { key: 'amount', label: 'Amount' },
  { key: 'deliveryLocation', label: 'Delivery location' },
  { key: 'deliveryType', label: 'Delivery type' },
  { key: 'deliveryDate', label: 'Delivery date' },
  { key: 'deliverySlot', label: 'Delivery slot' },
  { key: 'payment', label: 'Payment' },
] satisfies readonly TableColumnOption[]

const table = useTemplateRef<InstanceType<typeof DataTable>>('table')
const filtersPopover = useTemplateRef<InstanceType<typeof Popover>>('filtersPopover')
const query = shallowRef('')
const status = shallowRef<OrderStatus | null>(null)
const statusOptions = [
  { label: 'All statuses', value: null },
  { label: 'New', value: 'new' },
  { label: 'Completed', value: 'completed' },
]
const visibleColumns = shallowRef(columns.map(({ key }) => key))
const filteredOrders = computed(() => {
  const term = query.value.trim().toLocaleLowerCase()
  return orders.filter(
    (order) =>
      (!status.value || order.status === status.value) &&
      (!term ||
        order.orderNumber.toLocaleLowerCase().includes(term) ||
        order.deliveryLocation.toLocaleLowerCase().includes(term)),
  )
})

function exportOrders() {
  table.value?.exportCSV()
}
const searchInput = useTemplateRef<{ $el: HTMLInputElement }>('searchInput')

function clearSearch() {
  query.value = ''
  searchInput.value?.$el.focus()
}
</script>

<template>
  <section class="min-w-0" aria-label="Customer orders">
    <div class="min-w-0 max-w-full overflow-x-auto">
      <DataTable
        ref="table"
        :value="filteredOrders"
        dataKey="orderNumber"
        exportFilename="afritopia-orders"
        size="small"
        showGridlines
        scrollable
        tableClass="text-sm"
        :tableStyle="{ minWidth: '68rem' }"
        :tableProps="{ 'aria-label': 'AFRITOPIA LIMITED orders' }"
      >
        <template #header>
          <div class="flex flex-col gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <IconField class="min-w-56 flex-1">
                <InputIcon><Search aria-hidden="true" /></InputIcon>
                <InputText
                  ref="searchInput"
                  v-model="query"
                  placeholder="Search orders"
                  aria-label="Search customer orders"
                  fluid
                />
                <InputIcon v-if="query">
                  <button
                    type="button"
                    aria-label="Clear customer order search"
                    title="Clear customer order search"
                    class="-m-1 flex rounded-sm p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
                    @click="clearSearch"
                  >
                    <Times aria-hidden="true" focusable="false" />
                  </button>
                </InputIcon>
              </IconField>
              <Button
                type="button"
                severity="primary"
                outlined
                :badge="status ? '1' : undefined"
                badgeSeverity="primary"
                @click="filtersPopover?.toggle($event)"
              >
                <SlidersH aria-hidden="true" />Filter
              </Button>
              <TableHeaderActionsBlock
                v-model:visible-columns="visibleColumns"
                :columns="columns"
                @export="exportOrders"
              />
            </div>
            <div v-if="status" class="flex flex-wrap items-center gap-2">
              <Chip
                :label="statusOptions.find((option) => option.value === status)?.label"
                removable
                @remove="status = null"
              />
            </div>
          </div>
        </template>

        <Column
          v-if="visibleColumns.includes('orderNumber')"
          field="orderNumber"
          header="Order number"
          sortable
          frozen
        >
          <template #body="{ data }">
            <a
              href="/backoffice-blocks/order-detail"
              class="font-medium text-primary hover:underline"
              >{{ data.orderNumber }}</a
            >
          </template>
        </Column>
        <Column
          v-if="visibleColumns.includes('orderDate')"
          field="orderDate"
          header="Order date"
          sortable
        >
          <template #body="{ data }">{{ formatDateTime(data.orderDate) }}</template>
        </Column>
        <Column v-if="visibleColumns.includes('status')" field="status" header="Status" sortable>
          <template #body="{ data }">
            <StatusTagBlock domain="order" :status="data.status" />
          </template>
        </Column>
        <Column v-if="visibleColumns.includes('items')" field="items" header="Items" sortable />
        <Column v-if="visibleColumns.includes('amount')" field="amount" header="Amount" sortable>
          <template #body="{ data }">{{ formatCurrency(data.amount) }}</template>
        </Column>
        <Column
          v-if="visibleColumns.includes('deliveryLocation')"
          field="deliveryLocation"
          header="Delivery location"
          sortable
        />
        <Column
          v-if="visibleColumns.includes('deliveryType')"
          field="deliveryType"
          header="Delivery type"
          sortable
        />
        <Column
          v-if="visibleColumns.includes('deliveryDate')"
          field="deliveryDate"
          header="Delivery date"
          sortable
        >
          <template #body="{ data }">{{ formatDate(data.deliveryDate) }}</template>
        </Column>
        <Column
          v-if="visibleColumns.includes('deliverySlot')"
          field="deliverySlot"
          header="Delivery slot"
        />
        <Column v-if="visibleColumns.includes('payment')" field="payment" header="Payment" sortable>
          <template #body="{ data }">
            <StatusTagBlock domain="payment" :status="data.payment" />
          </template>
        </Column>
        <template #empty>
          <p class="py-6 text-center text-sm text-muted">No orders match these filters.</p>
        </template>
      </DataTable>
    </div>
    <Popover ref="filtersPopover" aria-label="Order filters">
      <div class="flex w-60 flex-col gap-2">
        <label for="customer-order-status" class="text-sm font-medium">Status</label>
        <Select
          v-model="status"
          inputId="customer-order-status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          aria-label="Filter orders by status"
          fluid
        />
      </div>
    </Popover>
  </section>
</template>
