<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/popups/ConfirmPopupBlock.vue'
import code from '@/components/blocks/popups/ConfirmPopupBlock.vue?raw'

const examples = [
  {
    id: 'confirm-popup-basic',
    title: 'Confirm beside the trigger',
    description:
      'Ask for a quick confirmation next to the button that triggered it. Focus starts on the safe choice.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'group',
    type: 'string',
    default: '—',
    description: 'Prop. Matches the group option of confirm.require.',
  },
  {
    name: 'target',
    type: 'HTMLElement',
    default: '—',
    description:
      'Option. Element the popup points to and returns focus to. Pass event.currentTarget.',
  },
  {
    name: 'message',
    type: 'string',
    default: '—',
    description: 'Option. A short question that names the record.',
  },
  {
    name: 'acceptProps / rejectProps',
    type: 'object',
    default: '—',
    description:
      'Option. Button props, such as label and severity. Use labels that name the outcome.',
  },
  {
    name: 'accept / reject',
    type: '() => void',
    default: '—',
    description: 'Option. Called when the person accepts or rejects.',
  },
  {
    name: 'defaultFocus',
    type: "'accept' | 'reject'",
    default: "'accept'",
    description: 'Option. Button that receives focus on open. Use reject for destructive actions.',
  },
]
const accessibility = [
  'ConfirmPopup uses the alertdialog role and has no header, so give it an aria-label.',
  'Tab stays inside the popup. Escape, accept and reject close it and return focus to the target.',
  'Set aria-haspopup="dialog", aria-controls and aria-expanded on the trigger. Update aria-expanded from the onShow and onHide options.',
  'Keep the message to one sentence. Use ConfirmDialog when people need more context to decide.',
]
</script>

<template>
  <ComponentDoc
    title="ConfirmPopup"
    componentName="ConfirmPopup"
    category="Overlay"
    description="Confirm a low-risk action next to the control that triggered it."
    usage="is opened with useConfirm().require(options), passing the trigger as target. ConfirmationService is registered once in main.ts. Give each ConfirmPopup a group when a page has more than one."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/confirmpopup"
  />
</template>
