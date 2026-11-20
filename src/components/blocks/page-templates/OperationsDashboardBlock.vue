<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import KpiGroupBlock from '@/components/blocks/metrics/KpiGroupBlock.vue'
import TrendChartBlock from '@/components/blocks/charts/TrendChartBlock.vue'
import CompositionChartBlock from '@/components/blocks/charts/CompositionChartBlock.vue'
import DashboardRecentOrders from './DashboardRecentOrders.vue'
import DashboardTasksPanel from './DashboardTasksPanel.vue'
import { channels, recentOrders, regions, type Channel, type Region } from './dashboard'

const id = useId()
const defaultRange = () => [new Date(2026, 10, 14), new Date(2026, 10, 20)]
const dateRange = shallowRef<(Date | null)[] | null>(defaultRange())
const region = shallowRef<Region | null>(null)
const channel = shallowRef<Channel | null>(null)

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const filteredOrders = computed(() => {
  const [start, end] = dateRange.value ?? []
  const from = start ? dayKey(start) : null
  const to = end ? dayKey(end) : from
  return recentOrders.filter(
    (order) =>
      (!region.value || order.region === region.value) &&
      (!channel.value || order.channel === channel.value) &&
      (!from || order.date >= from) &&
      (!to || order.date <= to),
  )
})

function clearFilters() {
  dateRange.value = defaultRange()
  region.value = null
  channel.value = null
}
</script>

<template>
  <div class="dashboard flex flex-col gap-6 text-color">
    <header class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h3 class="text-xl font-medium tracking-tight sm:text-2xl">Operations overview</h3>
        <p class="text-sm text-muted">Orders, deliveries, and issues across FTF hubs.</p>
      </div>
      <div
        role="group"
        aria-label="Dashboard filters"
        class="flex flex-wrap items-end gap-3 text-sm"
      >
        <div class="flex min-w-0 flex-1 basis-56 flex-col gap-1">
          <label :for="`${id}-range`" class="font-medium">Date range</label>
          <DatePicker
            v-model="dateRange"
            :inputId="`${id}-range`"
            selectionMode="range"
            dateFormat="d M yy"
            :manualInput="false"
            showIcon
            fluid
          />
        </div>
        <div class="flex min-w-0 flex-1 basis-40 flex-col gap-1">
          <label :for="`${id}-region`" class="font-medium">Region</label>
          <Select
            v-model="region"
            :inputId="`${id}-region`"
            :options="regions"
            placeholder="All regions"
            showClear
            fluid
          />
        </div>
        <div class="flex min-w-0 flex-1 basis-40 flex-col gap-1">
          <label :for="`${id}-channel`" class="font-medium">Channel</label>
          <Select
            v-model="channel"
            :inputId="`${id}-channel`"
            :options="channels"
            placeholder="All channels"
            showClear
            fluid
          />
        </div>
        <Button type="button" severity="secondary" outlined @click="clearFilters"
          >Reset filters</Button
        >
      </div>
      <p role="status" class="sr-only">{{ filteredOrders.length }} recent orders shown</p>
    </header>
    <KpiGroupBlock />
    <div class="dashboard-charts grid min-w-0 gap-4">
      <TrendChartBlock />
      <CompositionChartBlock />
    </div>
    <div class="dashboard-bottom grid min-w-0 items-start gap-4">
      <DashboardRecentOrders :orders="filteredOrders" @clear="clearFilters" />
      <DashboardTasksPanel />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  container-type: inline-size;
}

@container (min-width: 48rem) {
  .dashboard-charts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container (min-width: 64rem) {
  .dashboard-bottom {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
}
</style>
