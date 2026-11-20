<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import vAnimateonscroll from 'primevue/animateonscroll'

const motion = usePreferredReducedMotion()

// The directive hides the element until enterClass runs. With reduced motion,
// pass no enterClass so the content is always visible.
const reveal = computed(() =>
  motion.value === 'reduce'
    ? {}
    : {
        enterClass:
          'animate-enter fade-in-0 slide-in-from-b-4 animate-duration-300 animate-ease-out',
      },
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-muted-color">Scroll down to reveal the card.</p>
    <div class="h-64" />
    <Card v-animateonscroll.once="reveal">
      <template #title><h3>Become a supplier</h3></template>
      <template #content>
        <p>Register your farm, agree collection days, and get paid within 14 days of delivery.</p>
      </template>
    </Card>
  </div>
</template>
