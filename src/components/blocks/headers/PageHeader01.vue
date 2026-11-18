<script setup lang="ts">
import { shallowRef } from 'vue'
import Plus from '@primeicons/vue/plus'

withDefaults(defineProps<{ headingTag?: 'h1' | 'h2' | 'h3' }>(), { headingTag: 'h1' })
const feedback = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-4 text-color">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0 flex-1 basis-64 space-y-2">
        <component :is="headingTag" class="text-2xl font-medium tracking-tight sm:text-3xl">
          Orders
        </component>
        <p class="text-base leading-relaxed text-muted">
          Manage orders from confirmation to delivery.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button type="button" @click="feedback = 'Create order selected in this preview.'">
          <Plus :size="16" aria-hidden="true" />
          Create order
        </Button>
      </div>
    </header>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
</template>
