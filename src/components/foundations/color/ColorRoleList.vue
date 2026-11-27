<script setup lang="ts">
import { computed } from 'vue'
import type { ColorRole } from '@/theme/erp-theme/foundations/color-tokens'

const props = defineProps<{ roles: ColorRole[] }>()
const modes = ['light', 'dark'] as const
const swatches = computed(() =>
  props.roles.map((role) => {
    const part = role.group === 'text' ? 'foreground' : 'background'
    return {
      ...role,
      token: part === 'foreground' ? role.foregroundToken : role.backgroundToken,
      lightValue: role.light[part].value,
      darkValue: role.dark[part].value,
    }
  }),
)
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
    <Card
      v-for="swatch in swatches"
      :key="swatch.name"
      class="min-w-0 overflow-hidden"
      role="figure"
      :aria-label="swatch.label"
    >
      <template #header>
        <div class="flex h-14 text-base font-medium" aria-hidden="true">
          <div
            v-for="mode in modes"
            :key="mode"
            class="flex flex-1 items-center justify-center"
            :style="{
              backgroundColor: swatch[mode].background.value,
              color: swatch[mode].foreground.value,
            }"
          >
            Aa
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-1">
          <h3 class="wrap-break-word text-base font-medium">{{ swatch.label }}</h3>
          <code class="break-all text-xs text-muted-color">{{ swatch.token }}</code>
          <span class="font-mono text-xs">Light {{ swatch.lightValue }}</span>
          <span class="font-mono text-xs">Dark {{ swatch.darkValue }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>
