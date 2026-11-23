<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ReportEmbedExample from '@/components/blocks/backoffice/report-embed/ReportEmbedExample.vue'
// The Code tab shows the reusable block. The example only wires it to a fake signed-address call.
import code from '@/components/blocks/backoffice/report-embed/ReportEmbedBlock.vue?raw'

const examples = [
  {
    id: 'catalogue-and-report',
    title: 'Catalogue and report',
    description: 'Pick a report to load it in place, and refresh to get a new signed address.',
    component: ReportEmbedExample,
    code,
  },
  {
    id: 'loading-and-failed',
    title: 'Loading and failed states',
    description: 'Switch the preview state to see the loading skeleton and the centred error state with a retry action.',
    component: ReportEmbedExample,
    code,
    props: { stateSwitcher: true },
  },
]
const usage = [
  'Use ReportEmbedBlock wherever a report or dashboard is shown in a frame. Pass reports with an id, name, category and signed url, and bind v-model:selected. The picker groups reports by category, and the frame title is the report name.',
  'You own the loading. When selected changes, set state to loading, fetch a signed address, put it in the report, and set state to ready. Set failed if the fetch fails and pass errorMessage in plain words.',
  'Handle retry and refresh the same way: fetch again. Refresh is for expired addresses. After a click, focus moves to the report area, so keyboard users are not left on a button that has gone.',
]
</script>

<template>
  <BlockDoc
    eyebrow="Backoffice blocks"
    title="Report embed"
    description="One picker and one frame for every embedded report and dashboard, with clear loading and failed states."
    :usage="usage"
    :examples="examples"
  />
</template>
