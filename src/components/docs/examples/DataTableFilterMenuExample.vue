<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DataTableFilterMeta, DataTableFilterMetaData } from 'primevue/datatable'
import FilterSlash from '@primeicons/vue/filter-slash'
import Search from '@primeicons/vue/search'
import { formatCurrency, formatDate } from '@/utils/format'

type OrderStatus = 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled'

interface Order {
  reference: string
  customer: string
  status: OrderStatus
  deliveryDate: Date
  amount: number
}

const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Delivered', 'Cancelled']
const severities: Record<OrderStatus, string> = {
  Pending: 'warn',
  Confirmed: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
}

const orders: Order[] = [
  {
    reference: 'FTF-1042',
    customer: 'Green Basket',
    status: 'Delivered',
    deliveryDate: new Date(2026, 10, 16),
    amount: 48600,
  },
  {
    reference: 'FTF-1043',
    customer: 'Harvest Kitchen',
    status: 'Confirmed',
    deliveryDate: new Date(2026, 10, 18),
    amount: 23400,
  },
  {
    reference: 'FTF-1044',
    customer: 'Market Table',
    status: 'Pending',
    deliveryDate: new Date(2026, 10, 19),
    amount: 61250,
  },
  {
    reference: 'FTF-1045',
    customer: 'Fresh Corner',
    status: 'Cancelled',
    deliveryDate: new Date(2026, 10, 19),
    amount: 9800,
  },
  {
    reference: 'FTF-1046',
    customer: 'Greenleaf Grocers',
    status: 'Delivered',
    deliveryDate: new Date(2026, 10, 20),
    amount: 37900,
  },
  {
    reference: 'FTF-1047',
    customer: 'Harvest Kitchen',
    status: 'Pending',
    deliveryDate: new Date(2026, 10, 21),
    amount: 15600,
  },
]

function createFilters(): DataTableFilterMeta {
  return {
    global: { value: null, matchMode: 'contains' },
    customer: { operator: 'and', constraints: [{ value: null, matchMode: 'startsWith' }] },
    status: { value: null, matchMode: 'equals' },
    deliveryDate: { operator: 'and', constraints: [{ value: null, matchMode: 'dateAfter' }] },
    amount: { operator: 'and', constraints: [{ value: null, matchMode: 'gte' }] },
  }
}

const filters = ref<DataTableFilterMeta>(createFilters())
const dateMatchModes = [
  { label: 'Date is', value: 'dateIs' },
  { label: 'Date is before', value: 'dateBefore' },
  { label: 'Date is after', value: 'dateAfter' },
]

const globalSearch = computed({
  get: () => ((filters.value.global as DataTableFilterMetaData).value as string | null) ?? '',
  set: (value: string) => {
    filters.value = { ...filters.value, global: { value, matchMode: 'contains' } }
  },
})

function clearFilters() {
  filters.value = createFilters()
}
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="orders"
    dataKey="reference"
    size="small"
    showGridlines
    filterDisplay="menu"
    :globalFilterFields="['reference', 'customer', 'status']"
    :tableProps="{ 'aria-label': 'Orders with column filters' }"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" severity="secondary" outlined size="small" @click="clearFilters">
          <FilterSlash aria-hidden="true" />
          Clear all filters
        </Button>
        <IconField>
          <InputIcon><Search aria-hidden="true" /></InputIcon>
          <InputText
            v-model="globalSearch"
            aria-label="Search orders"
            placeholder="Order, customer or status"
            size="small"
          />
        </IconField>
      </div>
    </template>
    <template #empty>
      <div class="flex flex-col items-start gap-3 py-4">
        <p>No orders match these filters.</p>
        <Button type="button" severity="secondary" outlined size="small" @click="clearFilters">
          Clear all filters
        </Button>
      </div>
    </template>
    <Column field="reference" header="Order" />
    <Column field="customer" header="Customer" :maxConstraints="2">
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          aria-label="Customer name"
          placeholder="Customer name"
          size="small"
        />
      </template>
    </Column>
    <Column
      field="status"
      header="Status"
      :showFilterMatchModes="false"
      :showFilterOperator="false"
      :showAddButton="false"
    >
      <template #body="{ data }">
        <Tag :value="data.status" :severity="severities[data.status as OrderStatus]" />
      </template>
      <template #filter="{ filterModel }">
        <Select
          v-model="filterModel.value"
          :options="statuses"
          ariaLabel="Order status"
          placeholder="Any status"
          showClear
          size="small"
          fluid
        >
          <template #option="{ option }">
            <Tag :value="option" :severity="severities[option as OrderStatus]" />
          </template>
        </Select>
      </template>
    </Column>
    <Column
      field="deliveryDate"
      header="Delivery date"
      dataType="date"
      :filterMatchModeOptions="dateMatchModes"
      :showAddButton="false"
      :showFilterOperator="false"
    >
      <template #body="{ data }">{{ formatDate(data.deliveryDate) }}</template>
      <template #filter="{ filterModel }">
        <DatePicker
          v-model="filterModel.value"
          ariaLabel="Delivery date"
          placeholder="dd/mm/yyyy"
          size="small"
        />
      </template>
    </Column>
    <Column field="amount" header="Amount" dataType="numeric" :maxConstraints="2">
      <template #body="{ data }">{{ formatCurrency(data.amount) }}</template>
      <template #filter="{ filterModel }">
        <InputNumber
          v-model="filterModel.value"
          ariaLabel="Order amount"
          mode="currency"
          currency="KES"
          locale="en-KE"
          placeholder="KES 0"
          size="small"
        />
      </template>
    </Column>
  </DataTable>
</template>
