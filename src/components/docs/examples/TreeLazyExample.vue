<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { TreeNode } from 'primevue/treenode'

// Only the warehouses load up front. Zones and bins load when a node is expanded.
const locations = ref<TreeNode[]>([
  { key: 'WH-NBO', label: 'Nairobi warehouse', leaf: false },
  { key: 'WH-MSA', label: 'Mombasa cross-dock', leaf: false },
])
const status = shallowRef('')

function fetchChildren(parent: TreeNode): Promise<TreeNode[]> {
  // Stand-in for an API call such as GET /locations?parent=WH-NBO.
  const isWarehouse = parent.key.startsWith('WH-')
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          isWarehouse
            ? ['Cold room', 'Dry store'].map((zone, i) => ({
                key: `${parent.key}-Z${i + 1}`,
                label: zone,
                leaf: false,
              }))
            : [1, 2, 3].map((bin) => ({
                key: `${parent.key}-B${bin}`,
                label: `Bin ${bin}`,
                leaf: true,
              })),
        ),
      800,
    ),
  )
}

async function onNodeExpand(node: TreeNode) {
  if (node.children) return
  node.loading = true
  status.value = `Loading ${node.label}…`
  const children = await fetchChildren(node)
  node.children = children
  node.loading = false
  status.value = `${node.label}: ${children.length} locations loaded.`
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <Tree
      :value="locations"
      loadingMode="icon"
      aria-label="Storage locations"
      class="max-w-md"
      @node-expand="onNodeExpand"
    />
    <p role="status" class="text-muted-color">{{ status }}</p>
  </div>
</template>
