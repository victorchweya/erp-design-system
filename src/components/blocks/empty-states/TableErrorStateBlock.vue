<script setup lang="ts">
import { ref } from 'vue'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import Replay from '@primeicons/vue/replay'

const status = ref('')
</script>

<template>
  <DataTable :value="[]" size="small" :tableProps="{ 'aria-label': 'Supplier orders' }">
    <Column field="reference" header="Order" />
    <Column field="supplier" header="Supplier" />
    <Column field="status" header="Status" />
    <template #empty>
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 py-6 text-center">
        <div role="alert" class="flex flex-col items-center gap-4">
          <ExclamationTriangle :size="32" aria-hidden="true" class="text-error" />
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Supplier orders could not be loaded</h3>
            <p class="max-w-md text-sm text-muted">
              Your page, sorting, and filters are still applied. Try again.
            </p>
          </div>
        </div>
        <Button type="button" size="small" @click="status = 'Retry started.'">
          <Replay aria-hidden="true" />Retry
        </Button>
        <p class="sr-only" aria-live="polite">{{ status }}</p>
      </div>
    </template>
  </DataTable>
</template>
