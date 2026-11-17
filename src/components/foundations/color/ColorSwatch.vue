<script setup lang="ts">
import { swatchInk, type ColorValue } from '@/theme/erp-theme/foundations/color-tokens'

defineProps<{ color: ColorValue & { label?: string; purpose?: string }; compact?: boolean }>()
</script>

<template>
  <figure class="min-w-0 overflow-hidden rounded-lg border border-surface">
    <div
      class="flex items-end justify-between gap-2 p-3"
      :class="compact ? 'min-h-20' : 'min-h-32'"
      :style="{ backgroundColor: color.value, color: swatchInk(color.value) }"
    >
      <span class="text-xl font-medium" aria-hidden="true">Aa</span>
      <span class="font-mono text-xs">{{ color.value }}</span>
    </div>
    <figcaption class="flex flex-col gap-1 p-3">
      <span class="font-medium">{{ color.label ?? color.name }}</span>
      <code class="break-all text-xs text-muted-color">{{ color.name }}</code>
      <span v-if="color.purpose" class="text-xs text-muted-color">{{ color.purpose }}</span>
    </figcaption>
  </figure>
</template>
