<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ActionAlertBlock from '@/components/blocks/feedback/ActionAlertBlock.vue'
import code0 from '@/components/blocks/feedback/ActionAlertBlock.vue?raw'
const examples = [
  {
    id: 'actions',
    title: 'Actions',
    description:
      'Use two actions when users must choose how to continue, or one action for a single recovery path. Actions wrap below the message in narrow containers.',
    component: ActionAlertBlock,
    code: code0,
  },
]
const usage = [
  'Use the default Message component for feedback. Add actions only when the user can resolve the message immediately.',
  'Keep actions outlined and short. Put the secondary action first when a message offers two choices, and allow the action row to wrap in narrow containers.',
]
</script>

<template>
  <BlockDoc
    title="Feedback"
    description="Alerts with actions and recoverable errors that explain what to do next."
    :usage="usage"
    :examples="examples"
  />
</template>
