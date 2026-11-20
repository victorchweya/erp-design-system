<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Search from '@primeicons/vue/search'
import { formatCurrency, formatNumber } from '@/utils/format'

interface Delivery {
  reference: string
  customer: string
  crates: number
  amount: number
}

const deliveries: Delivery[] = [
  { reference: 'FTF-1042', customer: 'Green Basket', crates: 34, amount: 48600 },
  { reference: 'FTF-1043', customer: 'Harvest Kitchen', crates: 26, amount: 23400 },
  { reference: 'FTF-1044', customer: 'Market Table', crates: 41, amount: 61250 },
  { reference: 'FTF-1045', customer: 'Fresh Corner', crates: 12, amount: 9800 },
  { reference: 'FTF-1046', customer: 'Green Basket', crates: 29, amount: 37900 },
  { reference: 'FTF-1047', customer: 'Harvest Kitchen', crates: 18, amount: 15600 },
  { reference: 'FTF-1048', customer: 'Savannah Bistro', crates: 22, amount: 28450 },
]

const query = shallowRef('')
const first = shallowRef(0)
const rows = shallowRef(4)

const filtered = computed(() => {
  const search = query.value.trim().toLowerCase()
  return deliveries.filter((delivery) =>
    `${delivery.reference} ${delivery.customer}`.toLowerCase().includes(search),
  )
})
const pageRows = computed(() => filtered.value.slice(first.value, first.value + rows.value))

function totals(items: Delivery[]) {
  return items.reduce(
    (sum, item) => ({ crates: sum.crates + item.crates, amount: sum.amount + item.amount }),
    { crates: 0, amount: 0 },
  )
}

const pageTotals = computed(() => totals(pageRows.value))
const filteredTotals = computed(() => totals(filtered.value))

watch(query, () => (first.value = 0))
</script>

<template>
  <DataTable
    v-model:first="first"
    v-model:rows="rows"
    :value="filtered"
    dataKey="reference"
    size="small"
    showGridlines
    paginator
    :tableProps="{ 'aria-label': 'Deliveries with totals' }"
  >
    <template #header>
      <IconField>
        <InputIcon><Search aria-hidden="true" /></InputIcon>
        <InputText
          v-model="query"
          aria-label="Search deliveries"
          placeholder="Order or customer"
          size="small"
        />
      </IconField>
    </template>
    <template #empty>No deliveries match this search.</template>
    <Column field="reference" header="Order" />
    <Column field="customer" header="Customer" />
    <Column field="crates" header="Crates">
      <template #body="{ data }">{{ formatNumber(data.crates) }}</template>
    </Column>
    <Column field="amount" header="Amount">
      <template #body="{ data }">{{ formatCurrency(data.amount) }}</template>
    </Column>
    <ColumnGroup type="footer">
      <Row>
        <Column :footer="`This page (${pageRows.length})`" :colspan="2" />
        <Column :footer="formatNumber(pageTotals.crates)" />
        <Column :footer="formatCurrency(pageTotals.amount)" />
      </Row>
      <Row>
        <Column :footer="`All matching (${filtered.length})`" :colspan="2" />
        <Column :footer="formatNumber(filteredTotals.crates)" />
        <Column :footer="formatCurrency(filteredTotals.amount)" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
