<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import InputColorExample from '@/components/docs/examples/InputColorExample.vue'
import code0 from '@/components/docs/examples/InputColorExample.vue?raw'
import InputColorDisabledExample from '@/components/docs/examples/InputColorDisabledExample.vue'
import code1 from '@/components/docs/examples/InputColorDisabledExample.vue?raw'
const examples = [
  {
    id: 'input-color-0',
    title: 'Colour area and hex entry',
    description:
      'The starting value comes from our palette. A text input provides a precise keyboard alternative to dragging.',
    component: InputColorExample,
    code: code0,
  },
  {
    id: 'input-color-1',
    title: 'Disabled',
    description: 'Disabling InputColor disables its child controls.',
    component: InputColorDisabledExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'any',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'format',
    type: 'any',
    default: "'hsba'",
    description: 'Format of the stored colour.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
]
const accessibility = [
  'Provide a visible group legend. Channel inputs get an aria-label such as \u201chex\u201d, which overrides label for; add aria-labelledby to use your visible label.',
  'The area and slider handles are keyboard sliders. Keep a text entry alternative for precise values.',
  'Do not use a selected colour alone to convey status or meaning.',
]
</script>

<template>
  <ComponentDoc
    title="InputColor"
    category="Form"
    description="Choose a custom colour where the product explicitly allows it."
    usage="Compose the native InputColor parts for the area, slider, swatch, and input. Keep ordinary interface colours on our semantic tokens; this control is for user-authored content."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/inputcolor"
  />
</template>
