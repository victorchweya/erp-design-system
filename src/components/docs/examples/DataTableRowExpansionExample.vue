<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DataTableExpandedRows } from 'primevue/datatable'
import ChevronDown from '@primeicons/vue/chevron-down'
import ChevronRight from '@primeicons/vue/chevron-right'
import { formatCurrency, formatDate, formatNumber } from '@/utils/format'

interface LineItem {
  sku: string
  product: string
  crates: number
  pricePerCrate: number
}

interface Order {
  reference: string
  customer: string
  route: string
  deliveryDate: string
  lines: LineItem[]
}

const orders: Order[] = [
  {
    reference: 'FTF-1042',
    customer: 'Green Basket',
    route: 'Westlands',
    deliveryDate: '2026-11-20',
    lines: [
      { sku: 'TOM-01', product: 'Tomatoes', crates: 10, pricePerCrate: 3200 },
      { sku: 'KAL-02', product: 'Kale', crates: 24, pricePerCrate: 650 },
    ],
  },
  {
    reference: 'FTF-1043',
    customer: 'Harvest Kitchen',
    route: 'Kilimani',
    deliveryDate: '2026-11-20',
    lines: [
      { sku: 'AVO-03', product: 'Hass avocados', crates: 6, pricePerCrate: 4800 },
      { sku: 'ONI-04', product: 'Red onions', crates: 8, pricePerCrate: 2100 },
      { sku: 'SPI-06', product: 'Spinach', crates: 12, pricePerCrate: 700 },
    ],
  },
  {
    reference: 'FTF-1044',
    customer: 'Market Table',
    route: 'Karen',
    deliveryDate: '2026-11-21',
    lines: [{ sku: 'CAB-05', product: 'Cabbages', crates: 20, pricePerCrate: 1500 }],
  },
]

const expandedRows = ref<DataTableExpandedRows>({})
const allExpanded = computed(() => orders.every((order) => expandedRows.value[order.reference]))

function lineTotal(line: LineItem) {
  return line.crates * line.pricePerCrate
}

function orderTotal(order: Order) {
  return order.lines.reduce((sum, line) => sum + lineTotal(line), 0)
}

function toggleAll() {
  expandedRows.value = allExpanded.value
    ? {}
    : Object.fromEntries(orders.map((order) => [order.reference, true]))
}
</script>

<template>
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="orders"
    dataKey="reference"
    size="small"
    showGridlines
    :tableProps="{ 'aria-label': 'Orders with line items' }"
  >
    <template #header>
      <div class="flex justify-end">
        <Button
          type="button"
          severity="primary"
          outlined
          size="small"
          :label="allExpanded ? 'Collapse all' : 'Expand all'"
          @click="toggleAll"
        />
      </div>
    </template>
    <Column style="width: 3rem">
      <template #header><span class="sr-only">Line items</span></template>
      <template #body="{ data, rowTogglerCallback }">
        <Button
          type="button"
          variant="text"
          severity="primary"
          rounded
          size="small"
          iconOnly
          :aria-expanded="Boolean(expandedRows[data.reference])"
          :aria-label="`Line items for ${data.reference}`"
          @click="rowTogglerCallback"
        >
          <ChevronDown v-if="expandedRows[data.reference]" aria-hidden="true" />
          <ChevronRight v-else aria-hidden="true" />
        </Button>
      </template>
    </Column>
    <Column field="reference" header="Order" />
    <Column field="customer" header="Customer" />
    <Column field="route" header="Route" />
    <Column field="deliveryDate" header="Delivery">
      <template #body="{ data }">{{ formatDate(data.deliveryDate) }}</template>
    </Column>
    <Column header="Total">
      <template #body="{ data }">{{ formatCurrency(orderTotal(data)) }}</template>
    </Column>
    <template #expansion="{ data }">
      <DataTable
        :value="data.lines"
        dataKey="sku"
        size="small"
        :tableProps="{ 'aria-label': `Line items for ${data.reference}` }"
      >
        <Column field="sku" header="SKU" />
        <Column field="product" header="Product" />
        <Column header="Crates">
          <template #body="{ data: line }">{{ formatNumber(line.crates) }}</template>
        </Column>
        <Column header="Price per crate">
          <template #body="{ data: line }">{{ formatCurrency(line.pricePerCrate) }}</template>
        </Column>
        <Column header="Line total">
          <template #body="{ data: line }">{{ formatCurrency(lineTotal(line)) }}</template>
        </Column>
      </DataTable>
    </template>
  </DataTable>
</template>
