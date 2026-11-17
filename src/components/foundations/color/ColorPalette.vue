<script setup lang="ts">
import { primitives, colorValue } from '@/theme/erp-theme/foundations/color-tokens'
import ColorSwatch from './ColorSwatch.vue'
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-for="(steps, family) in primitives" :key="family" class="flex flex-col gap-3">
      <h3 class="text-base font-medium capitalize">{{ family }}</h3>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        <ColorSwatch
          v-for="(_, step) in steps"
          :key="step"
          :color="{ ...colorValue(`${family}.${step}`), label: String(step) }"
          compact
        />
      </div>
    </div>
  </div>
</template>
