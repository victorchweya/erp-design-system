<script setup lang="ts">
import type { ColorValue } from '@/theme/erp-theme/foundations/color-tokens'

defineProps<{ color: ColorValue & { label?: string; purpose?: string }; compact?: boolean }>()
</script>

<template>
  <figure class="min-w-0 overflow-hidden rounded-lg border border-surface">
    <div
      :class="compact ? 'h-10' : 'h-14'"
      :style="{ backgroundColor: color.value }"
      aria-hidden="true"
    />
    <figcaption class="flex flex-col gap-1 p-3">
      <span class="text-base font-medium">{{ color.label ?? color.name }}</span>
      <span class="font-mono text-xs">{{ color.value }}</span>
      <code class="break-all text-xs text-muted-color">{{ color.name }}</code>
      <span v-if="color.purpose" class="text-xs text-muted-color">{{ color.purpose }}</span>
    </figcaption>
  </figure>
</template>
