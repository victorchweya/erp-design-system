<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ProgressBarExample.vue'
import code from '@/components/docs/examples/ProgressBarExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show known progress and an indeterminate waiting state.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'value', type: 'number', default: '-', description: 'Current value of the progress.' },
  {
    name: 'mode',
    type: '"indeterminate" | "determinate"',
    default: 'determinate',
    description: 'Defines the mode of the progress',
  },
]
const accessibility = [
  'Name each progress indicator and announce completion separately when the task finishes.',
]
</script>

<template>
  <ComponentDoc
    title="ProgressBar"
    componentName="ProgressBar"
    category="Misc"
    description="Show known progress and an indeterminate waiting state."
    usage="uses value for a percentage or indeterminate mode when progress is unknown."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/progressbar"
  />
</template>
