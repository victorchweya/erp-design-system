<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ProgressSpinnerExample.vue'
import code from '@/components/docs/examples/ProgressSpinnerExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Indeterminate while loading deliveries, and determinate for a known upload percentage.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | number',
    default: 'null',
    description: 'Current progress. When null, the spinner is indeterminate.',
  },
  { name: 'min', type: 'number', default: '0', description: 'Minimum progress value.' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum progress value.' },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '4',
    description: 'Width of the circle stroke.',
  },
  {
    name: 'animationDuration',
    type: 'string',
    default: "'2s'",
    description: 'Duration of the rotate animation.',
  },
]
const accessibility = [
  'ProgressSpinner has a progressbar role. aria-valuenow is set only when value is a number. Give it a name with aria-label or aria-labelledby.',
  'Keep visible text next to the spinner that says what is loading, and announce completion in a status message.',
  'Size the spinner with a class such as size-12; it has no size prop.',
]
</script>

<template>
  <ComponentDoc
    title="ProgressSpinner"
    componentName="ProgressSpinner"
    category="Misc"
    description="A compact indicator for work in progress."
    usage="ProgressSpinner is indeterminate by default. Set value for known progress. Use it for small, local waits; use Skeleton when loading content with a known layout and ProgressBar for longer tasks."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/progressspinner"
  />
</template>
