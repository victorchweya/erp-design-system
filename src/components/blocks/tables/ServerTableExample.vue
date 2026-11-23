<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useId,
  useTemplateRef,
} from 'vue'
import Search from '@primeicons/vue/search'
import ServerTableBlock from './ServerTableBlock.vue'
import {
  fetchServerOrders,
  serverOrderStatuses,
  type ServerOrder,
  type ServerOrderStatus,
  type ServerTableAction,
  type ServerTableLoad,
  type ServerTablePermissions,
  type ServerTableQuery,
} from './server-table'

const id = useId()
const searchInput = useTemplateRef<{ $el: HTMLInputElement }>('searchInput')

// The query is the single source of truth: Retry sends it again unchanged.
const query = shallowRef<ServerTableQuery>({
  page: 1,
  rows: 5,
  sortField: 'deliveryDate',
  sortOrder: -1,
  search: '',
  status: null,
})
const rows = shallowRef<ServerOrder[]>([])
const totalRecords = shallowRef(0)
const loading = shallowRef(false)
const failed = shallowRef(false)
const simulateError = shallowRef(false)
const search = shallowRef('')
const feedback = shallowRef('')
// This user can view and edit orders but not delete them.
const permissions: ServerTablePermissions = { view: true, edit: true, delete: false }

const first = computed(() => (query.value.page - 1) * query.value.rows)
const filtered = computed(() => !!query.value.search.trim() || !!query.value.status)

let controller: AbortController | undefined
async function load(next: Partial<ServerTableQuery> = {}) {
  query.value = { ...query.value, ...next }
  // Only the newest request may update the table.
  controller?.abort()
  controller = new AbortController()
  const { signal } = controller
  loading.value = true
  try {
    const result = await fetchServerOrders(query.value, { fail: simulateError.value, signal })
    rows.value = result.rows
    totalRecords.value = result.totalRecords
    failed.value = false
  } catch {
    if (!signal.aborted) failed.value = true
  } finally {
    if (!signal.aborted) loading.value = false
  }
}

let timer: ReturnType<typeof setTimeout> | undefined
function onSearch(value: string | undefined) {
  search.value = value ?? ''
  clearTimeout(timer)
  timer = setTimeout(() => load({ search: search.value, page: 1 }), 300)
}
function onStatus(value: ServerOrderStatus | null) {
  load({ status: value, page: 1 })
}
function clearFilters() {
  clearTimeout(timer)
  search.value = ''
  void load({ search: '', status: null, page: 1 })
  // The empty state disappears, so send focus back to the start of the filters.
  void nextTick(() => searchInput.value?.$el.focus())
}
function onLoad(next: ServerTableLoad) {
  void load(next)
}
function onAction({ action, row }: { action: ServerTableAction; row: ServerOrder }) {
  feedback.value = `${action[0]!.toUpperCase()}${action.slice(1)} chosen for ${row.reference} in this preview.`
}

onMounted(() => load())
onBeforeUnmount(() => {
  clearTimeout(timer)
  controller?.abort()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-wrap items-center gap-2">
      <div class="min-w-0 flex-1 basis-48">
        <IconField class="w-full">
          <InputIcon><Search aria-hidden="true" /></InputIcon>
          <InputText
            ref="searchInput"
            :modelValue="search"
            aria-label="Search orders"
            placeholder="Reference or customer"
            size="small"
            fluid
            @update:modelValue="onSearch"
          />
        </IconField>
      </div>
      <div class="sm:w-40">
        <Select
          :modelValue="query.status"
          :options="serverOrderStatuses"
          aria-label="Filter orders by status"
          placeholder="All statuses"
          size="small"
          showClear
          fluid
          @update:modelValue="onStatus"
        />
      </div>
    </div>
    <ServerTableBlock
      :rows="rows"
      :totalRecords="totalRecords"
      :loading="loading"
      :failed="failed"
      :filtered="filtered"
      :first="first"
      :rowsPerPage="query.rows"
      :sortField="query.sortField"
      :sortOrder="query.sortOrder"
      :permissions="permissions"
      @load="onLoad"
      @retry="load()"
      @clearFilters="clearFilters"
      @action="onAction"
    />
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <p role="status">{{ feedback }}</p>
      <div class="flex items-center gap-2">
        <ToggleSwitch v-model="simulateError" :inputId="`${id}-error`" />
        <label :for="`${id}-error`">Preview: simulate a server error</label>
      </div>
    </div>
  </div>
</template>
