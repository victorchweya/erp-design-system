<script setup lang="ts">
import { computed, ref, shallowRef, useId } from 'vue'
import type { DataTableColumnReorderEvent } from 'primevue/datatable'
import ArrowLeft from '@primeicons/vue/arrow-left'
import ArrowRight from '@primeicons/vue/arrow-right'
import Refresh from '@primeicons/vue/refresh'
import { formatCurrency, formatNumber } from '@/utils/format'

interface StockLot {
  sku: string
  produce: string
  grade: string
  warehouse: string
  kilograms: number
  pricePerKg: number
}

type MovableField = Exclude<keyof StockLot, 'sku'>

interface MovableColumn {
  field: MovableField
  header: string
  format?: (value: StockLot[MovableField]) => string
}

const stock: StockLot[] = [
  {
    sku: 'VEG-POT-01',
    produce: 'Potatoes (Shangi)',
    grade: 'A',
    warehouse: 'Nairobi DC',
    kilograms: 4200,
    pricePerKg: 48,
  },
  {
    sku: 'VEG-TOM-02',
    produce: 'Tomatoes (Anna F1)',
    grade: 'A',
    warehouse: 'Nairobi DC',
    kilograms: 960,
    pricePerKg: 72,
  },
  {
    sku: 'LEA-KAL-01',
    produce: 'Kale (Sukuma wiki)',
    grade: 'B',
    warehouse: 'Kiambu hub',
    kilograms: 380,
    pricePerKg: 35,
  },
  {
    sku: 'FRU-AVO-03',
    produce: 'Avocados (Hass)',
    grade: 'A',
    warehouse: 'Mombasa hub',
    kilograms: 1150,
    pricePerKg: 110,
  },
]

const columns: MovableColumn[] = [
  { field: 'produce', header: 'Produce' },
  { field: 'grade', header: 'Grade' },
  { field: 'warehouse', header: 'Warehouse' },
  { field: 'kilograms', header: 'On hand (kg)', format: (value) => formatNumber(value) },
  { field: 'pricePerKg', header: 'Price per kg', format: (value) => formatCurrency(value) },
]
const defaultOrder = columns.map((column) => column.field)

const order = ref<MovableField[]>([...defaultOrder])
const orderedColumns = computed(() =>
  order.value.map((field) => columns.find((column) => column.field === field)!),
)
const columnToMove = shallowRef<MovableField>('produce')
const position = computed(() => order.value.indexOf(columnToMove.value))
const tableKey = shallowRef(0)
const announcement = shallowRef('')
const moveSelectId = useId()

function headerOf(field: MovableField) {
  return columns.find((column) => column.field === field)?.header ?? field
}

// Drag and drop reports indexes across every column, including the fixed SKU column.
function onColumnReorder({ dragIndex, dropIndex }: DataTableColumnReorderEvent) {
  const next = ['sku', ...order.value]
  const [moved] = next.splice(dragIndex, 1)
  next.splice(dropIndex, 0, moved!)
  order.value = next.filter((field): field is MovableField => field !== 'sku')
}

function move(step: -1 | 1) {
  const from = position.value
  const to = from + step
  if (to < 0 || to >= order.value.length) return
  const next = [...order.value]
  next.splice(to, 0, next.splice(from, 1)[0]!)
  order.value = next
  // The table keeps its own order after a drag, so redraw it from this order.
  tableKey.value++
  announcement.value = `${headerOf(columnToMove.value)} moved to position ${to + 1} of ${next.length}.`
}

function resetLayout() {
  order.value = [...defaultOrder]
  tableKey.value++
  announcement.value = 'Column order and widths reset.'
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-end gap-2" role="group" aria-label="Move columns">
      <div class="flex w-full flex-col gap-1 sm:w-56">
        <label :for="moveSelectId" class="text-sm font-medium">Column to move</label>
        <Select
          v-model="columnToMove"
          :inputId="moveSelectId"
          :options="columns"
          optionLabel="header"
          optionValue="field"
          size="small"
          fluid
        />
      </div>
      <Button
        type="button"
        severity="primary"
        outlined
        size="small"
        :disabled="position <= 0"
        @click="move(-1)"
      >
        <ArrowLeft aria-hidden="true" />
        Move left
      </Button>
      <Button
        type="button"
        severity="primary"
        outlined
        size="small"
        :disabled="position >= order.length - 1"
        @click="move(1)"
      >
        <ArrowRight aria-hidden="true" />
        Move right
      </Button>
      <Button type="button" severity="primary" variant="text" size="small" @click="resetLayout">
        <Refresh aria-hidden="true" />
        Reset layout
      </Button>
    </div>
    <p class="text-sm text-muted">
      Dragging needs a pointer. Use these controls to move columns with a keyboard; they also
      restore the default widths.
    </p>
    <p class="sr-only" role="status">{{ announcement }}</p>

    <DataTable
      :key="tableKey"
      :value="stock"
      dataKey="sku"
      size="small"
      showGridlines
      resizableColumns
      columnResizeMode="fit"
      reorderableColumns
      :tableProps="{ 'aria-label': 'Stock on hand by warehouse' }"
      @column-reorder="onColumnReorder"
    >
      <Column field="sku" header="SKU" :reorderableColumn="false" />
      <Column
        v-for="column in orderedColumns"
        :key="column.field"
        :columnKey="column.field"
        :field="column.field"
        :header="column.header"
      >
        <template #body="{ data }">
          {{ column.format ? column.format(data[column.field]) : data[column.field] }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
