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
  <div>
    <article
      v-for="role in rows"
      :key="role.name"
      class="grid gap-4 border-t border-surface py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <div class="flex min-w-0 flex-col gap-2">
        <code class="break-all font-medium">{{ role.name }}</code>
        <p class="text-muted-color">{{ role.purpose }}</p>
        <p class="text-xs font-medium">
          {{ role.evidence }}{{ role.evidence === 'Proposal' ? ' · not approved' : ' in FTF' }}
        </p>
        <p class="break-words text-xs text-muted-color">{{ role.source }}</p>
      </div>
      <div class="grid min-w-0 gap-3 sm:grid-cols-2">
        <figure
          v-for="preview in role.previews"
          :key="preview.mode"
          class="flex min-w-0 flex-col gap-2"
        >
          <figcaption class="font-medium capitalize">{{ preview.mode }}</figcaption>
          <template v-if="preview.pair">
            <div
              class="flex min-h-24 items-center justify-center rounded-lg p-4"
              :style="{
                backgroundColor: preview.pair.background.value,
                color: preview.pair.foreground.value,
              }"
            >
              <span
                v-if="role.kind === 'boundary'"
                class="w-full rounded-md border-2 px-3 py-2"
                :style="{
                  borderColor: preview.pair.foreground.value,
                  color: swatchInk(preview.pair.background.value),
                }"
                >Field boundary</span
              >
              <span v-else class="text-base font-medium">Aa · Example text</span>
            </div>
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
          <p
            v-else
            class="flex min-h-24 items-center rounded-lg border border-dashed border-surface p-4 text-muted-color"
          >
            Not defined. No dark pairing inferred.
          </p>
        </figure>
        <p v-if="role.note" class="text-xs text-muted-color sm:col-span-2">{{ role.note }}</p>
      </div>
    </article>
  </div>
</template>
