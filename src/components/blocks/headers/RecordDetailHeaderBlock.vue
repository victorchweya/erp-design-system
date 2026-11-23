<script setup lang="ts">
import ArrowLeft from '@primeicons/vue/arrow-left'

withDefaults(
  defineProps<{
    title: string
    titleId?: string
    headingTag?: 'h1' | 'h2' | 'h3'
    backLabel?: string
    showBack?: boolean
  }>(),
  {
    headingTag: 'h2',
    backLabel: 'Back',
    showBack: true,
  },
)

defineEmits<{ back: [] }>()
defineSlots<{
  status?: () => unknown
  metadata?: () => unknown
  actions?: () => unknown
}>()
</script>

<template>
  <header class="flex flex-wrap items-start justify-between gap-4">
    <div class="flex min-w-0 flex-1 basis-64 items-start gap-2">
      <Button
        v-if="showBack"
        v-tooltip.bottom="backLabel"
        type="button"
        severity="primary"
        outlined
        size="small"
        iconOnly
        :aria-label="backLabel"
        @click="$emit('back')"
      >
        <ArrowLeft aria-hidden="true" />
      </Button>
      <div class="min-w-0 flex-1 space-y-1">
        <div class="flex flex-wrap items-center gap-2">
          <component :is="headingTag" :id="titleId" class="text-xl font-medium tracking-tight">
            {{ title }}
          </component>
          <slot name="status" />
        </div>
        <slot name="metadata" />
      </div>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
