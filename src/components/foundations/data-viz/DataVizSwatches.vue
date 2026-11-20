<script setup lang="ts">
import type { DataVizSwatch } from './data-viz'

defineProps<{
  swatches: readonly DataVizSwatch[]
  label: string
}>()
</script>

<template>
  <ul :aria-label="label" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    <li v-for="swatch in swatches" :key="swatch.token" class="flex min-w-0 flex-col gap-2">
      <div
        class="h-12 rounded-md border border-surface"
        :class="swatch.className"
        aria-hidden="true"
      />
      <div class="flex min-w-0 flex-col gap-0.5">
        <span v-if="swatch.label" class="font-medium">{{ swatch.label }}</span>
        <code class="break-all text-xs text-muted-color">{{ swatch.token }}</code>
        <span class="text-xs text-muted-color">{{ swatch.detail }}</span>
      </div>
    </li>
  </ul>
</template>
