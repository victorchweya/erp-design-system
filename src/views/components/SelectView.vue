<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import SelectExample from '@/components/docs/examples/SelectExample.vue'
import code0 from '@/components/docs/examples/SelectExample.vue?raw'
import SelectStatesExample from '@/components/docs/examples/SelectStatesExample.vue'
import code1 from '@/components/docs/examples/SelectStatesExample.vue?raw'
import SelectSizesExample from '@/components/docs/examples/SelectSizesExample.vue'
import code2 from '@/components/docs/examples/SelectSizesExample.vue?raw'
const examples = [
  {
    id: 'select-0',
    title: 'Filter and clear',
    description:
      'The model stores the supplier code from optionValue while the list shows the supplier name.',
    component: SelectExample,
    code: code0,
  },
  {
    id: 'select-1',
    title: 'Invalid, disabled and loading',
    description:
      'Link the error to the combobox through pt.label, because attributes set on Select land on its wrapper. Use loading while options are fetched.',
    component: SelectStatesExample,
    code: code1,
  },
  {
    id: 'select-2',
    title: 'Size and fill',
    description: 'Select shares the form-field size scale and filled surface with InputText.',
    component: SelectSizesExample,
    code: code2,
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
    name: 'fluid',
    type: 'boolean',
    default: 'null',
    description: 'Fill the available width.',
  },
  {
    name: 'options',
    type: 'any[]',
    default: '—',
    description: 'Available choices.',
  },
  {
    name: 'optionLabel',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the visible option label.',
  },
  {
    name: 'optionValue',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the stored value.',
  },
  {
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description: 'Show a search field for the options.',
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
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show a loading icon in place of the dropdown icon.',
  },
  {
    name: 'size',
    type: '"small" | "large"',
    default: '—',
    description: 'Control size; omit for the default.',
  },
  {
    name: 'variant',
    type: '"outlined" | "filled"',
    default: 'null',
    description: 'Field surface. Defaults to the global inputVariant.',
  },
  {
    name: 'ariaLabelledby',
    type: 'string',
    default: '—',
    description: 'Id of the visible label that names the combobox.',
  },
  {
    name: 'showClear',
    type: 'boolean',
    default: 'false',
    description: 'Show a control to clear the value.',
  },
]
const accessibility = [
  'Select renders a span with the combobox role, not an input, so label for does not name it. Give the visible label an id and pass it to aria-labelledby. Without one, the placeholder or selected value becomes the name.',
  'Attributes such as aria-describedby set on Select go to the wrapper. Pass them to the combobox with pt.label so the error message is announced.',
  'Space, Enter or Down arrow opens the list. Arrow keys move through options, Enter selects, and Escape closes the list and returns focus to the field.',
]
</script>

<template>
  <ComponentDoc
    title="Select"
    category="Form"
    description="Choose one item from a list of options."
    usage="Bind a single value with v-model. Use optionLabel and optionValue for objects, filter for longer lists, and showClear when the selection is optional."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/select"
  />
</template>
