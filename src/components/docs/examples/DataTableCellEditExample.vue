<script setup lang="ts">
import TimesCircle from '@primeicons/vue/times-circle'
import { ref, shallowRef } from 'vue'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { formatCurrency, formatNumber } from '@/utils/format'

type Grade = 'Grade A' | 'Grade B' | 'Export'
type EditableField = 'product' | 'grade' | 'crates' | 'pricePerCrate'

interface StockLine {
  sku: string
  product: string
  grade: Grade
  crates: number
  pricePerCrate: number
}

const grades: Grade[] = ['Grade A', 'Grade B', 'Export']

const stock = ref<StockLine[]>([
  { sku: 'TOM-01', product: 'Tomatoes', grade: 'Grade A', crates: 48, pricePerCrate: 3200 },
  { sku: 'KAL-02', product: 'Kale', grade: 'Grade A', crates: 120, pricePerCrate: 650 },
  { sku: 'AVO-03', product: 'Hass avocados', grade: 'Export', crates: 36, pricePerCrate: 4800 },
  { sku: 'ONI-04', product: 'Red onions', grade: 'Grade B', crates: 64, pricePerCrate: 2100 },
  { sku: 'CAB-05', product: 'Cabbages', grade: 'Grade A', crates: 22, pricePerCrate: 1500 },
])

const error = shallowRef('')

function validate(line: StockLine, field: EditableField, value: unknown) {
  switch (field) {
    case 'crates':
      if (typeof value !== 'number') return `Enter a crate count for ${line.product}.`
      if (value < 0) return `${line.product} crates can't be negative.`
      if (!Number.isInteger(value)) return `${line.product} crates must be a whole number.`
      return ''
    case 'pricePerCrate':
      return typeof value === 'number' && value > 0
        ? ''
        : `The price per crate for ${line.product} must be more than KES 0.`
    case 'product':
      return typeof value === 'string' && value.trim()
        ? ''
        : `Enter a product name for ${line.sku}.`
    case 'grade':
      return grades.includes(value as Grade) ? '' : `Choose a grade for ${line.product}.`
  }
}

function onCellEditComplete(event: DataTableCellEditCompleteEvent<StockLine>) {
  const field = event.field as EditableField
  const { data, newValue, value } = event
  if (newValue === value) return

  const message = validate(data, field, newValue)
  if (message) {
    error.value = `${message} The previous value was kept.`
    return
  }

  error.value = ''
  const line = stock.value.find((item) => item.sku === data.sku)
  if (!line) return
  if (field === 'crates' || field === 'pricePerCrate') line[field] = newValue as number
  else if (field === 'grade') line.grade = newValue as Grade
  else line.product = (newValue as string).trim()
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <Message v-if="error" severity="error" size="small">
      <template #icon="{ class: iconClass }">
        <TimesCircle :class="iconClass" aria-hidden="true" />
      </template>
      {{ error }}
    </Message>
    <DataTable
      :value="stock"
      dataKey="sku"
      editMode="cell"
      size="small"
      showGridlines
      :tableProps="{ 'aria-label': 'Warehouse stock count' }"
      @cell-edit-complete="onCellEditComplete"
    >
      <Column field="sku" header="SKU" />
      <Column field="product" header="Product">
        <template #body="{ data }">
          <Button
            type="button"
            variant="text"
            size="small"
            :label="data.product"
            :aria-label="`Edit product name, ${data.product}`"
          />
        </template>
        <template #editor="{ data, field }">
          <InputText
            v-model="data[field]"
            :aria-label="`Product name for ${data.sku}`"
            size="small"
            fluid
          />
        </template>
      </Column>
      <Column field="grade" header="Grade">
        <template #body="{ data }">
          <Button
            type="button"
            variant="text"
            size="small"
            :label="data.grade"
            :aria-label="`Edit ${data.product} grade, ${data.grade}`"
          />
        </template>
        <template #editor="{ data, field }">
          <Select
            v-model="data[field]"
            :options="grades"
            :ariaLabel="`Grade for ${data.product}`"
            size="small"
            fluid
          />
        </template>
      </Column>
      <Column field="crates" header="Crates">
        <template #body="{ data }">
          <Button
            type="button"
            variant="text"
            size="small"
            :label="formatNumber(data.crates)"
            :aria-label="`Edit ${data.product} crates, ${formatNumber(data.crates)}`"
          />
        </template>
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data[field]"
            :ariaLabel="`Crates of ${data.product}`"
            :maxFractionDigits="0"
            size="small"
            fluid
          />
        </template>
      </Column>
      <Column field="pricePerCrate" header="Price per crate">
        <template #body="{ data }">
          <Button
            type="button"
            variant="text"
            size="small"
            :label="formatCurrency(data.pricePerCrate)"
            :aria-label="`Edit ${data.product} price per crate, ${formatCurrency(data.pricePerCrate)}`"
          />
        </template>
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data[field]"
            :ariaLabel="`Price per crate for ${data.product}`"
            mode="currency"
            currency="KES"
            locale="en-KE"
            size="small"
            fluid
          />
        </template>
      </Column>
      <Column header="Stock value">
        <template #body="{ data }">{{ formatCurrency(data.crates * data.pricePerCrate) }}</template>
      </Column>
    </DataTable>
  </div>
</template>
