<script setup lang="ts">
import { shallowRef } from 'vue'
type Order = { reference: string; supplier: string; status: 'Pending' | 'Confirmed' }
const orders = shallowRef<Order[]>([
  { reference: 'PO-201', supplier: 'Kijani Farm', status: 'Pending' },
  { reference: 'PO-202', supplier: 'Valley Growers', status: 'Pending' },
  { reference: 'PO-203', supplier: 'Sunrise Produce', status: 'Pending' },
  { reference: 'PO-204', supplier: 'Mavuno Co-operative', status: 'Pending' },
  { reference: 'PO-205', supplier: 'Rift Valley Fresh', status: 'Pending' },
  { reference: 'PO-206', supplier: 'Highland Harvest', status: 'Pending' },
])
const selected = shallowRef<Order[]>([])
const first = shallowRef(0)
const rows = shallowRef(3)
const feedback = shallowRef('')
function confirmSelected() {
  if (!selected.value.length) return
  const references = new Set(selected.value.map((order) => order.reference))
  orders.value = orders.value.map((order) =>
    references.has(order.reference) ? { ...order, status: 'Confirmed' } : order,
  )
  feedback.value = `Confirmed ${references.size} selected orders in this preview.`
  selected.value = []
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <DataTable
      v-model:selection="selected"
      v-model:first="first"
      v-model:rows="rows"
      :value="orders"
      dataKey="reference"
      size="small"
      showGridlines
      paginator
      :rowsPerPageOptions="[3, 6]"
      paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink"
      :tableProps="{ 'aria-label': 'Supplier orders' }"
    >
      <template #paginatorstart>
        <div class="flex w-full items-center text-sm text-muted">
          <span role="status">{{ selected.length }} of {{ orders.length }} rows selected</span>
          <span class="ml-auto mr-2">Rows per page</span>
        </div>
      </template>
      <template #header
        ><div class="flex flex-wrap items-center justify-between gap-3">
          <h5 class="text-lg font-medium">Supplier orders</h5>
          <Button type="button" size="small" :disabled="!selected.length" @click="confirmSelected"
            >Confirm selected ({{ selected.length }})</Button
          >
        </div></template
      >
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column field="reference" header="Order" />
      <Column field="supplier" header="Supplier" />
      <Column field="status" header="Status"
        ><template #body="{ data }"
          ><Tag :severity="data.status === 'Confirmed' ? 'success' : 'warn'">{{
            data.status
          }}</Tag></template
        ></Column
      >
    </DataTable>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
</template>

<style scoped>
:deep(.p-paginator) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}

:deep(.p-paginator-content-start) {
  display: flex;
  width: 100%;
  min-width: 0;
}
</style>
