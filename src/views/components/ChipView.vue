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
    description: 'Use a Chip for a selected entity rather than a status.',
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
    name: 'image',
    type: 'string',
    default: '—',
    description: 'Image URL.',
  },
  {
    name: 'removable',
    type: 'boolean',
    default: 'false',
    description: 'Allow users to remove the item.',
  },
]
const accessibility = [
  'Removable chips support keyboard removal. Keep their label meaningful and preserve their native focus behavior.',
  'Announce changes when removing selections affects results.',
]
</script>

<template>
  <ComponentDoc
    title="Chip"
    category="Core elements"
    description="Represent selected items, filters, or people in a compact form."
    usage="Use label for the item name. Enable removable when users can remove a selection and update the backing collection on remove."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/chip"
  />
</template>
