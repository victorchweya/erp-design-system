<script setup lang="ts">
const products = [
  { id: '1', name: 'Carrots', category: 'Vegetables', quantity: 24 },
  { id: '2', name: 'Limes', category: 'Fruit', quantity: 18 },
  { id: '3', name: 'Kale', category: 'Leafy greens', quantity: 32 },
  { id: '4', name: 'Tomatoes', category: 'Vegetables', quantity: 16 },
]
</script>

<template>
  <DataTable
    :value="products"
    dataKey="id"
    size="small"
    showGridlines
    paginator
    :rows="3"
    :tableProps="{ 'aria-label': 'Produce inventory' }"
  >
    <Column field="name" header="Produce" sortable /><Column
      field="category"
      header="Category"
    /><Column field="quantity" header="Crates" sortable />
  </DataTable>
</template>
