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
const api = [
  {
    name: 'value',
    type: 'string | number',
    default: '—',
    description: 'Active tab. Required; use v-model:value to read or set it.',
  },
  {
    name: 'scrollable',
    type: 'boolean',
    default: 'false',
    description: 'Lets the tab list scroll when it is wider than its container.',
  },
  {
    name: 'showNavigators',
    type: 'boolean',
    default: 'true',
    description: 'Shows previous and next buttons when a scrollable tab list overflows.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description: 'Renders a panel only when its tab is active, instead of hiding it with CSS.',
  },
  {
    name: 'selectOnFocus',
    type: 'boolean',
    default: 'false',
    description: 'Activates a tab as soon as it receives focus with the arrow keys.',
  },
  {
    name: 'Tab value / TabPanel value',
    type: 'string | number',
    default: '—',
    description: 'Links a tab to its panel.',
  },
  {
    name: 'Tab disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents the tab from being selected.',
  },
]
const accessibility = [
  'Tabs use the tablist, tab, and tabpanel roles. Tab moves into the active tab; Left and Right Arrow, Home, and End move between tabs; Enter or Space activates one.',
  'Give TabList an aria-label when the surrounding heading does not describe the tabs.',
  'Hide decorative tab icons with aria-hidden and keep a visible text label on every tab.',
]
</script>

<template>
  <ComponentDoc
    title="Tabs"
    componentName="Tabs"
    category="Panel"
    description="Switch between related views of the same record without leaving the page."
    usage="composes TabList, Tab, TabPanels, and TabPanel, linked by matching values. Keep labels short, align optional icons and labels in one row, and enable scrollable when the tab list may overflow."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tabs"
  />
</template>
