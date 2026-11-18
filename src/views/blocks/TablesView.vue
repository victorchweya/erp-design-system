<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import OrdersTableBlock from '@/components/blocks/tables/OrdersTableBlock.vue'
import code0 from '@/components/blocks/tables/OrdersTableBlock.vue?raw'
import BulkActionsTableBlock from '@/components/blocks/tables/BulkActionsTableBlock.vue'
import code1 from '@/components/blocks/tables/BulkActionsTableBlock.vue?raw'
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
]
const usage = [
  'Use the native DataTable, Column, sorting, selection, and paginator. These examples use small sizing and showGridlines with the theme’s default rounded border.',
  'Search and status filters combine, and changing a filter returns to the first page. Bulk actions update only selected records and clear the selection afterwards.',
  'These examples use local arrays. Connect filtering, loading, errors, and mutations to your data source when adapting them for server pagination.',
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
