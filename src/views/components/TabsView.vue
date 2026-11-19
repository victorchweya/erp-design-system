<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/blocks/navigation/RecordTabsBlock.vue'
import TabsIconExample from '@/components/docs/examples/TabsIconExample.vue'
import TabsScrollableExample from '@/components/docs/examples/TabsScrollableExample.vue'
import code from '@/components/blocks/navigation/RecordTabsBlock.vue?raw'
import iconCode from '@/components/docs/examples/TabsIconExample.vue?raw'
import scrollableCode from '@/components/docs/examples/TabsScrollableExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Text tabs',
    description: 'Switch between details for the same record.',
    component: Example,
    code: code,
  },
  {
    id: 'icons',
    title: 'Tabs with icons',
    description: 'Pair familiar icons with short labels when they improve recognition.',
    component: TabsIconExample,
    code: iconCode,
  },
  {
    id: 'scrollable',
    title: 'Scrollable tabs',
    description: 'Keep every tab reachable when the list is wider than its container.',
    component: TabsScrollableExample,
    code: scrollableCode,
  },
]
const api: never[] = []
const accessibility = [
  'Keep tab labels short. Arrow keys navigate the tab list; Enter or Space activates a tab.',
  'Use a clear TabList label when the surrounding heading does not describe the tabs.',
]
</script>

<template>
  <ComponentDoc
    title="Tabs"
    componentName="Tabs"
    category="Panel"
    description="Switch between details for the same record."
    usage="uses matching values for each Tab and TabPanel. Keep labels short, align optional icons and labels in one row, and enable scrollable when the tab list may overflow."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tabs"
  />
</template>
