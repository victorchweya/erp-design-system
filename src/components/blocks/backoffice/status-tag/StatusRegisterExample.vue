<script setup lang="ts">
import Times from '@primeicons/vue/times'
import StatusTagBlock from './StatusTagBlock.vue'
import { defineStatuses, resolveStatus } from './status-registry'

// Map statuses once, next to the feature. Keys match the API value (case and separators are ignored).
defineStatuses(
  'goods-receipt',
  {
    draft: { label: 'Draft', severity: 'secondary' },
    partially_received: { label: 'Partially received', severity: 'warn' },
    received: { label: 'Received', severity: 'success' },
    rejected: { label: 'Rejected', severity: 'danger', icon: Times },
  },
  { title: 'Goods receipt', usage: 'Stock received against a purchase order.' },
)

// Values that are not registered fall back to a humanised label instead of failing.
const samples = [
  { domain: 'goods-receipt', status: 'partially_received' },
  { domain: 'goods-receipt', status: 'rejected' },
  { domain: 'goods-receipt', status: 'AWAITING_QC' },
  { domain: 'receiving', status: 'on-hold' },
  { domain: 'goods-receipt', status: null },
].map((sample) => ({ ...sample, known: resolveStatus(sample.domain, sample.status).known }))
</script>

<template>
  <div class="overflow-x-auto">
    <DataTable
      :value="samples"
      size="small"
      :tableProps="{ 'aria-label': 'Registered and unregistered statuses' }"
    >
      <Column field="domain" header="Domain" />
      <Column header="Raw value">
        <template #body="{ data }"
          ><code>{{ data.status ?? 'null' }}</code></template
        >
      </Column>
      <Column header="Tag">
        <template #body="{ data }"
          ><StatusTagBlock :domain="data.domain" :status="data.status"
        /></template>
      </Column>
      <Column header="In the registry">
        <template #body="{ data }">{{ data.known ? 'Yes' : 'No, fallback' }}</template>
      </Column>
    </DataTable>
  </div>
</template>
