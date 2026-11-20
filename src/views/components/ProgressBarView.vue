<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ProgressBarExample.vue'
import code from '@/components/docs/examples/ProgressBarExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'A determinate bar for picking progress and an indeterminate bar while waiting. A status message announces completion.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'value',
    type: 'number',
    default: '—',
    description: 'Current progress from 0 to 100.',
  },
  {
    name: 'mode',
    type: "'determinate' | 'indeterminate'",
    default: 'determinate',
    description: 'Use indeterminate when the remaining time is unknown.',
  },
  {
    name: 'showValue',
    type: 'boolean',
    default: 'true',
    description: 'Show the percentage inside the bar. Use the default slot for custom text.',
  },
]
const accessibility = [
  'ProgressBar has a progressbar role with aria-valuemin 0, aria-valuemax 100, and aria-valuenow. Name it with aria-labelledby pointing to a visible label, or with aria-label.',
  'Indeterminate mode leaves out aria-valuenow, so the label must say what is happening.',
  'Value changes are not announced. Announce completion or failure once in a status message.',
]
</script>

<template>
  <ComponentDoc
    title="ProgressBar"
    componentName="ProgressBar"
    category="Misc"
    description="Show how far a task has progressed, or that it is still running."
    usage="ProgressBar takes a value from 0 to 100. Use indeterminate mode when progress cannot be measured, and ProgressSpinner for small inline waits."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/progressbar"
  />
</template>
