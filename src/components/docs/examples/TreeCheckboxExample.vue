<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNode } from 'primevue/treenode'
import type { TreeSelectionKeys } from 'primevue/tree'

const categories: TreeNode[] = [
  {
    key: 'vegetables',
    label: 'Vegetables',
    children: [
      { key: 'VEG-0101', label: 'Carrots' },
      { key: 'VEG-0122', label: 'Tomatoes' },
      { key: 'VEG-0137', label: 'Red onions' },
    ],
  },
  {
    key: 'fruit',
    label: 'Fruit',
    children: [
      { key: 'FRT-0204', label: 'Limes' },
      { key: 'FRT-0219', label: 'Avocados' },
    ],
  },
  {
    key: 'leafy-greens',
    label: 'Leafy greens',
    children: [
      { key: 'LGR-0310', label: 'Kale' },
      { key: 'LGR-0315', label: 'Spinach' },
    ],
  },
]

// Checkbox mode stores { checked, partialChecked } for every ticked node, parents included.
const selection = ref<TreeSelectionKeys>({
  fruit: { checked: true, partialChecked: false },
  'FRT-0204': { checked: true, partialChecked: false },
  'FRT-0219': { checked: true, partialChecked: false },
  vegetables: { checked: false, partialChecked: true },
  'VEG-0101': { checked: true, partialChecked: false },
})

const productKeys = categories.flatMap((category) => category.children?.map((p) => p.key) ?? [])
const selectedProducts = computed(() => productKeys.filter((key) => selection.value[key]?.checked))
</script>

<template>
  <div class="flex flex-col gap-3">
    <span id="supplier-products-label" class="font-medium">Products Valley Growers can supply</span>
    <Tree
      v-model:selectionKeys="selection"
      :value="categories"
      selectionMode="checkbox"
      aria-labelledby="supplier-products-label"
      class="max-w-md"
    />
    <p role="status" class="text-muted-color">
      {{ selectedProducts.length }} of {{ productKeys.length }} products selected
    </p>
  </div>
</template>
