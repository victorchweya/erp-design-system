<script setup lang="ts">
import { shallowRef } from 'vue'
import { contrastRatio, roleByName } from '@/theme/erp-theme/foundations/color-tokens'

const confirmed = shallowRef(false)
const primary = roleByName('primary.color')
const hover = roleByName('primary.hover.color')
const active = roleByName('primary.active.color')
const surface = roleByName('content.background')
const completed = roleByName('proposal.status.success').light
const warning = roleByName('proposal.status.warning').light

const previews = (['light', 'dark'] as const).map((mode) => {
  const pair = primary[mode]!
  const buttonColors = {
    root: {
      primary: {
        background: pair.background.value,
        hoverBackground: hover[mode]!.background.value,
        activeBackground: active[mode]!.background.value,
        borderColor: pair.background.value,
        hoverBorderColor: hover[mode]!.background.value,
        activeBorderColor: active[mode]!.background.value,
        color: pair.foreground.value,
        hoverColor: pair.foreground.value,
        activeColor: pair.foreground.value,
        focusRing: { color: pair.background.value, shadow: 'none' },
      },
    },
  }
  return {
    mode,
    pair,
    surface: surface[mode]!,
    dt: { colorScheme: { light: buttonColors, dark: buttonColors } },
  }
})

const tagColors = {
  success: { background: completed.background.value, color: completed.foreground.value },
}
const tagDt = { colorScheme: { light: tagColors, dark: tagColors } }
const messageColors = {
  warn: {
    background: warning.background.value,
    color: warning.foreground.value,
    borderColor: warning.foreground.value,
    shadow: 'none',
  },
}
const messageDt = { colorScheme: { light: messageColors, dark: messageColors } }
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-base font-medium">Local PrimeVue examples</h3>
    <p class="text-muted-color">
      Primary actions use the verified FTF pairs. These controls only update this preview.
    </p>
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="preview in previews"
        :key="preview.mode"
        class="flex flex-col items-start gap-4 rounded-lg border border-surface p-5"
        :style="{
          backgroundColor: preview.surface.background.value,
          color: preview.surface.foreground.value,
        }"
      >
        <h4 class="font-medium capitalize">{{ preview.mode }} · verified primary</h4>
        <Button type="button" size="small" :dt="preview.dt" @click="confirmed = true"
          >Confirm Order</Button
        >
        <p class="font-mono text-xs">
          {{ preview.pair.foreground.value }} on {{ preview.pair.background.value }}
        </p>
        <p class="text-xs">
          {{
            contrastRatio(preview.pair.foreground.value, preview.pair.background.value).toFixed(2)
          }}:1 · normal text passes
        </p>
      </div>
    </div>
    <p role="status" aria-live="polite">
      {{
        confirmed ? 'Order confirmed in this preview.' : 'Try Confirm Order to test local feedback.'
      }}
    </p>
    <div
      class="flex flex-col items-start gap-4 rounded-lg border border-surface p-5"
      :style="{
        backgroundColor: surface.light.background.value,
        color: surface.light.foreground.value,
      }"
    >
      <h4 class="font-medium">Proposed light status pairings</h4>
      <p>
        Verified palette values, new role assignments. No approved dark status mapping is available.
      </p>
      <Tag value="Completed" severity="success" :dt="tagDt" />
      <p class="text-xs">
        {{ completed.foreground.name }} on {{ completed.background.name }} ·
        {{ contrastRatio(completed.foreground.value, completed.background.value).toFixed(2) }}:1
      </p>
      <Message severity="warn" size="small" :dt="messageDt"
        >Review quantities before confirming this order.</Message
      >
      <p class="text-xs">
        {{ warning.foreground.name }} on {{ warning.background.name }} ·
        {{ contrastRatio(warning.foreground.value, warning.background.value).toFixed(2) }}:1
      </p>
    </div>
  </div>
</template>
