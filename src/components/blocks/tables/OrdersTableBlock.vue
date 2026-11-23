<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Search from '@primeicons/vue/search'
import Inbox from '@primeicons/vue/inbox'
const query = shallowRef('')
const status = shallowRef<string | null>(null)
const first = shallowRef(0)
const rows = shallowRef(5)
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
    v-model:rows="rows"
    :value="filtered"
    dataKey="reference"
    size="small"
    showGridlines
    paginator
    :rowsPerPageOptions="[5, 10, 20]"
    paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink"
    :tableProps="{ 'aria-label': 'Customer orders' }"
    class="orders-table erp-table-pagination"
  >
    <template #paginatorstart>
      <div class="flex w-full items-center text-sm text-muted">
        <span role="status">{{ filtered.length }} rows</span>
        <span class="ml-auto mr-2">Rows per page</span>
      </div>
    </template>
    <template #header>
      <div class="flex flex-col gap-2">
        <div>
          <h5 class="text-base font-medium">Orders</h5>
          <p class="text-sm text-muted">Search and review customer orders.</p>
        </div>
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
          <Button type="button" severity="primary" outlined @click="clear">Clear filters</Button>
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
    <template #empty>
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 py-6 text-center">
        <Inbox :size="32" aria-hidden="true" class="text-muted" />
        <div class="space-y-2">
          <h3 class="text-lg font-medium">No matching orders</h3>
          <p class="max-w-md text-sm text-muted">Try changing or clearing your search and filters.</p>
        </div>
        <Button type="button" severity="primary" outlined size="small" @click="clear"
          >Reset search</Button
        >
      </div>
    </template>
  </DataTable>
</template>
