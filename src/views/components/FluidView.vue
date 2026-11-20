<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/FluidExample.vue'
import code from '@/components/docs/examples/FluidExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Full-width form',
    description:
      'Wrap a form column in Fluid so inputs fill it. Set fluid to false on a control, such as the submit button, to keep its natural width.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'default slot',
    type: 'VNode[]',
    default: '—',
    description:
      'Form controls and buttons. Supported components inside, at any depth, fill the width of their container.',
  },
  {
    name: 'fluid (on a child)',
    type: 'boolean | null',
    default: 'null',
    description:
      'Set on InputText, Select, Button, and other supported components. null follows the parent Fluid; true or false overrides it.',
  },
]
const accessibility = [
  'Keep visible labels connected to inputs; full-width sizing does not change their accessible names.',
]
</script>

<template>
  <ComponentDoc
    title="Fluid"
    componentName="Fluid"
    category="Misc"
    description="Make form controls fill the width of their container."
    usage="gives every supported input and button inside it full width. Use it for a single form column instead of adding fluid to each control. Control the column width with the layout, not the inputs."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/fluid"
  />
</template>
