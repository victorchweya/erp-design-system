<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ConfirmationModalBlock from '@/components/blocks/modals/ConfirmationModalBlock.vue'
import code0 from '@/components/blocks/modals/ConfirmationModalBlock.vue?raw'
import AssignmentModalBlock from '@/components/blocks/modals/AssignmentModalBlock.vue'
import code1 from '@/components/blocks/modals/AssignmentModalBlock.vue?raw'
const examples = [
  {
    id: 'confirmation-modal',
    title: 'ConfirmDialog',
    description:
      'A native service-driven confirmation with initial focus on Cancel and an explicit Confirm action.',
    component: ConfirmationModalBlock,
    code: code0,
  },
  {
    id: 'assignment-modal',
    title: 'Short form modal',
    description:
      'Assign an order to a team member with validation and separate Cancel and Save actions.',
    component: AssignmentModalBlock,
    code: code1,
  },
]
const usage = [
  'Use ConfirmDialog for an action that needs confirmation, and Dialog with modal enabled for a short form. Keep the title specific and use a Drawer for longer record work.',
  'ConfirmDialog uses useConfirm from primevue/useconfirm. Register ConfirmationService from primevue/confirmationservice once with app.use(ConfirmationService); this application already does so in main.ts. Match the require call’s group to its ConfirmDialog instance.',
  'Confirmation puts initial focus on Cancel. The assignment form validates before saving, and cancelling keeps the previous assignment.',
  'Native Dialog handles Escape, focus trapping, and returning focus. Confirmations do not dismiss when the backdrop is clicked.',
]
</script>

<template>
  <BlockDoc
    title="Modals"
    description="Focused dialogs for confirming an action or completing a short form."
    :usage="usage"
    :examples="examples"
  />
</template>
