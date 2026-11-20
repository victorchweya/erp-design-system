<script setup lang="ts">
import { useId } from 'vue'
import symbol from '@/assets/brand/symbol.svg'

withDefaults(
  defineProps<{
    heading: string
    description: string
    headingTag?: 'h1' | 'h2' | 'h3'
  }>(),
  { headingTag: 'h2' },
)
const headingId = useId()
</script>

<template>
  <section
    :aria-labelledby="headingId"
    class="flex min-h-96 flex-col items-center justify-center gap-6 px-4 py-12 text-center text-color"
  >
    <img :src="symbol" alt="" class="size-10" />
    <div class="flex flex-col items-center gap-3">
      <slot name="icon" />
      <component :is="headingTag" :id="headingId" class="text-2xl font-medium tracking-tight">
        {{ heading }}
      </component>
      <p class="max-w-md text-sm leading-relaxed text-muted">{{ description }}</p>
    </div>
    <slot />
    <div class="flex flex-wrap items-center justify-center gap-3">
      <slot name="actions" />
    </div>
  </section>
</template>
