<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import ArticleNavigationBlock from '@/components/blocks/navigation/ArticleNavigationBlock.vue'
import code0 from '@/components/blocks/navigation/ArticleNavigationBlock.vue?raw'
import RecordTabsBlock from '@/components/blocks/navigation/RecordTabsBlock.vue'
import code1 from '@/components/blocks/navigation/RecordTabsBlock.vue?raw'
const examples = [
  {
    id: 'article-navigation',
    title: 'Article navigation',
    description:
      'An AnchorNav beside article sections, moving above the content on smaller screens.',
    component: ArticleNavigationBlock,
    code: code0,
  },
  {
    id: 'record-tabs',
    title: 'Record tabs',
    description:
      'Overview, items, and activity grouped inside a Card with native keyboard navigation.',
    component: RecordTabsBlock,
    code: code1,
  },
]
const usage = [
  'Use AnchorNav with useActiveSection for sections on one page. Both are existing shared project files; copy them too when moving this pattern to another repository.',
  'Use Tabs to switch related content in place. Give the TabList an accessible name; route navigation should use RouterLink instead.',
]
</script>

<template>
  <BlockDoc
    title="Navigation"
    description="Navigation patterns for long pages and related record details."
    :usage="usage"
    :examples="examples"
  />
</template>
