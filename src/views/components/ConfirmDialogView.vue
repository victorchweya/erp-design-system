<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/modals/ConfirmationModalBlock.vue'
import code from '@/components/blocks/modals/ConfirmationModalBlock.vue?raw'
import DestructiveExample from '@/components/docs/examples/ConfirmDialogDestructiveExample.vue'
import destructiveCode from '@/components/docs/examples/ConfirmDialogDestructiveExample.vue?raw'

const examples = [
  {
    id: 'confirm-dialog-basic',
    title: 'Confirm before submitting',
    description:
      'Ask people to check an order before it is sent. Name the record in the message and the outcome on the accept button.',
    component: Example,
    code: code,
  },
  {
    id: 'confirm-dialog-destructive',
    title: 'Destructive action',
    description:
      'Use the danger severity on the accept button and put the initial focus on the safe choice. The trigger disappears after a delete, so the example moves focus to the next control.',
    component: DestructiveExample,
    code: destructiveCode,
  },
]
const api = [
  {
    name: 'group',
    type: 'string',
    default: '—',
    description:
      'Prop. Matches the group option of confirm.require. Give each ConfirmDialog on a page its own group.',
  },
  {
    name: 'header',
    type: 'string',
    default: '—',
    description: 'Option. Title of the dialog. It also labels the dialog.',
  },
  {
    name: 'message',
    type: 'string',
    default: '—',
    description: 'Option. What will happen. Name the record and any consequence.',
  },
  {
    name: 'icon',
    type: 'string | Component',
    default: '—',
    description: 'Option. Icon shown next to the message.',
  },
  {
    name: 'acceptProps / rejectProps',
    type: 'object',
    default: '—',
    description:
      'Option. Button props, such as label, severity and outlined. Use labels that name the outcome.',
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
  'ConfirmDialog uses the alertdialog role and is labelled by its header. Tab stays inside it until the person answers.',
  'Focus returns to the element that opened the dialog. If accepting removes that element, move focus yourself, as the destructive example does.',
  'Set aria-haspopup="dialog", aria-controls and aria-expanded on the trigger. Update aria-expanded from the onShow and onHide options.',
  'Write button labels that name the outcome, such as Delete supplier and Keep supplier, rather than Yes and No.',
]
</script>

<template>
  <ComponentDoc
    title="ConfirmDialog"
    componentName="ConfirmDialog"
    category="Overlay"
    description="Ask for a decision before an action that is hard to undo."
    usage="is opened with useConfirm().require(options). ConfirmationService is registered once in main.ts. Render the ConfirmDialog next to its trigger with a group so other confirmations on the page do not open it."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/confirmdialog"
  />
</template>
