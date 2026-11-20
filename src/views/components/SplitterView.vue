<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/SplitterExample.vue'
import code from '@/components/docs/examples/SplitterExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'List and detail',
    description:
      'Set size and minSize on each panel as percentages. Name the gutter through pt so screen readers announce what it resizes.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'layout',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Places panels side by side or stacked.',
  },
  {
    name: 'gutterSize',
    type: 'number',
    default: '4',
    description: 'Thickness of the gutter in pixels.',
  },
  {
    name: 'step',
    type: 'number',
    default: '5',
    description: 'Percentage each arrow key press moves the gutter.',
  },
  {
    name: 'stateKey / stateStorage',
    type: "string / 'session' | 'local'",
    default: '— / session',
    description: 'Remembers panel sizes in session or local storage under this key.',
  },
  {
    name: 'SplitterPanel size',
    type: 'number',
    default: '—',
    description: 'Initial size as a percentage of the splitter.',
  },
  {
    name: 'SplitterPanel minSize / maxSize',
    type: 'number',
    default: '0 / 100',
    description: 'Limits, as percentages, that keep each panel usable while resizing.',
  },
  {
    name: 'SplitterPanel collapsible',
    type: 'boolean',
    default: 'false',
    description: 'Lets the panel snap to collapsedSize when dragged below minSize.',
  },
]
const accessibility = [
  'Each gutter is a focusable separator with aria-valuenow, aria-valuemin, and aria-valuemax. Arrow keys move it by step.',
  'The gutter has no accessible name by default. Add one with pt, for example gutter: { aria-label: Resize order list }.',
  'Set minSize so neither panel becomes too narrow to use, and let panel content scroll instead of overflowing.',
]
</script>

<template>
  <ComponentDoc
    title="Splitter"
    componentName="Splitter"
    category="Panel"
    description="Let people resize neighbouring content areas, such as a list and its detail."
    usage="Splitter contains two or more SplitterPanel elements. Sizes are percentages of the splitter. Give the splitter a height and use stateKey when people expect their layout to be remembered."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/splitter"
  />
</template>
