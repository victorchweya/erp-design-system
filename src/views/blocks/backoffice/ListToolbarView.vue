<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import SupplierOrdersListBlock from '@/components/blocks/backoffice/list-toolbar/SupplierOrdersListBlock.vue'
import code0 from '@/components/blocks/backoffice/list-toolbar/SupplierOrdersListBlock.vue?raw'
import CompactListToolbarBlock from '@/components/blocks/backoffice/list-toolbar/CompactListToolbarBlock.vue'
import code1 from '@/components/blocks/backoffice/list-toolbar/CompactListToolbarBlock.vue?raw'
const examples = [
  {
    id: 'full-toolbar',
    title: 'Full toolbar over a table',
    description:
      'Search, two inline filters, More filters, columns, export and refresh above a supplier orders table.',
    component: SupplierOrdersListBlock,
    code: code0,
  },
  {
    id: 'compact-toolbar',
    title: 'Compact toolbar',
    description: 'Search, one filter and Export CSV for a short list.',
    component: CompactListToolbarBlock,
    code: code1,
  },
]
const usage = [
  'Copy ListToolbarBlock.vue. It holds no data: pass the search text, applied filters, columns and result count, and it emits what changed. You filter and load the list.',
  'Put the one or two main filters in the filters slot as small selects with a screen reader label and a placeholder that names them, and the rest in more-filters. The More filters button shows how many are active.',
  'List every applied filter, keyword included. remove-filter resets that filter, clear resets all. Leave out columns, exportable or refreshable to hide those buttons.',
  'Below the table, handle “no matches” with Clear filters, and a failed load with a Message and Retry. Pass total as undefined after an error.',
]
</script>

<template>
  <BlockDoc
    title="List toolbar"
    eyebrow="Backoffice blocks"
    description="The filter bar above a list: keyword search, filters, applied filter chips, a column chooser, export and refresh."
    :usage="usage"
    :examples="examples"
  />
</template>
