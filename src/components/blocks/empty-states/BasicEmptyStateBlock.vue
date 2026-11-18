<script setup lang="ts">
import Inbox from '@primeicons/vue/inbox'
</script>

<template>
  <Card>
    <template #content>
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
        <Inbox :size="32" aria-hidden="true" class="text-muted" />
        <div class="space-y-2">
          <h3 class="text-lg font-medium">No supplier orders yet</h3>
          <p class="max-w-md text-sm text-muted">
            Orders from approved suppliers will appear here when they are created.
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
