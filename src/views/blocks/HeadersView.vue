<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import PageHeader01 from '@/components/blocks/headers/PageHeader01.vue'
import PageHeader02 from '@/components/blocks/headers/PageHeader02.vue'
import PageHeader03 from '@/components/blocks/headers/PageHeader03.vue'
import header01Code from '@/components/blocks/headers/PageHeader01.vue?raw'
import header02Code from '@/components/blocks/headers/PageHeader02.vue?raw'
import header03Code from '@/components/blocks/headers/PageHeader03.vue?raw'

const examples = [
  {
    id: 'primary-action',
    title: 'Title and primary action',
    description: 'A page title, supporting text, and one clear action for a list page.',
    component: PageHeader01,
    props: { headingTag: 'h3' },
    code: header01Code,
  },
  {
    id: 'status-and-actions',
    title: 'Status and actions',
    description: 'Add a Tag for status and keep supporting actions beside the primary action.',
    component: PageHeader02,
    props: { headingTag: 'h3' },
    code: header02Code,
  },
  {
    id: 'record-detail',
    title: 'Record detail',
    description:
      'Back navigation, a record title, status, metadata, and an overflow menu for less common actions.',
    component: PageHeader03,
    props: { headingTag: 'h3' },
    code: header03Code,
  },
]
</script>

<template>
  <BlockDoc
    title="Headers"
    description="Page headers for lists and record details. Built with PrimeVue controls and our shared foundations."
    :usage="[
      'Headers use h1 by default. Set headingTag to match the surrounding hierarchy; these previews use h3.',
      'Actions wrap below the title on small screens. Keep one primary action, use Tag for status, and use a route link for Back navigation in your application.',
    ]"
    :examples="examples"
  />
</template>
