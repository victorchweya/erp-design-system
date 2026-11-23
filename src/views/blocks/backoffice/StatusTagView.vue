<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import StatusMatrixExample from '@/components/blocks/backoffice/status-tag/StatusMatrixExample.vue'
import code0 from '@/components/blocks/backoffice/status-tag/StatusMatrixExample.vue?raw'
import StatusTableExample from '@/components/blocks/backoffice/status-tag/StatusTableExample.vue'
import code1 from '@/components/blocks/backoffice/status-tag/StatusTableExample.vue?raw'
import StatusRegisterExample from '@/components/blocks/backoffice/status-tag/StatusRegisterExample.vue'
import code2 from '@/components/blocks/backoffice/status-tag/StatusRegisterExample.vue?raw'

const examples = [
  {
    id: 'status-reference',
    title: 'Status reference',
    description: 'Every built-in status with its meaning, grouped by domain.',
    component: StatusMatrixExample,
    code: code0,
  },
  {
    id: 'status-in-table',
    title: 'Status in a table',
    description: 'Order and payment status side by side; the tag text is the accessible name.',
    component: StatusTableExample,
    code: code1,
  },
  {
    id: 'register-statuses',
    title: 'Register your own and unknown values',
    description:
      'Add a domain with defineStatuses; unregistered values still show as readable text.',
    component: StatusRegisterExample,
    code: code2,
  },
]
const usage = [
  'Register each domain once with defineStatuses in status-registry.ts, then render it with StatusTagBlock from the domain and the raw API value. Case and separators are ignored, so In Progress and in_progress match.',
  'The label is always visible text and an icon is only an extra cue. Statuses use the PrimeVue Tag severities and nothing else. Success is active, done or healthy, info is in progress, warn is waiting, danger is failed or blocked, secondary is inactive, and contrast is for rare emphasis.',
  'Derive date-based states with windowStatus or promotionStatus instead of storing them. The start is inclusive, the end is exclusive, and a missing date is open.',
  'An unknown value shows a humanised label in the secondary severity. A missing value shows a dash.',
]
</script>

<template>
  <BlockDoc
    eyebrow="Backoffice blocks"
    title="Status tag"
    description="One registry and one tag for order, payment, approval, route and other statuses, so every list reads the same."
    :usage="usage"
    :examples="examples"
  />
</template>
