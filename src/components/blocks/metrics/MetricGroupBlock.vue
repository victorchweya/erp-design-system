<script setup lang="ts">
const metrics = [
  {
    label: 'Total received',
    value: '18,420 kg',
    detail: '1–30 November 2026',
    markerClass: 'bg-info',
    detailClass: 'text-muted',
  },
  {
    label: 'Total dispatched',
    value: '16,980 kg',
    detail: '1–30 November 2026',
    markerClass: 'bg-primary',
    detailClass: 'text-muted',
  },
  {
    label: 'Sorting efficiency',
    value: '284 kg/hr',
    detail: '↑ 8.2% above prior period',
    markerClass: 'bg-success',
    detailClass: 'text-success',
  },
  {
    label: 'Packing efficiency',
    value: '196 kg/hr',
    detail: '↓ 2.1% below prior period',
    markerClass: 'bg-warn',
    detailClass: 'text-warn',
  },
]
</script>

<template>
  <section
    aria-labelledby="warehouse-summary-title"
    class="rounded-lg bg-note p-4 text-note sm:p-6"
  >
    <header class="mb-4">
      <h3 id="warehouse-summary-title" class="text-lg font-medium">Warehouse summary</h3>
      <p class="mt-1 text-sm">Throughput and efficiency for the selected period.</p>
    </header>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card v-for="metric in metrics" :key="metric.label">
        <template #content>
          <div class="flex flex-col gap-5">
            <span
              class="h-2.5 w-2.5 rounded-full"
              :class="metric.markerClass"
              aria-hidden="true"
            ></span>
            <dl class="flex flex-col gap-2">
              <dt class="text-sm text-muted">{{ metric.label }}</dt>
              <dd class="text-2xl font-medium tracking-tight">{{ metric.value }}</dd>
              <dd class="text-xs" :class="metric.detailClass">
                {{ metric.detail }}
              </dd>
            </dl>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>
