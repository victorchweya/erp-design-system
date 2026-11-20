<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/popups/RecordPopoverBlock.vue'
import code from '@/components/blocks/popups/RecordPopoverBlock.vue?raw'

const examples = [
  {
    id: 'popover-basic',
    title: 'Record quick view',
    description:
      'Show customer details next to the trigger without leaving the page. The close button returns focus to the trigger.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'toggle(event, target?)',
    type: 'method',
    default: '—',
    description:
      'Opens or closes the popover next to event.currentTarget, or next to target when given. show and hide take the same arguments.',
  },
  {
    name: 'dismissable',
    type: 'boolean',
    default: 'true',
    description: 'Closes the popover when the page outside it is clicked.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Closes the popover when Escape is pressed.',
  },
  {
    name: 'appendTo',
    type: "'body' | 'self' | HTMLElement",
    default: "'body'",
    description: 'Where the popover is attached in the DOM.',
  },
  {
    name: 'breakpoints',
    type: 'PopoverBreakpoints',
    default: '—',
    description: "Widths per screen size, such as { '640px': '90vw' }.",
  },
]
const accessibility = [
  'Popover uses the dialog role and keeps Tab inside it while open. Label it with aria-labelledby pointing at its heading, or with aria-label.',
  'Focus moves into the popover only when an element inside has autofocus. Otherwise it stays on the trigger, so add autofocus to the first useful control.',
  'Escape closes the popover and returns focus to the trigger. A close button inside does not, so call hide() and then focus the trigger, as the example does.',
  'PrimeVue does not set aria-expanded or aria-controls on the trigger. Set them yourself and update aria-expanded from the show and hide events.',
  'Use Tooltip for short, non-interactive hints and Popover when the content has links, buttons or fields.',
]
</script>

<template>
  <ComponentDoc
    title="Popover"
    componentName="Popover"
    category="Overlay"
    description="Show record details or a short set of controls next to their trigger, without leaving the page."
    usage="is opened with its toggle method from a template ref, passing the click event so it can position itself next to the trigger."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/popover"
  />
</template>
