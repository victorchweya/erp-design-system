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
  'Match feedback to its scope: put validation beside its field, use Message inside the affected page or section, use Toast for a brief non-blocking result after an action, and replace unavailable content with its local error state.',
  'Keep persistent or blocking information visible until it is resolved. Use a timed Toast only when the user does not need it to continue, recover, or understand the current state.',
  'Status Messages include the matching semantic icon. Small simple validation messages rely on their field relationship and do not need an icon.',
  'Add actions only when the user can resolve the message immediately. Use a confirmation dialog before an action rather than Message after it when explicit consent is required.',
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
