<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { DataTableRowEditSaveEvent } from 'primevue/datatable'
import { formatCurrency, formatNumber } from '@/utils/format'

type LineStatus = 'Confirmed' | 'Short-picked' | 'Substituted'

interface OrderLine {
  id: string
  product: string
  crates: number
  pricePerCrate: number
  status: LineStatus
}

const statuses: LineStatus[] = ['Confirmed', 'Short-picked', 'Substituted']
const severities: Record<LineStatus, string> = {
  Confirmed: 'success',
  'Short-picked': 'warn',
  Substituted: 'info',
}

const lines = ref<OrderLine[]>([
  { id: 'L1', product: 'Tomatoes', crates: 12, pricePerCrate: 3200, status: 'Confirmed' },
  { id: 'L2', product: 'Kale', crates: 30, pricePerCrate: 650, status: 'Confirmed' },
  { id: 'L3', product: 'Hass avocados', crates: 8, pricePerCrate: 4800, status: 'Short-picked' },
  { id: 'L4', product: 'Spinach', crates: 15, pricePerCrate: 700, status: 'Substituted' },
])
const editingRows = ref<OrderLine[]>([])
const error = shallowRef('')

function validate(line: OrderLine) {
  if (!line.product.trim()) return 'Enter a product name.'
  if (typeof line.crates !== 'number' || line.crates < 0 || !Number.isInteger(line.crates))
    return `${line.product} crates must be a whole number of 0 or more.`
  if (typeof line.pricePerCrate !== 'number' || line.pricePerCrate <= 0)
    return `The price per crate for ${line.product} must be more than KES 0.`
  return ''
}

function onRowEditSave(event: DataTableRowEditSaveEvent<OrderLine>) {
  const message = validate(event.newData)
  if (message) {
    error.value = `${message} The row was not saved.`
    return
  }
  error.value = ''
  lines.value = lines.value.map((line) =>
    line.id === event.newData.id
      ? { ...event.newData, product: event.newData.product.trim() }
      : line,
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <Message v-if="error" severity="error" size="small">{{ error }}</Message>
    <DataTable
      v-model:editingRows="editingRows"
      :value="lines"
      dataKey="id"
      editMode="row"
      size="small"
      showGridlines
      :tableProps="{ 'aria-label': 'Order FTF-1042 line items' }"
      @row-edit-save="onRowEditSave"
      @row-edit-cancel="error = ''"
    >
      <Column field="product" header="Product">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" :aria-label="`Product for line ${data.id}`" fluid />
        </template>
      </Column>
      <Column field="crates" header="Crates">
        <template #body="{ data }">{{ formatNumber(data.crates) }}</template>
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data[field]"
            :ariaLabel="`Crates of ${data.product}`"
            :maxFractionDigits="0"
            fluid
          />
        </template>
      </Column>
      <Column field="pricePerCrate" header="Price per crate">
        <template #body="{ data }">{{ formatCurrency(data.pricePerCrate) }}</template>
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data[field]"
            :ariaLabel="`Price per crate for ${data.product}`"
            mode="currency"
            currency="KES"
            locale="en-KE"
            fluid
          />
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="severities[data.status as LineStatus]" />
        </template>
        <template #editor="{ data, field }">
          <Select
            v-model="data[field]"
            :options="statuses"
            :ariaLabel="`Status of ${data.product}`"
            fluid
          />
        </template>
      </Column>
      <Column header="Actions" rowEditor />
    </DataTable>
  </div>
</template>
