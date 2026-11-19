<script setup lang="ts">
import ArrowUp from '@primeicons/vue/arrow-up'
</script>

<template>
  <Card class="max-w-md">
    <template #content>
      <div class="flex flex-col gap-4">
        <span class="h-2.5 w-2.5 rounded-full bg-info" aria-hidden="true"></span>
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-muted">Sorting efficiency</p>
            <p class="mt-1 text-3xl font-medium tracking-tight">284 kg/hr</p>
          </div>
          <span class="inline-flex items-center gap-1 text-sm text-success">
            <span class="sr-only">Increased by</span>
            8.2%
            <ArrowUp :size="12" aria-hidden="true" />
          </span>
        </div>
        <p class="text-sm text-muted">Average sorting rate compared with the previous 30 days.</p>
        <p class="border-t border-surface pt-3 text-xs text-muted">Updated 10 minutes ago</p>
      </div>
    </template>
  </Card>
</template>
