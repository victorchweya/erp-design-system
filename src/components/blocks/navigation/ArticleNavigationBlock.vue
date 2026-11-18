<script setup lang="ts">
import { useId } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import { useActiveSection } from '@/composables/useActiveSection'

const id = useId()
const sections = [
  {
    id: `${id}-overview`,
    label: 'Overview',
    copy: 'Review the order before confirming quantities with the supplier.',
  },
  {
    id: `${id}-delivery`,
    label: 'Delivery',
    copy: 'Confirm the delivery address, contact person, and expected arrival time.',
  },
  {
    id: `${id}-payment`,
    label: 'Payment',
    copy: 'Check invoice details and payment terms before completing the order.',
  },
]
const active = useActiveSection(() => sections.map(({ id }) => id))
</script>

<template>
  <div class="flex flex-col gap-6 text-color lg:flex-row">
    <div class="min-w-0 flex-1 space-y-8">
      <section
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        :aria-labelledby="`${section.id}-title`"
        class="scroll-mt-24 space-y-3"
      >
        <h3 :id="`${section.id}-title`" class="text-xl font-medium">{{ section.label }}</h3>
        <p class="text-base leading-relaxed text-muted">{{ section.copy }}</p>
      </section>
    </div>
    <div class="order-first shrink-0 lg:order-last lg:w-48">
      <AnchorNav :items="sections" :active-id="active" />
    </div>
  </div>
</template>
