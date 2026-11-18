<script setup lang="ts">
import { shallowRef } from 'vue'
import Download from '@primeicons/vue/download'
import Plus from '@primeicons/vue/plus'

withDefaults(defineProps<{ headingTag?: 'h1' | 'h2' | 'h3' }>(), { headingTag: 'h2' })
const feedback = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-4 text-color">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0 flex-1 basis-64 space-y-2">
        <div class="flex flex-wrap items-center gap-3">
          <component :is="headingTag" class="text-xl font-medium tracking-tight sm:text-2xl">
            Supplier orders
          </component>
          <Tag severity="warn">8 awaiting confirmation</Tag>
        </div>
        <p class="text-sm leading-relaxed text-muted">
          Review incoming produce and confirm quantities.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button
          type="button"
          severity="secondary"
          outlined
          @click="feedback = 'Export selected in this preview.'"
        >
          <Download aria-hidden="true" />
          Export
        </Button>
        <Button type="button" @click="feedback = 'Create order selected in this preview.'">
          <Plus aria-hidden="true" />
          Create order
        </Button>
      </div>
    </header>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
</template>
