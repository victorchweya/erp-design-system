<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const motion = usePreferredReducedMotion()
const animation = computed(() => (motion.value === 'reduce' ? 'none' : 'wave'))
const kpis = ['orders', 'revenue', 'fill-rate', 'on-time']
const barHeights = ['45%', '70%', '55%', '85%', '60%', '75%', '40%']
</script>

<template>
  <div aria-busy="true" class="flex flex-col gap-4">
    <p role="status" class="sr-only">Loading operations dashboard</p>
    <div class="kpis grid gap-4" aria-hidden="true">
      <Card v-for="kpi in kpis" :key="kpi">
        <template #content>
          <div class="flex flex-col gap-3">
            <Skeleton width="60%" height="0.875rem" :animation="animation" />
            <Skeleton width="45%" height="2rem" :animation="animation" />
            <Skeleton width="70%" height="0.75rem" :animation="animation" />
          </div>
        </template>
      </Card>
    </div>
    <div class="charts grid gap-4" aria-hidden="true">
      <Card class="min-w-0">
        <template #content>
          <div class="flex flex-col gap-4">
            <Skeleton width="10rem" height="1.25rem" :animation="animation" />
            <div class="flex h-56 items-end gap-3">
              <Skeleton
                v-for="(height, index) in barHeights"
                :key="index"
                :height="height"
                class="flex-1"
                :animation="animation"
              />
            </div>
          </div>
        </template>
      </Card>
      <Card class="min-w-0">
        <template #content>
          <div class="flex flex-col items-center gap-4">
            <Skeleton width="8rem" height="1.25rem" class="self-start" :animation="animation" />
            <Skeleton shape="circle" size="10rem" :animation="animation" />
            <div class="flex w-full flex-col gap-2">
              <Skeleton width="80%" height="0.75rem" :animation="animation" />
              <Skeleton width="65%" height="0.75rem" :animation="animation" />
              <Skeleton width="50%" height="0.75rem" :animation="animation" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.kpis {
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
}

.charts {
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>
