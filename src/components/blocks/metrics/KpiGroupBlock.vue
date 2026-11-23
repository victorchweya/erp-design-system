<script setup lang="ts">
// GOAL: Show a measure with its unit and never a bare empty value.
import { formatNumber } from '@/utils/format'

interface Kpi {
  label: string
  /** Numbers are formatted for display; text is shown as given. Empty values read as not available. */
  value: string | number | null
  /** Muted suffix after the value, such as kg or Ksh. Hidden when there is no value. */
  unit?: string
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

const hasValue = (value: Kpi['value']) =>
  typeof value === 'number' ? Number.isFinite(value) : !!value?.trim()
const display = (value: Kpi['value']) => (typeof value === 'number' ? formatNumber(value) : value)
</script>

<template>
  <section :aria-label="label" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Card v-for="kpi in kpis" :key="kpi.label">
      <template #content>
        <div class="flex flex-col gap-5">
          <span class="h-2.5 w-2.5 rounded-full" :class="kpi.markerClass" aria-hidden="true"></span>
          <dl class="flex flex-col gap-2">
            <dt class="text-sm text-muted">{{ kpi.label }}</dt>
            <dd class="text-2xl font-medium tracking-tight">
              <template v-if="hasValue(kpi.value)">
                {{ display(kpi.value)
                }}<span v-if="kpi.unit" class="text-base text-muted">&nbsp;{{ kpi.unit }}</span>
              </template>
              <template v-else>
                <span aria-hidden="true">—</span>
                <span class="sr-only">Not available</span>
              </template>
            </dd>
            <dd class="text-xs text-muted">{{ kpi.detail }}</dd>
          </dl>
        </div>
      </template>
    </Card>
  </section>
</template>
