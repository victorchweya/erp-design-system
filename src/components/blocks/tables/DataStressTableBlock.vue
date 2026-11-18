<script setup lang="ts">
import { computed, shallowRef, useTemplateRef, watch } from 'vue'
import type Menu from 'primevue/menu'
import type Popover from 'primevue/popover'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Eye from '@primeicons/vue/eye'
import History from '@primeicons/vue/history'
import Pencil from '@primeicons/vue/pencil'
import Refresh from '@primeicons/vue/refresh'
import Search from '@primeicons/vue/search'
import SlidersH from '@primeicons/vue/sliders-h'
import Sync from '@primeicons/vue/sync'
import Trash from '@primeicons/vue/trash'
import { formatCurrency, formatDate } from '@/utils/format'

type OrderStatus = 'New Order' | 'Cancelled'

const size = shallowRef<'small' | undefined | 'large'>('small')
const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Default', value: undefined },
  { label: 'Large', value: 'large' },
]
const stripedRows = shallowRef(false)
const showGridlines = shallowRef(true)
const first = shallowRef(0)
const rows = shallowRef(3)
const query = shallowRef('')
const status = shallowRef<OrderStatus | null>(null)
const deliveryDates = shallowRef<(Date | null)[] | null>(null)
const source = shallowRef<string | null>(null)
const deliveryType = shallowRef<string | null>(null)
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const moreFilters = useTemplateRef<InstanceType<typeof Popover>>('moreFilters')
const activeOrder = shallowRef<(typeof orders)[number] | null>(null)
const feedback = shallowRef('')
const orders = [
  {
    orderDate: '13 Nov 2026, 10:28',
    orderNumber: 'CO-2026-11-004',
    orderType: 'regular',
    customer: 'Anouk FTF Boertien',
    source: 'Manual',
    status: 'New Order' as OrderStatus,
    items: 1,
    totalUnits: '10 KG',
    amount: 200,
    location: 'kerarapon drive',
    deliveryType: 'Pickup',
    deliveryDate: '20 Nov 2026',
    deliverySlot: '06:00–08:00',
  },
  {
    orderDate: '13 Nov 2026, 10:19',
    orderNumber: 'CO-2026-11-003',
    orderType: 'regular',
    customer: 'Aero Kitchen',
    source: 'Manual',
    status: 'Cancelled' as OrderStatus,
    items: 1,
    totalUnits: '10 KG',
    amount: 200,
    location: 'Aero Kitchen, PKF Kenya, Kalamu house, grevillea grove',
    deliveryType: 'Pickup',
    deliveryDate: '18 Nov 2026',
    deliverySlot: null,
  },
  {
    orderDate: '12 Nov 2026, 13:56',
    orderNumber: 'CO-2026-11-002',
    orderType: 'regular',
    customer: 'Avic Design',
    source: 'Ask Sprout',
    status: 'New Order' as OrderStatus,
    items: 2,
    totalUnits: '20 KG',
    amount: 1760,
    location: 'Naivasha',
    deliveryType: 'Delivery',
    deliveryDate: '13 Nov 2026',
    deliverySlot: null,
  },
  {
    orderDate: '10 Nov 2026, 09:20',
    orderNumber: 'CO-2026-11-001',
    orderType: 'regular',
    customer: 'Felix Holdingg',
    source: 'E-commerce',
    status: 'New Order' as OrderStatus,
    items: 5,
    totalUnits: '53 KG',
    amount: 5600,
    location: 'Farm to Feed (Warehouse)',
    deliveryType: 'Pickup',
    deliveryDate: '11 Nov 2026',
    deliverySlot: null,
  },
  {
    orderDate: '26 Oct 2026, 23:08',
    orderNumber: 'CO-2026-10-015',
    orderType: 'regular',
    customer: 'QA Branch B Karen',
    source: 'E-commerce',
    status: 'New Order' as OrderStatus,
    items: 1,
    totalUnits: '60 KG',
    amount: 5100,
    location: 'QA Branch B Karen Kitchen',
    deliveryType: 'Delivery',
    deliveryDate: '28 Oct 2026',
    deliverySlot: '06:00–14:00',
  },
  {
    orderDate: '23 Oct 2026, 12:30',
    orderNumber: 'RJ-CO-2026-08-002',
    orderType: 'chaser',
    customer: 'A and a',
    source: null,
    status: 'New Order' as OrderStatus,
    items: 1,
    totalUnits: '10 KG',
    amount: 4600,
    location: 'Farm to Feed (Warehouse)',
    deliveryType: 'Delivery',
    deliveryDate: '24 Oct 2026',
    deliverySlot: '06:00–08:00',
  },
]

const dateValues: Record<string, Date> = {
  '20 Nov 2026': new Date(2026, 10, 20),
  '18 Nov 2026': new Date(2026, 10, 18),
  '13 Nov 2026': new Date(2026, 10, 13),
  '11 Nov 2026': new Date(2026, 10, 11),
  '28 Oct 2026': new Date(2026, 9, 28),
  '24 Oct 2026': new Date(2026, 9, 24),
}

const filteredOrders = computed(() => {
  const search = query.value.trim().toLowerCase()
  const [start, end] = deliveryDates.value ?? []
  return orders.filter((order) => {
    const deliveryDate = dateValues[order.deliveryDate]!
    return (
      (!search || `${order.orderNumber} ${order.customer}`.toLowerCase().includes(search)) &&
      (!status.value || order.status === status.value) &&
      (!source.value || order.source === source.value) &&
      (!deliveryType.value || order.deliveryType === deliveryType.value) &&
      (!start || deliveryDate >= start) &&
      (!end || deliveryDate <= end)
    )
  })
})

const activeFilters = computed(() => {
  const filters: { key: string; label: string; clear: () => void }[] = []
  if (status.value) {
    filters.push({ key: 'status', label: `Status: ${status.value}`, clear: () => (status.value = null) })
  }
  if (deliveryDates.value?.some(Boolean)) {
    const [start, end] = deliveryDates.value
    filters.push({
      key: 'deliveryDates',
      label: `Delivery: ${formatDate(start)}${end ? `–${formatDate(end)}` : ''}`,
      clear: () => (deliveryDates.value = null),
    })
  }
  if (source.value) {
    filters.push({ key: 'source', label: `Source: ${source.value}`, clear: () => (source.value = null) })
  }
  if (deliveryType.value) {
    filters.push({
      key: 'deliveryType',
      label: `Delivery type: ${deliveryType.value}`,
      clear: () => (deliveryType.value = null),
    })
  }
  return filters
})

const actionItems = [
  { label: 'View', icon: Eye, command: () => action('View') },
  { label: 'Edit', icon: Pencil, command: () => action('Edit') },
  { label: 'Sync to Trackpod', icon: Sync, command: () => action('Sync to Trackpod') },
  { separator: true },
  {
    label: 'Cancel',
    icon: Trash,
    linkClass: '!text-danger',
    command: () => action('Cancel'),
  },
  {
    label: 'Reverse',
    icon: Refresh,
    linkClass: '!text-warn',
    command: () => action('Reverse'),
  },
  { label: 'View history', icon: History, command: () => action('View history') },
]

watch([query, status, deliveryDates, source, deliveryType], () => (first.value = 0))

function action(label: string) {
  feedback.value = `${label} selected for ${activeOrder.value?.orderNumber}.`
}

function openActions(event: Event, order: (typeof orders)[number]) {
  activeOrder.value = order
  menu.value?.toggle(event)
}

function resetFilters() {
  query.value = ''
  status.value = null
  deliveryDates.value = null
  source.value = null
  deliveryType.value = null
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h5 class="text-lg font-medium">Sales order data stress test</h5>
      <p class="mt-1 text-sm text-muted">Filter real order data and change the table display.</p>
    </div>

    <div class="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg bg-surface-50 p-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted">Table size</span>
        <Select
          v-model="size"
          :options="sizeOptions"
          optionLabel="label"
          optionValue="value"
          aria-label="Table size"
          class="w-32"
        />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="stripedRows" inputId="stress-striped" binary />
        <label for="stress-striped" class="text-sm">Striped rows</label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="showGridlines" inputId="stress-gridlines" binary />
        <label for="stress-gridlines" class="text-sm">Gridlines</label>
      </div>
    </div>

    <div class="w-full max-w-full">
      <DataTable
        v-model:first="first"
        v-model:rows="rows"
        :value="filteredOrders"
        dataKey="orderNumber"
        :size="size"
        :showGridlines="showGridlines"
        :stripedRows="stripedRows"
        paginator
        :rowsPerPageOptions="[3, 6]"
        paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink"
        scrollable
        tableStyle="min-width: 110rem"
        :tableProps="{ 'aria-label': 'Sales order data stress test' }"
        class="stress-table"
      >
        <template #paginatorstart>
          <div class="flex w-full items-center text-sm text-muted">
            <span role="status">{{ filteredOrders.length }} rows</span>
            <span class="ml-auto mr-2">Rows per page</span>
          </div>
        </template>
        <template #header>
          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <IconField class="min-w-56 flex-1">
                <InputIcon><Search aria-hidden="true" /></InputIcon>
                <InputText
                  v-model="query"
                  placeholder="Search order/customer"
                  aria-label="Search order or customer"
                  fluid
                />
              </IconField>
              <Button
                type="button"
                label="Filter"
                severity="secondary"
                outlined
                :badge="activeFilters.length ? String(activeFilters.length) : undefined"
                badgeSeverity="primary"
                @click="moreFilters?.toggle($event)"
              >
                <template #icon="{ class: iconClass }">
                  <SlidersH :class="iconClass" aria-hidden="true" />
                </template>
              </Button>
            </div>
            <div v-if="activeFilters.length" class="flex flex-wrap items-center gap-2">
              <Chip
                v-for="activeFilter in activeFilters"
                :key="activeFilter.key"
                :label="activeFilter.label"
                removable
                @remove="activeFilter.clear"
              />
              <Button
                type="button"
                severity="secondary"
                outlined
                size="small"
                @click="resetFilters"
                >Reset filters</Button
              >
            </div>
          </div>
        </template>
        <Column field="orderDate" header="Order Date" style="min-width: 9rem" />
        <Column field="orderNumber" header="Order Number" style="min-width: 10rem" />
        <Column field="orderType" header="Order Type" style="min-width: 7rem" />
        <Column field="customer" header="Customer" style="min-width: 12rem" />
        <Column field="source" header="Source" style="min-width: 9rem">
          <template #body="{ data }">{{ data.source ?? '—' }}</template>
        </Column>
        <Column field="status" header="Status" style="min-width: 8rem">
          <template #body="{ data }">
            <Tag :severity="data.status === 'Cancelled' ? 'danger' : 'info'">{{ data.status }}</Tag>
          </template>
        </Column>
        <Column field="items" header="Items" style="min-width: 6rem" />
        <Column field="totalUnits" header="Total Items/Unit" style="min-width: 10rem" />
        <Column field="amount" header="Amount" style="min-width: 9rem">
          <template #body="{ data }"
            ><span class="tabular-nums">{{ formatCurrency(data.amount) }}</span></template
          >
        </Column>
        <Column field="location" header="Delivery Location" style="min-width: 13rem">
          <template #body="{ data }"
            ><span class="block whitespace-normal break-words">{{ data.location }}</span></template
          >
        </Column>
        <Column field="deliveryType" header="Delivery Type" style="min-width: 9rem" />
        <Column field="deliveryDate" header="Delivery Date" style="min-width: 9rem" />
        <Column field="deliverySlot" header="Delivery Slot" style="min-width: 9rem">
          <template #body="{ data }">{{ data.deliverySlot ?? '—' }}</template>
        </Column>
        <Column frozen alignFrozen="right" style="width: 5rem">
          <template #body="{ data }">
            <Button
              type="button"
              severity="secondary"
              text
              rounded
              :aria-label="`Actions for ${data.orderNumber}`"
              @click="openActions($event, data)"
            >
              <EllipsisV aria-hidden="true" />
            </Button>
          </template>
        </Column>
        <template #empty>
          <div class="py-4 text-sm text-muted">No orders match these filters.</div>
        </template>
      </DataTable>
      <p role="status" class="sr-only">{{ feedback }}</p>
    </div>
  </div>

  <Popover ref="moreFilters" aria-label="Additional order filters">
    <div class="flex w-64 flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="stress-status" class="text-sm font-medium">Status</label>
        <Select
          v-model="status"
          inputId="stress-status"
          :options="['New Order', 'Cancelled']"
          placeholder="All statuses"
          showClear
          fluid
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="stress-delivery-dates" class="text-sm font-medium">Delivery dates</label>
        <DatePicker
          v-model="deliveryDates"
          inputId="stress-delivery-dates"
          selectionMode="range"
          placeholder="Select a range"
          showIcon
          showClear
          fluid
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="stress-source" class="text-sm font-medium">Source</label>
        <Select
          v-model="source"
          inputId="stress-source"
          :options="['Manual', 'Ask Sprout', 'E-commerce']"
          placeholder="All sources"
          showClear
          fluid
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="stress-delivery-type" class="text-sm font-medium">Delivery type</label>
        <Select
          v-model="deliveryType"
          inputId="stress-delivery-type"
          :options="['Delivery', 'Pickup']"
          placeholder="All delivery types"
          showClear
          fluid
        />
      </div>
    </div>
  </Popover>

  <Menu ref="menu" :model="actionItems" popup aria-label="Order actions" />
</template>

<style scoped>
:deep(.p-paginator) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}

:deep(.p-paginator-content-start) {
  display: flex;
  width: 100%;
  min-width: 0;
}

</style>
