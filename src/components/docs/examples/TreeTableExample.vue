<script setup lang="ts">
const nodes = [
  {
    key: '0',
    data: { name: 'Vegetables', quantity: 40 },
    children: [
      { key: '0-0', data: { name: 'Carrots', quantity: 24 } },
      { key: '0-1', data: { name: 'Tomatoes', quantity: 16 } },
    ],
  },
]
</script>

<template>
  <TreeTable
    :value="nodes"
    size="small"
    showGridlines
    :tableProps="{ 'aria-label': 'Inventory by category' }"
    ><Column field="name" header="Category / produce" expander /><Column
      field="quantity"
      header="Crates"
  /></TreeTable>
</template>
