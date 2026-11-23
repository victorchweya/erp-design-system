<script setup lang="ts">
// GOAL: A table whose rows, sorting and paging come from the API, with honest loading, empty and failed states.
import { computed, shallowRef, useTemplateRef } from 'vue'
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import type Menu from 'primevue/menu'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import { formatCurrency, formatDate, formatNumber } from '@/utils/format'
import type {
  ServerOrder,
  ServerOrderStatus,
  ServerTableAction,
  ServerTableLoad,
  ServerTablePermissions,
  ServerTableSortField,
} from './server-table'

const props = withDefaults(
  defineProps<{
    /** The current page of rows, exactly as the API returned it. */
    rows: ServerOrder[]
    /** Rows that match across all pages. */
    totalRecords: number
    /** A request is in flight. Existing rows stay visible under the loading overlay. */
    loading?: boolean
    /** The last request failed. Keep this true until a request succeeds so Retry keeps focus. */
    failed?: boolean
    /** Filters are applied, so an empty list means no matches rather than no records. */
    filtered?: boolean
    /** Index of the first row on the current page. */
    first: number
    rowsPerPage: number
    rowsPerPageOptions?: number[]
    sortField: ServerTableSortField
    sortOrder: 1 | -1
    /** Actions the person may not use stay in the menu, disabled. */
    permissions?: ServerTablePermissions
    /** Plural, lowercase: used in the table name and in messages. */
    noun?: string
  }>(),
  {
    loading: false,
    failed: false,
    filtered: false,
    rowsPerPageOptions: () => [5, 10, 20],
    permissions: () => ({ view: true, edit: true, delete: true }),
    noun: 'customer orders',
  },
)

const emit = defineEmits<{
  /** The page, page size or sort changed. `page` starts at 1. Sorting returns to page 1. */
  load: [query: ServerTableLoad]
  /** Retry was pressed. Request again with the page and sort you already hold. */
  retry: []
  /** Clear filters was pressed in the empty state. */
  clearFilters: []
  /** A row action was chosen. Disabled actions never emit. */
  action: [event: { action: ServerTableAction; row: ServerOrder }]
}>()

const statusSeverity: Record<ServerOrderStatus, 'warn' | 'info' | 'success'> = {
  Pending: 'warn',
  Confirmed: 'info',
  Delivered: 'success',
}

const sentenceNoun = computed(() => props.noun.charAt(0).toUpperCase() + props.noun.slice(1))
const shownRows = computed(() => (props.failed ? [] : props.rows))
const announcement = computed(() => {
  if (props.loading) return `Loading ${props.noun}`
  if (props.failed || !props.rows.length) return ''
  const last = props.first + props.rows.length
  return `Showing ${props.first + 1} to ${last} of ${props.totalRecords} ${props.noun}`
})

function onPage(event: DataTablePageEvent) {
  emit('load', {
    page: Math.floor(event.first / event.rows) + 1,
    rows: event.rows,
    sortField: props.sortField,
    sortOrder: props.sortOrder,
  })
}
function onSort(event: DataTableSortEvent) {
  emit('load', {
    page: 1,
    rows: props.rowsPerPage,
    sortField: event.sortField as ServerTableSortField,
    sortOrder: event.sortOrder === -1 ? -1 : 1,
  })
}

const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const actionRow = shallowRef<ServerOrder | null>(null)
const menuItems = computed(() => {
  const row = actionRow.value
  const item = (action: ServerTableAction, label: string) => ({
    label,
    disabled: !props.permissions[action],
    command: () => row && emit('action', { action, row }),
  })
  return [item('view', 'View'), item('edit', 'Edit'), item('delete', 'Delete')]
})
function openActions(event: Event, row: ServerOrder) {
  actionRow.value = row
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <p role="status" class="sr-only">{{ announcement }}</p>
    <div :aria-busy="loading">
      <DataTable
        :value="shownRows"
        dataKey="id"
        size="small"
        lazy
        paginator
        :totalRecords="totalRecords"
        :first="first"
        :rows="rowsPerPage"
        :rowsPerPageOptions="rowsPerPageOptions"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        :sortField="sortField"
        :sortOrder="sortOrder"
        :loading="loading"
        scrollable
        class="whitespace-nowrap"
        tableStyle="min-width: 44rem"
        :tableProps="{ 'aria-label': sentenceNoun }"
        @page="onPage"
        @sort="onSort"
      >
        <Column field="customer" header="Customer" sortable>
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="font-medium">{{ data.customer }}</span>
              <span class="tabular-nums text-muted">{{ data.reference }}</span>
            </div>
          </template>
        </Column>
        <Column field="deliveryDate" header="Delivery" sortable>
          <template #body="{ data }">{{ formatDate(data.deliveryDate) }}</template>
        </Column>
        <Column field="crates" header="Crates" sortable bodyClass="tabular-nums">
          <template #body="{ data }">{{ formatNumber(data.crates) }}</template>
        </Column>
        <Column field="totalKes" header="Total" sortable bodyClass="tabular-nums">
          <template #body="{ data }">{{ formatCurrency(data.totalKes) }}</template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }"
            ><Tag :severity="statusSeverity[data.status as ServerOrderStatus]">{{
              data.status
            }}</Tag></template
          >
        </Column>
        <Column>
          <template #header><span class="sr-only">Actions</span></template>
          <template #body="{ data }">
            <Button
              type="button"
              severity="secondary"
              text
              rounded
              size="small"
              :aria-label="`Actions for ${data.reference}`"
              @click="openActions($event, data)"
            >
              <EllipsisV aria-hidden="true" />
            </Button>
          </template>
        </Column>
        <template #empty>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <template v-if="failed">
              <Message severity="error" size="small"
                >{{ sentenceNoun }} could not be loaded. Your page and sorting are kept.</Message
              >
              <Button type="button" size="small" :loading="loading" @click="emit('retry')"
                >Retry</Button
              >
            </template>
            <p v-else-if="loading">Loading {{ noun }}…</p>
            <template v-else-if="filtered">
              <p>No {{ noun }} match these filters.</p>
              <Button
                type="button"
                size="small"
                severity="secondary"
                outlined
                @click="emit('clearFilters')"
                >Clear filters</Button
              >
            </template>
            <p v-else>No {{ noun }} yet.</p>
          </div>
        </template>
      </DataTable>
    </div>
    <Menu ref="menu" :model="menuItems" popup aria-label="Row actions" />
  </div>
</template>
