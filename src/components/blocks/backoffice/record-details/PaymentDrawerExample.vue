<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import RecordDetailsBlock, { type RecordDetailSection } from './RecordDetailsBlock.vue'

const id = useId()
const visible = shallowRef(false)
let trigger: HTMLElement | null = null
function open(event: Event) {
  trigger = event.currentTarget as HTMLElement
  visible.value = true
}

const sections: RecordDetailSection[] = [
  {
    id: 'payment',
    items: [
      { key: 'amount', label: 'Amount', value: 44600, kind: 'currency' },
      { key: 'method', label: 'Method', value: 'M-Pesa paybill' },
      { key: 'code', label: 'M-Pesa code', value: 'SKL4F8Q2XN', copyable: true },
      { key: 'paid', label: 'Paid on', value: '2026-11-19', kind: 'date' },
      { key: 'customer', label: 'Customer', value: 'Green Basket Kitchen' },
      { key: 'invoice', label: 'Invoice number', value: 'INV-2026-0412', copyable: true },
      { key: 'recorded', label: 'Recorded by', value: 'Peter Otieno' },
      { key: 'note', label: 'Note', value: null },
    ],
  },
]
</script>

<template>
  <Button
    type="button"
    size="small"
    severity="primary"
    outlined
    aria-haspopup="dialog"
    :aria-controls="id"
    :aria-expanded="visible"
    @click="open"
    >View payment details</Button
  >
  <Drawer
    :id="id"
    v-model:visible="visible"
    header="Payment PAY-20418"
    aria-label="Payment PAY-20418 details"
    position="right"
    blockScroll
    class="w-full sm:w-96"
    @after-hide="trigger?.focus()"
  >
    <RecordDetailsBlock variant="sidebar" :sections="sections" />
    <template #footer>
      <div class="flex justify-end">
        <Button type="button" size="small" severity="secondary" outlined @click="visible = false"
          >Close details</Button
        >
      </div>
    </template>
  </Drawer>
</template>
