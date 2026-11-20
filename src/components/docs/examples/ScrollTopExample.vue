<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const deliveries = Array.from({ length: 30 }, (_, i) => `DLV-${5130 - i}`)

// Smooth scrolling started from script ignores the CSS reduced-motion rule, so check it here.
const motion = usePreferredReducedMotion()
const behavior = computed(() => (motion.value === 'reduce' ? 'auto' : 'smooth'))
</script>

<template>
  <div
    tabindex="0"
    role="region"
    aria-label="Delivery history"
    class="relative h-64 overflow-auto rounded-border border border-surface p-4"
  >
    <ul class="flex flex-col gap-4">
      <li v-for="delivery in deliveries" :key="delivery">{{ delivery }}</li>
    </ul>
    <ScrollTop
      target="parent"
      :threshold="100"
      :behavior="behavior"
      :buttonProps="{ 'aria-label': 'Back to top of delivery history' }"
    />
  </div>
</template>
