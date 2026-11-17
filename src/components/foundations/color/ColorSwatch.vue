<script setup lang="ts">
import type { ColorValue } from '@/theme/erp-theme/foundations/color-tokens'

defineProps<{ color: ColorValue & { label?: string; purpose?: string }; compact?: boolean }>()
</script>

<template>
  <Card class="min-w-0 overflow-hidden" role="figure" :aria-label="color.label ?? color.name">
    <template #header>
      <div
        :class="compact ? 'h-10' : 'h-14'"
        :style="{ backgroundColor: color.value }"
        aria-hidden="true"
      />
    </template>
    <template #content>
      <div class="flex flex-col gap-1">
        <span class="text-base font-medium">{{ color.label ?? color.name }}</span>
        <span class="font-mono text-xs">{{ color.value }}</span>
        <code class="break-all text-xs text-muted-color">{{ color.name }}</code>
        <span v-if="color.purpose" class="text-xs text-muted-color">{{ color.purpose }}</span>
      </div>
    </template>
  </Card>
</template>
