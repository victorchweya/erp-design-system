<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import ChipExample from '@/components/docs/examples/ChipExample.vue'
import code0 from '@/components/docs/examples/ChipExample.vue?raw'
import ChipRemoveExample from '@/components/docs/examples/ChipRemoveExample.vue'
import code1 from '@/components/docs/examples/ChipRemoveExample.vue?raw'
const examples = [
  {
    id: 'chip-0',
    title: 'Labels and icons',
    description: 'Use a Chip for a selected entity rather than a status. Chips use olive-100 backgrounds with olive-900 text and icons in both themes.',
    component: ChipExample,
    code: code0,
  },
  {
    id: 'chip-1',
    title: 'Removing selections',
    description: 'Remove filters from local state; reset brings the sample selections back.',
    component: ChipRemoveExample,
    code: code1,
  },
]
const api = [
  {
    name: 'label',
    type: 'string | number',
    default: '—',
    description: 'Visible text label.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: 'Icon class. Use the icon slot for an icon component.',
  },
  {
    name: 'image',
    type: 'string',
    default: '—',
    description: 'Image URL, for example a person or supplier logo.',
  },
  {
    name: 'removable',
    type: 'boolean',
    default: 'false',
    description: 'Show a remove icon. The chip hides itself and emits remove.',
  },
  {
    name: 'removeIcon',
    type: 'string',
    default: '—',
    description: 'Icon class for the remove control. Use the removeicon slot for a component.',
  },
]
const accessibility = [
  'The remove icon is focusable and removes the chip with Enter or Backspace, but it has no role or name by default. Add role="button" and an aria-label such as "Remove Vegetables" through pt.removeIcon.',
  'Removing a chip removes the focused element. Move focus to a sensible place, such as the next chip or the related field, and announce changes that affect results.',
  'A chip without removable is not interactive. Do not use it as a button or a toggle.',
]
</script>

<template>
  <ComponentDoc
    title="Chip"
    category="Misc"
    description="Represent selected items, filters, or people in a compact form."
    usage="Use label for the item name. Enable removable when users can remove a selection and update the backing collection on remove."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/chip"
  />
</template>
