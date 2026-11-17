<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import CheckboxExample from '@/components/docs/examples/CheckboxExample.vue'
import code0 from '@/components/docs/examples/CheckboxExample.vue?raw'
import CheckboxStatesExample from '@/components/docs/examples/CheckboxStatesExample.vue'
import code1 from '@/components/docs/examples/CheckboxStatesExample.vue?raw'
const examples = [
  {
    id: 'checkbox-0',
    title: 'Boolean and multiple choices',
    description:
      'Each selection is independent. Use a RadioButton when only one choice is allowed.',
    component: CheckboxExample,
    code: code0,
  },
  {
    id: 'checkbox-1',
    title: 'Invalid and disabled',
    description: 'Do not rely on the red border to explain a required choice.',
    component: CheckboxStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'value',
    type: 'any',
    default: '—',
    description: 'Value represented by this item.',
  },
  {
    name: 'modelValue',
    type: 'any',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'name',
    type: 'string',
    default: '—',
    description: 'Field name used by the form.',
  },
  {
    name: 'binary',
    type: 'boolean',
    default: '—',
    description: 'Bind a boolean rather than a selection list.',
  },
  {
    name: 'size',
    type: '"small" | "large"',
    default: '—',
    description: 'Control size; omit for the default.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: '—',
    description: 'Prevent interaction.',
  },
]
const accessibility = [
  'Connect every checkbox to a visible label and put related choices in a fieldset with a legend.',
  'Tab focuses the control and Space toggles it.',
]
</script>

<template>
  <ComponentDoc
    title="Checkbox"
    category="Forms"
    description="Select independent options or turn a boolean preference on or off."
    usage="Use binary for a boolean model. For a list, bind the same array and give each Checkbox its own value and inputId."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/checkbox"
  />
</template>
