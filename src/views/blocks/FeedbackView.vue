<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ActionAlertBlock from '@/components/blocks/feedback/ActionAlertBlock.vue'
import code0 from '@/components/blocks/feedback/ActionAlertBlock.vue?raw'
import RetryAlertBlock from '@/components/blocks/feedback/RetryAlertBlock.vue'
import code1 from '@/components/blocks/feedback/RetryAlertBlock.vue?raw'
import EmptyStateBlock from '@/components/blocks/feedback/EmptyStateBlock.vue'
import code2 from '@/components/blocks/feedback/EmptyStateBlock.vue?raw'
const examples = [
  {
    id: 'action-alert',
    title: 'Alert with an action',
    description: 'A warning that becomes a success message after review.',
    component: ActionAlertBlock,
    code: code0,
  },
  {
    id: 'retry-alert',
    title: 'Error and retry',
    description: 'A recoverable error with a clear retry action and success feedback.',
    component: RetryAlertBlock,
    code: code1,
  },
  {
    id: 'empty-state',
    title: 'Empty state',
    description: 'A short explanation and one primary action for a collection with no records.',
    component: EmptyStateBlock,
    code: code2,
  },
]
const usage = [
  'Use Message for feedback and Card for a larger empty state. Keep a visible explanation alongside each action.',
  'Warning uses the orange ramp. Message calls danger severity error. Retry and create actions here update local preview state.',
]
</script>

<template>
  <BlockDoc
    title="Feedback"
    description="Alerts with actions, recoverable errors, and empty states that explain what to do next."
    :usage="usage"
    :examples="examples"
  />
</template>
