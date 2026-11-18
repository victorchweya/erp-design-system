<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/TooltipExample.vue'
import code from '@/components/docs/examples/TooltipExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Show supplementary help on keyboard focus.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Tooltips supplement visible labels and help; they must not contain essential instructions or interactive controls.',
]
</script>

<template>
  <ComponentDoc
    title="Tooltip"
    componentName="Tooltip"
    category="Overlay"
    description="Show supplementary help on keyboard focus."
    usage="is a directive. Import it explicitly as vTooltip when copying the example."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tooltip"
  />
</template>
