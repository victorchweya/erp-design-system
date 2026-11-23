<script setup lang="ts">
import RecordDetailsBlock, { type RecordDetailSection } from './RecordDetailsBlock.vue'

const sections: RecordDetailSection[] = [
  {
    id: 'dates',
    title: 'Dates',
    items: [
      { key: 'ordered', label: 'Ordered', value: '2026-11-16', kind: 'date' },
      { key: 'dispatched', label: 'Dispatched', value: '2026-11-18', kind: 'date' },
      { key: 'received', label: 'Received', value: null, kind: 'date' },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    items: [
      { key: 'status', label: 'Payment status', value: 'Part paid' },
      { key: 'total', label: 'Order total', value: 84600, kind: 'currency' },
      { key: 'paid', label: 'Amount paid', value: 40000, kind: 'currency' },
      { key: 'balance', label: 'Balance due', value: 44600, kind: 'currency' },
      { key: 'reference', label: 'Payment reference', value: 'PAY-20418', copyable: true },
    ],
  },
]
</script>

<template>
  <aside class="w-full max-w-xs" aria-label="Supplier order summary">
    <RecordDetailsBlock
      title="Order FTF-SO-3187"
      subtitle="Fresh Valley Growers, Kiambu"
      heading-tag="h3"
      variant="sidebar"
      :sections="sections"
    >
      <template #value-status="{ text }">
        <Tag severity="warn">{{ text }}</Tag>
      </template>
    </RecordDetailsBlock>
  </aside>
</template>
