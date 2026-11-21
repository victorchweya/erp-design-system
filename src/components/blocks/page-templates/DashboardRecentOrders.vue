<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { formatCurrency, formatDate } from '@/utils/format'
import { orderSeverity, type OrderStatus, type RecentOrder } from './dashboard'

const props = defineProps<{ orders: RecentOrder[] }>()
const emit = defineEmits<{ clear: [] }>()
const first = shallowRef(0)

// New filter results start on the first page.
watch(
  () => props.orders,
  () => (first.value = 0),
)
</script>

<template>
  <Card class="min-w-0">
    <template #title><h3 class="text-lg font-medium">Recent orders</h3></template>
    <template #subtitle>Latest customer orders for the selected filters</template>
    <template #content>
      <DataTable
        v-model:first="first"
        :value="orders"
        dataKey="reference"
        paginator
        :rows="5"
        size="small"
        showGridlines
        scrollable
        :tableProps="{ 'aria-label': 'Recent orders' }"
      >
        <Column field="reference" header="Order" />
        <Column field="customer" header="Customer" />
        <Column field="date" header="Date">
          <template #body="{ data }">{{ formatDate(data.date) }}</template>
        </Column>
        <Column field="amount" header="Amount">
          <template #body="{ data }">
            <span class="tabular-nums">{{ formatCurrency(data.amount) }}</span>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :severity="orderSeverity[data.status as OrderStatus]">{{ data.status }}</Tag>
          </template>
        </Column>
        <template #empty>
          <div class="flex flex-col items-start gap-3 py-4">
            <p>No orders match these filters.</p>
            <Button type="button" severity="secondary" outlined size="small" @click="emit('clear')"
              >Clear filters</Button
            >
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>
