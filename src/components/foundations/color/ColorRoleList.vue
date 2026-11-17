<script setup lang="ts">
import { computed } from 'vue'
import {
  contrastRatio,
  swatchInk,
  type ColorRole,
} from '@/theme/erp-theme/foundations/color-tokens'

const props = defineProps<{ roles: ColorRole[] }>()
const modes = ['light', 'dark'] as const
const rows = computed(() =>
  props.roles.map((role) => ({
    ...role,
    previews: modes.map((mode) => {
      const pair = role[mode]
      const ratio = pair ? contrastRatio(pair.foreground.value, pair.background.value) : undefined
      const threshold = role.kind === 'boundary' ? 3 : 4.5
      return { mode, pair, ratio, threshold, passes: ratio !== undefined && ratio >= threshold }
    }),
  })),
)
</script>

<template>
  <div class="grid gap-x-6 gap-y-8 sm:grid-cols-2">
    <article v-for="role in rows" :key="role.name" class="flex min-w-0 flex-col gap-3">
      <div class="grid min-w-0 grid-cols-2 gap-2">
        <figure
          v-for="preview in role.previews"
          :key="preview.mode"
          class="flex min-w-0 flex-col gap-2"
        >
          <div
            v-if="preview.pair"
            class="flex h-16 items-center justify-center rounded-md border border-surface p-2"
            :style="{
              backgroundColor: preview.pair.background.value,
              color: preview.pair.foreground.value,
            }"
          >
            <span
              v-if="role.kind === 'boundary'"
              class="w-full rounded border-2 px-2 py-1 text-xs"
              :style="{
                borderColor: preview.pair.foreground.value,
                color: swatchInk(preview.pair.background.value),
              }"
              >Field boundary</span
            >
            <span v-else class="text-lg font-medium" aria-hidden="true">Aa</span>
          </div>
          <div
            v-else
            class="h-16 rounded-md border border-dashed border-surface"
            aria-hidden="true"
          />
          <figcaption class="flex flex-col gap-1 text-xs">
            <span class="font-medium capitalize">{{ preview.mode }}</span>
            <template v-if="preview.pair">
              <p class="break-all font-mono text-xs">
                {{ preview.pair.foreground.value }} on {{ preview.pair.background.value }}
              </p>
              <p class="break-words text-xs text-muted-color">
                {{ preview.pair.foreground.name }} on {{ preview.pair.background.name }}
              </p>
              <p class="text-xs font-medium">
                {{ preview.ratio?.toFixed(2) }}:1 · {{ preview.passes ? 'Passes' : 'Below' }}
                {{ preview.threshold }}:1
                {{ role.kind === 'boundary' ? 'non-text' : 'normal text' }}
              </p>
            </template>
            <p v-else class="text-muted-color">Not defined. No dark pairing inferred.</p>
          </figcaption>
        </figure>
      </div>
      <div class="flex min-w-0 flex-col gap-1 text-xs">
        <code class="break-all font-medium">{{ role.name }}</code>
        <p class="text-muted-color">{{ role.purpose }}</p>
        <p class="font-medium">
          {{ role.evidence }}{{ role.evidence === 'Proposal' ? ' · not approved' : ' in FTF' }}
        </p>
        <p class="break-words text-muted-color">{{ role.source }}</p>
        <p v-if="role.note" class="text-muted-color">{{ role.note }}</p>
      </div>
    </article>
  </div>
</template>
