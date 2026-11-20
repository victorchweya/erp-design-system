<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency, formatNumber } from '@/utils/format'

interface Delivery {
  reference: string
  route: string
  customer: string
  crates: number
  amount: number
}

interface RouteSubtotal {
  stops: number
  crates: number
  amount: number
}

const deliveries: Delivery[] = [
  {
    reference: 'FTF-1042',
    route: 'Westlands',
    customer: 'Green Basket',
    crates: 34,
    amount: 48600,
  },
  {
    reference: 'FTF-1043',
    route: 'Kilimani',
    customer: 'Harvest Kitchen',
    crates: 26,
    amount: 23400,
  },
  { reference: 'FTF-1044', route: 'Karen', customer: 'Market Table', crates: 41, amount: 61250 },
  { reference: 'FTF-1045', route: 'Westlands', customer: 'Fresh Corner', crates: 12, amount: 9800 },
  {
    reference: 'FTF-1046',
    route: 'Kilimani',
    customer: 'Greenleaf Grocers',
    crates: 29,
    amount: 37900,
  },
  {
    reference: 'FTF-1047',
    route: 'Westlands',
    customer: 'Mama Mboga Hub',
    crates: 18,
    amount: 15600,
  },
  { reference: 'FTF-1048', route: 'Karen', customer: 'Savannah Bistro', crates: 22, amount: 28450 },
]

const subtotals = computed(() => {
  const totals = new Map<string, RouteSubtotal>()
  for (const delivery of deliveries) {
    const total = totals.get(delivery.route) ?? { stops: 0, crates: 0, amount: 0 }
    total.stops += 1
    total.crates += delivery.crates
    total.amount += delivery.amount
    totals.set(delivery.route, total)
  }
  return totals
})

function subtotal(route: string) {
  return subtotals.value.get(route) ?? { stops: 0, crates: 0, amount: 0 }
}
</script>

<template>
  <DataTable
    :value="deliveries"
    dataKey="reference"
    rowGroupMode="subheader"
    groupRowsBy="route"
    sortMode="single"
    sortField="route"
    :sortOrder="1"
    size="small"
    showGridlines
    :tableProps="{ 'aria-label': 'Deliveries grouped by route' }"
  >
    <Column field="route" header="Route" />
    <Column field="reference" header="Order" />
    <Column field="customer" header="Customer" />
    <Column field="crates" header="Crates">
      <template #body="{ data }">{{ formatNumber(data.crates) }}</template>
    </Column>
    <Column field="amount" header="Amount">
      <template #body="{ data }">{{ formatCurrency(data.amount) }}</template>
    </Column>
    <template #groupheader="{ data }">
      <span class="font-semibold">{{ data.route }}</span>
      <span class="ml-2 text-sm text-muted">{{ subtotal(data.route).stops }} stops</span>
    </template>
    <template #groupfooter="{ data }">
      <div class="flex flex-wrap justify-end gap-x-6 font-semibold">
        <span>{{ data.route }} subtotal</span>
        <span>{{ formatNumber(subtotal(data.route).crates) }} crates</span>
        <span>{{ formatCurrency(subtotal(data.route).amount) }}</span>
      </div>
    </template>
  </DataTable>
</template>
