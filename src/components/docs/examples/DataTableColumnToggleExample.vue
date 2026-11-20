<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { formatCurrency, formatDate, formatNumber } from '@/utils/format'

interface Delivery {
  reference: string
  supplier: string
  county: string
  produce: string
  kilograms: number
  amount: number
  deliveredOn: string
}

interface OptionalColumn {
  field: Exclude<keyof Delivery, 'reference'>
  header: string
  format?: (value: Delivery[keyof Delivery]) => string
}

const deliveries: Delivery[] = [
  {
    reference: 'GRN-2311',
    supplier: 'Kinangop Growers',
    county: 'Nyandarua',
    produce: 'Potatoes',
    kilograms: 2400,
    amount: 96000,
    deliveredOn: '2026-11-16',
  },
  {
    reference: 'GRN-2312',
    supplier: 'Mwea Fresh',
    county: 'Kirinyaga',
    produce: 'Tomatoes',
    kilograms: 860,
    amount: 51600,
    deliveredOn: '2026-11-16',
  },
  {
    reference: 'GRN-2313',
    supplier: 'Limuru Leaf Co-op',
    county: 'Kiambu',
    produce: 'Kale',
    kilograms: 540,
    amount: 16200,
    deliveredOn: '2026-11-17',
  },
  {
    reference: 'GRN-2314',
    supplier: 'Meru Highlands',
    county: 'Meru',
    produce: 'Carrots',
    kilograms: 1200,
    amount: 42000,
    deliveredOn: '2026-11-18',
  },
  {
    reference: 'GRN-2315',
    supplier: 'Loitoktok Farmers',
    county: 'Kajiado',
    produce: 'Onions',
    kilograms: 1800,
    amount: 81000,
    deliveredOn: '2026-11-19',
  },
]

const optionalColumns: OptionalColumn[] = [
  { field: 'supplier', header: 'Supplier' },
  { field: 'county', header: 'County' },
  { field: 'produce', header: 'Produce' },
  { field: 'kilograms', header: 'Weight (kg)', format: (value) => formatNumber(value) },
  { field: 'amount', header: 'Amount', format: (value) => formatCurrency(value) },
  { field: 'deliveredOn', header: 'Delivered', format: (value) => formatDate(value) },
]

const columnsInputId = useId()
const selectedFields = ref<OptionalColumn['field'][]>(['supplier', 'produce', 'amount'])

// Keep the table's column order stable, whatever order the options were picked in.
const visibleColumns = computed(() =>
  optionalColumns.filter((column) => selectedFields.value.includes(column.field)),
)
</script>

<template>
  <DataTable
    :value="deliveries"
    dataKey="reference"
    size="small"
    showGridlines
    :tableProps="{ 'aria-label': 'Goods received from suppliers' }"
  >
    <template #header>
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h5 class="text-base font-medium">Goods received</h5>
          <p class="text-sm text-muted">The receipt number always stays visible.</p>
        </div>
        <div class="flex w-full flex-col gap-1 sm:w-72">
          <label :for="columnsInputId" class="text-sm font-medium">Visible columns</label>
          <MultiSelect
            v-model="selectedFields"
            :inputId="columnsInputId"
            :options="optionalColumns"
            optionLabel="header"
            optionValue="field"
            :maxSelectedLabels="2"
            selectedItemsLabel="{0} columns"
            placeholder="Receipt number only"
            fluid
          />
        </div>
      </div>
    </template>
    <Column field="reference" header="Receipt" />
    <Column
      v-for="column in visibleColumns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    >
      <template #body="{ data }">
        {{ column.format ? column.format(data[column.field]) : data[column.field] }}
      </template>
    </Column>
  </DataTable>
</template>
