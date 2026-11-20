<script setup lang="ts">
import Check from '@primeicons/vue/check'
import Times from '@primeicons/vue/times'
import type { WritingExample } from './writing-guidelines'

defineProps<{ example: WritingExample }>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <Card class="min-w-0">
      <template #content>
        <div class="flex flex-col items-start gap-3">
          <Tag severity="success"><Check :size="12" aria-hidden="true" />Do</Tag>
          <p class="text-base leading-relaxed">{{ example.do }}</p>
        </div>
      </template>
    </Card>
    <Card class="min-w-0">
      <template #content>
        <div class="flex flex-col items-start gap-3">
          <Tag severity="danger"><Times :size="12" aria-hidden="true" />Don’t</Tag>
          <p class="text-base leading-relaxed text-muted-color">{{ example.dont }}</p>
        </div>
      </template>
    </Card>
  </div>
</template>
