<script setup lang="ts">
import { shallowRef } from 'vue'
import Download from '@primeicons/vue/download'
import InfoCircle from '@primeicons/vue/info-circle'

withDefaults(defineProps<{ headingTag?: 'h1' | 'h2' | 'h3' }>(), { headingTag: 'h2' })
const feedback = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-4 text-color">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div class="min-w-0 flex-1 basis-64 space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <component :is="headingTag" class="text-xl font-medium tracking-tight">
            Supplier opportunities
          </component>
          <Tag severity="info">Beta</Tag>
          <InfoCircle
            class="text-muted"
            role="img"
            aria-label="This feature is currently in beta"
          />
        </div>
        <p class="text-sm leading-relaxed text-muted">
          Suppliers carrying produce that is missing from your current catalogue.
        </p>
      </div>
      <Button
        type="button"
        severity="primary"
        outlined
        @click="feedback = 'Export selected in this preview.'"
      >
        <Download aria-hidden="true" />
        Export
      </Button>
    </header>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
</template>
