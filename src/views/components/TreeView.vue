<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TreeExample.vue'
import code from '@/components/docs/examples/TreeExample.vue?raw'
import CheckboxExample from '@/components/docs/examples/TreeCheckboxExample.vue'
import checkboxCode from '@/components/docs/examples/TreeCheckboxExample.vue?raw'
import LazyExample from '@/components/docs/examples/TreeLazyExample.vue'
import lazyCode from '@/components/docs/examples/TreeLazyExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Browse and select one produce category. filter adds a search box; matching nodes stay visible along with their parents.',
    component: Example,
    code: code,
  },
  {
    id: 'checkbox',
    title: 'Checkbox selection',
    description:
      'Choose the products a supplier can deliver. Ticking a category ticks all its products, and a category with some products ticked shows as partly checked.',
    component: CheckboxExample,
    code: checkboxCode,
  },
  {
    id: 'lazy',
    title: 'Lazy loading',
    description:
      'Load zones and bins only when a warehouse is expanded. Set leaf to false so unloaded nodes still show a toggle, and set loading while the request runs. A status message reports the result.',
    component: LazyExample,
    code: lazyCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'TreeNode[]',
    default: '-',
    description: 'Root nodes. Each node needs a unique key, a label and optional children.',
  },
  {
    name: 'selectionMode',
    type: "'single' | 'multiple' | 'checkbox'",
    default: '-',
    description: 'How nodes are selected. Leave unset for a tree that people only browse.',
  },
  {
    name: 'selectionKeys',
    type: 'TreeSelectionKeys',
    default: '-',
    description:
      'Selected nodes keyed by node key. Checkbox mode stores { checked, partialChecked } for each node. Use with v-model:selectionKeys.',
  },
  {
    name: 'expandedKeys',
    type: 'TreeExpandedKeys',
    default: '-',
    description:
      'Expanded nodes keyed by node key. Use with v-model:expandedKeys to open nodes from code.',
  },
  {
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description:
      'Adds a search box above the tree. filterPlaceholder also becomes its accessible name.',
  },
  {
    name: 'filterMode',
    type: "'lenient' | 'strict'",
    default: 'lenient',
    description:
      'Lenient keeps all children of a matching node. Strict keeps only nodes that match, plus their parents.',
  },
  {
    name: 'loadingMode',
    type: "'mask' | 'icon'",
    default: 'mask',
    description:
      'How loading shows. Icon replaces the toggle of a node whose loading is true. Mask covers the tree when loading is set on the Tree.',
  },
  {
    name: 'ariaLabelledby',
    type: 'string',
    default: '-',
    description:
      'Id of a visible label for the tree. Use ariaLabel when there is no visible label.',
  },
]
const accessibility = [
  'Name the tree with aria-labelledby pointing at a visible label, or with aria-label. The name goes on the element with role tree.',
  'Tab moves into the tree and out again. Up and Down Arrow move between visible nodes, Right Arrow opens a node or moves to its first child, Left Arrow closes a node or moves to its parent, and Enter or Space selects.',
  'In checkbox mode each node reports aria-checked; the checkboxes themselves are hidden from assistive technology. Show a count of what is selected, as in the checkbox example.',
  'Lazy nodes do not announce that they are loading. Use a status message for loading and errors.',
]
</script>

<template>
  <ComponentDoc
    title="Tree"
    componentName="Tree"
    category="Data"
    description="Show hierarchical data, such as product categories or storage locations, that people can expand, search and select."
    usage="Tree takes keyed nodes with label and children. Bind selection with v-model:selectionKeys and expansion with v-model:expandedKeys. For large hierarchies, load children on node-expand. Use TreeTable when each node needs several columns, and TreeSelect when a form needs one value from a hierarchy."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tree"
  />
</template>
