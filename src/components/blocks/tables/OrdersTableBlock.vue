<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Search from '@primeicons/vue/search'
const query = shallowRef('')
const status = shallowRef<string | null>(null)
const first = shallowRef(0)
const orders = [
  { reference: 'FTF-1042', customer: 'Green Basket', items: 12, status: 'Confirmed' },
  { reference: 'FTF-1043', customer: 'Harvest Kitchen', items: 8, status: 'Pending' },
  { reference: 'FTF-1044', customer: 'Market Table', items: 15, status: 'Pending' },
  { reference: 'FTF-1045', customer: 'Fresh Corner', items: 6, status: 'Confirmed' },
  { reference: 'FTF-1046', customer: 'Green Basket', items: 10, status: 'Pending' },
  { reference: 'FTF-1047', customer: 'Harvest Kitchen', items: 4, status: 'Confirmed' },
  { reference: 'FTF-1048', customer: 'Market Table', items: 9, status: 'Pending' },
  { reference: 'FTF-1049', customer: 'Fresh Corner', items: 7, status: 'Confirmed' },
]
const filtered = computed(() => {
  const search = query.value.trim().toLowerCase()
  return orders.filter(
    (order) =>
      (!status.value || order.status === status.value) &&
      `${order.reference} ${order.customer}`.toLowerCase().includes(search),
  )
})
watch([query, status], () => (first.value = 0))
function clear() {
  query.value = ''
  status.value = null
}
</script>

<template>
  <DataTable
    v-model:first="first"
    :value="filtered"
    dataKey="reference"
    size="small"
    showGridlines
    paginator
    :rows="5"
    paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink"
    currentPageReportTemplate="{first}–{last} of {totalRecords}"
    :tableProps="{ 'aria-label': 'Customer orders' }"
  >
    <template #header>
      <div class="flex flex-col gap-4">
        <h5 class="text-lg font-medium">Orders</h5>
        <div class="flex flex-wrap items-end gap-3">
          <div class="min-w-0 flex-1 basis-48">
            <IconField class="w-full">
              <InputIcon><Search aria-hidden="true" /></InputIcon>
              <InputText
                v-model="query"
                aria-label="Search orders"
                placeholder="Reference or customer"
                fluid
              />
            </IconField>
          </div>
          <div class="flex-1 basis-40">
            <Select
              v-model="status"
              :options="['Pending', 'Confirmed']"
              aria-label="Filter orders by status"
              placeholder="All statuses"
              showClear
              fluid
            />
          </div>
          <Button type="button" severity="secondary" outlined @click="clear">Clear filters</Button>
        </div>
      </div>
    </template>
    <Column field="reference" header="Order" sortable />
    <Column field="customer" header="Customer" sortable />
    <Column field="items" header="Items" sortable />
    <Column field="status" header="Status"
      ><template #body="{ data }"
        ><Tag :severity="data.status === 'Confirmed' ? 'success' : 'warn'">{{
          data.status
        }}</Tag></template
      ></Column
    >
    <template #empty
      ><div class="flex flex-col items-start gap-3 py-4">
        <p>No orders match these filters.</p>
        <Button type="button" severity="secondary" outlined size="small" @click="clear"
          >Reset search</Button
        >
      </div></template
    >
    <template #footer
      ><p role="status" class="text-sm font-normal text-muted">
        {{ filtered.length }} matching orders
      </p></template
    >
  </DataTable>
</template>
