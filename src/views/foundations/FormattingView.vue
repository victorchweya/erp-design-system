<script setup lang="ts">
import { shallowRef } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { primeVueLocale } from '@/utils/locale'
import {
  formatApiDate,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatTime,
} from '@/utils/format'

const sampleTimestamp = '2026-11-18T11:30:00Z'
const sections = [
  { id: 'formatting-how-to-use', label: 'How to use' },
  { id: 'formatting-numbers', label: 'Currency & numbers' },
  { id: 'formatting-dates', label: 'Dates & time' },
  { id: 'formatting-locale', label: 'Locale' },
  { id: 'formatting-rules', label: 'Rules' },
]
const localeRows = [
  {
    setting: 'firstDayOfWeek',
    value: String(primeVueLocale.firstDayOfWeek),
    effect: 'Calendar weeks start on Monday.',
  },
  {
    setting: 'dateFormat',
    value: primeVueLocale.dateFormat,
    effect: 'Typed and shown input dates use day/month/year, such as 18/11/2026.',
  },
]
const localeDate = shallowRef<Date | null>(new Date(2026, 10, 18))
const activeSection = useActiveSection(sections.map(({ id }) => id))
const numberRows = [
  { purpose: 'Currency', input: '12500', output: formatCurrency(12500), utility: 'formatCurrency' },
  {
    purpose: 'Currency with cents',
    input: '12500.5',
    output: formatCurrency(12500.5),
    utility: 'formatCurrency',
  },
  { purpose: 'Quantity', input: '12500.5', output: formatNumber(12500.5), utility: 'formatNumber' },
  {
    purpose: 'Missing value',
    input: 'null',
    output: formatCurrency(null),
    utility: 'formatCurrency',
  },
]
const dateRows = [
  { purpose: 'Date', input: '2026-11-18', output: formatDate('2026-11-18'), utility: 'formatDate' },
  {
    purpose: 'Date and time',
    input: sampleTimestamp,
    output: formatDateTime(sampleTimestamp),
    utility: 'formatDateTime',
  },
  {
    purpose: 'Time',
    input: sampleTimestamp,
    output: formatTime(sampleTimestamp),
    utility: 'formatTime',
  },
  {
    purpose: 'API date',
    input: sampleTimestamp,
    output: formatApiDate(sampleTimestamp),
    utility: 'formatApiDate',
  },
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Formatting</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Present currency, numbers, dates, and time consistently across FTF products. Displayed
          timestamps use Nairobi time; values sent to APIs keep their machine-readable shape.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="formatting-how-to-use"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="formatting-usage-title"
        >
          <h2 id="formatting-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Use the plain utilities for templates, tables, exports, and services. Use the reactive
            VueUse adapters when the input is a ref or getter and the formatted value must update.
          </p>
          <p class="leading-relaxed text-muted-color">
            Import
            <Tag severity="secondary" class="align-baseline"><code>formatCurrency</code></Tag> from
            <Tag severity="secondary" class="align-baseline"><code>@/utils/format</code></Tag> or
            <Tag severity="secondary" class="align-baseline"><code>useFormattedCurrency</code></Tag>
            from
            <Tag severity="secondary" class="align-baseline"
              ><code>@/composables/useFormat</code></Tag
            >.
          </p>
        </section>

        <section
          id="formatting-numbers"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="formatting-numbers-title"
        >
          <h2 id="formatting-numbers-title" class="text-2xl font-medium">Currency &amp; numbers</h2>
          <p class="text-muted-color">
            Use Kenya shillings for money and locale grouping for operational quantities.
          </p>
          <DataTable
            :value="numberRows"
            size="small"
            showGridlines
            aria-label="Currency and number formats"
          >
            <Column field="purpose" header="Use" />
            <Column field="input" header="Input"
              ><template #body="{ data }"
                ><code>{{ data.input }}</code></template
              ></Column
            >
            <Column field="output" header="Output"
              ><template #body="{ data }"
                ><span class="tabular-nums">{{ data.output }}</span></template
              ></Column
            >
            <Column field="utility" header="Utility"
              ><template #body="{ data }"
                ><code>{{ data.utility }}</code></template
              ></Column
            >
          </DataTable>
        </section>

        <section
          id="formatting-dates"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="formatting-dates-title"
        >
          <h2 id="formatting-dates-title" class="text-2xl font-medium">Dates &amp; time</h2>
          <p class="text-muted-color">
            Keep date-only values unchanged. Convert timestamps to Africa/Nairobi for display.
          </p>
          <DataTable
            :value="dateRows"
            size="small"
            showGridlines
            aria-label="Date and time formats"
          >
            <Column field="purpose" header="Use" />
            <Column field="input" header="Input"
              ><template #body="{ data }"
                ><code>{{ data.input }}</code></template
              ></Column
            >
            <Column field="output" header="Output"
              ><template #body="{ data }"
                ><span class="whitespace-nowrap tabular-nums">{{ data.output }}</span></template
              ></Column
            >
            <Column field="utility" header="Utility"
              ><template #body="{ data }"
                ><code>{{ data.utility }}</code></template
              ></Column
            >
          </DataTable>
        </section>

        <section
          id="formatting-locale"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="formatting-locale-title"
        >
          <h2 id="formatting-locale-title" class="text-2xl font-medium">Locale</h2>
          <p class="leading-relaxed text-muted-color">
            PrimeVue components use the FTF locale from
            <Tag severity="secondary" class="align-baseline"><code>@/utils/locale</code></Tag
            >, set once in <code>main.ts</code>. DatePicker weeks start on Monday and typed dates
            use day/month/year.
          </p>
          <p class="leading-relaxed text-muted-color">
            PrimeVue merges this partial locale with its English defaults, so day names, month
            names, and built-in labels stay in English. The locale controls input only; display text
            still comes from the utilities above, using en-KE and Africa/Nairobi.
          </p>
          <DataTable
            :value="localeRows"
            size="small"
            showGridlines
            aria-label="PrimeVue locale settings"
          >
            <Column field="setting" header="Setting"
              ><template #body="{ data }"
                ><code>{{ data.setting }}</code></template
              ></Column
            >
            <Column field="value" header="Value"
              ><template #body="{ data }"
                ><code>{{ data.value }}</code></template
              ></Column
            >
            <Column field="effect" header="Effect" />
          </DataTable>
          <div class="flex max-w-xs flex-col gap-2">
            <label for="formatting-locale-date" class="font-medium">Delivery date</label>
            <DatePicker
              v-model="localeDate"
              inputId="formatting-locale-date"
              aria-describedby="formatting-locale-date-help"
              showIcon
              fluid
            />
            <small id="formatting-locale-date-help" class="text-muted-color"
              >Uses the app locale: Monday first, day/month/year.</small
            >
          </div>
        </section>

        <section
          id="formatting-rules"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="formatting-rules-title"
        >
          <h2 id="formatting-rules-title" class="text-2xl font-medium">Rules</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Use <code class="text-color">—</code> when a display value is missing or invalid.
            </li>
            <li>
              Use an empty string for an invalid API date so it cannot look like a valid date.
            </li>
            <li>
              Keep numeric values as numbers in application state; format only at the display
              boundary.
            </li>
            <li>
              Keep tax, exchange-rate, and unit-conversion calculations in product domain code.
            </li>
          </ul>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
