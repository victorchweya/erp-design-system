<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ConfirmPopupBlock from '@/components/blocks/popups/ConfirmPopupBlock.vue'
import confirmCode from '@/components/blocks/popups/ConfirmPopupBlock.vue?raw'
import RecordPopoverBlock from '@/components/blocks/popups/RecordPopoverBlock.vue'
import popoverCode from '@/components/blocks/popups/RecordPopoverBlock.vue?raw'
import ActionsMenuBlock from '@/components/blocks/popups/ActionsMenuBlock.vue'
import menuCode from '@/components/blocks/popups/ActionsMenuBlock.vue?raw'

const examples = [
  {
    id: 'confirm-popup',
    title: 'ConfirmPopup',
    description:
      'A confirmation anchored to its trigger, with safe initial focus and a separate destructive action.',
    component: ConfirmPopupBlock,
    code: confirmCode,
  },
  {
    id: 'record-popover',
    title: 'Quick-view Popover',
    description: 'Customer details in a labelled Popover with an explicit close action.',
    component: RecordPopoverBlock,
    code: popoverCode,
  },
  {
    id: 'actions-menu',
    title: 'Actions menu',
    description: 'Secondary record actions in a native popup Menu with keyboard navigation.',
    component: ActionsMenuBlock,
    code: menuCode,
  },
]
const usage = [
  'Use ConfirmPopup for a short confirmation beside an action. Use ConfirmDialog under Modals when the decision needs more attention or explanation.',
  'ConfirmPopup requires ConfirmationService from primevue/confirmationservice, registered once with app.use(ConfirmationService). This application already registers it in main.ts. Match each instance’s group and pass the trigger as target to useConfirm().require().',
  'Use Popover for supporting content and Menu for a list of commands. Control them through a typed template ref and pass the trigger event to toggle(). No confirmation service is needed for these two components.',
  'Keep popups short, give them an accessible name, and preserve Escape and focus restoration. Preview actions update only local state.',
]
</script>

<template>
  <BlockDoc
    title="Popups"
    description="Confirmation popups, quick views, and action menus anchored to their trigger."
    :usage="usage"
    :examples="examples"
  />
</template>
