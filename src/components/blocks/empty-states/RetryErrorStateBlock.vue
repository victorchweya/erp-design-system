<script setup lang="ts">
import { ref } from 'vue'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import Replay from '@primeicons/vue/replay'

const retrying = ref(false)
</script>

<template>
  <Card>
    <template #content>
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
        <ExclamationTriangle :size="32" aria-hidden="true" class="text-error" />
        <div class="space-y-2">
          <h3 class="text-lg font-medium">Supplier orders could not be loaded</h3>
          <p class="max-w-md text-sm text-muted">
            Your filters are still applied. Check your connection and try again.
          </p>
        </div>
        <Button
          type="button"
          severity="primary"
          size="small"
          outlined
          :loading="retrying"
          @click="retrying = true"
        >
          <Replay aria-hidden="true" />Try again
        </Button>
      </div>
    </template>
  </Card>
</template>
