<script setup lang="ts">
import StatusTagBlock from './StatusTagBlock.vue'
import { formatCurrency } from '@/utils/format'

const orders = [
  {
    reference: 'FTF-4102',
    customer: 'Java House Westlands',
    total: 148500,
    status: 'delivered',
    payment: 'paid',
  },
  {
    reference: 'FTF-4103',
    customer: 'Carrefour Two Rivers',
    total: 96200,
    status: 'partially_delivered',
    payment: 'partially_paid',
  },
  {
    reference: 'FTF-4104',
    customer: 'Naivas Kilimani',
    total: 212750,
    status: 'dispatched',
    payment: 'overdue',
  },
  {
    reference: 'FTF-4105',
    customer: 'Mama Oliech Restaurant',
    total: 18400,
    status: 'pending',
    payment: 'unpaid',
  },
]
</script>

<template>
  <div class="overflow-x-auto">
    <DataTable
      :value="orders"
      dataKey="reference"
      size="small"
      :tableProps="{ 'aria-label': 'Customer orders with order and payment status' }"
    >
      <Column field="reference" header="Order" />
      <Column field="customer" header="Customer" />
      <Column field="total" header="Total" bodyClass="tabular-nums">
        <template #body="{ data }">{{ formatCurrency(data.total) }}</template>
      </Column>
      <Column field="status" header="Order status">
        <template #body="{ data }">
          <StatusTagBlock domain="order" :status="data.status" />
        </template>
      </Column>
      <Column field="payment" header="Payment status">
        <template #body="{ data }">
          <StatusTagBlock domain="payment" :status="data.payment" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
