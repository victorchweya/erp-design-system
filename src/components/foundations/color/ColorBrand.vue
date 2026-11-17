<script setup lang="ts">
import { brandColors, secondaryColors } from '@/theme/erp-theme/foundations/color-tokens'
import ColorSwatch from './ColorSwatch.vue'
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <ColorSwatch v-for="color in brandColors" :key="color.name" :color="color" />
  </div>
  <div class="flex flex-col gap-4">
    <h3 class="text-base font-medium">Secondary colors</h3>
    <p class="text-muted-color">
      Existing accent and semantic families from the FTF color reference.
    </p>
    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <ColorSwatch v-for="color in secondaryColors" :key="color.name" :color="color" compact />
    </div>
  </div>
</template>
