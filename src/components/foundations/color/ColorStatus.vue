<script setup lang="ts">
import { semanticColors } from '@/theme/erp-theme/foundations/color-tokens'

const statuses = semanticColors
  .filter(({ name }) => name !== 'help')
  .map((role) => ({
    ...role,
    label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
  }))
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <Card
      v-for="status in statuses"
      :key="status.name"
      class="min-w-0 overflow-hidden"
      role="figure"
      :aria-label="status.label"
    >
      <template #header>
        <div
          class="flex h-14 items-center justify-center text-base font-medium"
          :style="{
            backgroundColor: `var(--p-severity-${status.name}-background)`,
            color: `var(--p-severity-${status.name}-contrast-color)`,
          }"
          aria-hidden="true"
        >
          Aa
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-1">
          <h3 class="text-base font-medium">{{ status.label }}</h3>
          <code class="break-all text-xs text-muted-color">bg-{{ status.name }}</code>
          <code class="break-all text-xs text-muted-color">text-{{ status.name }}-contrast</code>
          <span class="font-mono text-xs">Light {{ status.light.background.value }}</span>
          <span class="font-mono text-xs">Dark {{ status.dark.background.value }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>
