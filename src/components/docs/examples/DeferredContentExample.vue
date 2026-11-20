<script setup lang="ts">
import { shallowRef } from 'vue'

interface Delivery {
  id: string
  supplier: string
  weight: string
}

const deliveries = shallowRef<Delivery[]>([])
const loading = shallowRef(false)

// DeferredContent only renders the slot. Start the request yourself in @load.
async function loadDeliveries() {
  loading.value = true
  // Replace with your API call.
  deliveries.value = await Promise.resolve([
    { id: 'DLV-5104', supplier: 'Kiambu Fresh Growers', weight: '420 kg' },
    { id: 'DLV-5103', supplier: 'Limuru Highland Farm', weight: '310 kg' },
    { id: 'DLV-5102', supplier: 'Nyeri Valley Co-op', weight: '275 kg' },
  ])
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-muted-color">
      Scroll down. Recent deliveries load when the table comes into view.
    </p>
    <div
      class="flex h-80 items-center justify-center rounded-lg border border-dashed border-surface text-muted-color"
    >
      Delivery summary
    </div>
    <DeferredContent aria-live="polite" @load="loadDeliveries">
      <DataTable :value="deliveries" :loading="loading" size="small" aria-label="Recent deliveries">
        <Column field="id" header="Delivery" />
        <Column field="supplier" header="Supplier" />
        <Column field="weight" header="Weight" />
      </DataTable>
    </DeferredContent>
  </div>
</template>
