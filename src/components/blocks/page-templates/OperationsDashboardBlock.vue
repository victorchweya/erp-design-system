<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import KpiGroupBlock from '@/components/blocks/metrics/KpiGroupBlock.vue'
import TrendChartBlock from '@/components/blocks/charts/TrendChartBlock.vue'
import CompositionChartBlock from '@/components/blocks/charts/CompositionChartBlock.vue'
import { formatCurrency } from '@/utils/format'
import DashboardRecentOrders from './DashboardRecentOrders.vue'
import DashboardTasksPanel from './DashboardTasksPanel.vue'
import {
  channels,
  dailyRevenue,
  dashboardKpis,
  dayKey,
  dayLabel,
  daysInRange,
  filterOrders,
  ordersByRegionAndChannel,
  recentOrders,
  regions,
  summarizeOrders,
  type Channel,
  type DashboardFilters,
  type Region,
} from './dashboard'

const id = useId()
const defaultRange = () => [new Date(2026, 10, 14), new Date(2026, 10, 20)]
const dateRange = shallowRef<(Date | null)[] | null>(defaultRange())
const region = shallowRef<Region | null>(null)
const channel = shallowRef<Channel | null>(null)

const filters = computed<DashboardFilters>(() => {
  const [start, end] = dateRange.value ?? []
  const from = start ? dayKey(start) : null
  // While only the start date is picked, show that single day.
  return { from, to: end ? dayKey(end) : from, region: region.value, channel: channel.value }
})

// Everything below derives from this one filtered dataset.
const filteredOrders = computed(() => filterOrders(recentOrders, filters.value))
const summary = computed(() => summarizeOrders(filteredOrders.value))
const kpis = computed(() => dashboardKpis(summary.value))

const days = computed(() => daysInRange(recentOrders, filters.value))
const periodLabel = computed(() => {
  const first = days.value[0]
  const last = days.value[days.value.length - 1]
  if (!first || !last) return 'No dates selected'
  return first === last ? dayLabel(first) : `${dayLabel(first)}–${dayLabel(last)}`
})
const trend = computed(() => {
  const revenue = dailyRevenue(filteredOrders.value, days.value)
  const labels = days.value.map(dayLabel)
  const peak = Math.max(0, ...revenue)
  const peakDay = labels[revenue.indexOf(peak)]
  return {
    labels,
    // Thousands of shillings, one decimal place.
    values: revenue.map((amount) => Math.round(amount / 100) / 10),
    summary:
      peak > 0
        ? `Daily revenue for ${periodLabel.value} totalled ${formatCurrency(summary.value.revenue)}, peaking at ${formatCurrency(peak)} on ${peakDay}.`
        : `No revenue for ${periodLabel.value} with the selected filters.`,
  }
})

const chartRegions = computed(() => (region.value ? [region.value] : regions))
const chartChannels = computed(() => (channel.value ? [channel.value] : channels))
const composition = computed(() => {
  const series = ordersByRegionAndChannel(
    filteredOrders.value,
    chartRegions.value,
    chartChannels.value,
  )
  const totals = chartRegions.value.map((name, index) => ({
    name,
    count: series.reduce((total, { values }) => total + values[index]!, 0),
  }))
  const busiest = totals.reduce((top, item) => (item.count > top.count ? item : top), totals[0]!)
  return {
    series,
    summary:
      summary.value.count > 0
        ? `Stacked bars of ${summary.value.count} orders by region and channel for ${periodLabel.value}. ${busiest.name} has the most orders (${busiest.count}).`
        : `No orders by region and channel for ${periodLabel.value} with the selected filters.`,
  }
})

const status = computed(
  () =>
    `${summary.value.count} orders match these filters, with ${formatCurrency(summary.value.revenue)} revenue. KPIs and charts updated.`,
)

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
      <p role="status" class="sr-only">{{ status }}</p>
    </header>
    <KpiGroupBlock :kpis="kpis" label="Order KPIs for the selected filters" />
    <div class="dashboard-charts grid min-w-0 gap-4">
      <TrendChartBlock
        title="Revenue trend"
        :subtitle="`Daily revenue · ${periodLabel}`"
        :labels="trend.labels"
        :values="trend.values"
        unit="K"
        :summary="trend.summary"
        caption="Daily revenue in thousands of Kenyan shillings"
      />
      <CompositionChartBlock
        title="Orders by region"
        subtitle="Order count by region, stacked by channel"
        categoryLabel="Region"
        :labels="chartRegions"
        :series="composition.series"
        :summary="composition.summary"
        caption="Orders by region and channel"
      />
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
