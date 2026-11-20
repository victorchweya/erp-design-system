<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import CheckboxExample from '@/components/docs/examples/CheckboxExample.vue'
import code0 from '@/components/docs/examples/CheckboxExample.vue?raw'
import CheckboxStatesExample from '@/components/docs/examples/CheckboxStatesExample.vue'
import code1 from '@/components/docs/examples/CheckboxStatesExample.vue?raw'
import CheckboxGroupExample from '@/components/docs/examples/CheckboxGroupExample.vue'
import code2 from '@/components/docs/examples/CheckboxGroupExample.vue?raw'
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
    description:
      'Do not rely on the red border to explain a required choice. Pass aria-describedby to the input with pt.input, because attributes set on Checkbox land on its wrapper.',
    component: CheckboxStatesExample,
    code: code1,
  },
  {
    id: 'checkbox-2',
    title: 'CheckboxGroup',
    description:
      'CheckboxGroup holds the array model, name, and invalid state for every Checkbox inside it, so each item only needs a value and inputId.',
    component: CheckboxGroupExample,
    code: code2,
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
    default: 'false',
    description: 'Bind a boolean rather than a selection list.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description:
      'Show a partly selected state, such as a select-all box. Use v-model:indeterminate.',
  },
  {
    name: 'inputId',
    type: 'string',
    default: '—',
    description: 'Id of the native input; match it with the label for attribute.',
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
    default: 'false',
    description: 'Prevent interaction.',
  },
]
const accessibility = [
  'Connect every checkbox to a visible label and put related choices in a fieldset with a legend.',
  'Tab focuses the control and Space toggles it.',
  'Attributes such as aria-describedby set on Checkbox go to its wrapper. Pass them to the native input with pt.input.',
  'CheckboxGroup renders a plain div with no role. Wrap it in a fieldset and legend, and link the hint and error text to the fieldset with aria-describedby.',
]
</script>

<template>
  <ComponentDoc
    title="Checkbox"
    category="Form"
    description="Select independent options or turn a boolean preference on or off."
    usage="Use binary for a boolean model. For a list, bind the same array and give each Checkbox its own value and inputId, or wrap the items in CheckboxGroup and bind the array once."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/checkbox"
  />
</template>
