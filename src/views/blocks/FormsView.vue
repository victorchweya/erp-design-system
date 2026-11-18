<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import SupplierFormBlock from '@/components/blocks/forms/SupplierFormBlock.vue'
import code0 from '@/components/blocks/forms/SupplierFormBlock.vue?raw'
import FilterFormBlock from '@/components/blocks/forms/FilterFormBlock.vue'
import code1 from '@/components/blocks/forms/FilterFormBlock.vue?raw'
const examples = [
  {
    id: 'supplier-form',
    title: 'Supplier details',
    description:
      'A responsive field grid, optional notes, inline errors, and actions in the Card footer.',
    component: SupplierFormBlock,
    code: code0,
  },
  {
    id: 'filter-form',
    title: 'Filter form',
    description: 'Compact search and status controls with explicit Apply and Clear actions.',
    component: FilterFormBlock,
    code: code1,
  },
]
const usage = [
  'Use the native Card and form controls. The supplier form uses the installed @primevue/forms resolver for required fields and email validation.',
  'Keep each label connected to its control and each error connected with aria-describedby. These examples use per-instance IDs so multiple copies can share a page.',
  'The filter form applies only on submit and clears both draft controls and applied feedback on reset. Save actions stay local to the preview.',
]
</script>

<template>
  <BlockDoc
    title="Forms"
    description="Labelled form layouts with helper text, validation, and clear submit or reset actions."
    :usage="usage"
    :examples="examples"
  />
</template>
