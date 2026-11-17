<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import DatePickerExample from '@/components/docs/examples/DatePickerExample.vue'
import code0 from '@/components/docs/examples/DatePickerExample.vue?raw'
import DatePickerStatesExample from '@/components/docs/examples/DatePickerStatesExample.vue'
import code1 from '@/components/docs/examples/DatePickerStatesExample.vue?raw'
const examples = [
  {
    id: 'date-picker-0',
    title: 'Date and range',
    description:
      'The display uses day/month/year. Decide explicitly how dates and time zones are stored before sending them to an API.',
    component: DatePickerExample,
    code: code0,
  },
  {
    id: 'date-picker-1',
    title: 'Invalid and disabled',
    description: 'Provide a helpful error when a chosen date is outside the allowed window.',
    component: DatePickerStatesExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'null | Date | Date[] | (null | Date)[]',
    default: 'null',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'selectionMode',
    type: 'any',
    default: 'single',
    description: 'Single, multiple, or range date selection.',
  },
  {
    name: 'dateFormat',
    type: 'string',
    default: '—',
    description: 'Date display format.',
  },
  {
    name: 'showIcon',
    type: 'boolean',
    default: 'false',
    description: 'Show the calendar trigger.',
  },
  {
    name: 'showClear',
    type: 'boolean',
    default: 'false',
    description: 'Show a control to clear the value.',
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
  'Arrow keys navigate calendar days and Escape closes the popup. Keep the expected date format visible.',
]
</script>

<template>
  <ComponentDoc
    title="DatePicker"
    category="Forms"
    description="Choose a date or date range from a calendar."
    usage="The model contains Date objects. Use dateFormat for display, selectionMode for a range, and minDate or maxDate when the application has date limits."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/datepicker"
  />
</template>
