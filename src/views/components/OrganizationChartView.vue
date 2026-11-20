<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/OrganizationChartExample.vue'
import code from '@/components/docs/examples/OrganizationChartExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Collapsible reporting lines',
    description:
      'Show who reports to whom in operations. The default slot renders each person and role, and collapsible adds a toggle under every node that has children.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'OrganizationChartNode | OrganizationChartNode[]',
    default: '-',
    description: 'One root node or several. Each node needs a key unique across the whole chart.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: 'Adds an expand and collapse button to nodes that have children.',
  },
  {
    name: 'collapsedKeys',
    type: 'OrganizationChartCollapsedKeys',
    default: '-',
    description:
      'Map of node keys set to true for collapsed nodes. Use with v-model:collapsedKeys.',
  },
  {
    name: 'selectionMode',
    type: "'single' | 'multiple' | 'checkbox'",
    default: '-',
    description:
      'Makes nodes selectable and focusable. Without it, nodes are not in the tab order.',
  },
  {
    name: 'selectionKeys',
    type: 'OrganizationChartSelectionKeys',
    default: '-',
    description: 'Map of selected node keys. Use with v-model:selectionKeys.',
  },
  {
    name: 'gap',
    type: 'number | number[]',
    default: '[40, 56]',
    description: 'Horizontal and vertical space between nodes, in pixels.',
  },
]
const accessibility = [
  'The chart is a tree: the root has role tree, each node is a treeitem with aria-level, and collapsible nodes report aria-expanded. Name the chart with aria-label.',
  'Without selectionMode, only the expand and collapse buttons take focus. Tab moves between them, and Enter or Space toggles. Their labels are a generic Expand or Collapse, so keep the person and role inside the node to give context.',
  'With selectionMode, each node takes focus and Enter or Space selects it. There is no arrow key navigation between nodes.',
  'Wide charts scroll sideways. For large hierarchies, also offer the same structure as a Tree or a nested list.',
]
</script>

<template>
  <ComponentDoc
    title="OrganizationChart"
    componentName="OrganizationChart"
    category="Data"
    description="Show a reporting or approval hierarchy as a top-down chart."
    usage="OrganizationChart takes a tree of keyed nodes with label, data and children. Use the default slot for custom node content. Keep charts to three or four levels; use Tree when people need to search or browse a deep hierarchy."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/organizationchart"
  />
</template>
