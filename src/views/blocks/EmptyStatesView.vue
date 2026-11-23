<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import BasicEmptyStateBlock from '@/components/blocks/empty-states/BasicEmptyStateBlock.vue'
import basicCode from '@/components/blocks/empty-states/BasicEmptyStateBlock.vue?raw'
import EmptyStateWithActionBlock from '@/components/blocks/empty-states/EmptyStateWithActionBlock.vue'
import actionCode from '@/components/blocks/empty-states/EmptyStateWithActionBlock.vue?raw'
import UntitledEmptyStateBlock from '@/components/blocks/empty-states/UntitledEmptyStateBlock.vue'
import untitledCode from '@/components/blocks/empty-states/UntitledEmptyStateBlock.vue?raw'
import EmptyStateSizesBlock from '@/components/blocks/empty-states/EmptyStateSizesBlock.vue'
import sizesCode from '@/components/blocks/empty-states/EmptyStateSizesBlock.vue?raw'
import RetryErrorStateBlock from '@/components/blocks/empty-states/RetryErrorStateBlock.vue'
import retryCode from '@/components/blocks/empty-states/RetryErrorStateBlock.vue?raw'
import UnavailableStateBlock from '@/components/blocks/empty-states/UnavailableStateBlock.vue'
import unavailableCode from '@/components/blocks/empty-states/UnavailableStateBlock.vue?raw'
import TableEmptyStateBlock from '@/components/blocks/empty-states/TableEmptyStateBlock.vue'
import tableEmptyCode from '@/components/blocks/empty-states/TableEmptyStateBlock.vue?raw'

const examples = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'Use when a collection is genuinely empty and no immediate action is required.',
    component: BasicEmptyStateBlock,
    code: basicCode,
  },
  {
    id: 'with-action',
    title: 'With an action',
    description: 'Offer one clear action when the user can create the missing first record.',
    component: EmptyStateWithActionBlock,
    code: actionCode,
  },
  {
    id: 'without-title',
    title: 'Without a title',
    description: 'Use a short sentence without a heading in compact or supporting containers.',
    component: UntitledEmptyStateBlock,
    code: untitledCode,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Match the amount of space and detail to a page, section, or inline container.',
    component: EmptyStateSizesBlock,
    code: sizesCode,
  },
  {
    id: 'table-empty',
    title: 'Empty table',
    description: 'Keep the column headers visible and place the empty state in the table body.',
    component: TableEmptyStateBlock,
    code: tableEmptyCode,
  },
  {
    id: 'error-with-retry',
    title: 'Error with retry',
    description: 'Use when loading failed and the user can safely repeat the request.',
    component: RetryErrorStateBlock,
    code: retryCode,
  },
  {
    id: 'error-without-retry',
    title: 'Error without retry',
    description: 'Explain the next available route when retrying cannot resolve the failure.',
    component: UnavailableStateBlock,
    code: unavailableCode,
  },
]

const usage = [
  'Use an empty state when a successful request returns no records. Use an error state when a request fails or required information is unavailable.',
  'Keep the title and explanation specific to the current container. Offer one action only when it is the clearest next step.',
  'For tables, use the DataTable empty slot. Keep the icon, title, explanation, and optional action together in the empty row without nesting another card.',
]
</script>

<template>
  <BlockDoc
    title="Empty states"
    description="Empty and error states for pages, sections, cards, and filtered results."
    :usage="usage"
    :examples="examples"
  />
</template>
