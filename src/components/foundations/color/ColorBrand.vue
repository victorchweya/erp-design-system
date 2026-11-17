<script setup lang="ts">
import { brandColors, secondaryColors } from '@/theme/erp-theme/foundations/color-tokens'
import ColorSwatch from './ColorSwatch.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <ColorSwatch v-for="color in brandColors" :key="color.name" :color="color" />
  </div>
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-medium">Secondary colours</h3>
    <p class="text-muted-color">Accent colours that complement the core palette.</p>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <ColorSwatch v-for="color in secondaryColors" :key="color.name" :color="color" compact />
    </div>
  </div>
</template>
