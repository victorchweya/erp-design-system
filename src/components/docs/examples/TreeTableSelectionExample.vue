<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNode } from 'primevue/treenode'
import type { TreeTableSelectionKeys } from 'primevue/treetable'
import { formatNumber } from '@/utils/format'

const stock: TreeNode[] = [
  {
    key: 'cold-room',
    data: { name: 'Cold room', crates: 64 },
    children: [
      { key: 'LGR-0310', data: { name: 'Kale', crates: 32 } },
      { key: 'LGR-0315', data: { name: 'Spinach', crates: 18 } },
      { key: 'FRT-0219', data: { name: 'Avocados', crates: 14 } },
    ],
  },
  {
    key: 'dry-store',
    data: { name: 'Dry store', crates: 52 },
    children: [
      { key: 'VEG-0137', data: { name: 'Red onions', crates: 30 } },
      { key: 'VEG-0140', data: { name: 'Potatoes', crates: 22 } },
    ],
  },
]

const selection = ref<TreeTableSelectionKeys>({})

const products = stock.flatMap((zone) => zone.children ?? [])
const selectedCrates = computed(() =>
  products
    .filter((product) => selection.value[product.key]?.checked)
    .reduce((sum, product) => sum + product.data.crates, 0),
)
</script>

<template>
  <div class="flex flex-col gap-3">
    <TreeTable
      v-model:selectionKeys="selection"
      :value="stock"
      selectionMode="checkbox"
      size="small"
      showGridlines
      :tableProps="{ 'aria-label': 'Stock to transfer from Nairobi warehouse' }"
    >
      <Column field="name" header="Location / product" expander />
      <Column field="crates" header="Crates">
        <template #body="{ node }">{{ formatNumber(node.data.crates) }}</template>
      </Column>
    </TreeTable>
    <p role="status" class="text-muted-color">
      {{ formatNumber(selectedCrates) }} crates selected for transfer
    </p>
  </div>
</template>
