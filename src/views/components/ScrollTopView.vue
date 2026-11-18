<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ScrollTopExample.vue'
import code from '@/components/docs/examples/ScrollTopExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Return to the top of a local scroll region.',
    component: Example,
    code: code,
  },
]
const api = [
  { name: 'target', type: 'any', default: 'window', description: 'Target of the ScrollTop.' },
  {
    name: 'threshold',
    type: 'number',
    default: '400',
    description:
      'Defines the threshold value of the vertical scroll position of the target to toggle the visibility.',
  },
  {
    name: 'behavior',
    type: 'string',
    default: 'smooth',
    description:
      "Defines the scrolling behaviour, 'smooth' adds an animation and 'auto' scrolls with a jump.",
  },
  {
    name: 'buttonProps',
    type: 'object',
    default: '-',
    description: 'Used to pass all properties of the ButtonProps to the Button component.',
  },
]
const accessibility = [
  'The scroll region must be keyboard accessible and the return control must have a meaningful name.',
]
</script>

<template>
  <ComponentDoc
    title="ScrollTop"
    componentName="ScrollTop"
    category="Misc"
    description="Return to the top of a local scroll region."
    usage="uses the parent target to limit scrolling to its containing region."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/scrolltop"
  />
</template>
