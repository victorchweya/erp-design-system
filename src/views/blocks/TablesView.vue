<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import OrdersTableBlock from '@/components/blocks/tables/OrdersTableBlock.vue'
import code0 from '@/components/blocks/tables/OrdersTableBlock.vue?raw'
import BulkActionsTableBlock from '@/components/blocks/tables/BulkActionsTableBlock.vue'
import code1 from '@/components/blocks/tables/BulkActionsTableBlock.vue?raw'
import DataStressTableBlock from '@/components/blocks/tables/DataStressTableBlock.vue'
import code2 from '@/components/blocks/tables/DataStressTableBlock.vue?raw'
import ServerTableExample from '@/components/blocks/tables/ServerTableExample.vue'
import code3 from '@/components/blocks/tables/ServerTableBlock.vue?raw'
const examples = [
  {
    id: 'orders-table',
    title: 'Search and pagination',
    description:
      'Search by reference or customer, filter by status, sort columns, and recover from no results.',
    component: OrdersTableBlock,
    code: code0,
  },
  {
    id: 'bulk-actions',
    title: 'Selection and bulk actions',
    description:
      'Select supplier orders and confirm the selected records without affecting the others.',
    component: BulkActionsTableBlock,
    code: code1,
  },
  {
    id: 'filters-and-sorting',
    title: 'Filters and sorting',
    description:
      'Search sales orders, apply advanced filters, sort columns, and review the table at mobile width.',
    component: DataStressTableBlock,
    code: code2,
    mobilePreview: true,
  },
  {
    id: 'server-driven',
    title: 'Server-driven table',
    description:
      'Rows, sorting and paging come from the API, with loading, empty and failed states and a row actions menu.',
    component: ServerTableExample,
    code: code3,
    mobilePreview: true,
  },
]
const usage = [
  'Use the native DataTable, Column, sorting, selection, and paginator. These examples use small sizing and showGridlines with the theme’s default rounded border.',
  'Search and status filters combine, and changing a filter returns to the first page. Bulk actions update only selected records and clear the selection afterwards.',
  'The first three examples use local arrays. Connect filtering, loading, errors, and mutations to your data source when adapting them.',
  'For server paging, copy ServerTableBlock.vue. It holds no data: pass the page of rows, the total, and the first, page size and sort it should show, and it emits load, retry, clear-filters and action. Keep the query in your page so Retry repeats it unchanged. The code tab shows the block; the preview wires it to a fake API.',
]
</script>

<template>
  <BlockDoc
    title="Tables"
    description="Working data-table patterns for finding records and acting on selected rows."
    :usage="usage"
    :examples="examples"
  />
</template>
