<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/ScrollTopExample.vue'
import code from '@/components/docs/examples/ScrollTopExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Scrollable region',
    description:
      'Set target to parent inside a positioned scroll container. The example switches to an instant jump when reduced motion is requested.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'target',
    type: "'window' | 'parent'",
    default: 'window',
    description: 'Scrolls the window, or the parent element when placed inside a scroll container.',
  },
  {
    name: 'threshold',
    type: 'number',
    default: '400',
    description: 'Scroll distance in pixels before the button appears.',
  },
  {
    name: 'behavior',
    type: "'smooth' | 'auto'",
    default: 'smooth',
    description:
      'smooth animates the scroll; auto jumps. Use auto when reduced motion is requested; the CSS rule does not cover script scrolling.',
  },
  {
    name: 'buttonProps',
    type: 'object',
    default: '{ rounded: true }',
    description: 'Props for the Button, such as an aria-label that says which region it scrolls.',
  },
]
const accessibility = [
  'Make a scroll region focusable with tabindex="0", role="region", and an aria-label so keyboard users can scroll it.',
  'The default button name is generic. Pass an aria-label through buttonProps that says where it goes.',
  'The button hides once the region is back at the top, so focus can be lost. Keyboard users can also press Home in the focused region.',
]
</script>

<template>
  <ComponentDoc
    title="ScrollTop"
    componentName="ScrollTop"
    category="Misc"
    description="Show a button that returns to the top of a long page or scroll region."
    usage="ScrollTop appears after people scroll past threshold. Use target parent inside a relatively positioned scroll container, or omit it for the whole window. Use it only on long lists or pages."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/scrolltop"
  />
</template>
