<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { DataTableFilterMeta } from 'primevue/datatable'
import Undo from '@primeicons/vue/undo'
import { formatCurrency, formatNumber } from '@/utils/format'

interface PriceListItem {
  sku: string
  produce: string
  category: string
  warehouse: string
  pricePerKg: number
  stockKg: number
}

// Namespaced so it cannot collide with another table's saved state.
const STATE_KEY = 'ftf-docs-datatable-state'

const priceList: PriceListItem[] = [
  {
    sku: 'VEG-POT-01',
    produce: 'Potatoes (Shangi)',
    category: 'Vegetables',
    warehouse: 'Nairobi DC',
    pricePerKg: 48,
    stockKg: 4200,
  },
  {
    sku: 'VEG-TOM-02',
    produce: 'Tomatoes (Anna F1)',
    category: 'Vegetables',
    warehouse: 'Nairobi DC',
    pricePerKg: 72,
    stockKg: 960,
  },
  {
    sku: 'VEG-ONI-01',
    produce: 'Red onions',
    category: 'Vegetables',
    warehouse: 'Mombasa hub',
    pricePerKg: 55,
    stockKg: 1800,
  },
  {
    sku: 'LEA-KAL-01',
    produce: 'Kale (Sukuma wiki)',
    category: 'Leafy greens',
    warehouse: 'Kiambu hub',
    pricePerKg: 35,
    stockKg: 380,
  },
  {
    sku: 'LEA-SPI-01',
    produce: 'Spinach',
    category: 'Leafy greens',
    warehouse: 'Kiambu hub',
    pricePerKg: 40,
    stockKg: 260,
  },
  {
    sku: 'FRU-AVO-03',
    produce: 'Avocados (Hass)',
    category: 'Fruit',
    warehouse: 'Mombasa hub',
    pricePerKg: 110,
    stockKg: 1150,
  },
  {
    sku: 'FRU-MAN-02',
    produce: 'Mangoes (Apple)',
    category: 'Fruit',
    warehouse: 'Mombasa hub',
    pricePerKg: 95,
    stockKg: 720,
  },
  {
    sku: 'FRU-BAN-01',
    produce: 'Bananas (Cavendish)',
    category: 'Fruit',
    warehouse: 'Nairobi DC',
    pricePerKg: 60,
    stockKg: 2100,
  },
]

// Only coarse, non-personal filters are saved. Keep free-text search and customer
// details out of the filters object, because the table writes it to storage as plain text.
function defaultFilters(): DataTableFilterMeta {
  return {
    category: { value: null, matchMode: 'equals' },
    warehouse: { value: null, matchMode: 'equals' },
  }
}

const filters = ref<DataTableFilterMeta>(defaultFilters())
const tableKey = shallowRef(0)
const message = shallowRef('')

function filterValue(field: string) {
  const meta = filters.value[field]
  return typeof meta === 'object' && 'value' in meta ? meta.value : null
}

function setFilter(field: string, value: string | null) {
  filters.value = { ...filters.value, [field]: { value, matchMode: 'equals' } }
}

function onStateRestore() {
  message.value = 'Your last view in this tab was restored.'
}

function resetView() {
  // The table saves on every update, so clear storage and redraw it with defaults.
  try {
    sessionStorage.removeItem(STATE_KEY)
  } catch {
    // Storage can be unavailable, for example when site data is blocked.
  }
  filters.value = defaultFilters()
  tableKey.value++
  message.value = 'View reset. Sorting, filters, page and column widths are back to defaults.'
}
</script>

<template>
  <DataTable
    :key="tableKey"
    v-model:filters="filters"
    :value="priceList"
    dataKey="sku"
    stateStorage="session"
    :stateKey="STATE_KEY"
    paginator
    :rows="4"
    resizableColumns
    columnResizeMode="fit"
    size="small"
    showGridlines
    :tableProps="{ 'aria-label': 'Produce price list' }"
    @state-restore="onStateRestore"
  >
    <template #header>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <Select
            :modelValue="filterValue('category')"
            :options="['Vegetables', 'Leafy greens', 'Fruit']"
            aria-label="Filter by category"
            placeholder="All categories"
            showClear
            size="small"
            class="w-full sm:w-44"
            @update:modelValue="setFilter('category', $event)"
          />
          <Select
            :modelValue="filterValue('warehouse')"
            :options="['Nairobi DC', 'Kiambu hub', 'Mombasa hub']"
            aria-label="Filter by warehouse"
            placeholder="All warehouses"
            showClear
            size="small"
            class="w-full sm:w-44"
            @update:modelValue="setFilter('warehouse', $event)"
          />
          <Button
            type="button"
            severity="secondary"
            outlined
            size="small"
            class="sm:ml-auto"
            @click="resetView"
          >
            <Undo aria-hidden="true" />
            Reset view
          </Button>
        </div>
        <p class="text-sm text-muted">
          Sort, filter, page or resize, then reload the page. The view is kept in this tab's session
          storage until the tab closes.
        </p>
        <p class="text-sm" role="status">{{ message }}</p>
      </div>
    </template>
    <Column field="sku" header="SKU" sortable />
    <Column field="produce" header="Produce" sortable />
    <Column field="category" header="Category" sortable />
    <Column field="warehouse" header="Warehouse" sortable />
    <Column field="pricePerKg" header="Price per kg" sortable>
      <template #body="{ data }">{{ formatCurrency(data.pricePerKg) }}</template>
    </Column>
    <Column field="stockKg" header="Stock (kg)" sortable>
      <template #body="{ data }">{{ formatNumber(data.stockKg) }}</template>
    </Column>
    <template #empty>No produce matches these filters.</template>
  </DataTable>
</template>
