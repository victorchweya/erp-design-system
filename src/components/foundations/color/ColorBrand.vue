<script setup lang="ts">
import { brandColors, secondaryColors } from '@/theme/erp-theme/foundations/color-tokens'
import ColorSwatch from './ColorSwatch.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4">
    <ColorSwatch v-for="color in brandColors" :key="color.name" :color="color" />
  </div>
  <div class="flex flex-col gap-4">
    <h3 class="text-base font-medium">Secondary colors</h3>
    <p class="text-muted-color">
      Existing accent and semantic families from the FTF color reference.
    </p>
    <div class="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4">
      <ColorSwatch v-for="color in secondaryColors" :key="color.name" :color="color" compact />
    </div>
  </div>
</template>
