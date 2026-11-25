<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import ChevronLeft from '@primeicons/vue/chevron-left'
import ChevronRight from '@primeicons/vue/chevron-right'
import { DISPLAY_LOCALE, formatBusinessDate, formatBusinessTime, formatNumber } from '@/utils/format'

type RunStatus = 'Planned' | 'Loading' | 'In transit' | 'Delivered' | 'Delayed'
type CalendarView = 'week' | 'month'
interface DeliveryRun {
  id: string
  date: string
  start: string
  kind: 'Customer delivery' | 'Farm pickup'
  route: string
  stops: number
  vehicle: string
  driver: string
  crates: number
  status: RunStatus
}

const statusSeverity: Record<RunStatus, string> = {
  Planned: 'secondary',
  Loading: 'info',
  'In transit': 'info',
  Delivered: 'success',
  Delayed: 'danger',
}
const viewOptions = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

// Dates are YYYY-MM-DD calendar days in Nairobi. Arithmetic runs in UTC so no day shifts.
function parse(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year!, month! - 1, day))
}
function toIso(date: Date) {
  return date.toISOString().slice(0, 10)
}
function addDays(date: string, days: number) {
  const value = parse(date)
  value.setUTCDate(value.getUTCDate() + days)
  return toIso(value)
}
function addMonths(date: string, months: number) {
  const value = parse(date)
  value.setUTCDate(1)
  value.setUTCMonth(value.getUTCMonth() + months)
  return toIso(value)
}
// Weeks start on Monday, matching the PrimeVue locale.
function startOfWeek(date: string) {
  return addDays(date, -((parse(date).getUTCDay() + 6) % 7))
}
function formatDay(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(DISPLAY_LOCALE, { ...options, timeZone: 'UTC' }).format(
    parse(date),
  )
}

// Sample schedule generated around today. Replace with runs from your planning service.
const today = formatBusinessDate(new Date())
const routes = [
  { kind: 'Customer delivery', route: 'Westlands & Parklands', stops: 9 },
  { kind: 'Farm pickup', route: 'Limuru farms', stops: 4 },
  { kind: 'Customer delivery', route: 'Industrial Area', stops: 6 },
  { kind: 'Customer delivery', route: 'Karen & Langata', stops: 7 },
  { kind: 'Farm pickup', route: 'Kirinyaga collection', stops: 5 },
  { kind: 'Customer delivery', route: 'Thika Road', stops: 8 },
] as const
const fleet = [
  { vehicle: 'KDA 214M', driver: 'Peter Mwangi' },
  { vehicle: 'KCZ 908T', driver: 'Grace Achieng' },
  { vehicle: 'KDB 551K', driver: 'Samuel Kiprono' },
  { vehicle: 'KDC 037P', driver: 'Mercy Wanjiru' },
]
const startTimes = ['05:00', '06:30', '08:00', '10:30']
const todayStatuses: RunStatus[] = ['Delivered', 'In transit', 'Delayed', 'Loading']

function runsFor(date: string): DeliveryRun[] {
  const weekday = parse(date).getUTCDay()
  if (weekday === 0) return []
  const seed = [...date].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 9973, 7)
  const count = 1 + (seed % 3) + (weekday === 1 || weekday === 5 ? 1 : 0)
  return Array.from({ length: count }, (_, index) => {
    const status: RunStatus =
      date < today ? 'Delivered' : date > today ? 'Planned' : todayStatuses[index]!
    return {
      id: `RUN-${date.slice(5).replace('-', '')}-${index + 1}`,
      date,
      start: startTimes[index]!,
      ...routes[(seed + index * 2) % routes.length]!,
      ...fleet[(seed + index) % fleet.length]!,
      crates: 40 + ((seed * (index + 3)) % 90),
      status,
    }
  })
}

const id = useId()
const view = shallowRef<CalendarView>('week')
const anchor = shallowRef(today)
const selected = shallowRef<DeliveryRun | null>(null)
const drawerVisible = shallowRef(false)
let trigger: HTMLElement | null = null

const week = computed(() => {
  const start = startOfWeek(anchor.value)
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(start, index)
    return { date, runs: runsFor(date) }
  })
})
const month = computed(() => {
  const first = `${anchor.value.slice(0, 8)}01`
  const key = first.slice(0, 7)
  const rows: { date: string; inMonth: boolean; count: number }[][] = []
  let start = startOfWeek(first)
  do {
    rows.push(
      Array.from({ length: 7 }, (_, index) => {
        const date = addDays(start, index)
        return { date, inMonth: date.startsWith(key), count: runsFor(date).length }
      }),
    )
    start = addDays(start, 7)
  } while (start.startsWith(key))
  return rows
})
const weekdays = computed(() => week.value.map(({ date }) => date))
const rangeLabel = computed(() => {
  if (view.value === 'month') return formatDay(anchor.value, { month: 'long', year: 'numeric' })
  const first = week.value[0]!.date
  const last = week.value[6]!.date
  return `${formatDay(first, { day: 'numeric', month: 'short' })} – ${formatDay(last, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`
})
const unit = computed(() => (view.value === 'week' ? 'week' : 'month'))
const pickerDate = computed(() => {
  const [year, month, day] = anchor.value.split('-').map(Number)
  return new Date(year!, month! - 1, day)
})

function move(step: number) {
  anchor.value =
    view.value === 'week' ? addDays(anchor.value, step * 7) : addMonths(anchor.value, step)
}
// DatePicker returns a local Date. Keep the calendar day the user picked.
function jumpTo(value: unknown) {
  if (!(value instanceof Date)) return
  const pad = (part: number) => String(part).padStart(2, '0')
  anchor.value = `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}
function showWeek(date: string) {
  anchor.value = date
  view.value = 'week'
}
function openRun(run: DeliveryRun, event: Event) {
  trigger = event.currentTarget as HTMLElement
  selected.value = run
  drawerVisible.value = true
}
function runTime(run: DeliveryRun) {
  return formatBusinessTime(`${run.date}T${run.start}:00+03:00`)
}
function dayLabel(date: string) {
  return formatDay(date, { weekday: 'long', day: 'numeric', month: 'long' })
}
</script>

<template>
  <div class="calendar flex flex-col gap-4">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div class="flex flex-col gap-1">
        <h3 :id="`${id}-range`" class="text-lg font-medium">{{ rangeLabel }}</h3>
        <p class="text-muted">Delivery and farm pickup runs</p>
      </div>
      <div class="flex flex-wrap items-end gap-2">
        <div class="flex items-center gap-1">
          <Button
            type="button"
            severity="primary"
            outlined
            iconOnly
            :aria-label="`Previous ${unit}`"
            @click="move(-1)"
            ><ChevronLeft aria-hidden="true"
          /></Button>
          <Button type="button" severity="primary" outlined @click="anchor = today">Today</Button>
          <Button
            type="button"
            severity="primary"
            outlined
            iconOnly
            :aria-label="`Next ${unit}`"
            @click="move(1)"
            ><ChevronRight aria-hidden="true"
          /></Button>
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-jump`" class="font-medium">Go to date</label>
          <DatePicker
            :inputId="`${id}-jump`"
            :modelValue="pickerDate"
            showIcon
            class="w-40"
            @update:modelValue="jumpTo"
          />
        </div>
        <SelectButton
          v-model="view"
          :options="viewOptions"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
          aria-label="Calendar view"
        />
      </div>
    </div>
    <p role="status" class="sr-only">Showing {{ rangeLabel }}</p>

    <ol v-if="view === 'week'" class="week" :aria-labelledby="`${id}-range`">
      <li
        v-for="day in week"
        :key="day.date"
        class="day flex min-w-0 flex-col gap-2 rounded-border border p-2"
        :class="day.date === today ? 'border-live' : 'border-surface'"
      >
        <h4 :id="`${id}-${day.date}`" class="flex items-baseline gap-2 font-medium">
          <span>{{ formatDay(day.date, { weekday: 'short' }) }}</span>
          <span class="text-muted">{{
            formatDay(day.date, { day: 'numeric', month: 'short' })
          }}</span>
          <span v-if="day.date === today" class="text-xs font-medium text-live">Today</span>
        </h4>
        <ul
          v-if="day.runs.length"
          class="flex flex-col gap-2"
          :aria-labelledby="`${id}-${day.date}`"
        >
          <li v-for="run in day.runs" :key="run.id">
            <Button
              type="button"
              severity="secondary"
              outlined
              fluid
              aria-haspopup="dialog"
              :aria-controls="`${id}-drawer`"
              :aria-expanded="drawerVisible && selected?.id === run.id"
              class="flex-col items-start gap-1 text-left"
              @click="openRun(run, $event)"
            >
              <span class="text-xs text-muted">{{ runTime(run) }} · {{ run.kind }}</span>
              <span class="font-medium text-color">{{ run.route }}</span>
              <span class="text-xs text-muted">{{ run.vehicle }} · {{ run.driver }}</span>
              <span class="flex w-full flex-wrap items-center justify-between gap-1 text-xs">
                <span class="text-color">{{ formatNumber(run.crates) }} crates</span>
                <Tag :severity="statusSeverity[run.status]" :value="run.status" />
              </span>
            </Button>
          </li>
        </ul>
        <p v-else class="text-xs text-muted">No runs scheduled</p>
      </li>
    </ol>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-fixed border-collapse">
        <caption class="sr-only">
          Runs per day,
          {{
            rangeLabel
          }}. Choose a day to open its week.
        </caption>
        <thead>
          <tr>
            <th
              v-for="date in weekdays"
              :key="date"
              scope="col"
              class="p-2 text-left text-xs font-medium text-muted"
            >
              <span aria-hidden="true">{{ formatDay(date, { weekday: 'short' }) }}</span>
              <span class="sr-only">{{ formatDay(date, { weekday: 'long' }) }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in month" :key="row[0]!.date">
            <td v-for="cell in row" :key="cell.date" class="border border-surface p-1 align-top">
              <Button
                v-if="cell.inMonth"
                type="button"
                text
                severity="secondary"
                fluid
                :aria-current="cell.date === today ? 'date' : undefined"
                :class="{ 'text-live': cell.date === today }"
                :aria-label="`${dayLabel(cell.date)}, ${cell.count} ${cell.count === 1 ? 'run' : 'runs'}. Show week`"
                class="flex-col items-start gap-1 p-1"
                @click="showWeek(cell.date)"
              >
                <span class="font-medium">{{ formatDay(cell.date, { day: 'numeric' }) }}</span>
                <span v-if="cell.count" class="text-xs text-muted"
                  >{{ cell.count }}<span class="run-word"> runs</span></span
                >
              </Button>
              <span v-else class="block p-2 text-muted opacity-60">{{
                formatDay(cell.date, { day: 'numeric' })
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Drawer
      :id="`${id}-drawer`"
      v-model:visible="drawerVisible"
      :header="selected?.route"
      :aria-label="selected ? `${selected.route} run details` : 'Run details'"
      position="right"
      blockScroll
      class="w-full sm:w-96"
      @after-hide="trigger?.focus()"
    >
      <div v-if="selected" class="flex flex-col gap-6 text-sm">
        <div class="flex flex-wrap items-center gap-3">
          <Tag :severity="statusSeverity[selected.status]" :value="selected.status" />
          <span class="text-muted">{{ selected.id }}</span>
        </div>
        <dl class="grid grid-cols-2 gap-4">
          <div class="col-span-2 space-y-1">
            <dt class="text-muted">Date</dt>
            <dd>{{ dayLabel(selected.date) }}, {{ runTime(selected) }}</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Run type</dt>
            <dd>{{ selected.kind }}</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Stops</dt>
            <dd>{{ selected.stops }}</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Vehicle</dt>
            <dd>{{ selected.vehicle }}</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Driver</dt>
            <dd>{{ selected.driver }}</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Crates</dt>
            <dd>{{ formatNumber(selected.crates) }}</dd>
          </div>
        </dl>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <Button type="button" severity="secondary" outlined @click="drawerVisible = false"
            >Close details</Button
          >
        </div>
      </template>
    </Drawer>
  </div>
</template>

<style scoped>
.calendar {
  container-type: inline-size;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.run-word {
  display: none;
}

/* Below this width the week reads as a day-by-day agenda. */
@container (min-width: 52rem) {
  .week {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .day {
    min-height: 12rem;
  }

  .run-word {
    display: inline;
  }
}
</style>
