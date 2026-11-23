<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import KpiGroupBlock from '@/components/blocks/metrics/KpiGroupBlock.vue'
import code from '@/components/blocks/metrics/KpiGroupBlock.vue?raw'

const examples = [
  {
    id: 'kpi-group',
    title: 'KPI group',
    description: 'A responsive set of related values for quick comparison.',
    component: KpiGroupBlock,
    code,
    mobilePreview: true,
  },
  {
    id: 'kpi-units',
    title: 'Values with units',
    description: 'Units sit beside the value in muted text; a missing value shows a dash.',
    component: KpiGroupBlock,
    code,
    props: {
      label: 'Warehouse KPIs',
      kpis: [
        {
          label: 'Received',
          value: 18420,
          unit: 'kg',
          detail: '1–30 November 2026',
          markerClass: 'bg-info',
        },
        {
          label: 'Dispatched',
          value: 16980,
          unit: 'kg',
          detail: '1–30 November 2026',
          markerClass: 'bg-primary',
        },
        {
          label: 'Rejected at intake',
          value: null,
          unit: 'kg',
          detail: 'Not yet recorded',
          markerClass: 'bg-warn',
        },
        {
          label: 'Sales value',
          value: 2840500,
          unit: 'Ksh',
          detail: '1–30 November 2026',
          markerClass: 'bg-success',
        },
      ],
    },
  },
]
</script>

<template>
  <BlockDoc
    title="KPI group"
    description="Related operational values arranged for scanning and comparison."
    :usage="[
      'Keep all values in a group within the same scope and time period.',
      'Use two columns where space allows and let cards stack in narrow containers.',
      'Pass the unit separately from the value so it stays muted. A missing value shows a dash and is read as not available, so a measure never looks empty.',
    ]"
    :examples="examples"
  />
</template>
