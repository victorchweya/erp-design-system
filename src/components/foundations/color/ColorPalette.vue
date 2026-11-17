<script setup lang="ts">
import { primitives } from '@/theme/erp-theme/foundations/color-tokens'
</script>

<template>
  <div class="overflow-x-auto" role="region" aria-label="FTF palette ramps" tabindex="0">
    <div class="flex min-w-[54rem] flex-col gap-5 pb-2">
      <div
        v-for="(steps, family) in primitives"
        :key="family"
        class="grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-3"
      >
        <h3 class="pt-2 text-sm font-medium capitalize">{{ family }}</h3>
        <div class="flex gap-1">
          <Card
            v-for="(value, step) in steps"
            :key="step"
            class="min-w-0 flex-1 overflow-hidden"
            :dt="{
              root: { borderRadius: '{border.radius.sm}' },
              body: { padding: '{spacing.1}', gap: '0' },
            }"
            role="figure"
            :aria-label="`${family}.${step}`"
          >
            <template #header>
              <div class="h-8" :style="{ backgroundColor: value }" aria-hidden="true" />
            </template>
            <template #content>
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium"
                  ><span class="sr-only">{{ family }}.</span>{{ step }}</span
                >
                <span class="font-mono text-xs">{{ value }}</span>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
