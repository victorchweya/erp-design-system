<script setup lang="ts">
import { useId } from 'vue'

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
    class="flex min-h-56 flex-col items-center justify-center gap-4 text-center"
  >
    <slot name="icon" />
    <div class="flex flex-col items-center gap-2">
      <component :is="headingTag" :id="headingId" class="text-lg font-medium">
        {{ heading }}
      </component>
      <p class="max-w-md text-sm text-muted">{{ description }}</p>
    </div>
    <slot />
    <div v-if="$slots.actions" class="flex flex-wrap items-center justify-center gap-3">
      <slot name="actions" />
    </div>
  </section>
</template>
