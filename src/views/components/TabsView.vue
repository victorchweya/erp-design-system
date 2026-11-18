<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/navigation/RecordTabsBlock.vue'
import code from '@/components/blocks/navigation/RecordTabsBlock.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Switch between details for the same record.',
    component: Example,
    code: code,
  },
]
const api: never[] = []
const accessibility = [
  'Keep tab labels short. Arrow keys navigate the tab list; Enter or Space activates a tab.',
]
</script>

<template>
  <ComponentDoc
    title="Tabs"
    componentName="Tabs"
    category="Panels"
    description="Switch between details for the same record."
    usage="uses matching values for each Tab and TabPanel."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tabs"
  />
</template>
