<script setup lang="ts">
import Link from '@primeicons/vue/link'
</script>

<template>
  <Card>
    <template #content>
      <div class="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
        <Link :size="24" aria-hidden="true" class="text-muted" />
        <p class="max-w-sm text-sm text-muted">
          Linked purchase orders will appear here after they are matched to this delivery.
        </p>
      </div>
    </template>
  </Card>
</template>
