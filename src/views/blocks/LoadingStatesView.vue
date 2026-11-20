<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import TableSkeletonBlock from '@/components/blocks/loading-states/TableSkeletonBlock.vue'
import tableCode from '@/components/blocks/loading-states/TableSkeletonBlock.vue?raw'
import RecordSkeletonBlock from '@/components/blocks/loading-states/RecordSkeletonBlock.vue'
import recordCode from '@/components/blocks/loading-states/RecordSkeletonBlock.vue?raw'
import DashboardSkeletonBlock from '@/components/blocks/loading-states/DashboardSkeletonBlock.vue'
import dashboardCode from '@/components/blocks/loading-states/DashboardSkeletonBlock.vue?raw'
import ButtonLoadingBlock from '@/components/blocks/loading-states/ButtonLoadingBlock.vue'
import buttonCode from '@/components/blocks/loading-states/ButtonLoadingBlock.vue?raw'
import RefreshTableBlock from '@/components/blocks/loading-states/RefreshTableBlock.vue'
import refreshCode from '@/components/blocks/loading-states/RefreshTableBlock.vue?raw'
import DelayedSpinnerBlock from '@/components/blocks/loading-states/DelayedSpinnerBlock.vue'
import spinnerCode from '@/components/blocks/loading-states/DelayedSpinnerBlock.vue?raw'
import LoadingGuidanceBlock from '@/components/blocks/loading-states/LoadingGuidanceBlock.vue'
import guidanceCode from '@/components/blocks/loading-states/LoadingGuidanceBlock.vue?raw'

const examples = [
  {
    id: 'table-skeleton',
    title: 'Table skeleton',
    description:
      'Show the real columns with placeholder rows, then swap in the data without the table changing size.',
    component: TableSkeletonBlock,
    code: tableCode,
  },
  {
    id: 'record-skeleton',
    title: 'Record skeleton',
    description:
      'Hold the shape of a record page: header, actions, tabs, and two columns of fields.',
    component: RecordSkeletonBlock,
    code: recordCode,
    mobilePreview: true,
  },
  {
    id: 'dashboard-skeleton',
    title: 'Dashboard skeleton',
    description: 'Reserve space for KPI cards and charts while their data loads.',
    component: DashboardSkeletonBlock,
    code: dashboardCode,
    mobilePreview: true,
  },
  {
    id: 'button-loading',
    title: 'Button loading',
    description:
      'Keep the button in place and focusable while an action saves, and ignore repeat presses.',
    component: ButtonLoadingBlock,
    code: buttonCode,
  },
  {
    id: 'refresh-table',
    title: 'Refreshing loaded data',
    description:
      'Refresh a table without hiding it. A thin bar shows progress and the rows update in place.',
    component: RefreshTableBlock,
    code: refreshCode,
  },
  {
    id: 'delayed-spinner',
    title: 'Delayed spinner',
    description:
      'Show a spinner only when loading takes longer than 300 ms, so quick responses do not flicker.',
    component: DelayedSpinnerBlock,
    code: spinnerCode,
  },
  {
    id: 'choosing-an-indicator',
    title: 'Choosing an indicator',
    description: 'Match the indicator to what is loading and how long it is likely to take.',
    component: LoadingGuidanceBlock,
    code: guidanceCode,
  },
]
const usage = [
  'Use the native Skeleton, ProgressSpinner, and ProgressBar. Skeletons are hidden from screen readers, so mark the loading region with aria-busy and announce the start and end in a status message.',
  'Skeletons switch their wave animation off when the user prefers reduced motion. Spinners and progress bars follow the global reduced-motion rule, and each is paired with visible text.',
  'Keep loaded data on screen during a refresh, and keep a pressed button focusable while it works. Replace the timers in these examples with your requests and handle failures with a retry.',
]
</script>

<template>
  <BlockDoc
    title="Loading states"
    description="Skeletons, spinners, and progress indicators for first loads, refreshes, and actions in progress."
    :usage="usage"
    :examples="examples"
  />
</template>
