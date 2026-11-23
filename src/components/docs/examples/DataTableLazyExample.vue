<script setup lang="ts">
import TimesCircle from '@primeicons/vue/times-circle'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, useId } from 'vue'
import type { DataTableFilterMeta, DataTableSortEvent } from 'primevue/datatable'
import Refresh from '@primeicons/vue/refresh'
import { formatCurrency, formatDate } from '@/utils/format'

type OrderStatus = 'Pending' | 'Packed' | 'Delivered'

interface Order {
  reference: string
  customer: string
  route: string
  deliveryDate: string
  amount: number
  status: OrderStatus
}

interface OrderQuery {
  first: number
  rows: number
  sortField?: keyof Order
  sortOrder?: number | null
  status?: OrderStatus | null
}

// --- Simulated API: in a real app this is a fetch to the orders endpoint. ---
const customers = [
  'Green Basket Grocers',
  'Harvest Kitchen',
  'Mama Njeri Kiosk',
  'Market Table Restaurant',
  'Fresh Corner',
  'Savannah Hotel',
  'Upper Hill Café',
]
const routes = ['Westlands', 'Kilimani', 'Kawangware', 'Ngong Road', 'Karen', 'Eastleigh']
const statuses: OrderStatus[] = ['Pending', 'Packed', 'Delivered']
const serverOrders: Order[] = Array.from({ length: 47 }, (_, index) => ({
  reference: `SO-${5101 + index}`,
  customer: customers[index % customers.length]!,
  route: routes[(index * 5) % routes.length]!,
  deliveryDate: `2026-11-${String(10 + (index % 18)).padStart(2, '0')}`,
  amount: 6400 + ((index * 3793) % 118000),
  status: statuses[(index * 7) % statuses.length]!,
}))

function fetchOrders(query: OrderQuery, signal: AbortSignal, fail: boolean) {
  return new Promise<{ rows: Order[]; total: number }>((resolve, reject) => {
    const timer = setTimeout(() => {
      if (fail) return reject(new Error('The orders service did not respond.'))
      let rows = query.status
        ? serverOrders.filter((order) => order.status === query.status)
        : [...serverOrders]
      const { sortField, sortOrder } = query
      if (sortField && sortOrder) {
        rows.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1) * sortOrder)
      }
      const total = rows.length
      rows = rows.slice(query.first, query.first + query.rows)
      resolve({ rows, total })
    }, 700)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Request cancelled', 'AbortError'))
    })
  })
}
// --- End of simulated API. ---

const statusSeverity: Record<OrderStatus, string> = {
  Pending: 'warn',
  Packed: 'info',
  Delivered: 'success',
}
const pageSize = 5
const skeletonRows = Array.from({ length: pageSize }, (_, index) => ({
  reference: `loading-${index}`,
}))

const orders = ref<Order[]>([])
const totalRecords = shallowRef(0)
const first = shallowRef(0)
const filters = ref<DataTableFilterMeta>({ status: { value: null, matchMode: 'equals' } })
const loading = shallowRef(false)
const error = shallowRef('')
const failNextRequest = shallowRef(false)
const failToggleId = useId()
let lastQuery: OrderQuery = { first: 0, rows: pageSize }
let controller: AbortController | null = null

const showSkeleton = computed(() => loading.value && orders.value.length === 0)
const tableValue = computed(() => (showSkeleton.value ? skeletonRows : orders.value))
const summary = computed(() => {
  if (loading.value) return 'Loading orders…'
  if (error.value || !totalRecords.value) return ''
  const last = Math.min(first.value + pageSize, totalRecords.value)
  return `Showing ${first.value + 1}–${last} of ${totalRecords.value} orders.`
})

async function load(query: OrderQuery) {
  controller?.abort()
  controller = new AbortController()
  const { signal } = controller
  lastQuery = query
  loading.value = true
  error.value = ''
  const fail = failNextRequest.value
  failNextRequest.value = false
  try {
    const result = await fetchOrders(query, signal, fail)
    orders.value = result.rows
    totalRecords.value = result.total
  } catch (reason) {
    if (signal.aborted) return
    error.value = reason instanceof Error ? reason.message : 'Orders could not be loaded.'
  } finally {
    if (!signal.aborted) loading.value = false
  }
}

// Page, sort and filter events all carry the full table state.
function onLazyLoad(event: DataTableSortEvent) {
  load({
    first: event.first,
    rows: event.rows,
    sortField: typeof event.sortField === 'string' ? (event.sortField as keyof Order) : undefined,
    sortOrder: event.sortOrder,
    status: (event.filters.status as { value: OrderStatus | null } | undefined)?.value,
  })
}

onMounted(() => load(lastQuery))
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <ToggleSwitch v-model="failNextRequest" :inputId="failToggleId" />
        <label :for="failToggleId" class="text-sm">Fail the next request</label>
      </div>
      <p class="text-sm text-muted" role="status">{{ summary }}</p>
    </div>

    <Message v-if="error" severity="error">
      <template #icon="{ class: iconClass }">
        <TimesCircle :class="iconClass" aria-hidden="true" />
      </template>
      <div class="flex flex-wrap items-center gap-3">
        <span>{{ error }} Retry to load the requested page.</span>
        <Button
          type="button"
          severity="primary"
          outlined
          size="small"
          :loading="loading"
          @click="load(lastQuery)"
        >
          <Refresh aria-hidden="true" />
          Retry
        </Button>
      </div>
    </Message>

    <DataTable
      v-model:first="first"
      v-model:filters="filters"
      :value="tableValue"
      lazy
      :totalRecords="totalRecords"
      :loading="loading && !showSkeleton"
      paginator
      :rows="pageSize"
      dataKey="reference"
      filterDisplay="row"
      size="small"
      showGridlines
      :tableProps="{ 'aria-label': 'Sales orders', 'aria-busy': loading }"
      @page="onLazyLoad"
      @sort="onLazyLoad"
      @filter="onLazyLoad"
    >
      <Column field="reference" header="Order" sortable>
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="5rem" />
          <template v-else>{{ data.reference }}</template>
        </template>
      </Column>
      <Column field="customer" header="Customer" sortable>
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="9rem" />
          <template v-else>{{ data.customer }}</template>
        </template>
      </Column>
      <Column field="route" header="Route">
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="6rem" />
          <template v-else>{{ data.route }}</template>
        </template>
      </Column>
      <Column field="deliveryDate" header="Delivery" sortable>
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="6rem" />
          <template v-else>{{ formatDate(data.deliveryDate) }}</template>
        </template>
      </Column>
      <Column field="amount" header="Amount" sortable>
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="6rem" />
          <template v-else>{{ formatCurrency(data.amount) }}</template>
        </template>
      </Column>
      <Column field="status" header="Status" :showFilterMenu="false">
        <template #body="{ data }">
          <Skeleton v-if="showSkeleton" width="5rem" />
          <Tag v-else :severity="statusSeverity[data.status as OrderStatus]">{{ data.status }}</Tag>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            :options="statuses"
            aria-label="Filter orders by status"
            placeholder="Any"
            showClear
            size="small"
            fluid
            @change="filterCallback()"
          />
        </template>
      </Column>
      <template #empty>
        <span v-if="error">Orders could not be loaded. Use Retry above.</span>
        <span v-else>No orders match this status.</span>
      </template>
    </DataTable>
  </div>
</template>
