<script setup lang="ts">
import Inbox from '@primeicons/vue/inbox'
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <Card>
      <template #content>
        <div class="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
          <Inbox :size="32" aria-hidden="true" class="text-muted" />
          <div class="space-y-1">
            <h3 class="font-medium">No deliveries scheduled</h3>
            <p class="text-sm text-muted">New delivery plans will appear here.</p>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="flex min-h-44 flex-col items-center justify-center gap-3 text-center">
          <Inbox :size="24" aria-hidden="true" class="text-muted" />
          <div class="space-y-1">
            <h3 class="font-medium">No stock movements</h3>
            <p class="text-sm text-muted">Movements will appear after stock changes.</p>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="flex min-h-28 items-center justify-center gap-3 text-left">
          <Inbox :size="20" aria-hidden="true" class="shrink-0 text-muted" />
          <div>
            <h3 class="font-medium">No matching items</h3>
            <p class="text-sm text-muted">Try changing your filters.</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
