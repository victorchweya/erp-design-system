<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import FormExample from '@/components/blocks/modals/AssignmentModalBlock.vue'
import formCode from '@/components/blocks/modals/AssignmentModalBlock.vue?raw'
import SizesExample from '@/components/docs/examples/DialogSizesExample.vue'
import sizesCode from '@/components/docs/examples/DialogSizesExample.vue?raw'
import NonModalExample from '@/components/docs/examples/DialogNonModalExample.vue'
import nonModalCode from '@/components/docs/examples/DialogNonModalExample.vue?raw'

const examples = [
  {
    id: 'dialog-form',
    title: 'Form with footer actions',
    description:
      'Put the form in the content and its buttons in the footer slot. The footer submit button uses the form attribute to submit the form, so validation runs in one handler.',
    component: FormExample,
    code: formCode,
  },
  {
    id: 'dialog-sizes',
    title: 'Sizes',
    description:
      'Set the width with utility classes on the dialog. Keep w-[calc(100vw-2rem)] so it fits small screens, and choose a maximum width that suits the content.',
    component: SizesExample,
    code: sizesCode,
  },
  {
    id: 'dialog-non-modal',
    title: 'Non-modal and position',
    description:
      'Without modal, the page stays usable and Tab can leave the dialog. Use it for side tasks, such as a note, and anchor it to a corner with position.',
    component: NonModalExample,
    code: nonModalCode,
  },
]
const api = [
  {
    name: 'visible',
    type: 'boolean',
    default: 'false',
    description: 'Whether the dialog is open. Use v-model:visible.',
  },
  {
    name: 'header',
    type: 'string',
    default: '—',
    description:
      'Title text. The dialog is labelled by it. Use the header slot for custom content.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: 'false',
    description: 'Adds a mask, blocks the page and keeps Tab inside the dialog.',
  },
  {
    name: 'position',
    type: "'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'",
    default: "'center'",
    description: 'Where the dialog appears in the viewport.',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'true',
    description: 'Shows the close button in the header.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Closes the dialog when Escape is pressed.',
  },
  {
    name: 'dismissableMask',
    type: 'boolean',
    default: 'false',
    description:
      'Closes a modal dialog when the mask is clicked. Leave it off for forms so a stray click does not lose input.',
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: 'true',
    description: 'Lets people move the dialog by its header.',
  },
]
const accessibility = [
  'Dialog uses the dialog role and is labelled by its header. With modal, it also sets aria-modal and keeps Tab inside the dialog. Without modal, focus is not trapped.',
  'On open, focus moves to the first element with autofocus. If there is none, it moves to the close button. Put autofocus on the first field or on the safest action.',
  'On close, Dialog returns focus to the element that had focus when it opened. If that element is gone, for example a deleted row or a menu item, move focus to a sensible place in the after-hide event.',
  'Set aria-haspopup="dialog", aria-controls and aria-expanded on the trigger yourself.',
  'Escape closes the dialog unless closeOnEscape is false. Keep the close button or a Cancel action so people can always leave.',
]
</script>

<template>
  <ComponentDoc
    title="Dialog"
    componentName="Dialog"
    category="Overlay"
    description="Show a focused task, such as a short form, in a window above the page."
    usage="binds visible with v-model. Add modal for any task that should block the page, and put actions in the footer slot. Use Drawer for long forms or record details, and ConfirmDialog for a yes-or-no decision."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/dialog"
  />
</template>
