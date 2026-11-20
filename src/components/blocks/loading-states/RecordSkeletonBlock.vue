<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const motion = usePreferredReducedMotion()
const animation = computed(() => (motion.value === 'reduce' ? 'none' : 'wave'))
const tabWidths = ['5rem', '4rem', '6rem', '4.5rem']
const fieldWidths = ['70%', '55%', '80%', '45%', '65%', '60%', '75%', '50%']
</script>

<template>
  <div aria-busy="true" class="flex flex-col gap-6">
    <p role="status" class="sr-only">Loading supplier record</p>
    <div class="flex flex-wrap items-start justify-between gap-4" aria-hidden="true">
      <div class="flex min-w-0 flex-1 flex-col gap-3">
        <Skeleton width="6rem" height="0.75rem" :animation="animation" />
        <Skeleton width="16rem" height="2rem" class="max-w-full" :animation="animation" />
        <div class="flex gap-2">
          <Skeleton width="5rem" height="1.5rem" borderRadius="1rem" :animation="animation" />
          <Skeleton width="7rem" height="1.5rem" borderRadius="1rem" :animation="animation" />
        </div>
      </div>
      <div class="flex gap-2">
        <Skeleton width="6rem" height="2.5rem" :animation="animation" />
        <Skeleton width="2.5rem" height="2.5rem" :animation="animation" />
      </div>
    </div>
    <div class="flex gap-6 border-b border-surface pb-3" aria-hidden="true">
      <Skeleton
        v-for="width in tabWidths"
        :key="width"
        :width="width"
        height="1rem"
        :animation="animation"
      />
    </div>
    <div class="fields grid gap-x-8 gap-y-5" aria-hidden="true">
      <div v-for="(width, index) in fieldWidths" :key="index" class="flex flex-col gap-2">
        <Skeleton width="6rem" height="0.75rem" :animation="animation" />
        <Skeleton :width="width" height="1.25rem" :animation="animation" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fields {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
</style>
