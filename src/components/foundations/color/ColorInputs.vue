<script setup lang="ts">
import { roleByName } from '@/theme/erp-theme/foundations/color-tokens'

const swatches = [
  { label: 'Default border', token: 'form.field.border.color', part: 'foreground' },
  { label: 'Hover border', token: 'form.field.hover.border.color', part: 'foreground' },
  { label: 'Focus border', token: 'form.field.focus.border.color', part: 'foreground' },
  { label: 'Invalid border', token: 'form.field.invalid.border.color', part: 'foreground' },
  { label: 'Disabled background', token: 'form.field.disabled.background', part: 'background' },
  { label: 'Disabled text', token: 'form.field.disabled.color', part: 'foreground' },
].map(({ label, token, part }) => {
  const role = roleByName(token)
  const side = part === 'background' ? 'background' : 'foreground'
  return {
    label,
    token,
    light: role.light[side].value,
    dark: role.dark[side].value,
    variable: `var(--p-${token.replace(/\./g, '-')})`,
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <Card
      v-for="swatch in swatches"
      :key="swatch.token"
      class="min-w-0 overflow-hidden"
      role="figure"
      :aria-label="swatch.label"
    >
      <template #header>
        <div class="h-14" :style="{ backgroundColor: swatch.variable }" aria-hidden="true" />
      </template>
      <template #content>
        <div class="flex flex-col gap-1">
          <h3 class="text-base font-medium">{{ swatch.label }}</h3>
          <code class="break-all text-xs text-muted-color">{{ swatch.token }}</code>
          <span class="font-mono text-xs">Light {{ swatch.light }}</span>
          <span class="font-mono text-xs">Dark {{ swatch.dark }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>
