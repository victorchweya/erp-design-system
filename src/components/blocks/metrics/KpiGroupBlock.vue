<script setup lang="ts">
interface Kpi {
  label: string
  value: string
  detail: string
  markerClass: string
}

const {
  kpis = [
    {
      label: 'Orders today',
      value: '128',
      detail: '12 awaiting confirmation',
      markerClass: 'bg-info',
    },
    {
      label: 'Items dispatched',
      value: '4,860 kg',
      detail: 'Across 94 orders',
      markerClass: 'bg-primary',
    },
    {
      label: 'On-time delivery',
      value: '96.4%',
      detail: 'Last 30 days',
      markerClass: 'bg-success',
    },
    {
      label: 'Open issues',
      value: '7',
      detail: '3 require action today',
      markerClass: 'bg-warn',
    },
  ],
  label = 'Order KPIs',
} = defineProps<{ kpis?: Kpi[]; label?: string }>()
</script>

<template>
  <section :aria-label="label" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Card v-for="kpi in kpis" :key="kpi.label">
      <template #content>
        <div class="flex flex-col gap-5">
          <span class="h-2.5 w-2.5 rounded-full" :class="kpi.markerClass" aria-hidden="true"></span>
          <dl class="flex flex-col gap-2">
            <dt class="text-sm text-muted">{{ kpi.label }}</dt>
            <dd class="text-2xl font-medium tracking-tight">{{ kpi.value }}</dd>
            <dd class="text-xs text-muted">{{ kpi.detail }}</dd>
          </dl>
        </div>
      </template>
    </Card>
  </section>
</template>
