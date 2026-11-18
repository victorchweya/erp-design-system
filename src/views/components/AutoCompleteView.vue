<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import AutoCompleteExample from '@/components/docs/examples/AutoCompleteExample.vue'
import code0 from '@/components/docs/examples/AutoCompleteExample.vue?raw'
import AutoCompleteStatesExample from '@/components/docs/examples/AutoCompleteStatesExample.vue'
import code1 from '@/components/docs/examples/AutoCompleteStatesExample.vue?raw'
const examples = [
  {
    id: 'auto-complete-0',
    title: 'Search suggestions',
    description:
      'This example filters a local produce list, including when the query has no matches.',
    component: AutoCompleteExample,
    code: code0,
  },
  {
    id: 'auto-complete-1',
    title: 'Invalid and disabled',
    description: 'Use a visible error message for invalid selections.',
    component: AutoCompleteStatesExample,
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
    name: 'suggestions',
    type: 'any[]',
    default: '—',
    description: 'Matching choices returned by the search handler.',
  },
  {
    name: 'optionLabel',
    type: 'string | Function',
    default: '—',
    description: 'Field or function used for the visible option label.',
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
    name: 'fluid',
    type: 'boolean',
    default: 'null',
    description: 'Fill the available width.',
  },
]
const accessibility = [
  'Give every field a visible label. Match label for to id on native inputs or inputId on composite controls.',
  'Use help text for expected values and an associated error message for invalid fields. Keep the theme\u2019s visible focus and native keyboard behavior.',
  'Arrow keys move through suggestions, Enter selects, and Escape closes the popup.',
]
</script>

<template>
  <ComponentDoc
    title="AutoComplete"
    category="Form"
    description="Suggest matching values as users type."
    usage="Update suggestions from the complete event. Use forceSelection when values must come from the list. Keep remote requests cancellable in an application."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/autocomplete"
  />
</template>
