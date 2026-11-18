<script setup lang="ts">
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
</script>

<template>
  <Card>
    <template #content>
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
        <ExclamationTriangle :size="32" aria-hidden="true" class="text-warn" />
        <div class="space-y-2">
          <h3 class="text-lg font-medium">Credit information is unavailable</h3>
          <p class="max-w-md text-sm text-muted">
            Refresh the page later or contact Finance if you need to confirm this order now.
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
