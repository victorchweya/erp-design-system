<script lang="ts">
// GOAL: Find and narrow a list in one compact row.
export interface ListToolbarColumn {
  key: string
  label: string
  /** A locked column is always visible and cannot be unchecked in the column chooser. */
  locked?: boolean
}

export interface ListToolbarAppliedFilter {
  key: string
  /** Name of the filter, for example "Status". */
  label: string
  /** Readable value, for example "Received, Completed". */
  value: string
  /** Set when the filter lives in the Filter popover, so it counts towards its badge. */
  more?: boolean
}
</script>

<script setup lang="ts">
import { computed, nextTick, useId, useTemplateRef } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type Popover from 'primevue/popover'
import Download from '@primeicons/vue/download'
import Refresh from '@primeicons/vue/refresh'
import Search from '@primeicons/vue/search'
import SlidersH from '@primeicons/vue/sliders-h'
import Table from '@primeicons/vue/table'
import { formatNumber } from '@/utils/format'

const props = withDefaults(
  defineProps<{
    /** Screen reader label of the keyword search, for example "Search orders". */
    searchLabel?: string
    /** What the search matches, for example "Order number or supplier". Defaults to the label. */
    searchPlaceholder?: string
    /** Filters that are currently applied, shown as removable chips. Include the keyword if it filters. */
    appliedFilters?: ListToolbarAppliedFilter[]
    /** Every column the list can show. Leave empty to hide the column chooser. */
    columns?: ListToolbarColumn[]
    /** Keys of the visible columns. Locked columns are always kept. Defaults to all columns. */
    visibleColumns?: string[]
    /** True while the list loads. Shows a progress bar and announces it. */
    loading?: boolean
    /** Number of results for the current filters. Leave undefined while unknown or after an error. */
    total?: number
    /** Singular and plural name of what the list shows. */
    noun?: { one: string; other: string }
    /** Shows the Export CSV button. */
    exportable?: boolean
    exporting?: boolean
    /** Shows the Refresh button. */
    refreshable?: boolean
  }>(),
  {
    searchLabel: 'Search',
    searchPlaceholder: undefined,
    appliedFilters: () => [],
    columns: () => [],
    visibleColumns: undefined,
    total: undefined,
    noun: () => ({ one: 'result', other: 'results' }),
  },
)
const search = defineModel<string>('search', { default: '' })
const emit = defineEmits<{
  'update:visibleColumns': [keys: string[]]
  /** A chip was removed. Reset only the filter with this key. */
  'remove-filter': [key: string]
  /** Clear filters was pressed. Reset every filter, including the keyword. */
  clear: []
  export: []
  refresh: []
}>()
defineSlots<{
  /**
   * The one or two inline filters. Give each a screen reader label and a placeholder that names it.
   * Pass the slot prop size to the controls so they stay comfortable on phones.
   */
  filters?: (props: { size: ControlSize }) => unknown
  /** Content of the Filter popover. The button only shows when this is provided. */
  'more-filters'?: () => unknown
}>()

type ControlSize = 'small' | undefined
const id = useId()
/** Compact controls from the sm breakpoint up, default touch-friendly size on phones. */
const wide = useMediaQuery('(min-width: 640px)')
const size = computed<ControlSize>(() => (wide.value ? 'small' : undefined))
const searchInput = useTemplateRef<{ $el: HTMLInputElement }>('searchInput')
const chipList = useTemplateRef<HTMLUListElement>('chipList')
const filtersPopover = useTemplateRef<InstanceType<typeof Popover>>('filtersPopover')
const columnsPopover = useTemplateRef<InstanceType<typeof Popover>>('columnsPopover')

const moreCount = computed(() => props.appliedFilters.filter((filter) => filter.more).length)
const visibleKeys = computed(() => {
  const chosen = props.visibleColumns && new Set(props.visibleColumns)
  return props.columns.filter((c) => c.locked || !chosen || chosen.has(c.key)).map((c) => c.key)
})
const allVisible = computed(() => visibleKeys.value.length === props.columns.length)
const resultText = computed(() => {
  if (props.loading) return `Loading ${props.noun.other}…`
  if (props.total === undefined) return ''
  return `${formatNumber(props.total)} ${props.total === 1 ? props.noun.one : props.noun.other}`
})

function setColumn(column: ListToolbarColumn, visible: boolean) {
  const keys = new Set(visibleKeys.value)
  if (visible) keys.add(column.key)
  else if (!column.locked) keys.delete(column.key)
  emit(
    'update:visibleColumns',
    props.columns.filter((c) => keys.has(c.key)).map((c) => c.key),
  )
}
function showAllColumns() {
  emit(
    'update:visibleColumns',
    props.columns.map((c) => c.key),
  )
}
/** The only visible column cannot be hidden, so the list never loses all of its columns. */
const isRequired = (column: ListToolbarColumn) =>
  column.locked || (visibleKeys.value.length === 1 && visibleKeys.value[0] === column.key)

function focusSearch() {
  searchInput.value?.$el.focus()
}
function clear() {
  emit('clear')
  // The button disables itself once nothing is applied, so keep focus somewhere useful.
  void nextTick(focusSearch)
}
function removeFilter(key: string) {
  emit('remove-filter', key)
  void nextTick(() => {
    const next = chipList.value?.querySelector<HTMLElement>('[role="button"]')
    if (next) next.focus()
    else focusSearch()
  })
}
/** The chip's remove icon is unlabelled by default, so name it and let Space activate it too. */
function removePt(filter: ListToolbarAppliedFilter) {
  return {
    removeIcon: {
      role: 'button',
      'aria-hidden': 'false',
      'aria-label': `Remove filter ${filter.label}: ${filter.value}`,
      onKeydown: (event: KeyboardEvent) => {
        if (event.key !== ' ') return
        event.preventDefault()
        removeFilter(filter.key)
      },
    },
  }
}

defineExpose({ focusSearch })
</script>

<template>
  <div class="relative flex flex-col gap-1.5">
    <div class="flex flex-wrap items-center gap-2">
      <div class="min-w-0 basis-full sm:basis-48 sm:flex-1">
        <label :for="`${id}-search`" class="sr-only">{{ searchLabel }}</label>
        <IconField>
          <InputIcon><Search aria-hidden="true" /></InputIcon>
          <InputText
            ref="searchInput"
            v-model="search"
            :id="`${id}-search`"
            type="search"
            :size="size"
            :placeholder="searchPlaceholder ?? searchLabel"
            fluid
          />
        </IconField>
      </div>
      <div
        v-if="$slots.filters"
        class="flex flex-wrap gap-2 max-sm:w-full max-sm:[&>*]:min-w-36 max-sm:[&>*]:flex-1 sm:contents"
      >
        <slot name="filters" :size="size" />
      </div>
      <template v-if="$slots['more-filters']">
        <Button
          type="button"
          severity="secondary"
          outlined
          :size="size"
          aria-haspopup="dialog"
          :aria-controls="`${id}-more-filters`"
          @click="filtersPopover?.toggle($event)"
        >
          <SlidersH aria-hidden="true" />
          <span>Filter</span>
          <Badge v-if="moreCount" :value="moreCount" severity="primary" />
        </Button>
        <Popover :id="`${id}-more-filters`" ref="filtersPopover" aria-label="Filters">
          <div class="flex w-72 max-w-full flex-col gap-3">
            <slot name="more-filters" />
          </div>
        </Popover>
      </template>
      <div class="ml-auto flex items-center gap-1.5">
        <template v-if="columns.length">
          <Button
            type="button"
            iconOnly
            severity="secondary"
            outlined
            :size="size"
            aria-label="Columns"
            v-tooltip.top="'Columns'"
            aria-haspopup="dialog"
            :aria-controls="`${id}-columns`"
            @click="columnsPopover?.toggle($event)"
          >
            <Table aria-hidden="true" />
          </Button>
          <Popover :id="`${id}-columns`" ref="columnsPopover" aria-label="Choose columns">
            <div class="flex w-60 max-w-full flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <span class="text-sm font-medium">Columns</span>
                <Button
                  type="button"
                  label="Show all"
                  size="small"
                  severity="secondary"
                  text
                  :disabled="allVisible"
                  @click="showAllColumns"
                />
              </div>
              <ul class="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
                <li v-for="column in columns" :key="column.key" class="flex items-center gap-2">
                  <Checkbox
                    :modelValue="visibleKeys.includes(column.key)"
                    binary
                    :inputId="`${id}-column-${column.key}`"
                    :disabled="isRequired(column)"
                    @update:modelValue="setColumn(column, $event)"
                  />
                  <label :for="`${id}-column-${column.key}`" class="text-sm">
                    {{ column.label }}
                    <span v-if="column.locked" class="text-muted"> (always shown)</span>
                  </label>
                </li>
              </ul>
            </div>
          </Popover>
        </template>
        <Button
          v-if="exportable"
          type="button"
          label="Export CSV"
          severity="secondary"
          outlined
          :size="size"
          :loading="exporting"
          @click="emit('export')"
        >
          <template #icon="{ class: iconClass }">
            <Download :class="iconClass" aria-hidden="true" />
          </template>
        </Button>
        <Button
          v-if="refreshable"
          type="button"
          iconOnly
          severity="secondary"
          outlined
          :size="size"
          aria-label="Refresh"
          v-tooltip.top="'Refresh'"
          :disabled="loading"
          @click="emit('refresh')"
        >
          <Refresh aria-hidden="true" />
        </Button>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <p role="status" class="text-sm text-muted tabular-nums">{{ resultText }}</p>
      <template v-if="appliedFilters.length">
        <ul
          ref="chipList"
          aria-label="Applied filters"
          class="flex min-w-0 flex-wrap items-center gap-1.5"
        >
          <li v-for="filter in appliedFilters" :key="filter.key">
            <Chip
              :label="`${filter.label}: ${filter.value}`"
              removable
              :pt="removePt(filter)"
              @remove="removeFilter(filter.key)"
            />
          </li>
        </ul>
        <Button
          type="button"
          label="Clear filters"
          size="small"
          severity="secondary"
          text
          @click="clear"
        />
      </template>
    </div>
    <ProgressBar
      v-if="loading"
      mode="indeterminate"
      :aria-label="`Loading ${noun.other}`"
      class="absolute inset-x-0 bottom-0 h-0.5"
    />
  </div>
</template>
